import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  const isProduction = process.env.NODE_ENV === 'production';
  const root = process.cwd();

  let vite: any;
  if (!isProduction) {
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(root, 'dist')));
  }

  // Google verification file dynamic store path
  const verificationFileStorePath = path.resolve(root, 'google-verification.json');

  // API to save Google Search Console verification file
  app.post('/api/save-google-verification', (req, res) => {
    try {
      const { fileName, content } = req.body;
      if (!fileName || !content) {
        return res.status(400).json({ success: false, error: 'FileName and content are required' });
      }
      const safeName = path.basename(fileName);
      if (!safeName.startsWith('google') || !safeName.endsWith('.html')) {
        return res.status(400).json({ success: false, error: 'Invalid Google verification file name (must start with google and end with .html)' });
      }

      // Save to store JSON
      fs.writeFileSync(verificationFileStorePath, JSON.stringify({ fileName: safeName, content }, null, 2));

      // Also save to public directory
      const publicDir = path.resolve(root, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.resolve(publicDir, safeName), content);

      res.json({ success: true, message: 'Google verification file saved and hosted successfully!' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Handle direct requests for google*.html verification files
  app.get(/^\/google[a-zA-Z0-9_\-]+\.html$/, (req, res, next) => {
    try {
      const requestedFile = path.basename(req.path);
      const publicFilePath = path.resolve(root, 'public', requestedFile);

      if (fs.existsSync(publicFilePath)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.sendFile(publicFilePath);
      }

      if (fs.existsSync(verificationFileStorePath)) {
        const data = JSON.parse(fs.readFileSync(verificationFileStorePath, 'utf-8'));
        if (data.fileName === requestedFile && data.content) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.send(data.content);
        }
      }
      next();
    } catch (e) {
      next();
    }
  });

  if (isProduction) {
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(root, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

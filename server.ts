import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Explicit valid canonical routes on FormulaCalcKit
export const CANONICAL_ROUTES = new Set([
  '/',
  '/about',
  '/standards',
  '/privacy',
  '/terms',
  '/contact',
]);

interface PageMeta {
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
}

const PAGE_METAS: Record<string, PageMeta> = {
  '/': {
    titleEn: 'FormulaCalcKit - Precision Formula Solvers & Scientific Problem-Solving Studio',
    titleZh: 'FormulaCalcKit - 科学公式计算工作台 | 在线数学物理工程求解器',
    descEn: 'High-precision interactive STEM formula workstation with exact radicals, algebraic steps, and ISO/IEC 80000 compliance.',
    descZh: '简洁高效的科学与数学公式计算工作台。提供勾股定理、一元二次方程、圆与球体、三角函数、欧姆定律、复利与LaTeX公式排版等在线计算工具。',
  },
  '/about': {
    titleEn: 'About Platform & Editorial Working Group | FormulaCalcKit',
    titleZh: '关于平台与学术编审委员会 | FormulaCalcKit 科学计算工作台',
    descEn: 'Learn about FormulaCalcKit editorial board, metrologists, ISO/IEC 80000 adherence, and academic BibTeX citation formats.',
    descZh: '了解 FormulaCalcKit 学术编审委员会、计算数学专家团队、国际标准执行规范及学术论文引用格式。',
  },
  '/standards': {
    titleEn: 'Metrology Standards, Physical Constants & Citation Guide | FormulaCalcKit',
    titleZh: '国际计量标准、物理常数与算法溯源对照表 | FormulaCalcKit',
    descEn: 'Comprehensive standards cross-reference matrix aligning calculators with ISO/IEC 80000, NIST SP 811, and CODATA fundamental constants.',
    descZh: 'FormulaCalcKit 核心公式与 ISO/IEC 80000、NIST SP 811 及 CODATA 国际基础物理常数对照总表与学术引用指引。',
  },
  '/privacy': {
    titleEn: 'Privacy Policy & Zero Data Collection Notice | FormulaCalcKit',
    titleZh: '隐私保护政策与纯本地计算规范 | FormulaCalcKit',
    descEn: 'FormulaCalcKit operates 100% client-side with zero mathematical telemetry, no third-party tracking cookies, and full GDPR compliance.',
    descZh: 'FormulaCalcKit 坚持 100% 浏览器本地运算，零数学输入回传，零侵入式追踪 Cookie，严格保护用户隐私。',
  },
  '/terms': {
    titleEn: 'Terms of Service & Engineering Accuracy Disclaimer | FormulaCalcKit',
    titleZh: '服务条款与工程计算使用边界声明 | FormulaCalcKit',
    descEn: 'Terms of service and engineering critical systems disclaimer for FormulaCalcKit mathematical calculators.',
    descZh: 'FormulaCalcKit 免费教育与科研使用许可、算法精度保障及生命安全工程独立审签免责边界说明。',
  },
  '/contact': {
    titleEn: 'Contact Editorial Working Group & Errata Reporting | FormulaCalcKit',
    titleZh: '学术勘误、算法同行审校与联系编委 | FormulaCalcKit',
    descEn: 'Submit mathematical errata, algorithm edge cases, textbook syllabus alignment suggestions, or academic partnerships.',
    descZh: '向 FormulaCalcKit 科学计量工作组提交公式推导勘误、边缘测试用例、教材大纲配套或学术合作咨询。',
  },
};

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
      appType: 'custom', // Prevents automatic 200 HTML fallback so Express can return true HTTP 404 for unknown pages!
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(root, 'dist'), { index: false }));
  }

  // Google Search Console verification file handling
  const verificationFileStorePath = path.resolve(root, 'google-verification.json');

  app.post('/api/save-google-verification', (req, res) => {
    try {
      const { fileName, content } = req.body;
      if (!fileName || !content) {
        return res.status(400).json({ success: false, error: 'FileName and content are required' });
      }
      const safeName = path.basename(fileName);
      if (!safeName.startsWith('google') || !safeName.endsWith('.html')) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Google verification file name (must start with google and end with .html)',
        });
      }

      fs.writeFileSync(verificationFileStorePath, JSON.stringify({ fileName: safeName, content }, null, 2));

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

  // Authoritative Page Handler: 200 for canonical routes, 404 for non-existent routes
  app.get('*', async (req, res, next) => {
    // If request is for an unhandled static asset (has extension like .js, .css, .svg, .png), 404 directly
    const ext = path.extname(req.path);
    if (ext && ext !== '.html') {
      return res.status(404).send('Asset Not Found');
    }

    const cleanPath = req.path.replace(/\/+$/, '') || '/';
    const isCanonical = CANONICAL_ROUTES.has(cleanPath);
    const statusCode = isCanonical ? 200 : 404;

    try {
      let template: string;
      if (!isProduction && vite) {
        template = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
      } else {
        const indexPath = path.resolve(root, 'dist', 'index.html');
        if (fs.existsSync(indexPath)) {
          template = fs.readFileSync(indexPath, 'utf-8');
        } else {
          template = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8');
        }
      }

      if (statusCode === 404) {
        // Invalidate indexing for 404 URLs to eliminate soft-404 SEO penalties completely
        if (!template.includes('noindex')) {
          template = template.replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>');
        }
        template = template.replace(
          /<title>.*?<\/title>/,
          '<title>404 - 页面未找到 | Page Not Found - FormulaCalcKit</title>'
        );
      } else {
        // Enhance SEO with canonical URL and route-specific metadata
        const meta = PAGE_METAS[cleanPath];
        if (meta) {
          template = template.replace(/<title>.*?<\/title>/, `<title>${meta.titleZh}</title>`);
          template = template.replace(
            /<meta name="description" content=".*?" \/>/,
            `<meta name="description" content="${meta.descZh}" />`
          );
        }
        const canonicalUrl = `https://formulacalckit.com${cleanPath === '/' ? '' : cleanPath}`;
        if (!template.includes('rel="canonical"')) {
          template = template.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
        }
      }

      res.status(statusCode).setHeader('Content-Type', 'text/html; charset=utf-8').send(template);
    } catch (e: any) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error('Server render error:', e);
      res.status(500).send('Internal Server Error');
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`FormulaCalcKit server running at http://0.0.0.0:${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();

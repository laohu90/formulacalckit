import { CloudflareDnsRecord, DnsConfig, CloudflareApiResponse } from '../types';

export const DEFAULT_DNS_CONFIG: DnsConfig = {
  authMode: 'token',
  apiToken: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_API_TOKEN) || '',
  authEmail: '',
  authKey: '',
  zoneId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_ZONE_ID) || 'c914ef51dc55517d2789d5f5294fa24c',
  rootDomain: 'formulacalckit.com',
};

// Seed / Cached verified DNS records for formulacalckit.com
export const SEED_DNS_RECORDS: CloudflareDnsRecord[] = [
  {
    id: 'cf-rec-001',
    type: 'CNAME',
    name: 'pythagorean-calculator.formulacalckit.com',
    content: 'cname.vercel-dns.com',
    proxiable: true,
    proxied: true,
    ttl: 1, // Auto
    created_on: '2026-10-19T05:20:00Z',
    comment: 'Pythagorean Theorem Calculator Sub-site',
  },
  {
    id: 'cf-rec-002',
    type: 'CNAME',
    name: 'quadratic.formulacalckit.com',
    content: 'cname.vercel-dns.com',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-18T10:00:00Z',
    comment: 'Quadratic Equation Solver Sub-site',
  },
  {
    id: 'cf-rec-003',
    type: 'A',
    name: 'formulacalckit.com',
    content: '76.76.21.21',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-19T00:00:00Z',
    comment: 'FormulaCalcKit Main Portal Root',
  },
  {
    id: 'cf-rec-004',
    type: 'CNAME',
    name: 'www.formulacalckit.com',
    content: 'formulacalckit.com',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-19T00:00:00Z',
    comment: 'WWW Canonical Alias',
  },
  {
    id: 'cf-rec-005',
    type: 'TXT',
    name: 'formulacalckit.com',
    content: 'google-site-verification=google1f8c4d99a3c33d8f',
    proxiable: false,
    proxied: false,
    ttl: 3600,
    created_on: '2026-10-19T05:22:00Z',
    comment: 'Google Search Console Verification',
  },
];

export async function fetchCloudflareDns(
  config: DnsConfig
): Promise<{
  success: boolean;
  records: CloudflareDnsRecord[];
  rawCount: number;
  errors?: Array<{ code: number; message: string }>;
  isSimulatedFallback?: boolean;
}> {
  const zoneId = config.zoneId.trim();
  if (!zoneId) {
    return {
      success: false,
      records: [],
      rawCount: 0,
      errors: [{ code: 400, message: 'Zone ID cannot be empty' }],
    };
  }

  // Build headers depending on auth mode
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (config.authMode === 'token') {
    headers['Authorization'] = `Bearer ${config.apiToken.trim()}`;
  } else {
    headers['X-Auth-Email'] = config.authEmail.trim();
    headers['X-Auth-Key'] = config.authKey.trim();
  }

  // Attempt 1: Fetch via local Vite proxy `/api/cloudflare`
  try {
    const proxyUrl = `/api/cloudflare/zones/${zoneId}/dns_records?per_page=100`;
    const res = await fetch(proxyUrl, { headers });
    const data: CloudflareApiResponse<CloudflareDnsRecord[]> = await res.json();

    if (data.success && Array.isArray(data.result)) {
      return {
        success: true,
        records: data.result,
        rawCount: data.result.length,
      };
    } else if (data.errors && data.errors.length > 0) {
      return {
        success: false,
        records: [],
        rawCount: 0,
        errors: data.errors,
      };
    }
  } catch (err) {
    console.warn('Vite proxy fetch failed or not running in full server mode:', err);
  }

  // Attempt 2: Direct call to Cloudflare API
  try {
    const directUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=100`;
    const res = await fetch(directUrl, { headers });
    const data: CloudflareApiResponse<CloudflareDnsRecord[]> = await res.json();

    if (data.success && Array.isArray(data.result)) {
      return {
        success: true,
        records: data.result,
        rawCount: data.result.length,
      };
    } else if (data.errors && data.errors.length > 0) {
      return {
        success: false,
        records: [],
        rawCount: 0,
        errors: data.errors,
      };
    }
  } catch (err: unknown) {
    console.warn('Direct Cloudflare API fetch failed (likely CORS on browser):', err);
  }

  // If both failed because of CORS or credentials, return error with diagnostic message
  return {
    success: false,
    records: [],
    rawCount: 0,
    errors: [
      {
        code: 10000,
        message:
          'Authentication or Network error. Cloudflare rejected the token, or browser CORS blocked direct access. You can view the verified DNS catalog below or enter a valid read-only Zone.DNS API Token.',
      },
    ],
  };
}

// Helper to filter out subdomains from DNS records
export function extractWebSubdomains(
  records: CloudflareDnsRecord[],
  rootDomain: string
): Array<{
  subdomain: string;
  fullName: string;
  type: string;
  target: string;
  proxied: boolean;
  ttl: string;
  guessedToolName: string;
  isRoot: boolean;
}> {
  const cleanRoot = rootDomain.toLowerCase().trim();

  return records
    .filter((r) => r.type === 'A' || r.type === 'AAAA' || r.type === 'CNAME')
    .map((r) => {
      const lower = r.name.toLowerCase();
      let subdomain = '';
      let isRoot = false;

      if (lower === cleanRoot || lower === `@.${cleanRoot}`) {
        subdomain = '@ (Main Domain)';
        isRoot = true;
      } else if (lower.endsWith(`.${cleanRoot}`)) {
        subdomain = lower.replace(`.${cleanRoot}`, '');
      } else {
        subdomain = lower;
      }

      // Infer clean tool name from subdomain
      let guessedToolName = subdomain;
      if (isRoot) {
        guessedToolName = 'FormulaCalcKit Main Portal';
      } else if (subdomain.includes('pythagorean')) {
        guessedToolName = 'Pythagorean Theorem Calculator';
      } else if (subdomain.includes('quadratic')) {
        guessedToolName = 'Quadratic Equation Solver';
      } else if (subdomain.includes('trig')) {
        guessedToolName = 'Trigonometry Calculator';
      } else if (subdomain.includes('geometry') || subdomain.includes('triangle')) {
        guessedToolName = 'Geometry & Triangle Tool';
      } else {
        guessedToolName = subdomain
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }

      return {
        subdomain,
        fullName: r.name,
        type: r.type,
        target: r.content,
        proxied: r.proxied,
        ttl: r.ttl === 1 ? 'Auto' : `${r.ttl}s`,
        guessedToolName,
        isRoot,
      };
    });
}

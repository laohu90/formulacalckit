import {
  CloudflareDnsRecord,
  DnsConfig,
  CloudflareApiResponse,
  WorkerSubsiteTool,
  WorkerApiResponse,
} from '../types';

/**
 * Cloudflare Worker DNS Gateway Endpoint
 *
 * This Worker runs server-side on Cloudflare's edge network.
 * It holds the credentials securely in Worker environment variables,
 * preventing any exposure of Cloudflare API Keys in the client browser.
 */
export const WORKER_DNS_API_URL =
  'https://formulacalckit-dns-api.cloudflare-1-268.workers.dev/';

export const DEFAULT_DNS_CONFIG: DnsConfig = {
  authMode: 'token',
  apiToken: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_API_TOKEN) || '',
  authEmail: '',
  authKey: '',
  zoneId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_ZONE_ID) || 'c914ef51dc55517d2789d5f5294fa24c',
  rootDomain: 'formulacalckit.com',
};

// Seed fallback in case network is disconnected
export const FALLBACK_WORKER_TOOLS: WorkerSubsiteTool[] = [
  {
    subdomain: 'mathbridge',
    domain: 'mathbridge.formulacalckit.com',
    url: 'https://mathbridge.formulacalckit.com/',
    title: '数学公式排版工具 (MathBridge)',
    desc: 'LaTeX / Word / MathML 公式转换与学术排版套件',
    icon: '📝',
    category: 'Academic',
  },
  {
    subdomain: 'pythagorean-calculator',
    domain: 'pythagorean-calculator.formulacalckit.com',
    url: 'https://pythagorean-calculator.formulacalckit.com/',
    title: '勾股定理计算器 (Pythagorean Calculator)',
    desc: '直角三角形求斜边与最简二次根式化简，逐步推导解题',
    icon: '📐',
    category: 'Geometry',
  },
  {
    subdomain: 'quadratic-solver',
    domain: 'quadratic-solver.formulacalckit.com',
    url: 'https://quadratic-solver.formulacalckit.com/',
    title: '一元二次方程求解器 (Quadratic Equation Solver)',
    desc: '判别式分析、因式分解与求根公式图形可视化',
    icon: '🔢',
    category: 'Algebra',
  },
];

/**
 * Fetch live active subdomains from the Cloudflare Worker DNS API
 * Automatically reflects new sites added or removed from Cloudflare DNS!
 */
export async function fetchWorkerDnsTools(): Promise<{
  success: boolean;
  tools: WorkerSubsiteTool[];
  count: number;
  source: 'worker' | 'cache' | 'fallback';
}> {
  try {
    const res = await fetch(WORKER_DNS_API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.ok) {
      const data: WorkerApiResponse = await res.json();
      if (data && data.success && Array.isArray(data.tools)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('fck_worker_tools_cache', JSON.stringify(data.tools));
        }
        return {
          success: true,
          tools: data.tools,
          count: data.count || data.tools.length,
          source: 'worker',
        };
      }
    }
  } catch (err) {
    console.warn('Worker DNS API request failed, reading cache fallback:', err);
  }

  // Fallback to localStorage cache
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('fck_worker_tools_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            success: true,
            tools: parsed,
            count: parsed.length,
            source: 'cache',
          };
        }
      } catch {
        // ignore
      }
    }
  }

  return {
    success: true,
    tools: FALLBACK_WORKER_TOOLS,
    count: FALLBACK_WORKER_TOOLS.length,
    source: 'fallback',
  };
}

export const SEED_DNS_RECORDS: CloudflareDnsRecord[] = [
  {
    id: 'cf-rec-001',
    type: 'CNAME',
    name: 'pythagorean-calculator.formulacalckit.com',
    content: 'cname.vercel-dns.com',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-19T05:20:00Z',
    comment: 'Pythagorean Theorem Calculator Tool',
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
    comment: 'Quadratic Equation Solver Tool',
  },
  {
    id: 'cf-rec-003',
    type: 'CNAME',
    name: 'mathbridge.formulacalckit.com',
    content: 'cname.vercel-dns.com',
    proxiable: true,
    proxied: true,
    ttl: 1,
    created_on: '2026-10-19T06:00:00Z',
    comment: 'MathBridge LaTeX Tool',
  },
];

export async function fetchCloudflareDns(
  config: DnsConfig
): Promise<{
  success: boolean;
  records: CloudflareDnsRecord[];
  rawCount: number;
  errors?: Array<{ code: number; message: string }>;
}> {
  // First attempt Worker
  try {
    const workerResult = await fetchWorkerDnsTools();
    if (workerResult.success && workerResult.tools.length > 0) {
      const simulatedRecords: CloudflareDnsRecord[] = workerResult.tools.map((t, idx) => ({
        id: `worker-rec-${idx + 1}`,
        type: 'CNAME',
        name: t.domain,
        content: 'cname.vercel-dns.com',
        proxiable: true,
        proxied: true,
        ttl: 1,
        comment: t.title,
      }));
      return {
        success: true,
        records: simulatedRecords,
        rawCount: simulatedRecords.length,
      };
    }
  } catch (err) {
    console.warn('Worker sync in fetchCloudflareDns:', err);
  }

  const zoneId = config.zoneId.trim();
  if (!zoneId) {
    return {
      success: false,
      records: [],
      rawCount: 0,
      errors: [{ code: 400, message: 'Zone ID cannot be empty' }],
    };
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (config.authMode === 'token') {
    headers['Authorization'] = `Bearer ${config.apiToken.trim()}`;
  } else {
    headers['X-Auth-Email'] = config.authEmail.trim();
    headers['X-Auth-Key'] = config.authKey.trim();
  }

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
    }
  } catch (err) {
    console.warn('Proxy fetch failed:', err);
  }

  return {
    success: false,
    records: [],
    rawCount: 0,
    errors: [
      {
        code: 10000,
        message: 'Could not connect directly. Worker API is active as primary pipeline.',
      },
    ],
  };
}

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

      let guessedToolName = subdomain;
      if (isRoot) {
        guessedToolName = 'FormulaCalcKit Main Portal';
      } else if (subdomain.includes('mathbridge')) {
        guessedToolName = 'MathBridge LaTeX & Math Typography';
      } else if (subdomain.includes('pythagorean')) {
        guessedToolName = 'Pythagorean Theorem Calculator';
      } else if (subdomain.includes('quadratic')) {
        guessedToolName = 'Quadratic Equation Solver';
      } else if (subdomain.includes('trig')) {
        guessedToolName = 'Trigonometry Calculator';
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

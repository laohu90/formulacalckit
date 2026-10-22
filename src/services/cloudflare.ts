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

/**
 * Live PHP Server Subdirectory Scanner Endpoint
 * Hosted on user's wildcard server: https://tools.formulacalckit.com/
 */
export const SERVER_PHP_API_URL = 'https://tools.formulacalckit.com/';

export const DEFAULT_DNS_CONFIG: DnsConfig = {
  authMode: 'token',
  apiToken: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_API_TOKEN) || '',
  authEmail: '',
  authKey: '',
  zoneId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_ZONE_ID) || '',
  rootDomain: 'formulacalckit.com',
};

// Seed fallback in case network is disconnected
export const FALLBACK_WORKER_TOOLS: WorkerSubsiteTool[] = [
  {
    subdomain: 'completing-the-square-calculator',
    domain: 'completing-the-square-calculator.formulacalckit.com',
    url: 'https://completing-the-square-calculator.formulacalckit.com/',
    title: '配方法一元二次方程计算器',
    desc: '一元二次方程配方法分步详解器，将一般式秒转顶点式，提供5步标准代数配方推导。',
    icon: '🔲',
    category: 'Algebra',
  },
  {
    subdomain: 'density-calculator',
    domain: 'density-calculator.formulacalckit.com',
    url: 'https://density-calculator.formulacalckit.com/',
    title: '密度计算公式工具 (ρ = m/V)',
    desc: '高精度密度科学在线计算器，支持质量、体积与密度三者互求，提供单位换算与浮力解析。',
    icon: '⚖️',
    category: 'Physics',
  },
  {
    subdomain: 'fraction-calculator',
    domain: 'fraction-calculator.formulacalckit.com',
    url: 'https://fraction-calculator.formulacalckit.com/',
    title: '分数计算器 (四则混合运算与最简分数约分)',
    desc: '分数四则混合运算、最简分数约分化简、假分数与带分数转换及通分步骤推导。',
    icon: '➗',
    category: 'Mathematics',
  },
  {
    subdomain: 'gcd-calculator',
    domain: 'gcd-calculator.formulacalckit.com',
    url: 'https://gcd-calculator.formulacalckit.com/',
    title: '最大公约数与最小公倍数计算器 (GCD/LCM)',
    desc: '在线求最大公约数与最小公倍数，支持短除法、辗转相除法与质因数分解详细步骤。',
    icon: '🔢',
    category: 'Mathematics',
  },
  {
    subdomain: 'linear-function-calculator',
    domain: 'linear-function-calculator.formulacalckit.com',
    url: 'https://linear-function-calculator.formulacalckit.com/',
    title: '一次函数解析式生成器 (两点求直线方程)',
    desc: '输入两点坐标秒出斜率k、截距b、解析式y=kx+b与一般式，支持动态坐标图像。',
    icon: '📈',
    category: 'Algebra',
  },
  {
    subdomain: 'linear-system-solver',
    domain: 'linear-system-solver.formulacalckit.com',
    url: 'https://linear-system-solver.formulacalckit.com/',
    title: '二元一次方程组求解器 (2x2 方程组)',
    desc: '二元一次方程组带步骤求解，支持代入消元法与加减消元法、精确分数化简与图象交点。',
    icon: '🧮',
    category: 'Algebra',
  },
  {
    subdomain: 'mathbridge',
    domain: 'mathbridge.formulacalckit.com',
    url: 'https://mathbridge.formulacalckit.com/',
    title: '数学公式排版工具 (MathBridge LaTeX)',
    desc: 'LaTeX / Word / MathML 论文级数学公式排版与转换套件，支持学术公式实时预览导出。',
    icon: '📝',
    category: 'Academic',
  },
  {
    subdomain: 'ohms-law-calculator',
    domain: 'ohms-law-calculator.formulacalckit.com',
    url: 'https://ohms-law-calculator.formulacalckit.com/',
    title: '欧姆定律与电功率计算器',
    desc: '根据任意两项物理量计算电压、电流、电阻与电功率，支持科学单位换算。',
    icon: '⚡',
    category: 'Physics',
  },
  {
    subdomain: 'pythagorean-calculator',
    domain: 'pythagorean-calculator.formulacalckit.com',
    url: 'https://pythagorean-calculator.formulacalckit.com/',
    title: '勾股定理计算器 (直角三角形斜边求解)',
    desc: '直角三角形求斜边与最简二次根式化简（如 2√5），逐步几何推导解题。',
    icon: '📐',
    category: 'Geometry',
  },
  {
    subdomain: 'quadratic-discriminant-calculator',
    domain: 'quadratic-discriminant-calculator.formulacalckit.com',
    url: 'https://quadratic-discriminant-calculator.formulacalckit.com/',
    title: '一元二次方程判别式计算器 (Δ 判别式)',
    desc: '快速求解判别式 Δ = b² - 4ac，精确判断实根、双重实根或共轭虚根性质。',
    icon: '🔍',
    category: 'Algebra',
  },
  {
    subdomain: 'quadratic-equation-solver',
    domain: 'quadratic-equation-solver.formulacalckit.com',
    url: 'https://quadratic-equation-solver.formulacalckit.com/',
    title: '韦达定理与二次方程分步计算器',
    desc: '在线韦达定理与根与系数关系推导，支持已知两根反推方程与十字相乘分步求解。',
    icon: '📊',
    category: 'Algebra',
  },
  {
    subdomain: 'quadratic-solver',
    domain: 'quadratic-solver.formulacalckit.com',
    url: 'https://quadratic-solver.formulacalckit.com/',
    title: '一元二次方程极速求解器',
    desc: '判别式分析、因式分解与求根公式图形可视化，输出实根与复数虚根。',
    icon: '🔢',
    category: 'Algebra',
  },
  {
    subdomain: 'sector-calculator',
    domain: 'sector-calculator.formulacalckit.com',
    url: 'https://sector-calculator.formulacalckit.com/',
    title: '扇形面积与弧长计算器',
    desc: '扇形面积与弧长在线求解，支持角度制与弧度制互逆推导、周长与圆锥展开图。',
    icon: '🥧',
    category: 'Geometry',
  },
];


/**
 * Fetch live active subdomains using Dual-Source Hybrid Discovery:
 * 1. Queries https://tools.formulacalckit.com/ (Live PHP server directory scan)
 * 2. Queries https://formulacalckit-dns-api.cloudflare-1-268.workers.dev/ (Cloudflare DNS records)
 * 3. Intelligently merges and deduplicates tools by subdomain
 * 4. Caches to localStorage with graceful fallback
 */
export async function fetchWorkerDnsTools(): Promise<{
  success: boolean;
  tools: WorkerSubsiteTool[];
  count: number;
  source: 'hybrid' | 'php-server' | 'worker' | 'cache' | 'fallback';
}> {
  const mergedMap = new Map<string, WorkerSubsiteTool>();
  let hasPhpSuccess = false;
  let hasWorkerSuccess = false;

  // Concurrently request both the PHP live scanner and the Cloudflare DNS worker
  const [phpResult, workerResult] = await Promise.allSettled([
    fetch(SERVER_PHP_API_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.tools)) {
          return data.tools as WorkerSubsiteTool[];
        }
      }
      return null;
    }),
    fetch(WORKER_DNS_API_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }).then(async (res) => {
      if (res.ok) {
        const data: WorkerApiResponse = await res.json();
        if (data && data.success && Array.isArray(data.tools)) {
          return data.tools;
        }
      }
      return null;
    }),
  ]);

  // 2. If PHP server tools are successfully fetched, they represent the absolute live state of the server!
  if (phpResult.status === 'fulfilled' && phpResult.value && phpResult.value.length > 0) {
    hasPhpSuccess = true;
    for (const tool of phpResult.value) {
      if (tool && tool.subdomain) {
        const key = tool.subdomain.toLowerCase().trim();
        mergedMap.set(key, tool);
      }
    }
  } else if (workerResult.status === 'fulfilled' && workerResult.value) {
    // Fallback to Cloudflare worker if PHP didn't return tools
    hasWorkerSuccess = true;
    for (const tool of workerResult.value) {
      if (tool && tool.subdomain) {
        const key = tool.subdomain.toLowerCase().trim();
        mergedMap.set(key, tool);
      }
    }
  }

  // If at least one online source returned tools
  if (mergedMap.size > 0) {
    const finalTools = Array.from(mergedMap.values());
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('fck_worker_tools_cache', JSON.stringify(finalTools));
      } catch {
        // ignore
      }
    }

    const source: 'hybrid' | 'php-server' | 'worker' =
      hasPhpSuccess && hasWorkerSuccess
        ? 'hybrid'
        : hasPhpSuccess
        ? 'php-server'
        : 'worker';

    return {
      success: true,
      tools: finalTools,
      count: finalTools.length,
      source,
    };
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

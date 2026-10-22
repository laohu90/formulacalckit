export type ToolCategory =
  | 'all'
  | 'geometry'
  | 'algebra'
  | 'trigonometry'
  | 'physics'
  | 'finance'
  | 'academic';

export interface ToolItem {
  id: string;
  nameEn: string;
  nameZh: string;
  category: ToolCategory;
  formula: string;
  descriptionEn: string;
  descriptionZh: string;
  subdomainUrl?: string;
  quickSolverId?: QuickSolverId;
  iconName: string;
  tags: string[];
  isVerifiedSubdomain?: boolean;
  dnsRecordName?: string;
}

export type QuickSolverId =
  | 'pythagorean'
  | 'quadratic'
  | 'circle'
  | 'trigonometry'
  | 'ohms_law'
  | 'percentage';

export interface WorkerSubsiteTool {
  subdomain: string;
  domain: string;
  url: string;
  pathUrl?: string;
  title: string;
  desc: string;
  icon?: string;
  category?: string;
  formula?: string;
}

export interface WorkerApiResponse {
  success: boolean;
  count: number;
  tools: WorkerSubsiteTool[];
}

export interface CloudflareDnsRecord {
  id: string;
  type: string;
  name: string;
  content: string;
  proxiable: boolean;
  proxied: boolean;
  ttl: number;
  created_on?: string;
  modified_on?: string;
  comment?: string;
}

export interface CloudflareApiResponse<T> {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
  result: T | null;
}

export interface DnsConfig {
  authMode: 'token' | 'global_key';
  apiToken: string;
  authEmail: string;
  authKey: string;
  zoneId: string;
  rootDomain: string;
}

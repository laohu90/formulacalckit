export type ToolCategory =
  | 'all'
  | 'geometry'
  | 'algebra'
  | 'trigonometry'
  | 'physics'
  | 'arithmetic'
  | 'finance'
  | 'academic';

export type QuickSolverId =
  | 'pythagorean'
  | 'quadratic'
  | 'gcd_lcm'
  | 'linear_system'
  | 'circle'
  | 'trigonometry'
  | 'ohms_law'
  | 'density'
  | 'kinematics'
  | 'percentage'
  | 'mathbridge';

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

export interface FormulaEntry {
  id: string;
  titleEn: string;
  titleZh: string;
  categoryEn: string;
  categoryZh: string;
  categoryKey: ToolCategory;
  formula: string;
  formulaLatex: string;
  descEn: string;
  descZh: string;
  variables: Array<{ sym: string; nameEn: string; nameZh: string }>;
  exampleEn: string;
  exampleZh: string;
  quickSolverId?: QuickSolverId;
}

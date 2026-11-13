// ============================================
// MarketPilot — Shared TypeScript Types
// ============================================

// Data Provenance
export interface DataProvenance {
  source: string;
  sourceUrl?: string;
  collectionDate: string;
  country?: string;
  method: 'api' | 'scraping' | 'manual' | 'estimation' | 'demo';
  confidenceLevel: 'high' | 'medium' | 'low' | 'estimated';
  isVerified: boolean;
  isDemo: boolean;
}

// Market
export interface Market {
  id: string;
  countryCode: string;
  countryNameFr: string;
  countryNameEn: string;
  continent: string;
  flag: string;
  population: number;
  gdpPerCapita: number;
  purchasingPowerIndex: number;
  internetPenetration: number;
  ecommerceMarketSize: number;
  ecommerceGrowthRate: number;
  mainLanguages: string[];
  mainCurrencies: string[];
  riskScore: number;
  provenance: DataProvenance;
  isDemo: boolean;
}

// Niche
export interface Niche {
  id: string;
  nameFr: string;
  nameEn: string;
  slug: string;
  category: string;
  subcategory: string;
  demandScore: number;
  competitionScore: number;
  growthRate: number;
  seasonalityPattern: Record<string, number>;
  estimatedMarketSize: number;
  profitabilityScore: number;
  trendDirection: 'rising' | 'stable' | 'declining';
  topCountries: string[];
  provenance: DataProvenance;
  isDemo: boolean;
}

// Product
export interface Product {
  id: string;
  nameFr: string;
  nameEn: string;
  slug: string;
  nicheId: string;
  nicheName: string;
  descriptionFr: string;
  descriptionEn: string;
  imageUrl: string;
  sellingPriceMin: number;
  sellingPriceMax: number;
  costPriceMin: number;
  costPriceMax: number;
  estimatedMarginPercent: number;
  shippingCostEstimate: number;
  weightGrams: number;
  opportunityScore: number;
  trendData: { month: string; interest: number }[];
  tags: string[];
  provenance: DataProvenance;
  isDemo: boolean;
}

// Ad Test
export interface AdTest {
  id: string;
  name: string;
  status: 'draft' | 'configuring' | 'pending_connection' | 'running' | 'paused' | 'completed' | 'cancelled';
  productId: string;
  productName: string;
  targetCountry: string;
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  paymentFeesPercent: number;
  otherCosts: number;
  dailyBudget: number;
  totalBudget: number;
  durationDays: number;
  startDate: string;
  endDate: string;
  adPlatform: 'meta' | 'tiktok' | null;
  adAccountConnected: boolean;
  shopPlatform: 'shopify' | 'woocommerce' | null;
  shopConnected: boolean;
  breakevenRoas: number;
  maxCac: number;
  netMarginPerUnit: number;
  creatives: AdTestCreative[];
  metrics: AdTestMetricDay[];
  isDemo: boolean;
}

export interface AdTestCreative {
  id: string;
  name: string;
  type: 'image' | 'video' | 'carousel';
  mediaUrl: string;
  headline: string;
  hookType: string;
  isDemo: boolean;
}

export interface AdTestMetricDay {
  date: string;
  creativeId?: string;
  creativeName?: string;
  spend: number;
  impressions: number;
  cpm: number;
  clicks: number;
  ctr: number;
  cpc: number;
  videoViews: number;
  visits: number;
  addToCart: number;
  checkouts: number;
  orders: number;
  payments: number;
  deliveries: number;
  revenue: number;
  conversionRate: number;
  cartRate: number;
  cac: number;
  roas: number;
  netProfit: number;
  dataSource: 'api' | 'manual' | 'demo';
  isDemo: boolean;
}

// Diagnostic
export interface FunnelDiagnostic {
  step: 'impression' | 'attention' | 'click' | 'visit' | 'cart' | 'checkout' | 'order' | 'payment' | 'delivery' | 'profitability';
  stepLabel: string;
  status: 'healthy' | 'warning' | 'critical' | 'insufficient_data';
  metricName: string;
  metricValue: number;
  benchmarkValue: number;
  deviationPercent: number;
  analysis: string;
  probableCauses: string[];
  isCorrelation: boolean;
  recommendation: string;
  priority: number;
  action: 'continue' | 'modify' | 'test_new' | 'stop';
  missingData: string[];
}

// API Connection
export interface ApiConnection {
  id: string;
  platform: 'meta' | 'tiktok' | 'shopify' | 'woocommerce';
  platformLabel: string;
  status: 'connected' | 'disconnected' | 'error' | 'expired';
  accountName?: string;
  lastSyncAt?: string;
  errorMessage?: string;
}

// Subscription
export type PlanTier = 'free' | 'starter' | 'pro' | 'business' | 'enterprise';

export interface Subscription {
  plan: PlanTier;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  quotaSearchesUsed: number;
  quotaSearchesMax: number;
  quotaAdTestsUsed: number;
  quotaAdTestsMax: number;
  quotaExportsUsed: number;
  quotaExportsMax: number;
}

// Dashboard KPIs
export interface DashboardKPIs {
  marketsExplored: number;
  nichesTracked: number;
  productsAnalyzed: number;
  activeTests: number;
  totalSpend: number;
  totalRevenue: number;
  avgRoas: number;
  topNiche: string;
}

// Chart Data
export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

// Filter Options
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

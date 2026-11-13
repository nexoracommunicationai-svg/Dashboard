import { Market, Niche, Product, AdTest, AdTestMetricDay, FunnelDiagnostic, DashboardKPIs, ApiConnection, Subscription } from './types';

// ============================================
// DEMO DATA — Toutes les données sont marquées DEMO
// ============================================

const demoProvenance = (country?: string) => ({
  source: 'MarketPilot Demo',
  sourceUrl: undefined,
  collectionDate: '2026-11-01',
  country,
  method: 'demo' as const,
  confidenceLevel: 'estimated' as const,
  isVerified: false,
  isDemo: true,
});

// ============ MARKETS ============
export const demoMarkets: Market[] = [
  {
    id: 'm1', countryCode: 'FR', countryNameFr: 'France', countryNameEn: 'France',
    continent: 'Europe', flag: '🇫🇷', population: 68_042_591, gdpPerCapita: 43_659,
    purchasingPowerIndex: 82.3, internetPenetration: 92.6, ecommerceMarketSize: 146_900_000_000,
    ecommerceGrowthRate: 8.2, mainLanguages: ['Français'], mainCurrencies: ['EUR'],
    riskScore: 2.1, provenance: demoProvenance('FR'), isDemo: true,
  },
  {
    id: 'm2', countryCode: 'US', countryNameFr: 'États-Unis', countryNameEn: 'United States',
    continent: 'Amérique du Nord', flag: '🇺🇸', population: 334_914_895, gdpPerCapita: 76_329,
    purchasingPowerIndex: 95.0, internetPenetration: 92.0, ecommerceMarketSize: 1_137_000_000_000,
    ecommerceGrowthRate: 10.4, mainLanguages: ['Anglais'], mainCurrencies: ['USD'],
    riskScore: 1.8, provenance: demoProvenance('US'), isDemo: true,
  },
  {
    id: 'm3', countryCode: 'DE', countryNameFr: 'Allemagne', countryNameEn: 'Germany',
    continent: 'Europe', flag: '🇩🇪', population: 84_482_267, gdpPerCapita: 51_383,
    purchasingPowerIndex: 87.5, internetPenetration: 93.1, ecommerceMarketSize: 141_200_000_000,
    ecommerceGrowthRate: 7.8, mainLanguages: ['Allemand'], mainCurrencies: ['EUR'],
    riskScore: 1.9, provenance: demoProvenance('DE'), isDemo: true,
  },
  {
    id: 'm4', countryCode: 'GB', countryNameFr: 'Royaume-Uni', countryNameEn: 'United Kingdom',
    continent: 'Europe', flag: '🇬🇧', population: 67_736_802, gdpPerCapita: 46_371,
    purchasingPowerIndex: 84.2, internetPenetration: 96.8, ecommerceMarketSize: 169_000_000_000,
    ecommerceGrowthRate: 9.6, mainLanguages: ['Anglais'], mainCurrencies: ['GBP'],
    riskScore: 2.0, provenance: demoProvenance('GB'), isDemo: true,
  },
  {
    id: 'm5', countryCode: 'JP', countryNameFr: 'Japon', countryNameEn: 'Japan',
    continent: 'Asie', flag: '🇯🇵', population: 123_294_513, gdpPerCapita: 33_815,
    purchasingPowerIndex: 78.6, internetPenetration: 93.3, ecommerceMarketSize: 165_200_000_000,
    ecommerceGrowthRate: 6.9, mainLanguages: ['Japonais'], mainCurrencies: ['JPY'],
    riskScore: 1.5, provenance: demoProvenance('JP'), isDemo: true,
  },
  {
    id: 'm6', countryCode: 'CA', countryNameFr: 'Canada', countryNameEn: 'Canada',
    continent: 'Amérique du Nord', flag: '🇨🇦', population: 40_528_396, gdpPerCapita: 52_722,
    purchasingPowerIndex: 85.1, internetPenetration: 96.5, ecommerceMarketSize: 64_300_000_000,
    ecommerceGrowthRate: 11.2, mainLanguages: ['Anglais', 'Français'], mainCurrencies: ['CAD'],
    riskScore: 1.7, provenance: demoProvenance('CA'), isDemo: true,
  },
  {
    id: 'm7', countryCode: 'AU', countryNameFr: 'Australie', countryNameEn: 'Australia',
    continent: 'Océanie', flag: '🇦🇺', population: 26_723_700, gdpPerCapita: 64_491,
    purchasingPowerIndex: 88.4, internetPenetration: 96.2, ecommerceMarketSize: 47_800_000_000,
    ecommerceGrowthRate: 12.1, mainLanguages: ['Anglais'], mainCurrencies: ['AUD'],
    riskScore: 1.6, provenance: demoProvenance('AU'), isDemo: true,
  },
  {
    id: 'm8', countryCode: 'BR', countryNameFr: 'Brésil', countryNameEn: 'Brazil',
    continent: 'Amérique du Sud', flag: '🇧🇷', population: 216_422_446, gdpPerCapita: 8_917,
    purchasingPowerIndex: 48.2, internetPenetration: 84.3, ecommerceMarketSize: 62_100_000_000,
    ecommerceGrowthRate: 18.5, mainLanguages: ['Portugais'], mainCurrencies: ['BRL'],
    riskScore: 4.2, provenance: demoProvenance('BR'), isDemo: true,
  },
  {
    id: 'm9', countryCode: 'AE', countryNameFr: 'Émirats Arabes Unis', countryNameEn: 'United Arab Emirates',
    continent: 'Asie', flag: '🇦🇪', population: 9_441_129, gdpPerCapita: 49_451,
    purchasingPowerIndex: 91.0, internetPenetration: 99.1, ecommerceMarketSize: 28_600_000_000,
    ecommerceGrowthRate: 22.3, mainLanguages: ['Arabe', 'Anglais'], mainCurrencies: ['AED'],
    riskScore: 2.5, provenance: demoProvenance('AE'), isDemo: true,
  },
  {
    id: 'm10', countryCode: 'SN', countryNameFr: 'Sénégal', countryNameEn: 'Senegal',
    continent: 'Afrique', flag: '🇸🇳', population: 18_384_660, gdpPerCapita: 1_606,
    purchasingPowerIndex: 22.1, internetPenetration: 58.2, ecommerceMarketSize: 890_000_000,
    ecommerceGrowthRate: 35.6, mainLanguages: ['Français', 'Wolof'], mainCurrencies: ['XOF'],
    riskScore: 5.8, provenance: demoProvenance('SN'), isDemo: true,
  },
  {
    id: 'm11', countryCode: 'MA', countryNameFr: 'Maroc', countryNameEn: 'Morocco',
    continent: 'Afrique', flag: '🇲🇦', population: 37_840_044, gdpPerCapita: 3_795,
    purchasingPowerIndex: 35.7, internetPenetration: 88.1, ecommerceMarketSize: 3_200_000_000,
    ecommerceGrowthRate: 28.4, mainLanguages: ['Arabe', 'Français'], mainCurrencies: ['MAD'],
    riskScore: 4.0, provenance: demoProvenance('MA'), isDemo: true,
  },
  {
    id: 'm12', countryCode: 'CI', countryNameFr: "Côte d'Ivoire", countryNameEn: 'Ivory Coast',
    continent: 'Afrique', flag: '🇨🇮', population: 28_873_034, gdpPerCapita: 2_486,
    purchasingPowerIndex: 25.3, internetPenetration: 45.2, ecommerceMarketSize: 620_000_000,
    ecommerceGrowthRate: 42.1, mainLanguages: ['Français'], mainCurrencies: ['XOF'],
    riskScore: 6.2, provenance: demoProvenance('CI'), isDemo: true,
  },
];

// ============ NICHES ============
export const demoNiches: Niche[] = [
  {
    id: 'n1', nameFr: 'Beauté & Soins naturels', nameEn: 'Natural Beauty & Skincare',
    slug: 'beaute-soins-naturels', category: 'Beauté', subcategory: 'Soins visage',
    demandScore: 9.2, competitionScore: 7.8, growthRate: 24.5,
    seasonalityPattern: { jan: 0.7, feb: 0.75, mar: 0.85, apr: 0.9, may: 0.95, jun: 0.85, jul: 0.8, aug: 0.75, sep: 0.9, oct: 0.95, nov: 1.0, dec: 1.0 },
    estimatedMarketSize: 18_500_000_000, profitabilityScore: 8.1, trendDirection: 'rising',
    topCountries: ['FR', 'US', 'DE', 'GB'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'n2', nameFr: 'Maison intelligente', nameEn: 'Smart Home',
    slug: 'maison-intelligente', category: 'Technologie', subcategory: 'Domotique',
    demandScore: 8.7, competitionScore: 6.5, growthRate: 31.2,
    seasonalityPattern: { jan: 0.6, feb: 0.65, mar: 0.7, apr: 0.75, may: 0.8, jun: 0.7, jul: 0.65, aug: 0.7, sep: 0.85, oct: 0.95, nov: 1.0, dec: 1.0 },
    estimatedMarketSize: 135_000_000_000, profitabilityScore: 7.5, trendDirection: 'rising',
    topCountries: ['US', 'DE', 'JP', 'GB'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'n3', nameFr: 'Fitness & Bien-être', nameEn: 'Fitness & Wellness',
    slug: 'fitness-bien-etre', category: 'Sport', subcategory: 'Équipement',
    demandScore: 8.9, competitionScore: 8.2, growthRate: 15.8,
    seasonalityPattern: { jan: 1.0, feb: 0.95, mar: 0.9, apr: 0.85, may: 0.85, jun: 0.9, jul: 0.8, aug: 0.75, sep: 0.9, oct: 0.85, nov: 0.8, dec: 0.7 },
    estimatedMarketSize: 96_000_000_000, profitabilityScore: 7.8, trendDirection: 'stable',
    topCountries: ['US', 'GB', 'AU', 'CA'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'n4', nameFr: 'Accessoires pour animaux', nameEn: 'Pet Accessories',
    slug: 'accessoires-animaux', category: 'Animaux', subcategory: 'Accessoires',
    demandScore: 9.0, competitionScore: 6.8, growthRate: 19.3,
    seasonalityPattern: { jan: 0.8, feb: 0.85, mar: 0.9, apr: 0.9, may: 0.9, jun: 0.85, jul: 0.85, aug: 0.85, sep: 0.9, oct: 0.9, nov: 0.95, dec: 1.0 },
    estimatedMarketSize: 32_000_000_000, profitabilityScore: 8.5, trendDirection: 'rising',
    topCountries: ['US', 'FR', 'DE', 'GB'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'n5', nameFr: 'Mode éco-responsable', nameEn: 'Sustainable Fashion',
    slug: 'mode-eco-responsable', category: 'Mode', subcategory: 'Vêtements',
    demandScore: 8.4, competitionScore: 5.9, growthRate: 28.7,
    seasonalityPattern: { jan: 0.7, feb: 0.75, mar: 0.9, apr: 0.95, may: 0.9, jun: 0.8, jul: 0.7, aug: 0.75, sep: 0.95, oct: 1.0, nov: 1.0, dec: 0.85 },
    estimatedMarketSize: 8_200_000_000, profitabilityScore: 7.2, trendDirection: 'rising',
    topCountries: ['FR', 'DE', 'GB', 'CA'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'n6', nameFr: 'Cuisine & Ustensiles innovants', nameEn: 'Innovative Kitchen Tools',
    slug: 'cuisine-ustensiles', category: 'Maison', subcategory: 'Cuisine',
    demandScore: 7.8, competitionScore: 5.5, growthRate: 12.4,
    seasonalityPattern: { jan: 0.7, feb: 0.7, mar: 0.8, apr: 0.85, may: 0.9, jun: 0.85, jul: 0.8, aug: 0.75, sep: 0.85, oct: 0.9, nov: 1.0, dec: 1.0 },
    estimatedMarketSize: 22_500_000_000, profitabilityScore: 8.0, trendDirection: 'stable',
    topCountries: ['US', 'FR', 'JP', 'DE'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'n7', nameFr: 'Jouets éducatifs', nameEn: 'Educational Toys',
    slug: 'jouets-educatifs', category: 'Enfants', subcategory: 'Jouets',
    demandScore: 8.5, competitionScore: 6.2, growthRate: 16.7,
    seasonalityPattern: { jan: 0.6, feb: 0.5, mar: 0.6, apr: 0.65, may: 0.7, jun: 0.75, jul: 0.7, aug: 0.8, sep: 0.85, oct: 0.9, nov: 1.0, dec: 1.0 },
    estimatedMarketSize: 42_000_000_000, profitabilityScore: 7.9, trendDirection: 'rising',
    topCountries: ['US', 'GB', 'DE', 'FR'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'n8', nameFr: 'Mobilier minimaliste', nameEn: 'Minimalist Furniture',
    slug: 'mobilier-minimaliste', category: 'Maison', subcategory: 'Mobilier',
    demandScore: 7.6, competitionScore: 5.8, growthRate: 14.2,
    seasonalityPattern: { jan: 0.7, feb: 0.75, mar: 0.85, apr: 0.9, may: 0.95, jun: 0.9, jul: 0.8, aug: 0.85, sep: 0.95, oct: 0.9, nov: 0.85, dec: 0.8 },
    estimatedMarketSize: 68_000_000_000, profitabilityScore: 6.8, trendDirection: 'stable',
    topCountries: ['DE', 'JP', 'US', 'FR'], provenance: demoProvenance(), isDemo: true,
  },
];

// ============ PRODUCTS ============
export const demoProducts: Product[] = [
  {
    id: 'p1', nameFr: 'Sérum Vitamine C Bio', nameEn: 'Organic Vitamin C Serum',
    slug: 'serum-vitamine-c-bio', nicheId: 'n1', nicheName: 'Beauté & Soins naturels',
    descriptionFr: 'Sérum concentré à la vitamine C biologique pour un teint éclatant et uniforme. Formule vegan, sans parabènes.',
    descriptionEn: 'Concentrated organic vitamin C serum for radiant, even skin tone. Vegan, paraben-free formula.',
    imageUrl: '/products/serum.jpg', sellingPriceMin: 24.90, sellingPriceMax: 34.90,
    costPriceMin: 3.20, costPriceMax: 5.80, estimatedMarginPercent: 72,
    shippingCostEstimate: 3.50, weightGrams: 120, opportunityScore: 9.1,
    trendData: [
      { month: 'Jan', interest: 65 }, { month: 'Fév', interest: 70 }, { month: 'Mar', interest: 78 },
      { month: 'Avr', interest: 85 }, { month: 'Mai', interest: 82 }, { month: 'Jun', interest: 88 },
      { month: 'Jul', interest: 75 }, { month: 'Aoû', interest: 72 }, { month: 'Sep', interest: 90 },
      { month: 'Oct', interest: 95 }, { month: 'Nov', interest: 100 }, { month: 'Déc', interest: 92 },
    ],
    tags: ['bio', 'vegan', 'anti-âge', 'tendance'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'p2', nameFr: 'Lampe LED Intelligente RGB', nameEn: 'Smart RGB LED Lamp',
    slug: 'lampe-led-intelligente', nicheId: 'n2', nicheName: 'Maison intelligente',
    descriptionFr: 'Lampe LED connectée avec 16 millions de couleurs, contrôle vocal Alexa/Google, programmable via app.',
    descriptionEn: 'Connected LED lamp with 16 million colors, Alexa/Google voice control, app programmable.',
    imageUrl: '/products/lamp.jpg', sellingPriceMin: 29.90, sellingPriceMax: 49.90,
    costPriceMin: 8.50, costPriceMax: 14.20, estimatedMarginPercent: 62,
    shippingCostEstimate: 4.50, weightGrams: 350, opportunityScore: 8.4,
    trendData: [
      { month: 'Jan', interest: 55 }, { month: 'Fév', interest: 58 }, { month: 'Mar', interest: 62 },
      { month: 'Avr', interest: 60 }, { month: 'Mai', interest: 65 }, { month: 'Jun', interest: 58 },
      { month: 'Jul', interest: 52 }, { month: 'Aoû', interest: 55 }, { month: 'Sep', interest: 70 },
      { month: 'Oct', interest: 82 }, { month: 'Nov', interest: 95 }, { month: 'Déc', interest: 100 },
    ],
    tags: ['connecté', 'LED', 'domotique', 'design'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'p3', nameFr: 'Bandes de Résistance Élastiques Pro', nameEn: 'Pro Resistance Bands Set',
    slug: 'bandes-resistance-pro', nicheId: 'n3', nicheName: 'Fitness & Bien-être',
    descriptionFr: 'Kit complet de 5 bandes de résistance avec poignées, ancre de porte et sac de transport. 5 niveaux de résistance.',
    descriptionEn: 'Complete 5-band resistance set with handles, door anchor and carry bag. 5 resistance levels.',
    imageUrl: '/products/bands.jpg', sellingPriceMin: 19.90, sellingPriceMax: 29.90,
    costPriceMin: 4.20, costPriceMax: 7.50, estimatedMarginPercent: 68,
    shippingCostEstimate: 3.80, weightGrams: 480, opportunityScore: 7.8,
    trendData: [
      { month: 'Jan', interest: 100 }, { month: 'Fév', interest: 90 }, { month: 'Mar', interest: 80 },
      { month: 'Avr', interest: 72 }, { month: 'Mai', interest: 75 }, { month: 'Jun', interest: 82 },
      { month: 'Jul', interest: 70 }, { month: 'Aoû', interest: 65 }, { month: 'Sep', interest: 85 },
      { month: 'Oct', interest: 78 }, { month: 'Nov', interest: 72 }, { month: 'Déc', interest: 68 },
    ],
    tags: ['sport', 'musculation', 'portable', 'débutant'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'p4', nameFr: 'Fontaine à eau pour chat', nameEn: 'Cat Water Fountain',
    slug: 'fontaine-eau-chat', nicheId: 'n4', nicheName: 'Accessoires pour animaux',
    descriptionFr: 'Fontaine à eau automatique 2.5L avec filtration triple, ultra silencieuse, LED indicateur de niveau.',
    descriptionEn: '2.5L automatic water fountain with triple filtration, ultra quiet, LED level indicator.',
    imageUrl: '/products/fountain.jpg', sellingPriceMin: 24.90, sellingPriceMax: 39.90,
    costPriceMin: 6.50, costPriceMax: 11.80, estimatedMarginPercent: 65,
    shippingCostEstimate: 5.20, weightGrams: 620, opportunityScore: 8.7,
    trendData: [
      { month: 'Jan', interest: 72 }, { month: 'Fév', interest: 75 }, { month: 'Mar', interest: 80 },
      { month: 'Avr', interest: 82 }, { month: 'Mai', interest: 78 }, { month: 'Jun', interest: 85 },
      { month: 'Jul', interest: 88 }, { month: 'Aoû', interest: 90 }, { month: 'Sep', interest: 85 },
      { month: 'Oct', interest: 88 }, { month: 'Nov', interest: 92 }, { month: 'Déc', interest: 100 },
    ],
    tags: ['chat', 'automatique', 'santé', 'silencieux'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'p5', nameFr: 'T-shirt en coton bio recyclé', nameEn: 'Recycled Organic Cotton T-shirt',
    slug: 'tshirt-coton-bio-recycle', nicheId: 'n5', nicheName: 'Mode éco-responsable',
    descriptionFr: 'T-shirt unisexe en coton biologique 100% recyclé, teinture naturelle, coupe moderne.',
    descriptionEn: '100% recycled organic cotton unisex t-shirt, natural dye, modern fit.',
    imageUrl: '/products/tshirt.jpg', sellingPriceMin: 29.90, sellingPriceMax: 39.90,
    costPriceMin: 5.80, costPriceMax: 9.20, estimatedMarginPercent: 70,
    shippingCostEstimate: 3.20, weightGrams: 200, opportunityScore: 7.5,
    trendData: [
      { month: 'Jan', interest: 55 }, { month: 'Fév', interest: 60 }, { month: 'Mar', interest: 75 },
      { month: 'Avr', interest: 85 }, { month: 'Mai', interest: 90 }, { month: 'Jun', interest: 82 },
      { month: 'Jul', interest: 70 }, { month: 'Aoû', interest: 68 }, { month: 'Sep', interest: 88 },
      { month: 'Oct', interest: 95 }, { month: 'Nov', interest: 100 }, { month: 'Déc', interest: 78 },
    ],
    tags: ['éco', 'bio', 'recyclé', 'unisexe'], provenance: demoProvenance(), isDemo: true,
  },
  {
    id: 'p6', nameFr: 'Coupe-légumes multifonction', nameEn: 'Multifunctional Vegetable Chopper',
    slug: 'coupe-legumes-multifonction', nicheId: 'n6', nicheName: 'Cuisine & Ustensiles innovants',
    descriptionFr: 'Coupe-légumes 14 en 1 avec 8 lames interchangeables, bac récupérateur et égouttoir intégré.',
    descriptionEn: '14-in-1 vegetable chopper with 8 interchangeable blades, collection tray and built-in strainer.',
    imageUrl: '/products/chopper.jpg', sellingPriceMin: 19.90, sellingPriceMax: 34.90,
    costPriceMin: 4.50, costPriceMax: 8.90, estimatedMarginPercent: 68,
    shippingCostEstimate: 4.80, weightGrams: 780, opportunityScore: 8.2,
    trendData: [
      { month: 'Jan', interest: 65 }, { month: 'Fév', interest: 62 }, { month: 'Mar', interest: 70 },
      { month: 'Avr', interest: 75 }, { month: 'Mai', interest: 78 }, { month: 'Jun', interest: 72 },
      { month: 'Jul', interest: 68 }, { month: 'Aoû', interest: 65 }, { month: 'Sep', interest: 78 },
      { month: 'Oct', interest: 85 }, { month: 'Nov', interest: 95 }, { month: 'Déc', interest: 100 },
    ],
    tags: ['cuisine', 'multifonction', 'gain de temps', 'viral'], provenance: demoProvenance(), isDemo: true,
  },
];

// ============ AD TESTS ============
function generateMetrics(days: number, baseSpend: number): AdTestMetricDay[] {
  const metrics: AdTestMetricDay[] = [];
  const startDate = new Date('2026-10-15');
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const spend = baseSpend * (0.85 + Math.random() * 0.3);
    const impressions = Math.round(spend / (8 + Math.random() * 6) * 1000);
    const clicks = Math.round(impressions * (0.015 + Math.random() * 0.025));
    const visits = Math.round(clicks * (0.75 + Math.random() * 0.2));
    const addToCart = Math.round(visits * (0.04 + Math.random() * 0.08));
    const checkouts = Math.round(addToCart * (0.35 + Math.random() * 0.3));
    const orders = Math.round(checkouts * (0.6 + Math.random() * 0.3));
    const payments = Math.round(orders * (0.85 + Math.random() * 0.15));
    const deliveries = Math.round(payments * (0.9 + Math.random() * 0.1));
    const revenue = payments * (24.90 + Math.random() * 10);
    metrics.push({
      date: date.toISOString().split('T')[0],
      spend: Math.round(spend * 100) / 100,
      impressions,
      cpm: Math.round((spend / impressions) * 1000 * 100) / 100,
      clicks,
      ctr: Math.round((clicks / impressions) * 100 * 1000) / 1000,
      cpc: Math.round((spend / clicks) * 100) / 100,
      videoViews: Math.round(impressions * 0.3),
      visits,
      addToCart,
      checkouts,
      orders,
      payments,
      deliveries,
      revenue: Math.round(revenue * 100) / 100,
      conversionRate: visits > 0 ? Math.round((orders / visits) * 100 * 100) / 100 : 0,
      cartRate: visits > 0 ? Math.round((addToCart / visits) * 100 * 100) / 100 : 0,
      cac: orders > 0 ? Math.round((spend / orders) * 100) / 100 : 0,
      roas: spend > 0 ? Math.round((revenue / spend) * 100) / 100 : 0,
      netProfit: Math.round((revenue - spend - orders * 12) * 100) / 100,
      dataSource: 'demo',
      isDemo: true,
    });
  }
  return metrics;
}

export const demoAdTests: AdTest[] = [
  {
    id: 'at1', name: 'Test Sérum Vitamine C — France', status: 'running',
    productId: 'p1', productName: 'Sérum Vitamine C Bio', targetCountry: 'FR',
    sellingPrice: 29.90, productCost: 4.50, shippingCost: 3.50,
    paymentFeesPercent: 3.5, otherCosts: 1.00, dailyBudget: 30, totalBudget: 420,
    durationDays: 14, startDate: '2026-10-15', endDate: '2026-10-29',
    adPlatform: 'meta', adAccountConnected: false, shopPlatform: 'shopify', shopConnected: false,
    breakevenRoas: 1.44, maxCac: 20.85, netMarginPerUnit: 20.85,
    creatives: [
      { id: 'c1', name: 'UGC Témoignage', type: 'video', mediaUrl: '', headline: 'Ma peau a changé en 7 jours', hookType: 'Témoignage', isDemo: true },
      { id: 'c2', name: 'Avant/Après', type: 'image', mediaUrl: '', headline: 'Résultats visibles dès la 1ère semaine', hookType: 'Transformation', isDemo: true },
      { id: 'c3', name: 'Unboxing ASMR', type: 'video', mediaUrl: '', headline: 'Le sérum qui affole TikTok', hookType: 'Curiosité', isDemo: true },
    ],
    metrics: generateMetrics(14, 30),
    isDemo: true,
  },
  {
    id: 'at2', name: 'Test Lampe LED — Allemagne', status: 'completed',
    productId: 'p2', productName: 'Lampe LED Intelligente RGB', targetCountry: 'DE',
    sellingPrice: 39.90, productCost: 11.50, shippingCost: 4.50,
    paymentFeesPercent: 3.5, otherCosts: 1.50, dailyBudget: 25, totalBudget: 175,
    durationDays: 7, startDate: '2026-10-01', endDate: '2026-10-08',
    adPlatform: 'meta', adAccountConnected: false, shopPlatform: 'shopify', shopConnected: false,
    breakevenRoas: 1.83, maxCac: 21.01, netMarginPerUnit: 21.01,
    creatives: [
      { id: 'c4', name: 'Room Tour RGB', type: 'video', mediaUrl: '', headline: 'Transforme ta chambre en 1 clic', hookType: 'Lifestyle', isDemo: true },
      { id: 'c5', name: 'Demo App', type: 'video', mediaUrl: '', headline: '16M de couleurs, ta créativité', hookType: 'Démonstration', isDemo: true },
    ],
    metrics: generateMetrics(7, 25),
    isDemo: true,
  },
  {
    id: 'at3', name: 'Test Fontaine Chat — Canada', status: 'draft',
    productId: 'p4', productName: 'Fontaine à eau pour chat', targetCountry: 'CA',
    sellingPrice: 34.90, productCost: 9.20, shippingCost: 5.20,
    paymentFeesPercent: 3.5, otherCosts: 1.00, dailyBudget: 20, totalBudget: 280,
    durationDays: 14, startDate: '', endDate: '',
    adPlatform: null, adAccountConnected: false, shopPlatform: null, shopConnected: false,
    breakevenRoas: 1.82, maxCac: 18.28, netMarginPerUnit: 18.28,
    creatives: [],
    metrics: [],
    isDemo: true,
  },
];

// ============ DIAGNOSTICS ============
export const demoDiagnostics: FunnelDiagnostic[] = [
  {
    step: 'impression', stepLabel: 'Impressions', status: 'healthy',
    metricName: 'CPM', metricValue: 9.42, benchmarkValue: 10.00, deviationPercent: -5.8,
    analysis: 'Le CPM est inférieur au benchmark. Votre ciblage est efficace et le coût d\'acquisition d\'attention est bon.',
    probableCauses: ['Ciblage bien défini', 'Audience large disponible'],
    isCorrelation: false,
    recommendation: 'Continuez avec ce ciblage. Envisagez d\'élargir légèrement l\'audience pour augmenter le volume.',
    priority: 5, action: 'continue', missingData: [],
  },
  {
    step: 'click', stepLabel: 'Clics', status: 'warning',
    metricName: 'CTR', metricValue: 1.35, benchmarkValue: 2.00, deviationPercent: -32.5,
    analysis: 'Le CTR est en-dessous du benchmark. Les créations n\'incitent pas assez au clic.',
    probableCauses: ['Hook insuffisamment accrocheur', 'Visuel peu différenciant', 'CTA pas assez visible'],
    isCorrelation: true,
    recommendation: 'Testez de nouveaux hooks dans les 3 premières secondes de vos vidéos. Essayez un format UGC avec un témoignage client.',
    priority: 2, action: 'modify', missingData: ['Données de hook rate (3s views)'],
  },
  {
    step: 'cart', stepLabel: 'Panier', status: 'healthy',
    metricName: 'Taux d\'ajout au panier', metricValue: 6.8, benchmarkValue: 5.0, deviationPercent: 36.0,
    analysis: 'Le taux d\'ajout au panier est au-dessus du benchmark. La page produit convertit bien.',
    probableCauses: ['Page produit convaincante', 'Prix perçu comme attractif'],
    isCorrelation: false,
    recommendation: 'La page produit fonctionne. Concentrez vos efforts sur les étapes précédentes (CTR) pour augmenter le volume.',
    priority: 4, action: 'continue', missingData: [],
  },
  {
    step: 'checkout', stepLabel: 'Checkout', status: 'critical',
    metricName: 'Taux de checkout', metricValue: 28.5, benchmarkValue: 50.0, deviationPercent: -43.0,
    analysis: 'Le taux de passage du panier au checkout est critique. Beaucoup de visiteurs abandonnent après avoir ajouté au panier.',
    probableCauses: ['Frais de livraison découverts tard', 'Options de paiement limitées', 'Processus de checkout trop long', 'Absence de garantie/retour'],
    isCorrelation: true,
    recommendation: 'Affichez les frais de livraison plus tôt. Ajoutez des badges de confiance et une garantie satisfait ou remboursé visible. Simplifiez le checkout.',
    priority: 1, action: 'modify', missingData: ['Heatmap de la page panier', 'Données de session recording'],
  },
  {
    step: 'profitability', stepLabel: 'Rentabilité', status: 'warning',
    metricName: 'ROAS', metricValue: 1.82, benchmarkValue: 3.00, deviationPercent: -39.3,
    analysis: 'Le ROAS est au-dessus du seuil de rentabilité (1.44) mais en-dessous du benchmark optimal. La campagne est rentable mais faiblement.',
    probableCauses: ['CTR faible augmentant le CPC', 'Taux de checkout bas réduisant les conversions finales'],
    isCorrelation: true,
    recommendation: 'Optimisez le CTR et le checkout rate en priorité. Si ces métriques s\'améliorent, le ROAS devrait atteindre l\'objectif de 3x.',
    priority: 2, action: 'modify', missingData: ['Données de marge nette réelle après retours'],
  },
];

// ============ DASHBOARD KPIs ============
export const demoDashboardKPIs: DashboardKPIs = {
  marketsExplored: 12,
  nichesTracked: 8,
  productsAnalyzed: 6,
  activeTests: 1,
  totalSpend: 595,
  totalRevenue: 1082.60,
  avgRoas: 1.82,
  topNiche: 'Beauté & Soins naturels',
};

// ============ API CONNECTIONS ============
export const demoApiConnections: ApiConnection[] = [
  { id: 'ac1', platform: 'meta', platformLabel: 'Meta Ads', status: 'disconnected' },
  { id: 'ac2', platform: 'tiktok', platformLabel: 'TikTok Ads', status: 'disconnected' },
  { id: 'ac3', platform: 'shopify', platformLabel: 'Shopify', status: 'disconnected' },
  { id: 'ac4', platform: 'woocommerce', platformLabel: 'WooCommerce', status: 'disconnected' },
];

// ============ SUBSCRIPTION ============
export const demoSubscription: Subscription = {
  plan: 'free',
  status: 'active',
  quotaSearchesUsed: 3,
  quotaSearchesMax: 10,
  quotaAdTestsUsed: 1,
  quotaAdTestsMax: 1,
  quotaExportsUsed: 0,
  quotaExportsMax: 5,
};

// ============ CHART DATA ============
export const demoRevenueChart = [
  { name: 'Sem 1', revenue: 245.80, spend: 180, profit: 32.40 },
  { name: 'Sem 2', revenue: 312.50, spend: 210, profit: 48.20 },
  { name: 'Sem 3', revenue: 289.30, spend: 195, profit: 41.80 },
  { name: 'Sem 4', revenue: 235.00, spend: 165, profit: 28.60 },
];

export const demoTrafficSources = [
  { name: 'Meta Ads', value: 62 },
  { name: 'TikTok Ads', value: 24 },
  { name: 'Organique', value: 8 },
  { name: 'Direct', value: 6 },
];

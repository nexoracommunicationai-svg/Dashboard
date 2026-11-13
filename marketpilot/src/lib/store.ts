import { create } from 'zustand';
import { Market, Niche, Product, AdTest, FunnelDiagnostic, DashboardKPIs, ApiConnection, Subscription } from './types';
import {
  demoMarkets,
  demoNiches,
  demoProducts,
  demoAdTests,
  demoDiagnostics,
  demoDashboardKPIs,
  demoApiConnections,
  demoSubscription,
} from './demo-data';

export type ActiveTab = 'dashboard' | 'markets' | 'niches' | 'products' | 'adtests' | 'diagnostics' | 'settings';
export type Currency = 'EUR' | 'USD' | 'GBP' | 'XOF' | 'CAD';

interface AppState {
  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  currencyRate: Record<Currency, number>;
  currencySymbol: Record<Currency, string>;

  // Data
  markets: Market[];
  niches: Niche[];
  products: Product[];
  adTests: AdTest[];
  diagnostics: FunnelDiagnostic[];
  kpis: DashboardKPIs;
  apiConnections: ApiConnection[];
  subscription: Subscription;

  // Filters & Selected State
  marketContinentFilter: string;
  setMarketContinentFilter: (continent: string) => void;
  marketSearchQuery: string;
  setMarketSearchQuery: (query: string) => void;
  selectedMarket: Market | null;
  setSelectedMarket: (market: Market | null) => void;

  nicheCategoryFilter: string;
  setNicheCategoryFilter: (cat: string) => void;
  nicheSearchQuery: string;
  setNicheSearchQuery: (q: string) => void;
  selectedNiche: Niche | null;
  setSelectedNiche: (niche: Niche | null) => void;

  productSearchQuery: string;
  setProductSearchQuery: (q: string) => void;
  productNicheFilter: string;
  setProductNicheFilter: (nicheId: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  adTestFilter: 'all' | 'running' | 'completed' | 'draft';
  setAdTestFilter: (filter: 'all' | 'running' | 'completed' | 'draft') => void;
  selectedAdTest: AdTest | null;
  setSelectedAdTest: (test: AdTest | null) => void;

  // Actions
  createAdTest: (newTest: Omit<AdTest, 'id' | 'metrics' | 'creatives' | 'isDemo'>) => void;
  toggleAdTestStatus: (id: string) => void;
  deleteAdTest: (id: string) => void;
  toggleApiConnection: (id: string) => void;
  prefillAdTestFromProduct: (product: Product) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  prefilledProduct: Product | null;
  setPrefilledProduct: (p: Product | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  currency: 'EUR',
  setCurrency: (currency) => set({ currency }),
  currencyRate: {
    EUR: 1,
    USD: 1.08,
    GBP: 0.85,
    XOF: 655.95,
    CAD: 1.48,
  },
  currencySymbol: {
    EUR: '€',
    USD: '$',
    GBP: '£',
    XOF: 'FCFA',
    CAD: 'CA$',
  },

  markets: demoMarkets,
  niches: demoNiches,
  products: demoProducts,
  adTests: demoAdTests,
  diagnostics: demoDiagnostics,
  kpis: demoDashboardKPIs,
  apiConnections: demoApiConnections,
  subscription: demoSubscription,

  marketContinentFilter: 'all',
  setMarketContinentFilter: (continent) => set({ marketContinentFilter: continent }),
  marketSearchQuery: '',
  setMarketSearchQuery: (query) => set({ marketSearchQuery: query }),
  selectedMarket: null,
  setSelectedMarket: (market) => set({ selectedMarket: market }),

  nicheCategoryFilter: 'all',
  setNicheCategoryFilter: (cat) => set({ nicheCategoryFilter: cat }),
  nicheSearchQuery: '',
  setNicheSearchQuery: (q) => set({ nicheSearchQuery: q }),
  selectedNiche: null,
  setSelectedNiche: (niche) => set({ selectedNiche: niche }),

  productSearchQuery: '',
  setProductSearchQuery: (q) => set({ productSearchQuery: q }),
  productNicheFilter: 'all',
  setProductNicheFilter: (nicheId) => set({ productNicheFilter: nicheId }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  adTestFilter: 'all',
  setAdTestFilter: (filter) => set({ adTestFilter: filter }),
  selectedAdTest: demoAdTests[0] || null,
  setSelectedAdTest: (test) => set({ selectedAdTest: test }),

  isCreateModalOpen: false,
  setIsCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  prefilledProduct: null,
  setPrefilledProduct: (p) => set({ prefilledProduct: p }),

  createAdTest: (newTestData) => {
    const state = get();
    const id = `at_${Date.now()}`;
    const newTest: AdTest = {
      ...newTestData,
      id,
      creatives: [
        {
          id: `c_${Date.now()}_1`,
          name: 'Création Principale - Vidéo UGC',
          type: 'video',
          mediaUrl: '',
          headline: 'Découvrez la solution n°1',
          hookType: 'Preuve sociale',
          isDemo: true,
        },
      ],
      metrics: [],
      isDemo: true,
    };

    set({
      adTests: [newTest, ...state.adTests],
      kpis: {
        ...state.kpis,
        activeTests: newTest.status === 'running' ? state.kpis.activeTests + 1 : state.kpis.activeTests,
      },
      subscription: {
        ...state.subscription,
        quotaAdTestsUsed: Math.min(state.subscription.quotaAdTestsUsed + 1, state.subscription.quotaAdTestsMax),
      },
      selectedAdTest: newTest,
      isCreateModalOpen: false,
    });
  },

  toggleAdTestStatus: (id) => {
    const state = get();
    set({
      adTests: state.adTests.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'running' ? 'paused' : 'running';
          return { ...t, status: nextStatus };
        }
        return t;
      }),
    });
  },

  deleteAdTest: (id) => {
    const state = get();
    const filtered = state.adTests.filter((t) => t.id !== id);
    set({
      adTests: filtered,
      selectedAdTest: state.selectedAdTest?.id === id ? (filtered[0] || null) : state.selectedAdTest,
    });
  },

  toggleApiConnection: (id) => {
    const state = get();
    set({
      apiConnections: state.apiConnections.map((conn) => {
        if (conn.id === id) {
          const isConnected = conn.status === 'connected';
          return {
            ...conn,
            status: isConnected ? 'disconnected' : 'connected',
            accountName: isConnected ? undefined : `Compte Demo ${conn.platformLabel}`,
            lastSyncAt: isConnected ? undefined : new Date().toISOString(),
          };
        }
        return conn;
      }),
    });
  },

  prefillAdTestFromProduct: (product) => {
    set({
      activeTab: 'adtests',
      prefilledProduct: product,
      isCreateModalOpen: true,
    });
  },
}));

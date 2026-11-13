'use client';

import React from 'react';
import { useAppStore, ActiveTab } from '@/lib/store';
import {
  LayoutDashboard,
  Globe2,
  TrendingUp,
  Package,
  Target,
  Stethoscope,
  Settings2,
  Sparkles,
} from 'lucide-react';

interface NavItemDef {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export function Sidebar() {
  const { activeTab, setActiveTab, adTests, products, niches, markets } = useAppStore();

  const navItems: NavItemDef[] = [
    {
      id: 'dashboard',
      label: "Vue d'ensemble",
      icon: LayoutDashboard,
    },
    {
      id: 'markets',
      label: 'Marchés Internationaux',
      icon: Globe2,
      badge: `${markets.length}`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300',
    },
    {
      id: 'niches',
      label: 'Niches & Opportunités',
      icon: TrendingUp,
      badge: `${niches.length}`,
      badgeColor: 'bg-cyan-500/20 text-cyan-300',
    },
    {
      id: 'products',
      label: 'Produits Gagnants',
      icon: Package,
      badge: `${products.length}`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300',
    },
    {
      id: 'adtests',
      label: 'Simulateur & Tests Ads',
      icon: Target,
      badge: `${adTests.length}`,
      badgeColor: 'bg-purple-500/20 text-purple-300',
    },
    {
      id: 'diagnostics',
      label: 'Diagnostic Entonnoir',
      icon: Stethoscope,
      badge: 'Audit Live',
      badgeColor: 'bg-amber-500/20 text-amber-300 animate-pulse',
    },
    {
      id: 'settings',
      label: 'Intégrations & Quotas',
      icon: Settings2,
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950/60 flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Navigation list */}
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
          Navigation Principale
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-indigo-400 scale-110' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pro Callout Box */}
      <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/50 to-slate-900 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-2 -mt-2 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>MarketPilot Pro</span>
        </div>
        <p className="text-xs text-slate-300 mb-3">
          Débloquez l&apos;accès illimité aux flux d&apos;API Meta & TikTok en temps réel.
        </p>
        <button
          onClick={() => setActiveTab('settings')}
          className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-center text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Voir les fonctionnalités
        </button>
      </div>
    </aside>
  );
}

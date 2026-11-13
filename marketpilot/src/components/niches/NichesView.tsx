'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ProvenanceBadge } from '@/components/common/ProvenanceBadge';
import {
  Search,
  ArrowRight,
  BarChart2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export function NichesView() {
  const {
    niches,
    nicheCategoryFilter,
    setNicheCategoryFilter,
    nicheSearchQuery,
    setNicheSearchQuery,
    setProductNicheFilter,
    setActiveTab,
  } = useAppStore();

  const [trendFilter, setTrendFilter] = useState<'all' | 'rising' | 'stable' | 'declining'>('all');

  const categories = [
    'all',
    'Beauté',
    'Technologie',
    'Sport',
    'Animaux',
    'Mode',
    'Maison',
    'Enfants',
  ];

  const filteredNiches = niches.filter((n) => {
    const matchCat = nicheCategoryFilter === 'all' || n.category === nicheCategoryFilter;
    const matchTrend = trendFilter === 'all' || n.trendDirection === trendFilter;
    const matchQuery =
      n.nameFr.toLowerCase().includes(nicheSearchQuery.toLowerCase()) ||
      n.nameEn.toLowerCase().includes(nicheSearchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(nicheSearchQuery.toLowerCase());
    return matchCat && matchTrend && matchQuery;
  });

  const handleExploreProducts = (nicheId: string) => {
    setProductNicheFilter(nicheId);
    setActiveTab('products');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Niches & Tendances d&apos;Opportunité</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20">
              {filteredNiches.length} niches suivies
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Identifiez les secteurs à fort ratio demande/concurrence et analysez la saisonnalité avant d&apos;engager du budget publicitaire.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher une niche, catégorie..."
            value={nicheSearchQuery}
            onChange={(e) => setNicheSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setNicheCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                nicheCategoryFilter === cat
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? '✨ Toutes' : cat}
            </button>
          ))}
        </div>

        {/* Trend Filter */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTrendFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
              trendFilter === 'all'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Tous statuts
          </button>
          <button
            onClick={() => setTrendFilter('rising')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
              trendFilter === 'rising'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'text-slate-400 border-transparent hover:text-emerald-400'
            }`}
          >
            🔥 En hausse
          </button>
          <button
            onClick={() => setTrendFilter('stable')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
              trendFilter === 'stable'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'text-slate-400 border-transparent hover:text-blue-400'
            }`}
          >
            ⚡ Stable
          </button>
        </div>
      </div>

      {/* Niches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNiches.map((niche) => {
          const seasonalityData = Object.entries(niche.seasonalityPattern).map(([m, val]) => ({
            month: m.toUpperCase(),
            score: Math.round(val * 100),
          }));

          return (
            <div
              key={niche.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {niche.category} • {niche.subcategory}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-white">{niche.nameFr}</h3>
                    <span className="text-xs text-slate-500 italic">{niche.nameEn}</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full ${
                      niche.trendDirection === 'rising'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {niche.trendDirection === 'rising' ? '🔥 En hausse' : '⚡ Stable'}
                  </span>
                </div>

                {/* Score Meters */}
                <div className="mt-4 grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400">Demande</span>
                    <div className="text-sm font-bold text-cyan-400">{niche.demandScore} / 10</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Concurrence</span>
                    <div className="text-sm font-bold text-amber-400">{niche.competitionScore} / 10</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Rentabilité</span>
                    <div className="text-sm font-bold text-emerald-400">{niche.profitabilityScore} / 10</div>
                  </div>
                </div>

                {/* Seasonality Pattern Chart */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <BarChart2 className="w-3.5 h-3.5 text-slate-500" /> Profil de Saisonnalité (12 Mois)
                    </span>
                    <span className="text-emerald-400 font-semibold">+{niche.growthRate}%/an</span>
                  </div>
                  <div className="h-16 w-full bg-slate-950/40 rounded-lg p-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={seasonalityData}>
                        <defs>
                          <linearGradient id={`nicheGrad-${niche.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            fontSize: '11px',
                          }}
                          formatter={(v: number | string | readonly (number | string)[] | undefined) => [
                            `${v} pts`,
                            'Intérêt',
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#06b6d4"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill={`url(#nicheGrad-${niche.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Target Markets */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Marchés cibles recommandés:</span>
                  <div className="flex items-center gap-1">
                    {niche.topCountries.map((c) => (
                      <span
                        key={c}
                        className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <ProvenanceBadge provenance={niche.provenance} />

                <button
                  onClick={() => handleExploreProducts(niche.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-all"
                >
                  <span>Explorer les produits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/formatters';
import { ProvenanceBadge } from '@/components/common/ProvenanceBadge';
import {
  Search,
  Sparkles,
  TrendingUp,
  Truck,
  Plus,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export function ProductsView() {
  const {
    products,
    niches,
    productSearchQuery,
    setProductSearchQuery,
    productNicheFilter,
    setProductNicheFilter,
    currency,
    currencyRate,
    currencySymbol,
    prefillAdTestFromProduct,
  } = useAppStore();

  const rate = currencyRate[currency];
  const symbol = currencySymbol[currency];

  const filteredProducts = products.filter((p) => {
    const matchNiche = productNicheFilter === 'all' || p.nicheId === productNicheFilter;
    const matchQuery =
      p.nameFr.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(productSearchQuery.toLowerCase()));
    return matchNiche && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Catalogue des Produits Gagnants</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              {filteredProducts.length} produits scorés
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Produits validés par opportunité algorithmique: marges brutes confortables (&gt;60%), traction virale et faisabilité logistique.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher par mot-clé, tag, nom..."
            value={productSearchQuery}
            onChange={(e) => setProductSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Niche selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setProductNicheFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              productNicheFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Tous ({products.length})
          </button>
          {niches.map((niche) => (
            <button
              key={niche.id}
              onClick={() => setProductNicheFilter(niche.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                productNicheFilter === niche.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {niche.nameFr}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {product.nicheName}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-white">{product.nameFr}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{product.descriptionFr}</p>
                  </div>

                  {/* Opportunity badge */}
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{product.opportunityScore} / 10</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500">Score Opportunité</span>
                  </div>
                </div>

                {/* Economics Box */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/70 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Prix de vente conseillé:</span>
                    <span className="font-bold text-white">
                      {formatCurrency(product.sellingPriceMin, currency, rate, symbol)} –{' '}
                      {formatCurrency(product.sellingPriceMax, currency, rate, symbol)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Coût d&apos;achat fournisseur:</span>
                    <span className="font-semibold text-slate-300">
                      {formatCurrency(product.costPriceMin, currency, rate, symbol)} –{' '}
                      {formatCurrency(product.costPriceMax, currency, rate, symbol)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Marge brute estimée:</span>
                    <span className="font-bold text-emerald-400">~{product.estimatedMarginPercent}%</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-500" /> Frais expédition:
                    </span>
                    <span>~{formatCurrency(product.shippingCostEstimate, currency, rate, symbol)} ({product.weightGrams}g)</span>
                  </div>
                </div>

                {/* 12-Month Search Interest Trend */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-cyan-400" /> Tendance Google Search (12 mois)
                    </span>
                    <span className="text-cyan-400 font-semibold">Traction forte</span>
                  </div>
                  <div className="h-16 w-full bg-slate-950/40 rounded-lg p-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={product.trendData}>
                        <defs>
                          <linearGradient id={`prodGrad-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
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
                            `${v}/100`,
                            'Volume',
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="interest"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill={`url(#prodGrad-${product.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <ProvenanceBadge provenance={product.provenance} />

                <button
                  onClick={() => prefillAdTestFromProduct(product)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tester en Ad</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

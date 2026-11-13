'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Market } from '@/lib/types';
import { formatCurrency, formatCompactNumber } from '@/lib/formatters';
import { ProvenanceBadge } from '@/components/common/ProvenanceBadge';
import {
  Globe2,
  Search,
  ArrowUpDown,
  TrendingUp,
  ShieldAlert,
  Users,
  Wifi,
  CreditCard,
  Layers,
  X,
  Check,
} from 'lucide-react';

export function MarketsView() {
  const {
    markets,
    marketContinentFilter,
    setMarketContinentFilter,
    marketSearchQuery,
    setMarketSearchQuery,
    currency,
    currencyRate,
    currencySymbol,
  } = useAppStore();

  const rate = currencyRate[currency];
  const symbol = currencySymbol[currency];

  const [sortBy, setSortBy] = useState<'size' | 'growth' | 'purchasing' | 'risk'>('growth');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [comparingMarkets, setComparingMarkets] = useState<Market[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const continents = ['all', 'Europe', 'Amérique du Nord', 'Asie', 'Afrique', 'Amérique du Sud', 'Océanie'];

  // Filter & Sort
  const filteredMarkets = markets
    .filter((m) => {
      const matchContinent = marketContinentFilter === 'all' || m.continent === marketContinentFilter;
      const matchQuery =
        m.countryNameFr.toLowerCase().includes(marketSearchQuery.toLowerCase()) ||
        m.countryNameEn.toLowerCase().includes(marketSearchQuery.toLowerCase()) ||
        m.countryCode.toLowerCase().includes(marketSearchQuery.toLowerCase());
      return matchContinent && matchQuery;
    })
    .sort((a, b) => {
      let diff = 0;
      if (sortBy === 'size') diff = a.ecommerceMarketSize - b.ecommerceMarketSize;
      if (sortBy === 'growth') diff = a.ecommerceGrowthRate - b.ecommerceGrowthRate;
      if (sortBy === 'purchasing') diff = a.purchasingPowerIndex - b.purchasingPowerIndex;
      if (sortBy === 'risk') diff = a.riskScore - b.riskScore;
      return sortOrder === 'desc' ? -diff : diff;
    });

  const toggleCompare = (market: Market) => {
    if (comparingMarkets.some((m) => m.id === market.id)) {
      setComparingMarkets(comparingMarkets.filter((m) => m.id !== market.id));
    } else {
      if (comparingMarkets.length < 2) {
        setComparingMarkets([...comparingMarkets, market]);
      } else {
        // Replace second
        setComparingMarkets([comparingMarkets[0], market]);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Explorateur des Marchés Internationaux</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
              {filteredMarkets.length} marchés analysés
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Évaluez l&apos;attractivité e-commerce globale: maturité numérique, pouvoir d&apos;achat et vélocité de croissance.
          </p>
        </div>

        {/* Compare Trigger Button */}
        {comparingMarkets.length > 0 && (
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all animate-bounce"
          >
            <Layers className="w-4 h-4" />
            <span>Comparer {comparingMarkets.length} marché{comparingMarkets.length > 1 ? 's' : ''}</span>
          </button>
        )}
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher par pays, code ISO..."
            value={marketSearchQuery}
            onChange={(e) => setMarketSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Continents Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {continents.map((cont) => (
            <button
              key={cont}
              onClick={() => setMarketContinentFilter(cont)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                marketContinentFilter === cont
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cont === 'all' ? '🌍 Tous' : cont}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Trier:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'size' | 'growth' | 'purchasing' | 'risk')}
            className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 py-1.5 px-2.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="growth">Croissance E-commerce (%)</option>
            <option value="size">Taille de marché (€)</option>
            <option value="purchasing">Pouvoir d&apos;achat</option>
            <option value="risk">Risque pays</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs"
            title="Inverser l'ordre"
          >
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>

      {/* Markets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMarkets.map((market) => {
          const isComparing = comparingMarkets.some((m) => m.id === market.id);

          return (
            <div
              key={market.id}
              className={`p-5 rounded-2xl bg-slate-900/60 border transition-all hover:border-slate-700 shadow-lg relative ${
                isComparing ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-800/80'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={market.countryNameFr}>
                    {market.flag}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      {market.countryNameFr}
                      <span className="text-xs font-mono text-slate-500 font-normal">
                        ({market.countryCode})
                      </span>
                    </h3>
                    <span className="text-xs text-slate-400">{market.continent}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleCompare(market)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors flex items-center gap-1 ${
                    isComparing
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {isComparing ? (
                    <>
                      <Check className="w-3 h-3" /> Sélectionné
                    </>
                  ) : (
                    '+ Comparer'
                  )}
                </button>
              </div>

              {/* Primary Stats Highlighting */}
              <div className="mt-4 grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                <div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-cyan-400" /> Croissance
                  </span>
                  <div className="text-sm font-bold text-cyan-400">
                    +{market.ecommerceGrowthRate}% / an
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-emerald-400" /> Marché E-com
                  </span>
                  <div className="text-sm font-bold text-emerald-400">
                    {formatCurrency(market.ecommerceMarketSize, currency, rate, symbol)}
                  </div>
                </div>
              </div>

              {/* Detail Metrics Bars */}
              <div className="mt-4 space-y-3 text-xs">
                {/* Purchasing Power */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="text-slate-400">Indice Pouvoir d&apos;Achat</span>
                    <span className="font-semibold">{market.purchasingPowerIndex} / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${Math.min(market.purchasingPowerIndex, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Internet Penetration */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-slate-500" /> Pénétration Internet
                    </span>
                    <span className="font-semibold">{market.internetPenetration}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full"
                      style={{ width: `${market.internetPenetration}%` }}
                    />
                  </div>
                </div>

                {/* Population & GDP */}
                <div className="pt-2 flex justify-between border-t border-slate-800/60 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {formatCompactNumber(market.population)} hab.
                  </span>
                  <span>PIB: {formatCurrency(market.gdpPerCapita, currency, rate, symbol)} / hab</span>
                </div>
              </div>

              {/* Risk & Provenance Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldAlert
                    className={`w-3.5 h-3.5 ${
                      market.riskScore < 2.5
                        ? 'text-emerald-400'
                        : market.riskScore < 4.5
                        ? 'text-amber-400'
                        : 'text-red-400'
                    }`}
                  />
                  <span className="text-[11px] text-slate-300">
                    Risque pays:{' '}
                    <strong
                      className={
                        market.riskScore < 2.5
                          ? 'text-emerald-400'
                          : market.riskScore < 4.5
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }
                    >
                      {market.riskScore}/10
                    </strong>
                  </span>
                </div>

                <ProvenanceBadge provenance={market.provenance} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Country Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Comparatif de Marchés Internationaux</h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {comparingMarkets.length === 2 ? (
              <div className="mt-6 grid grid-cols-2 gap-6">
                {comparingMarkets.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                      <span className="text-3xl">{m.flag}</span>
                      <div>
                        <h4 className="text-base font-bold text-white">{m.countryNameFr}</h4>
                        <span className="text-xs text-slate-400">{m.continent}</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Croissance E-com</span>
                        <span className="font-bold text-cyan-400">+{m.ecommerceGrowthRate}% / an</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Volume E-commerce</span>
                        <span className="font-semibold text-emerald-400">
                          {formatCurrency(m.ecommerceMarketSize, currency, rate, symbol)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Pouvoir d&apos;achat</span>
                        <span className="font-semibold text-white">{m.purchasingPowerIndex} / 100</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Pénétration Internet</span>
                        <span className="font-semibold text-white">{m.internetPenetration}%</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Population</span>
                        <span className="font-semibold text-white">{formatCompactNumber(m.population)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Score de risque</span>
                        <span className="font-semibold text-amber-400">{m.riskScore} / 10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                Sélectionnez 2 marchés sur les cartes pour afficher le comparatif côte-à-côte.
              </p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

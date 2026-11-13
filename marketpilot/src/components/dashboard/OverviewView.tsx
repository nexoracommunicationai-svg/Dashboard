'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/formatters';
import { ProvenanceBadge } from '@/components/common/ProvenanceBadge';
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Target,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { demoRevenueChart, demoTrafficSources } from '@/lib/demo-data';

export function OverviewView() {
  const {
    kpis,
    currency,
    currencyRate,
    currencySymbol,
    adTests,
    niches,
    setActiveTab,
    setIsCreateModalOpen,
  } = useAppStore();

  const rate = currencyRate[currency];
  const symbol = currencySymbol[currency];

  const netProfit = kpis.totalRevenue - kpis.totalSpend;
  const netMarginPercent = Math.round((netProfit / kpis.totalRevenue) * 100);

  const TRAFFIC_COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Tableau de Bord Intelligence E-commerce
            </h1>
            <ProvenanceBadge />
          </div>
          <p className="text-sm text-slate-400">
            Surveillance des marchés à fort potentiel, validation de niches et simulation de tests d&apos;acquisition.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('diagnostics')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Audit Entonnoir Live
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simuler un Test</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spend */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Dépenses Publicitaires</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-white tracking-tight">
            {formatCurrency(kpis.totalSpend, currency, rate, symbol)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> 14 jours
            </span>
            <span>sur Meta & TikTok Ads</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Chiffre d&apos;Affaires</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 tracking-tight">
            {formatCurrency(kpis.totalRevenue, currency, rate, symbol)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">+{netMarginPercent}%</span>
            <span>marge brute consolidée</span>
          </div>
        </div>

        {/* Average ROAS */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">ROAS Moyen Global</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">{kpis.avgRoas.toFixed(2)}x</span>
            <span className="text-xs text-slate-400">/ Seuil 1.44x</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Campagnes actuellement rentables</span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Bénéfice Net Estimé</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-300 tracking-tight">
            {formatCurrency(netProfit, currency, rate, symbol)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Après COGS, pubs et passerelle</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evolution Revenue vs Spend */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Trajectoire Financière (4 Semaines)</h2>
              <p className="text-xs text-slate-400">Évolution du chiffre d&apos;affaires généré vs investissement publicitaire</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Revenus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-slate-300">Dépenses Ads</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoRevenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  formatter={(val: number | string | readonly (number | string)[] | undefined) => [
                    `${Number(val || 0).toFixed(2)} ${symbol}`,
                    '',
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#spendGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources & Channel Distribution */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Canaux d&apos;Acquisition</h2>
            <p className="text-xs text-slate-400 mb-4">Répartition du trafic e-commerce par source</p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demoTrafficSources} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(val: number | string | readonly (number | string)[] | undefined) => [
                      `${val}%`,
                      'Part de trafic',
                    ]}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {demoTrafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TRAFFIC_COLORS[index % TRAFFIC_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Canal Principal:</span>
              <span className="font-semibold text-indigo-400">Meta Ads (62%)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Meilleure Croissance:</span>
              <span className="font-semibold text-cyan-400">TikTok Ads (+24%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & Modules Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Test Spotlight */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">Campagne en cours</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 animate-pulse">
              EN COURS
            </span>
          </div>

          {adTests[0] ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-white">{adTests[0].name}</h4>
                <p className="text-xs text-slate-400">{adTests[0].productName} • Cible: France (FR)</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
                <div>
                  <span className="text-[10px] text-slate-400">Dépensé</span>
                  <div className="text-xs font-bold text-white">{adTests[0].totalBudget} €</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">ROAS</span>
                  <div className="text-xs font-bold text-emerald-400">1.82x</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Seuil Rentable</span>
                  <div className="text-xs font-bold text-amber-400">{adTests[0].breakevenRoas}x</div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('adtests')}
                className="w-full py-2 rounded-xl text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 transition-colors"
              >
                Gérer les créations & métriques →
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Aucun test actif actuellement.</p>
          )}
        </div>

        {/* Top Niches Radar */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Niches à Forte Demande</h3>
            </div>
            <button
              onClick={() => setActiveTab('niches')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Voir tout ({niches.length})
            </button>
          </div>

          <div className="space-y-3">
            {niches.slice(0, 3).map((niche) => (
              <div
                key={niche.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors cursor-pointer"
                onClick={() => setActiveTab('niches')}
              >
                <div>
                  <div className="text-xs font-medium text-white">{niche.nameFr}</div>
                  <div className="text-[10px] text-slate-400">{niche.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-cyan-400">+{niche.growthRate}%/an</div>
                  <div className="text-[10px] text-slate-500">Demande: {niche.demandScore}/10</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Alert Preview */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Point d&apos;Attention Entonnoir</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400">
              PRIORITÉ 1
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="text-xs font-semibold text-red-300">Taux de passage au Checkout (28.5%)</div>
              <p className="mt-1 text-[11px] text-slate-300">
                Chute de 43% par rapport au benchmark optimal (50%). Les visiteurs hésitent face aux frais de port.
              </p>
            </div>

            <p className="text-[11px] text-slate-400">
              💡 Recommandation: Affichez la livraison offerte ou précisez les délais dès la fiche produit.
            </p>

            <button
              onClick={() => setActiveTab('diagnostics')}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Consulter l&apos;audit complet (5 étapes) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

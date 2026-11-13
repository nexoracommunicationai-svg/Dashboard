'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { AdTest } from '@/lib/types';
import {
  Plus,
  Play,
  Pause,
  Trash2,
  Calculator,
  Film,
  X,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function AdTestsView() {
  const {
    adTests,
    adTestFilter,
    setAdTestFilter,
    toggleAdTestStatus,
    deleteAdTest,
    setIsCreateModalOpen,
  } = useAppStore();

  const [detailedTest, setDetailedTest] = useState<AdTest | null>(null);

  // Standalone Simulator Calculator State
  const [calcPrice, setCalcPrice] = useState(34.90);
  const [calcCogs, setCalcCogs] = useState(6.50);
  const [calcShip, setCalcShip] = useState(4.20);
  const [calcGateway, setCalcGateway] = useState(3.5);

  const calcGatewayAmount = (calcPrice * calcGateway) / 100;
  const calcNetMargin = Math.max(0, calcPrice - calcCogs - calcShip - calcGatewayAmount);
  const calcBreakeven = calcNetMargin > 0 ? Number((calcPrice / calcNetMargin).toFixed(2)) : 99;
  const calcMaxCac = Number(calcNetMargin.toFixed(2));
  const calcTargetRoas = Number((calcBreakeven * 1.5).toFixed(2));

  const filteredTests = adTests.filter((t) => {
    if (adTestFilter === 'all') return true;
    return t.status === adTestFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Simulateur & Tests Publicitaires</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20">
              {adTests.length} tests configurés
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Modélisez vos coûts avant diffusion, déterminez votre Breakeven ROAS et suivez vos créations UGC.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Nouveau Test Ad</span>
        </button>
      </div>

      {/* Real-time Breakeven & Unit Economics Calculator Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-4">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Calculator className="w-4 h-4 text-purple-400" />
            <span>Calculateur Rapide de Rentabilité Publicitaire (Breakeven ROAS)</span>
          </div>
          <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-full uppercase">
            Simulateur Dynamique
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-medium">Prix de Vente (€)</label>
            <input
              type="number"
              step="0.5"
              value={calcPrice}
              onChange={(e) => setCalcPrice(parseFloat(e.target.value) || 0)}
              className="mt-1.5 w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-slate-400 font-medium">Coût Produit COGS (€)</label>
            <input
              type="number"
              step="0.5"
              value={calcCogs}
              onChange={(e) => setCalcCogs(parseFloat(e.target.value) || 0)}
              className="mt-1.5 w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-slate-400 font-medium">Frais de Port (€)</label>
            <input
              type="number"
              step="0.5"
              value={calcShip}
              onChange={(e) => setCalcShip(parseFloat(e.target.value) || 0)}
              className="mt-1.5 w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-slate-400 font-medium">Frais Stripe/Passerelle (%)</label>
            <input
              type="number"
              step="0.1"
              value={calcGateway}
              onChange={(e) => setCalcGateway(parseFloat(e.target.value) || 0)}
              className="mt-1.5 w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Calculated Results */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/20">
            <span className="text-[10px] uppercase font-bold text-purple-300">Marge Nette/Commande</span>
            <div className="text-base font-bold text-white mt-0.5">{calcNetMargin.toFixed(2)} €</div>
            <span className="text-[10px] text-slate-500">
              {((calcNetMargin / calcPrice) * 100).toFixed(0)}% du prix
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] uppercase font-bold text-amber-300">Breakeven ROAS</span>
            <div className="text-base font-bold text-amber-400 mt-0.5">{calcBreakeven}x</div>
            <span className="text-[10px] text-slate-400">Seuil de perte / gain</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] uppercase font-bold text-emerald-300">CAC Maximum</span>
            <div className="text-base font-bold text-emerald-400 mt-0.5">{calcMaxCac} €</div>
            <span className="text-[10px] text-slate-400">Coût par commande max</span>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <span className="text-[10px] uppercase font-bold text-cyan-300">Objectif Target ROAS</span>
            <div className="text-base font-bold text-cyan-400 mt-0.5">{calcTargetRoas}x</div>
            <span className="text-[10px] text-slate-400">Marge nette saine (+33%)</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setAdTestFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            adTestFilter === 'all'
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tous ({adTests.length})
        </button>
        <button
          onClick={() => setAdTestFilter('running')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            adTestFilter === 'running'
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'text-slate-400 hover:text-emerald-400'
          }`}
        >
          En cours
        </button>
        <button
          onClick={() => setAdTestFilter('completed')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            adTestFilter === 'completed'
              ? 'bg-blue-500/20 text-blue-300'
              : 'text-slate-400 hover:text-blue-400'
          }`}
        >
          Terminés
        </button>
        <button
          onClick={() => setAdTestFilter('draft')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            adTestFilter === 'draft'
              ? 'bg-slate-800 text-slate-300'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Brouillons
        </button>
      </div>

      {/* Campaigns Listing */}
      <div className="space-y-4">
        {filteredTests.map((test) => {
          const hasMetrics = test.metrics && test.metrics.length > 0;
          const totalSpend = hasMetrics
            ? test.metrics.reduce((acc, m) => acc + m.spend, 0)
            : 0;
          const totalRevenue = hasMetrics
            ? test.metrics.reduce((acc, m) => acc + m.revenue, 0)
            : 0;
          const totalOrders = hasMetrics
            ? test.metrics.reduce((acc, m) => acc + m.orders, 0)
            : 0;
          const effectiveRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
          const effectiveCac = totalOrders > 0 ? totalSpend / totalOrders : 0;

          return (
            <div
              key={test.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 shadow-lg transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Title & Status */}
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        test.status === 'running'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                          : test.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {test.status === 'running'
                        ? 'En cours'
                        : test.status === 'completed'
                        ? 'Terminé'
                        : 'Brouillon'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Cible: {test.targetCountry} • {test.adPlatform?.toUpperCase() || 'META'}
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-base font-bold text-white">{test.name}</h3>
                  <p className="text-xs text-slate-400">
                    Produit: <strong className="text-slate-200">{test.productName}</strong> • Budget:{' '}
                    {test.dailyBudget} € / jour ({test.totalBudget} € au total)
                  </p>
                </div>

                {/* Economics summary badge */}
                <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">Seuil ROAS</span>
                    <div className="font-bold text-amber-400">{test.breakevenRoas}x</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">CAC Max</span>
                    <div className="font-bold text-emerald-400">{test.maxCac} €</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Marge/Unité</span>
                    <div className="font-bold text-white">{test.netMarginPerUnit.toFixed(2)} €</div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2">
                  {test.status === 'running' || test.status === 'paused' ? (
                    <button
                      onClick={() => toggleAdTestStatus(test.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title={test.status === 'running' ? 'Mettre en pause' : 'Reprendre'}
                    >
                      {test.status === 'running' ? (
                        <Pause className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Play className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  ) : null}

                  {hasMetrics && (
                    <button
                      onClick={() => setDetailedTest(test)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors"
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Rapport Détaillé</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteAdTest(test.id)}
                    className="p-2 rounded-xl bg-slate-800/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                    title="Supprimer ce test"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Performance Metrics Row (if running or completed) */}
              {hasMetrics && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px]">Dépenses Réalisées</span>
                    <div className="font-bold text-white">{totalSpend.toFixed(2)} €</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Chiffre d&apos;Affaires</span>
                    <div className="font-bold text-emerald-400">{totalRevenue.toFixed(2)} €</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">ROAS Effectif</span>
                    <div
                      className={`font-bold ${
                        effectiveRoas >= test.breakevenRoas ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {effectiveRoas.toFixed(2)}x
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Commandes</span>
                    <div className="font-bold text-cyan-400">{totalOrders}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">CAC Moyen</span>
                    <div className="font-bold text-white">{effectiveCac.toFixed(2)} €</div>
                  </div>
                </div>
              )}

              {/* Creatives List */}
              {test.creatives && test.creatives.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
                    <Film className="w-3.5 h-3.5 text-purple-400" /> Créations & Hooks en Test ({test.creatives.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {test.creatives.map((c) => (
                      <div
                        key={c.id}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2"
                      >
                        <span className="font-medium text-white">{c.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                          {c.hookType}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Test Analysis Modal */}
      {detailedTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">{detailedTest.name}</h3>
                <p className="text-xs text-slate-400">
                  Historique journalier des performances publicitaires (14 jours)
                </p>
              </div>
              <button
                onClick={() => setDetailedTest(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Daily Performance Chart */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">Évolution Spend vs Revenue (€)</h4>
              <div className="h-56 w-full bg-slate-950/50 p-2 rounded-xl">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detailedTest.metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickFormatter={(d) => d.slice(5)} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '6px',
                        fontSize: '11px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="revenue" name="Chiffre d'Affaires" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="spend" name="Dépenses Ads" stroke="#6366f1" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDetailedTest(null)}
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

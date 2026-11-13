'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  FileQuestion,
  Filter,
} from 'lucide-react';

export function DiagnosticsView() {
  const { diagnostics } = useAppStore();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const funnelSteps = [
    { id: 'impression', label: '1. Impressions' },
    { id: 'attention', label: '2. Attention (3s)' },
    { id: 'click', label: '3. Clics (CTR)' },
    { id: 'visit', label: '4. Visites Site' },
    { id: 'cart', label: '5. Ajout Panier' },
    { id: 'checkout', label: '6. Checkout' },
    { id: 'order', label: '7. Commandes' },
    { id: 'payment', label: '8. Paiements' },
    { id: 'delivery', label: '9. Livraisons' },
    { id: 'profitability', label: '10. Rentabilité' },
  ];

  const filteredDiagnostics = diagnostics.filter((d) => {
    if (selectedStatus === 'all') return true;
    return d.status === selectedStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Diagnostic d&apos;Entonnoir E-commerce</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
              Audit Algorithmique
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Détection automatique des goulets d&apos;étranglement, analyse causale vs corrélative et recommandations priorisées.
          </p>
        </div>
      </div>

      {/* Visual Funnel Step Pipeline */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Pipeline de Conversion & Points de Friction
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {funnelSteps.map((step) => {
            const diag = diagnostics.find((d) => d.step === step.id);
            const status = diag ? diag.status : 'healthy';

            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border text-center transition-all ${
                  status === 'critical'
                    ? 'bg-red-500/10 border-red-500/40 text-red-300'
                    : status === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-[11px] font-bold line-clamp-1">{step.label}</div>
                <div className="mt-1 flex items-center justify-center">
                  {status === 'critical' && (
                    <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
                  )}
                  {status === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  )}
                  {status === 'healthy' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-wider font-semibold">
                  {status === 'critical'
                    ? 'Goulet Critique'
                    : status === 'warning'
                    ? 'Attention'
                    : 'Optimal'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2 pb-1">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filtrer:
        </span>
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-3 py-1 text-xs font-medium rounded-lg border ${
            selectedStatus === 'all'
              ? 'bg-slate-800 text-white border-slate-700'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          Tous ({diagnostics.length})
        </button>
        <button
          onClick={() => setSelectedStatus('critical')}
          className={`px-3 py-1 text-xs font-medium rounded-lg border ${
            selectedStatus === 'critical'
              ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : 'text-slate-400 border-transparent hover:text-red-400'
          }`}
        >
          Critiques (P1)
        </button>
        <button
          onClick={() => setSelectedStatus('warning')}
          className={`px-3 py-1 text-xs font-medium rounded-lg border ${
            selectedStatus === 'warning'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'text-slate-400 border-transparent hover:text-amber-400'
          }`}
        >
          Avertissements
        </button>
        <button
          onClick={() => setSelectedStatus('healthy')}
          className={`px-3 py-1 text-xs font-medium rounded-lg border ${
            selectedStatus === 'healthy'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'text-slate-400 border-transparent hover:text-emerald-400'
          }`}
        >
          Sains
        </button>
      </div>

      {/* Diagnostic Cards List */}
      <div className="space-y-5">
        {filteredDiagnostics.map((d) => {
          const isCritical = d.status === 'critical';
          const isWarning = d.status === 'warning';

          return (
            <div
              key={d.step}
              className={`p-6 rounded-2xl bg-slate-900/60 border transition-all ${
                isCritical
                  ? 'border-red-500/40 shadow-lg shadow-red-500/5'
                  : isWarning
                  ? 'border-amber-500/30'
                  : 'border-slate-800/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Step & Metric info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isCritical
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : isWarning
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      Étape: {d.stepLabel}
                    </span>

                    <span className="text-xs text-slate-400 font-medium">
                      Priorité: P{d.priority}
                    </span>

                    {/* Scientific honesty badge: Correlation vs Causation */}
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                        d.isCorrelation
                          ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                          : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      }`}
                      title={
                        d.isCorrelation
                          ? 'Corrélation observée. D’autres facteurs externes peuvent influencer ce résultat.'
                          : 'Lien de causalité direct vérifié.'
                      }
                    >
                      {d.isCorrelation ? '🔗 Corrélation identifiée' : 'Directement mesuré'}
                    </span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-white">{d.analysis}</h3>
                </div>

                {/* Benchmark Comparison Pill */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 shrink-0 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">{d.metricName} Actuel</span>
                    <div className="font-bold text-white text-sm">
                      {d.metricValue} {d.metricName === 'CPM' ? '€' : '%'}
                    </div>
                  </div>

                  <div className="h-6 w-[1px] bg-slate-800" />

                  <div>
                    <span className="text-[10px] text-slate-400">Benchmark Marché</span>
                    <div className="font-semibold text-slate-300 text-sm">
                      {d.benchmarkValue} {d.metricName === 'CPM' ? '€' : '%'}
                    </div>
                  </div>

                  <div className="h-6 w-[1px] bg-slate-800" />

                  <div>
                    <span className="text-[10px] text-slate-400">Écart</span>
                    <div
                      className={`font-bold text-sm ${
                        d.deviationPercent < 0 && (d.metricName === 'CTR' || d.metricName === 'Taux de checkout')
                          ? 'text-red-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {d.deviationPercent > 0 ? `+${d.deviationPercent}%` : `${d.deviationPercent}%`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Probable Causes & Actionable Recommendation */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Causes */}
                <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Causes probables identifiées:
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-slate-400">
                    {d.probableCauses.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommendation */}
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
                  <span className="font-semibold text-indigo-300 flex items-center gap-1.5 mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-400" /> Recommandation concrète:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{d.recommendation}</p>
                </div>
              </div>

              {/* Missing data requirement (Data Integrity note) */}
              {d.missingData && d.missingData.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-400">
                  <FileQuestion className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>
                    Données complémentaires recommandées pour certifier la causalité:{' '}
                    <strong className="text-slate-300">{d.missingData.join(', ')}</strong>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  CheckCircle2,
  Download,
  Shield,
  Zap,
  Sparkles,
  Link2,
} from 'lucide-react';

export function SettingsView() {
  const {
    apiConnections,
    toggleApiConnection,
    subscription,
    adTests,
    markets,
    niches,
    products,
  } = useAppStore();

  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExportData = (format: 'json' | 'csv') => {
    setIsExporting(true);
    setTimeout(() => {
      if (format === 'json') {
        const payload = {
          exportDate: new Date().toISOString(),
          version: '2.4.0',
          markets,
          niches,
          products,
          adTests,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `marketpilot-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Simple CSV
        const header = 'ID,Nom,Statut,Produit,Pays,Budget,BreakevenROAS\n';
        const rows = adTests
          .map((t) => `${t.id},"${t.name}",${t.status},"${t.productName}",${t.targetCountry},${t.totalBudget},${t.breakevenRoas}`)
          .join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `marketpilot-adtests-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
      setIsExporting(false);
      setExportNotice(`Export ${format.toUpperCase()} généré avec succès.`);
      setTimeout(() => setExportNotice(null), 4000);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Intégrations, Quotas & Traçabilité</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
              Paramètres Système
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Connecteurs publicitaires, gestion du forfait d&apos;analyse et export des jeux de données.
          </p>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Grid: Connectors & Subscription */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connectors */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Connecteurs Publicitaires & Boutiques</h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400">OAuth 2.0 Sandbox</span>
          </div>

          <div className="mt-4 space-y-3">
            {apiConnections.map((conn) => {
              const isConnected = conn.status === 'connected';

              return (
                <div
                  key={conn.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        isConnected ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-600'
                      }`}
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-white">{conn.platformLabel}</h4>
                      <p className="text-[11px] text-slate-400">
                        {isConnected ? conn.accountName : 'Non connecté'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleApiConnection(conn.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isConnected
                        ? 'bg-red-500/10 text-red-300 border-red-500/30 hover:bg-red-500/20'
                        : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 shadow-sm'
                    }`}
                  >
                    {isConnected ? 'Déconnecter' : 'Connecter'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscription & Quotas */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-bold text-white">Consommation & Quotas</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Plan {subscription.plan.toUpperCase()}
              </span>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              {/* Ad Tests Quota */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="text-slate-400">Tests Publicitaires Actifs</span>
                  <span className="font-semibold">
                    {subscription.quotaAdTestsUsed} / {subscription.quotaAdTestsMax} utilisés
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{
                      width: `${(subscription.quotaAdTestsUsed / subscription.quotaAdTestsMax) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Searches Quota */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="text-slate-400">Analyses de Marché & Niches</span>
                  <span className="font-semibold">
                    {subscription.quotaSearchesUsed} / {subscription.quotaSearchesMax}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{
                      width: `${(subscription.quotaSearchesUsed / subscription.quotaSearchesMax) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Exports Quota */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="text-slate-400">Exports de Données</span>
                  <span className="font-semibold">
                    {subscription.quotaExportsUsed} / {subscription.quotaExportsMax}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{
                      width: `${(subscription.quotaExportsUsed / subscription.quotaExportsMax) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                alert('Mise à niveau simulée: Votre compte dispose désormais de quotas illimités!');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Passer au Plan Business (Illimité)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Exporter vos Données Consolidées</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Téléchargez l&apos;intégralité de vos marchés analysés, niches et résultats de tests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExportData('json')}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              Export JSON
            </button>
            <button
              onClick={() => handleExportData('csv')}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Security & Provenance Documentation */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <Shield className="w-4 h-4 text-indigo-400" />
          <span>Charte de Transparence & Démarche Scientifique MarketPilot</span>
        </div>
        <p>
          1. <strong>Mode Démo Sandbox:</strong> Toutes les données affichées dans cet environnement de démonstration sont étiquetées de manière transparente. Les métriques financières (CPM, ROAS, Marges) proviennent de modèles statistiques de benchmark e-commerce 2026.
        </p>
        <p>
          2. <strong>Corrélation vs Causalité:</strong> Les diagnostics d&apos;entonnoir séparent rigoureusement les corrélations statistiques des liens de causalité prouvés, afin d&apos;éviter toute décision d&apos;investissement erronée.
        </p>
      </div>
    </div>
  );
}

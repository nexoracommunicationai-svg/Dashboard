'use client';

import React, { useState } from 'react';
import { DataProvenance } from '@/lib/types';
import { ShieldCheck, Info, X, ExternalLink } from 'lucide-react';

interface ProvenanceBadgeProps {
  provenance?: DataProvenance;
  showDetailsButton?: boolean;
}

export function ProvenanceBadge({ provenance, showDetailsButton = true }: ProvenanceBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!provenance) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
        DEMO
      </span>
    );
  }

  return (
    <>
      <div className="inline-flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-md uppercase tracking-wider ${
            provenance.isDemo
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
          }`}
        >
          {provenance.isDemo ? '🧪 Mode Démo' : 'Données Réelles'}
        </span>

        {showDetailsButton && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded hover:bg-slate-800"
            title="Détails de provenance des données"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-semibold text-white">Traçabilité & Provenance</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Source de données</span>
                <span className="font-medium text-white">{provenance.source}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Méthode de collecte</span>
                <span className="capitalize font-medium text-indigo-300">{provenance.method}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Niveau de confiance</span>
                <span className="capitalize font-medium text-amber-300">{provenance.confidenceLevel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Date de référence</span>
                <span className="font-mono text-xs">{provenance.collectionDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Statut de vérification</span>
                <span className={provenance.isVerified ? 'text-emerald-400' : 'text-amber-400'}>
                  {provenance.isVerified ? 'Vérifié par API' : 'Estimation modélisée (Sandbox)'}
                </span>
              </div>
              {provenance.sourceUrl && (
                <div className="pt-2">
                  <a
                    href={provenance.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:underline"
                  >
                    <span>Consulter la source officielle</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

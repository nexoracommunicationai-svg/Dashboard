'use client';

import React from 'react';
import { useAppStore, Currency } from '@/lib/store';
import { Compass, Plus, Bell, Sparkles } from 'lucide-react';

export function Navbar() {
  const {
    currency,
    setCurrency,
    subscription,
    setIsCreateModalOpen,
    setActiveTab,
  } = useAppStore();

  const currencies: { code: Currency; label: string }[] = [
    { code: 'EUR', label: '€ EUR' },
    { code: 'USD', label: '$ USD' },
    { code: 'GBP', label: '£ GBP' },
    { code: 'CAD', label: 'CA$ CAD' },
    { code: 'XOF', label: 'FCFA' },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-6 backdrop-blur-md">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
          <Compass className="h-5 w-5 text-white animate-spin-slow" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">MarketPilot</span>
            <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
              v2.4
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            E-commerce & Ads Performance Intelligence
          </p>
        </div>
      </div>

      {/* Center / Demo Mode Banner */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Mode Démo Actif — Données d&apos;estimation et simulation sécurisées</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Currency Switcher */}
        <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-1">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                currency === curr.code
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {curr.label}
            </button>
          ))}
        </div>

        {/* Quota Badge */}
        <div
          onClick={() => setActiveTab('settings')}
          className="hidden md:flex flex-col text-right cursor-pointer hover:opacity-80 transition-opacity"
          title="Gérer le forfait et les quotas"
        >
          <span className="text-[10px] font-semibold uppercase text-slate-400">
            Forfait {subscription.plan.toUpperCase()}
          </span>
          <span className="text-xs font-medium text-emerald-400">
            {subscription.quotaAdTestsMax - subscription.quotaAdTestsUsed} tests restants
          </span>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Notifications de performance"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
        </button>

        {/* New Ad Test CTA */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nouveau Test Ad</span>
        </button>
      </div>
    </header>
  );
}

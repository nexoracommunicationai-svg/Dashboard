'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { OverviewView } from '@/components/dashboard/OverviewView';
import { MarketsView } from '@/components/markets/MarketsView';
import { NichesView } from '@/components/niches/NichesView';
import { ProductsView } from '@/components/products/ProductsView';
import { AdTestsView } from '@/components/adtests/AdTestsView';
import { DiagnosticsView } from '@/components/diagnostics/DiagnosticsView';
import { SettingsView } from '@/components/settings/SettingsView';
import { CreateAdTestModal } from '@/components/adtests/CreateAdTestModal';

export default function Home() {
  const { activeTab } = useAppStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <OverviewView />;
      case 'markets':
        return <MarketsView />;
      case 'niches':
        return <NichesView />;
      case 'products':
        return <ProductsView />;
      case 'adtests':
        return <AdTestsView />;
      case 'diagnostics':
        return <DiagnosticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Layout Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Modals & Portals */}
      <CreateAdTestModal />
    </div>
  );
}

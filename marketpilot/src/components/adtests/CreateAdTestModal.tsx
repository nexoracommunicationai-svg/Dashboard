'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { X, Sparkles, Calculator, ArrowRight } from 'lucide-react';

interface FormProps {
  initialProduct: Product | null;
  onClose: () => void;
}

function CreateAdTestForm({ initialProduct, onClose }: FormProps) {
  const { products, markets, createAdTest } = useAppStore();

  const defaultProd = initialProduct || products[0] || null;

  const [name, setName] = useState(defaultProd ? `Test Ad — ${defaultProd.nameFr}` : 'Test Ad');
  const [selectedProductId, setSelectedProductId] = useState(defaultProd?.id || '');
  const [targetCountry, setTargetCountry] = useState('FR');
  const [sellingPrice, setSellingPrice] = useState(defaultProd?.sellingPriceMin || 29.90);
  const [productCost, setProductCost] = useState(defaultProd?.costPriceMin || 4.50);
  const [shippingCost, setShippingCost] = useState(defaultProd?.shippingCostEstimate || 3.50);
  const [paymentFeesPercent, setPaymentFeesPercent] = useState(3.5);
  const [otherCosts, setOtherCosts] = useState(1.00);
  const [dailyBudget, setDailyBudget] = useState(30);
  const [durationDays, setDurationDays] = useState(14);
  const [adPlatform, setAdPlatform] = useState<'meta' | 'tiktok'>('meta');

  // Real-time calculations
  const paymentFeesAmount = (sellingPrice * paymentFeesPercent) / 100;
  const netMarginPerUnit = Math.max(0, sellingPrice - productCost - shippingCost - paymentFeesAmount - otherCosts);
  const breakevenRoas = netMarginPerUnit > 0 ? Number((sellingPrice / netMarginPerUnit).toFixed(2)) : 99;
  const maxCac = Number(netMarginPerUnit.toFixed(2));
  const totalBudget = dailyBudget * durationDays;

  const handleProductSelect = (pId: string) => {
    setSelectedProductId(pId);
    const prod = products.find((p) => p.id === pId);
    if (prod) {
      setName(`Test Ad — ${prod.nameFr}`);
      setSellingPrice(prod.sellingPriceMin);
      setProductCost(prod.costPriceMin);
      setShippingCost(prod.shippingCostEstimate);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProductId);
    const prodName = prod ? prod.nameFr : 'Produit';

    const startDate = new Date().toISOString().split('T')[0];
    const end = new Date();
    end.setDate(end.getDate() + durationDays);
    const endDate = end.toISOString().split('T')[0];

    createAdTest({
      name: name || `Test ${prodName}`,
      status: 'running',
      productId: selectedProductId,
      productName: prodName,
      targetCountry,
      sellingPrice,
      productCost,
      shippingCost,
      paymentFeesPercent,
      otherCosts,
      dailyBudget,
      totalBudget,
      durationDays,
      startDate,
      endDate,
      adPlatform,
      adAccountConnected: false,
      shopPlatform: 'shopify',
      shopConnected: false,
      breakevenRoas,
      maxCac,
      netMarginPerUnit,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-5">
      {/* Campaign Name & Product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Nom de la Campagne
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Test Sérum TikTok FR"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Produit à Tester
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => handleProductSelect(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nameFr} (Marge: ~{p.estimatedMarginPercent}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Country & Platform */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Pays Cible
          </label>
          <select
            value={targetCountry}
            onChange={(e) => setTargetCountry(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {markets.map((m) => (
              <option key={m.id} value={m.countryCode}>
                {m.flag} {m.countryNameFr} ({m.countryCode})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Plateforme Publicitaire
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAdPlatform('meta')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                adPlatform === 'meta'
                  ? 'bg-blue-600/20 text-blue-300 border-blue-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Meta (Facebook/IG)
            </button>
            <button
              type="button"
              onClick={() => setAdPlatform('tiktok')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                adPlatform === 'tiktok'
                  ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              TikTok Ads
            </button>
          </div>
        </div>
      </div>

      {/* Unit Economics Section */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
          <Calculator className="w-4 h-4 text-indigo-400" />
          <span>Économie Unitaire du Produit</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="text-[11px] text-slate-400">Prix Vente (€)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className="mt-1 w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono font-semibold"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400">Coût Produit (€)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={productCost}
              onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
              className="mt-1 w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400">Frais Port (€)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={shippingCost}
              onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
              className="mt-1 w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400">Passerelle (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={paymentFeesPercent}
              onChange={(e) => setPaymentFeesPercent(parseFloat(e.target.value) || 0)}
              className="mt-1 w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400">Autres Frais (€)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={otherCosts}
              onChange={(e) => setOtherCosts(parseFloat(e.target.value) || 0)}
              className="mt-1 w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
            />
          </div>
        </div>

        {/* Calculated Key Metrics */}
        <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <span className="text-[10px] uppercase text-indigo-300 font-bold">Marge Nette/Unité</span>
            <div className="text-sm font-bold text-white">{netMarginPerUnit.toFixed(2)} €</div>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] uppercase text-amber-300 font-bold">Seuil ROAS Rentable</span>
            <div className="text-sm font-bold text-amber-400">{breakevenRoas}x</div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] uppercase text-emerald-300 font-bold">CAC Max Admissible</span>
            <div className="text-sm font-bold text-emerald-400">{maxCac} €</div>
          </div>
        </div>
      </div>

      {/* Budget & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Budget Quotidien (€ / jour)
          </label>
          <input
            type="number"
            min="5"
            step="5"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Durée du Test ({durationDays} jours) — Budget Total: {totalBudget} €
          </label>
          <input
            type="range"
            min="3"
            max="30"
            value={durationDays}
            onChange={(e) => setDurationDays(parseInt(e.target.value) || 7)}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
        >
          <span>Lancer le Test Simulateur</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}

export function CreateAdTestModal() {
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    prefilledProduct,
    setPrefilledProduct,
  } = useAppStore();

  if (!isCreateModalOpen) return null;

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setPrefilledProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Simulateur & Lancement de Test Publicitaire</h3>
              <p className="text-xs text-slate-400">
                Calculez vos seuils de rentabilité et déployez votre campagne en environnement sandbox
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CreateAdTestForm
          key={prefilledProduct?.id || 'default'}
          initialProduct={prefilledProduct}
          onClose={handleClose}
        />
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export const AnalyticsView: React.FC = () => {
  // Trade margin calculator states
  const [forgeCost, setForgeCost] = useState<number>(38);
  const [fobPrice, setFobPrice] = useState<number>(95);
  const [airFreightPerUnit, setAirFreightPerUnit] = useState<number>(24);
  const [usRetailPrice, setUsRetailPrice] = useState<number>(320);
  const [monthlyUnits, setMonthlyUnits] = useState<number>(120);

  // Computed financial indicators
  const exporterMargin = fobPrice - forgeCost;
  const exporterMarginPct = Math.round((exporterMargin / fobPrice) * 100);
  const buyerLandedCost = fobPrice + airFreightPerUnit;
  const buyerProfit = usRetailPrice - buyerLandedCost;
  const buyerMarginPct = Math.round((buyerProfit / usRetailPrice) * 100);
  const monthlyRevenue = fobPrice * monthlyUnits;
  const annualPipelinePotential = monthlyRevenue * 12;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
            <span>Trade Intelligence</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#9b4500]">Himalayan Cross-Border Commercials</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 mt-1">
            Export Analytics & Wholesale Margin Modeler
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time trade margin analysis bridging Kathmandu Valley forge manufacturing economics with North American retail sound therapy markets.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 text-slate-100 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-emerald-400 font-bold">HTS 9206.00</span>
          <span>• 0% Duty MFN Customs Entry</span>
        </div>
      </div>

      {/* Top Trade Metric Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Annual Pipeline Value
          </span>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-['Plus_Jakarta_Sans'] text-slate-900 font-tabular-data">
              ${annualPipelinePotential.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-700 font-bold font-mono">FOB KTM</span>
          </div>
          <div className="text-[11px] text-slate-500">Based on 1,488 active qualified buyers</div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Exporter Gross Margin
          </span>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#9b4500] font-tabular-data">
              {exporterMarginPct}%
            </span>
            <span className="text-xs text-slate-500 font-semibold font-mono">(${(exporterMargin).toFixed(0)}/bowl)</span>
          </div>
          <div className="text-[11px] text-slate-500">Forge direct Kathmandu clearance</div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            US Studio Buyer Margin
          </span>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-['Plus_Jakarta_Sans'] text-emerald-700 font-tabular-data">
              {buyerMarginPct}%
            </span>
            <span className="text-xs text-emerald-600 font-semibold font-mono">Landed Margin</span>
          </div>
          <div className="text-[11px] text-slate-500">High pitch incentive for studio retail</div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Air Freight Transit SLA
          </span>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-['Plus_Jakarta_Sans'] text-slate-900">
              4.8
            </span>
            <span className="text-xs text-slate-600 font-semibold font-mono">Days KTM -&gt; US</span>
          </div>
          <div className="text-[11px] text-slate-500">Consolidated via DHL Tribhuvan Hub</div>
        </div>
      </div>

      {/* Interactive Margin Modeler Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls (6 cols) */}
        <div className="lg:col-span-6 p-5 bg-white rounded-xl shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px]">
              calculate
            </span>
            <h3 className="font-bold text-sm text-slate-900">
              Himalayan Unit Economics & Profit Simulator
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Patan Forge Production Cost:</span>
                <span className="text-slate-900 font-mono">${forgeCost} USD / unit</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={forgeCost}
                onChange={(e) => setForgeCost(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 accent-[#0f172a] rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Includes 7 metals (copper, tin, silver, iron, gold trace, lead, zinc) & artisan hammering labor</span>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Direct FOB Export Price (Kathmandu):</span>
                <span className="text-[#9b4500] font-bold font-mono">${fobPrice} USD / unit</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                value={fobPrice}
                onChange={(e) => setFobPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 accent-[#9b4500] rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Wholesale price offered to North American studio buyers</span>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>DHL Express Air Courier (KTM -&gt; US Door):</span>
                <span className="text-slate-900 font-mono">${airFreightPerUnit} USD / unit</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={airFreightPerUnit}
                onChange={(e) => setAirFreightPerUnit(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 accent-[#0f172a] rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Estimated ~1.8kg volumetric weight per 10-inch bowl + cushion + striker</span>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Target US Studio Retail Shelf Price:</span>
                <span className="text-emerald-700 font-bold font-mono">${usRetailPrice} USD / unit</span>
              </div>
              <input
                type="range"
                min="150"
                max="600"
                value={usRetailPrice}
                onChange={(e) => setUsRetailPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 accent-emerald-600 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">Parsed from Shopify, Mindbody & physical wellness retail catalogs in US</span>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Monthly Wholesale Batch Volume:</span>
                <span className="text-slate-900 font-mono">{monthlyUnits} bowl units</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 accent-[#0f172a] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Breakdown Visual (6 cols) */}
        <div className="lg:col-span-6 p-5 bg-white rounded-xl shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">
              Value Chain Distribution per Singing Bowl
            </h3>
            <span className="text-xs font-bold text-emerald-700 font-mono">
              Total Consumer Price: ${usRetailPrice}
            </span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Patan Metalcraft Forge Cost</span>
                <span className="font-bold text-slate-900 font-mono">${forgeCost} ({Math.round((forgeCost / usRetailPrice) * 100)}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-700 rounded-full" style={{ width: `${(forgeCost / usRetailPrice) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Resonance Export Margin</span>
                <span className="font-bold text-[#9b4500] font-mono">${exporterMargin} ({Math.round((exporterMargin / usRetailPrice) * 100)}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#9b4500] rounded-full" style={{ width: `${(exporterMargin / usRetailPrice) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Air Freight & Customs Handshake</span>
                <span className="font-bold text-slate-900 font-mono">${airFreightPerUnit} ({Math.round((airFreightPerUnit / usRetailPrice) * 100)}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(airFreightPerUnit / usRetailPrice) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">US Studio Buyer Retail Margin</span>
                <span className="font-bold text-emerald-700 font-mono">${buyerProfit} ({buyerMarginPct}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${buyerMarginPct}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono space-y-1 mt-4">
            <div className="text-emerald-400 font-bold uppercase text-[10px]">
              Why US Buyers Convert on this Pitch:
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Standard US domestic distributors mark up singing bowls 3x-4x, leaving studios with only 30% margin. Buying direct FOB Kathmandu gives them authentic Patan forge lineage and a <strong className="text-white">{buyerMarginPct}% gross margin</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

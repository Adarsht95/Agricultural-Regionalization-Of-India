import React, { useState } from 'react';
import { Sliders, Sparkles, AlertCircle, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const BuildARegionTool: React.FC = () => {
  const [climate, setClimate] = useState('Semi-Arid (P: 50–100 cm)');
  const [soil, setSoil] = useState('Deep Black Vertisols');
  const [physiography, setPhysiography] = useState('Peninsular Tableland / Plateau');
  const [lgp, setLgp] = useState('90–150 Days');

  const climates = [
    'Cold Arid (Ladakh alpine, <30 cm)',
    'Hot Arid (Thar Desert, <25 cm)',
    'Semi-Arid (P: 50–100 cm)',
    'Subhumid Dry (P: 75–150 cm)',
    'Subhumid Moist (P: 100–200 cm)',
    'Humid to Perhumid (Western Ghats/NE, >200 cm)'
  ];

  const soils = [
    'Deep Alluvial Loam (Indo-Gangetic)',
    'Deep Black Vertisols (Deccan Basalt)',
    'Shallow Red & Gravelly Alfisols',
    'Acidic Laterite / Forest Soil',
    'Desert Calcareous Sand (Aridisols)',
    'Coastal Saline / Deltaic Clay'
  ];

  const physiographies = [
    'Lofty Mountains & Alpine Valleys',
    'Undulating Foothills / Bhabar Belt',
    'Flat Low-Gradient Alluvial Plain',
    'Peninsular Tableland / Plateau',
    'Coastal Plain & Deltaic Estuary',
    'Oceanic Island Coral / Volcanic Archipelago'
  ];

  const lgpOptions = [
    'Under 90 Days (Extremely Short)',
    '90–150 Days (Semi-Arid)',
    '150–180 Days (Subhumid)',
    '180–210 Days (Moist Subhumid)',
    '210–300+ Days (Perhumid Tropics)'
  ];

  const handleReset = () => {
    setClimate('Semi-Arid (P: 50–100 cm)');
    setSoil('Deep Black Vertisols');
    setPhysiography('Peninsular Tableland / Plateau');
    setLgp('90–150 Days');
  };

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
          Interactive Pedological Sandbox
        </span>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Build an Agro-Ecological Region
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Select physical environmental parameters to simulate how climate, soil horizons, landscape topography, and moisture availability combine to dictate ecological carrying capacity.
        </p>
      </div>

      {/* Mandatory Disclaimer Badge */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-950 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold font-mono uppercase tracking-wider text-amber-900">
            Educational Conceptual Simulation
          </div>
          <p className="leading-relaxed">
            "Conceptual learning tool — not an official classification model. The parameters selected here demonstrate the geographic principles of ecological zoning and do not generate an officially recognized Indian agro-ecological region."
          </p>
        </div>
      </div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Selection Controls */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-700" /> Parameter Selectors
            </h3>
            <button
              onClick={handleReset}
              className="text-xs font-mono text-stone-500 hover:text-stone-900 flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          {/* 1. Climate */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-blue-900">
              1. CLIMATE / PRECIPITATION REGIME:
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
            >
              {climates.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 2. Soil */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-amber-900">
              2. SOIL ORDER &amp; TEXTURE:
            </label>
            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
            >
              {soils.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* 3. Physiography */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-stone-900">
              3. PHYSIOGRAPHY / LANDFORM:
            </label>
            <select
              value={physiography}
              onChange={(e) => setPhysiography(e.target.value)}
              className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
            >
              {physiographies.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* 4. LGP */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold font-mono text-emerald-900">
              4. LENGTH OF GROWING PERIOD (LGP):
            </label>
            <select
              value={lgp}
              onChange={(e) => setLgp(e.target.value)}
              className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
            >
              {lgpOptions.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Simulated Synthesis Card */}
        <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-800">
            <Sparkles className="w-4 h-4 text-amber-500" /> Simulated Ecological Synthesis
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3 text-xs text-stone-700">
            <p className="italic text-stone-600 leading-relaxed font-serif-academic">
              "These environmental characteristics together describe an agro-ecological setting with specific hydrological balance and pedological constraints."
            </p>

            <div className="space-y-2 pt-2 border-t border-stone-100 font-mono text-[11px]">
              <div><span className="text-blue-700 font-bold">Climate:</span> {climate}</div>
              <div><span className="text-amber-800 font-bold">Soil Solum:</span> {soil}</div>
              <div><span className="text-stone-800 font-bold">Terrain:</span> {physiography}</div>
              <div><span className="text-emerald-800 font-bold">Growing Window:</span> {lgp}</div>
            </div>
          </div>

          {/* Simulated Insight Box */}
          <div className="p-4 bg-emerald-950 text-white rounded-xl shadow-xs space-y-2">
            <div className="text-xs font-mono font-bold text-amber-300">
              Ecological Interpretation:
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              In actual Indian geography, this combination is most closely reflected in the{' '}
              {climate.includes('Semi-Arid') && soil.includes('Black')
                ? 'Deccan Lava Plateau (AER 6 / Zone 9), characterized by deep black vertisols, rain-shadow moisture stress, and cotton-sorghum cropping.'
                : climate.includes('Alluvial') || soil.includes('Alluvial')
                ? 'Indo-Gangetic Basin (AER 4/9 / Zones 4, 5, 6), dominated by deep quaternary sediments and intensive rice-wheat farming.'
                : climate.includes('Arid')
                ? 'Thar Desert Fringe (AER 2 / Zone 14), dominated by drought-resilient millets and low organic matter sands.'
                : 'Diverse Peninsular or Montane tracts requiring tailored conservation practices.'}
            </p>
          </div>

          <div className="text-[10px] font-mono text-stone-400 text-center">
            Educational Sandbox • ICAR-NBSS&amp;LUP Principle Demonstrator
          </div>
        </div>

      </div>

    </div>
  );
};

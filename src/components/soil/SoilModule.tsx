import React, { useState } from 'react';
import { Sprout, Layers, Droplets, ShieldCheck, Info } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const SoilModule: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<string>('topsoil');

  const horizons: Record<string, { name: string; designation: string; depth: string; desc: string; significance: string; bg: string }> = {
    surface: {
      name: 'SURFACE LAYER',
      designation: 'O-Horizon (Organic Litter Layer)',
      depth: '0 – 5 cm',
      desc: 'Composed of decomposing plant biomass, crop residues, leaves, and rich organic humus.',
      significance: 'Critical for surface infiltration, buffering against raindrop erosion, and sustaining soil microbial diversity.',
      bg: 'bg-[#3e2723] text-stone-100'
    },
    topsoil: {
      name: 'TOPSOIL LAYER',
      designation: 'A-Horizon (Eluvial / Rooting Zone)',
      depth: '5 – 30 cm',
      desc: 'Mineral horizon enriched with organic matter, characterized by high biological activity and nutrient availability.',
      significance: 'Primary zone for crop seed germination, feeder roots, fertilizer uptake, and aerobic respiration.',
      bg: 'bg-[#5d4037] text-stone-100'
    },
    subsoil: {
      name: 'SUBSOIL LAYER',
      designation: 'B-Horizon (Illuvial Accumulation Zone)',
      depth: '30 – 100+ cm',
      desc: 'Zone of illuviation where leached clays, iron/aluminum oxides, and carbonates accumulate from above.',
      significance: 'Governs root anchoring, subsoil moisture retention (Available Water Capacity - AWC), and drainage class.',
      bg: 'bg-[#8d6e63] text-stone-100'
    },
    parent_material: {
      name: 'PARENT MATERIAL',
      designation: 'C-Horizon (Weathered Bedrock / Substratum)',
      depth: '100+ cm to Bedrock',
      desc: 'Partially weathered mineral rock mass (Deccan Basalt trap, Gondwana sandstone, or Gangetic alluvium).',
      significance: 'Determines the inherent mineralogy, natural fertility potential, clay mineral type (e.g. montmorillonite vs kaolinite), and soil pH.',
      bg: 'bg-[#a1887f] text-stone-900'
    }
  };

  const majorSoilOrders = [
    {
      name: 'Alluvial Soils (Entisols / Inceptisols)',
      coverage: 'Indo-Gangetic Plains & River Deltas (Zones 3, 4, 5, 6, 11)',
      properties: 'Deep, light grey to ash brown, sandy loam to clay loam, rich in potash, deficient in nitrogen and phosphorus.',
      crops: 'Rice, Wheat, Sugarcane, Jute, Potato, Maize'
    },
    {
      name: 'Black Soils / Regur (Vertisols)',
      coverage: 'Deccan Lava Trap (Zones 9, 8, 13; AER 5, 6, 10)',
      properties: 'High clay content (>40%), montmorillonitic mineralogy, deep cracking when dry, high moisture retention capacity.',
      crops: 'Cotton, Soybean, Sorghum, Wheat, Pigeon Pea'
    },
    {
      name: 'Red & Yellow Soils (Alfisols / Ultisols)',
      coverage: 'Peninsular Crystalline Shield (Zones 7, 10; AER 3, 7, 8, 11)',
      properties: 'Derived from ancient crystalline granites/gneisses, porous, friable, deficient in nitrogen, phosphorus, and humus.',
      crops: 'Millets (Ragi, Jowar), Groundnut, Pulses, Tobacco'
    },
    {
      name: 'Laterite Soils (Oxisols / Ultisols)',
      coverage: 'Western Ghats & Eastern Hills (Zones 12, 2, 7; AER 12, 19)',
      properties: 'Intense tropical leaching under high rainfall (>200 cm), rich in iron and aluminum oxides, acidic (low pH), low fertility.',
      crops: 'Tea, Coffee, Rubber, Cashew, Spices, Coconut'
    },
    {
      name: 'Desert / Arid Soils (Aridisols)',
      coverage: 'Western Dry Region (Zone 14; AER 2)',
      properties: 'Coarse texture, high sand content, low organic matter (<0.2%), calcareous hardpan, high soluble salts in depressions.',
      crops: 'Pearl Millet (Bajra), Moth Bean, Guar, Irrigated Mustard'
    }
  ];

  return (
    <div className="py-12 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
            Pedological Foundation
          </span>
          <SourceBadge source="SUPPLIED GIS DATA" subtext="Shapefile soil attributes" />
          <SourceBadge source="OFFICIAL SOURCE" subtext="ICAR-NBSS&LUP Soil Survey" />
        </div>
        <h2 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Why Soil Matters in Agricultural Regionalization
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Soil acts as the physical medium and moisture buffer for plant life. Soil depth, texture, available water capacity (AWC), permeability, and mineralogy dictate the rooting environment and regulate how much rainfall can be stored to sustain crops during dry spells.
        </p>
      </div>

      {/* Interactive Soil Profile & Pedological Mechanics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Soil Profile Diagram */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800">
              Interactive Soil Profile (Horizons)
            </h3>
            <span className="text-[10px] font-mono text-stone-400">Click layer to inspect</span>
          </div>

          <div className="space-y-2">
            {Object.keys(horizons).map((key) => {
              const h = horizons[key];
              const isSelected = selectedHorizon === key;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedHorizon(key)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    isSelected ? 'ring-2 ring-amber-500 scale-[1.01]' : 'opacity-90 hover:opacity-100'
                  } ${h.bg}`}
                >
                  <div className="flex items-center justify-between font-mono text-xs font-bold">
                    <span>{h.name}</span>
                    <span className="text-[10px] opacity-80">{h.depth}</span>
                  </div>
                  <div className="text-[11px] opacity-90 mt-0.5">{h.designation}</div>
                </div>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-stone-500 text-center">
            Standard idealized agricultural soil solum cross-section
          </div>
        </div>

        {/* Right: Horizon Detail Inspector */}
        <div className="lg:col-span-7 bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
                Active Horizon Inspector
              </span>
              <h4 className="text-base font-bold font-serif-academic text-stone-900 mt-0.5">
                {horizons[selectedHorizon].designation}
              </h4>
            </div>
            <span className="text-xs font-mono px-2 py-1 rounded bg-white border border-stone-200 font-bold text-stone-700">
              Depth: {horizons[selectedHorizon].depth}
            </span>
          </div>

          <div className="space-y-3 text-xs text-stone-700">
            <div>
              <span className="font-bold text-stone-900 block font-mono">Pedological Description:</span>
              <p className="leading-relaxed mt-0.5">{horizons[selectedHorizon].desc}</p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-emerald-900 block font-mono">Agronomic &amp; Regionalization Significance:</span>
              <p className="leading-relaxed mt-0.5 text-stone-600">{horizons[selectedHorizon].significance}</p>
            </div>
          </div>

          {/* Key Soil Parameters Pillows */}
          <div className="pt-4 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center text-[11px] font-mono">
            <div className="p-2 bg-white rounded-lg border border-stone-200">
              <div className="font-bold text-stone-900">Texture Class</div>
              <div className="text-[10px] text-stone-500">Clay, Silt, Sand ratio</div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-stone-200">
              <div className="font-bold text-stone-900">AWC (mm/m)</div>
              <div className="text-[10px] text-stone-500">Available Water Capacity</div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-stone-200">
              <div className="font-bold text-stone-900">Drainage Class</div>
              <div className="text-[10px] text-stone-500">Excessive to Poor</div>
            </div>
          </div>
        </div>

      </div>

      {/* Major Indian Soil Orders Table */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-serif-academic text-stone-900">
            Major Agricultural Soil Orders Mapped to Regional Frameworks
          </h3>
          <SourceBadge source="SUPPLIED GIS DATA" subtext="DBF 'soil' attribute table" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-700 font-mono">
                <th className="p-3 font-bold">Soil Order &amp; Type</th>
                <th className="p-3 font-bold">Agro-Climatic &amp; Ecological Zones</th>
                <th className="p-3 font-bold">Physical &amp; Chemical Properties</th>
                <th className="p-3 font-bold">Verified Associated Crops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-600">
              {majorSoilOrders.map((s, idx) => (
                <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-stone-900 font-mono">{s.name}</td>
                  <td className="p-3 text-stone-800">{s.coverage}</td>
                  <td className="p-3">{s.properties}</td>
                  <td className="p-3 font-medium text-emerald-800">{s.crops}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Scale, CheckCircle2, ShieldCheck, ArrowRight, Layers, MapPin } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const AczVsAezDashboard: React.FC = () => {
  const [highlightSystem, setHighlightSystem] = useState<'both' | 'acz' | 'aez'>('both');

  const comparisonRows = [
    {
      dimension: '1. Theoretical Concept',
      acz: 'A land unit defined primarily by major climate parameters (rainfall, temperature, moisture availability) deemed suitable for a certain range of crops and cultivars.',
      aez: 'A modified land unit carved out of an agro-climatic zone, explicitly superimposing landform and soil parameters onto climate to determine biological carrying capacity.'
    },
    {
      dimension: '2. Primary Focus',
      acz: 'Macro-level crop suitability zoning, regional agricultural investment allocation, and irrigation planning.',
      aez: 'Pedological sustainability, soil conservation, land degradation monitoring, and agro-technology transfer.'
    },
    {
      dimension: '3. Climate Parameters',
      acz: 'Annual and seasonal rainfall isohyets, winter (Jan) and summer (Jul) isotherms, and moisture indexes.',
      aez: 'Bioclimate classes derived via Thornthwaite-Mather Moisture Index (MI = [P - PET] / PET) across thermal regimes.'
    },
    {
      dimension: '4. Soil Integration',
      acz: 'Considered broadly at macro-type level (e.g. alluvial vs regur), but not mapped as an independent polygon overlay boundary.',
      aez: 'Explicitly mapped using 1:7 million NBSS&LUP Soil Great Groups, incorporating soil depth, texture, and available water capacity (AWC).'
    },
    {
      dimension: '5. Physiography & Landform',
      acz: 'Uses major physiographic divisions (Himalayas, Gangetic Plains, Plateaus, Coasts) primarily as broad geographical boundaries.',
      aez: 'Acts as an active modifier to climate and soil genesis, recognizing that elevation and slope alter LGP and erosion risks.'
    },
    {
      dimension: '6. Length of Growing Period (LGP)',
      acz: 'Acknowledged conceptually, but boundaries are not primarily governed by precise annual moisture-period day counts.',
      aez: 'Fundamental quantitative delineation parameter, calculated as days with P > 0.5 PET plus up to 100mm stored soil water.'
    },
    {
      dimension: '7. Agricultural Interpretation',
      acz: 'Broad regional cropping patterns (e.g. Rice-Wheat belt vs Cotton-Jowar belt) and regional output maximization.',
      aez: 'Ecological suitability and vulnerability assessment, balancing productivity with long-term carrying capacity.'
    },
    {
      dimension: '8. Institutional Framework',
      acz: 'Planning Commission of India & National Remote Sensing Agency (NRSA), 1989.',
      aez: 'National Bureau of Soil Survey and Land Use Planning (ICAR-NBSS&LUP; Sehgal et al.), 1992.'
    },
    {
      dimension: '9. Spatial Scale & Units',
      acz: '15 Macro-Regions, further divided into 72 more homogeneous Sub-zones.',
      aez: '20 Agro-Ecological Regions (AERs), further subdivided into 60 Sub-regions (AESRs) and micro AEUs.'
    },
    {
      dimension: '10. Planning Application',
      acz: 'Targeting national flagship schemes (e.g. PM Dhan-Dhaanya, RKVY, MSP price support, canal command development).',
      aez: 'Soil Health Card recommendations, watershed development projects, organic farming zoning, and biodiversity preservation.'
    }
  ];

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Comparative Synthesis
          </span>
          <SourceBadge source="OFFICIAL SOURCE" subtext="Planning Commission & ICAR-NBSS&LUP" />
          <SourceBadge source="SUPPLIED PDF" subtext="UPSC Study Material & e-Text" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Agro-Climatic vs Agro-Ecological Regionalization
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          While often conflated in general discourse, ACZ and AEZ serve distinct academic and administrative purposes. Use the toggle below to examine how their criteria, institutional mandates, and spatial philosophies contrast.
        </p>
      </div>

      {/* Interactive Toggle Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-700" /> Focus Highlight Filter:
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHighlightSystem('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              highlightSystem === 'both'
                ? 'bg-stone-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            [SIDE-BY-SIDE EQUAL]
          </button>
          <button
            onClick={() => setHighlightSystem('acz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              highlightSystem === 'acz'
                ? 'bg-[#1b4332] text-white shadow-xs ring-2 ring-emerald-400/30'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            [ACZ FOCUS: 15 ZONES]
          </button>
          <button
            onClick={() => setHighlightSystem('aez')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              highlightSystem === 'aez'
                ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/30'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            [AEZ FOCUS: 20 REGIONS]
          </button>
        </div>
      </div>

      {/* Master 10-Row Comparison Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 font-mono text-stone-800">
                <th className="p-4 font-bold w-1/5">Comparison Dimension</th>
                <th className={`p-4 font-bold w-2/5 border-l border-stone-200 ${highlightSystem === 'acz' ? 'bg-emerald-50 text-emerald-950' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    Agro-Climatic Zone (ACZ)
                  </div>
                  <div className="text-[10px] font-normal text-stone-500 font-sans mt-0.5">
                    Planning Commission &amp; NRSA (1989) • 15 Zones
                  </div>
                </th>
                <th className={`p-4 font-bold w-2/5 border-l border-stone-200 ${highlightSystem === 'aez' ? 'bg-amber-50 text-amber-950' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                    Agro-Ecological Zone (AEZ)
                  </div>
                  <div className="text-[10px] font-normal text-stone-500 font-sans mt-0.5">
                    ICAR-NBSS&amp;LUP (1992) • 20 Eco-Regions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-4 font-bold font-mono text-stone-900 bg-stone-50/30">
                    {row.dimension}
                  </td>
                  <td className={`p-4 leading-relaxed border-l border-stone-200 ${
                    highlightSystem === 'acz' ? 'bg-emerald-50/40 text-stone-900 font-medium' : ''
                  }`}>
                    {row.acz}
                  </td>
                  <td className={`p-4 leading-relaxed border-l border-stone-200 ${
                    highlightSystem === 'aez' ? 'bg-amber-50/40 text-stone-900 font-medium' : ''
                  }`}>
                    {row.aez}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Formula Alert */}
      <div className="p-5 rounded-2xl bg-[#1b4332] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
            Canonical Academic Synthesis Formula
          </div>
          <div className="text-base font-serif-academic font-bold">
            Agro-Ecological Region = Agro-Climatic Zone + Landform (Physiography) + Soil Water Capacity (LGP)
          </div>
        </div>
        <div className="text-xs font-mono text-emerald-200 bg-emerald-900/60 px-3 py-1.5 rounded border border-emerald-700 shrink-0">
          UPSC GS-I &amp; GS-III Key Takeaway
        </div>
      </div>

    </div>
  );
};

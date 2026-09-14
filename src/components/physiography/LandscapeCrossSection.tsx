import React, { useState } from 'react';
import { Mountain, ArrowRight, Droplets, Waves, Sprout, ShieldAlert } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const LandscapeCrossSection: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('plains');

  const units: Record<string, { title: string; elevation: string; drainage: string; soils: string; water: string; suitability: string }> = {
    mountains: {
      title: 'High Mountains (Himalayas)',
      elevation: '2,000m to 6,000m+',
      drainage: 'Rapid surface runoff, deep narrow gorges, high erosion energy, cold glaciers and snowmelt sources.',
      soils: 'Shallow skeletal soils, lithic leptosols, mountain podzols with high gravel content.',
      water: 'High precipitation and perpetual snowmelt, but low moisture retention on steep slopes.',
      suitability: 'Terraced subsistence agriculture (barley, wheat), temperate orchards (apple, walnut), and alpine pastoralism.'
    },
    foothills: {
      title: 'Foothills & Terai / Bhabar Belt',
      elevation: '300m to 2,000m',
      drainage: 'Porous boulder fans (Bhabar) where streams sink, re-emerging as marshy springs in the Terai belt.',
      soils: 'Coarse colluvial debris in Bhabar grading into rich hydromorphic alluvial clays in Terai.',
      water: 'High seasonal water table, marshy conditions, abundant sub-surface seepage.',
      suitability: 'Tea gardens on well-drained slopes, sugarcane, paddy, and forestry in the fertile Terai.'
    },
    plains: {
      title: 'Alluvial Plains (Indo-Gangetic Basin)',
      elevation: '50m to 300m',
      drainage: 'Low gradient, meandering mature rivers (Ganga, Yamuna, Sutlej), oxbow lakes, extensive floodplains.',
      soils: 'Deep fertile alluvium (Khadar newer silt and Bhangar older clay-loams). Minimal stone content.',
      water: 'Extensive shallow unconfined and deep confined freshwater aquifers; high canal command density.',
      suitability: 'Intensive mechanized food-grain production (Rice-Wheat cropping system, Sugarcane, Cotton).'
    },
    plateaus: {
      title: 'Peninsular Tablelands & Escarpments',
      elevation: '300m to 1,000m',
      drainage: 'Well-defined dendritic river systems (Godavari, Krishna, Mahanadi) carving hard rock valleys.',
      soils: 'Black Vertisols on Deccan basalt; red Alfisols on granites; laterites on elevated flat mesas.',
      water: 'Hard-rock aquifer with limited storage; high reliance on monsoon rainwater harvesting and tanks.',
      suitability: 'Rainfed dryland agriculture, pulses, coarse grains (Jowar, Bajra, Ragi), cotton, and oilseeds.'
    },
    coastal_plain: {
      title: 'Coastal Plains & River Deltas',
      elevation: '0m to 50m (Sea Level)',
      drainage: 'Tidal estuaries, distributary networks, coastal lagoons, and low-lying backwaters (kayals).',
      soils: 'Deltaic silts and marine littoral sands; prone to saline intrusion and acid sulfate soils.',
      water: 'Abundant surface water, but groundwater vulnerable to seawater ingress and storm surges.',
      suitability: 'Multi-season paddy (Aman, Boro), coconut groves, spices, cashew, and integrated aquaculture.'
    }
  };

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700">
            Geomorphology &amp; Landscape Ecology
          </span>
          <SourceBadge source="OFFICIAL SOURCE" subtext="Survey of India & NBSS&LUP Physiography" />
        </div>
        <h2 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          How Physiography Influences Agriculture
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Physiography acts as the primary topographic framework that modifies macro-climate, controls gravitational runoff, directs sediment deposition, and determines natural drainage systems across India.
        </p>
      </div>

      {/* Landscape Cross-Section Diagram */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800">
            Interactive Landscape Cross-Section (Himalayas to Coast)
          </h3>
          <span className="text-[11px] font-mono text-stone-500">
            Click any geomorphic unit to analyze its hydrologic &amp; soil regime
          </span>
        </div>

        {/* Cross-section visual buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {Object.keys(units).map((key) => {
            const u = units[key];
            const isSelected = activeUnit === key;
            return (
              <button
                key={key}
                onClick={() => setActiveUnit(key)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-md ring-2 ring-emerald-400/30'
                    : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  {u.elevation}
                </div>
                <div className="text-xs font-bold font-serif-academic mt-1 leading-snug">
                  {u.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                Active Physiographic Unit
              </span>
              <h4 className="text-lg font-bold font-serif-academic text-stone-900 mt-0.5">
                {units[activeUnit].title}
              </h4>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-white border border-stone-200 text-stone-700 font-bold">
              Elevation: {units[activeUnit].elevation}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
            <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="font-bold text-blue-900 flex items-center gap-1.5 font-mono">
                <Droplets className="w-3.5 h-3.5 text-blue-600" /> Drainage &amp; Runoff Regime
              </div>
              <p className="text-stone-600 leading-relaxed">{units[activeUnit].drainage}</p>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 font-mono">
                <Mountain className="w-3.5 h-3.5 text-amber-600" /> Soil Genesis &amp; Depth
              </div>
              <p className="text-stone-600 leading-relaxed">{units[activeUnit].soils}</p>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="font-bold text-teal-900 flex items-center gap-1.5 font-mono">
                <Waves className="w-3.5 h-3.5 text-teal-600" /> Water Availability &amp; Aquifers
              </div>
              <p className="text-stone-600 leading-relaxed">{units[activeUnit].water}</p>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5 font-mono">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" /> Agricultural Suitability
              </div>
              <p className="text-stone-600 leading-relaxed">{units[activeUnit].suitability}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

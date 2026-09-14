import React from 'react';
import { Layers, ShieldCheck, Target, CheckCircle2, ArrowDown, Database, Cpu, Compass, BookOpen } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const WhatIsRegionalization: React.FC = () => {
  const dimensions = [
    { title: 'Agricultural Planning', desc: 'Formulation of location-specific agro-technology packages and decentralized credit/input distribution.' },
    { title: 'Crop Suitability', desc: 'Matching agro-climatic conditions with physiological water, thermal, and photoperiod requirements.' },
    { title: 'Resource Management', desc: 'Sustainable utilization of groundwater aquifers, watershed recharge, and soil organic conservation.' },
    { title: 'Irrigation Planning', desc: 'Targeting command area canals, micro-irrigation (drip/sprinkler), and traditional tank rejuvenation.' },
    { title: 'Regional Development', desc: 'Rectifying inter-regional inequalities in agricultural productivity and farm household income.' },
    { title: 'Climate Adaptation', desc: 'Deploying climate-resilient stress-tolerant cultivars (drought, flood, salinity) in vulnerable tracts.' },
    { title: 'Land-Use Planning', desc: 'Preventing prime agricultural land diversion and guiding agro-forestry/silviculture on marginal soils.' },
    { title: 'Agricultural Research', desc: 'Decentralizing research priorities across State Agricultural Universities and ICAR Zonal Stations.' }
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Foundational Geography
            </span>
            <SourceBadge source="SUPPLIED PDF" subtext="e-PG Pathshala RG-38 & Planning Commission" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
            What is Agricultural Regionalization?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-3">
            Agricultural regionalization is the scientific spatial grouping and delineation of agricultural areas according to shared homogeneities and defined gradients in physical environment (climate, soils, topography) and agricultural practices (cropping intensity, productivity, irrigation).
          </p>
        </div>

        {/* Two-Column Grid: Importance vs Animated Conceptual Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: 8 Planning Dimensions */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-700" />
              Eight Core Rationales for Regionalization
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {dimensions.map((d, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/90 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{d.title}</h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed mt-0.5">{d.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
              <span className="font-bold">Academic Principle:</span> "India has transitioned from uniform macro-level agricultural strategies to agro-climatically differentiated interventions (e.g. PM Dhan-Dhaanya 2025 targeting 100 lagging districts based on agro-climatic logic)."
            </div>
          </div>

          {/* Right: Animated Conceptual Flow Diagram */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 text-center mb-6">
              Conceptual Regionalization Process Flow
            </h3>

            <div className="space-y-3 relative">
              
              {/* Box 1: Environment */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-emerald-700/60 text-center shadow-2xs">
                <div className="text-xs font-mono font-bold text-emerald-900">1. ENVIRONMENT</div>
                <div className="text-[11px] text-stone-500">Biophysical Macro Setting</div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center text-emerald-700 animate-bounce">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Box 2: Determinants */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-blue-600/60 text-center shadow-2xs">
                <div className="text-xs font-mono font-bold text-blue-900">
                  2. CLIMATE + SOIL + TOPOGRAPHY + WATER
                </div>
                <div className="text-[11px] text-stone-500">
                  Rainfall • Temperature • Soil Orders • Elevation • Moisture Balance
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center text-blue-700 animate-bounce">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Box 3: Agricultural Conditions */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-amber-600/60 text-center shadow-2xs">
                <div className="text-xs font-mono font-bold text-amber-900">
                  3. AGRICULTURAL CONDITIONS
                </div>
                <div className="text-[11px] text-stone-500">
                  Crop Adaptability • Cropping Seasons • Yield Potential • LGP
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center text-amber-700 animate-bounce">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Box 4: Regionalization */}
              <div className="bg-white p-3.5 rounded-xl border-2 border-purple-600/60 text-center shadow-2xs">
                <div className="text-xs font-mono font-bold text-purple-900">
                  4. REGIONALIZATION
                </div>
                <div className="text-[11px] text-stone-500">
                  Agro-Climatic Zones (ACZs) • Agro-Ecological Regions (AERs)
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center text-purple-700 animate-bounce">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Box 5: Planning */}
              <div className="bg-[#1b4332] text-white p-3.5 rounded-xl text-center shadow-sm">
                <div className="text-xs font-mono font-bold text-amber-300">
                  5. PLANNING AND MANAGEMENT
                </div>
                <div className="text-[11px] text-emerald-200">
                  Zoned Interventions • Sustainable Inputs • Climate-Resilient Policy
                </div>
              </div>

            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-stone-500">
                Figure: Scientific flow of geographic regionalization
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

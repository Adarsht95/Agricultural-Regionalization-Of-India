import React, { useState } from 'react';
import { Layers, MapPin, Building, Target, Scale, Database, ChevronRight, Check } from 'lucide-react';
import { Framework } from '../../types';
import { SourceBadge } from '../common/SourceBadge';

interface FrameworksOverviewProps {
  frameworks: Framework[];
  onSelectFramework: (frameworkId: string) => void;
}

export const FrameworksOverview: React.FC<FrameworksOverviewProps> = ({ frameworks, onSelectFramework }) => {
  const [activeCard, setActiveCard] = useState<string>('acz');

  return (
    <section className="py-16 bg-[#f8fafc] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Comparative Epistemology
            </span>
            <SourceBadge source="OFFICIAL SOURCE" subtext="Planning Commission & ICAR-NBSS&LUP" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
            India's Agricultural Regionalization Frameworks
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-2">
            There is no single monolithic agricultural zoning system for India. Different apex institutions and research councils have formulated distinct spatial regionalizations tailored to specific planning, pedological, and agronomic purposes.
          </p>
        </div>

        {/* Major Frameworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Card A: Agro-Climatic Regionalization */}
          <div className="bg-white rounded-2xl border-2 border-emerald-600/60 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-100 text-emerald-900">
                  FRAMEWORK A
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800">1989</span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-serif-academic text-stone-900">
                  Agro-Climatic Regionalization
                </h3>
                <div className="text-xs text-stone-500 font-mono mt-0.5">Planning Commission & NRSA</div>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div>
                  <span className="font-bold text-stone-900">Scale:</span> 15 Macro-Zones • 72 Sub-Zones
                </div>
                <div>
                  <span className="font-bold text-stone-900">Classification Basis:</span> Topography, rainfall, temperature, water resources, and existing cropping patterns.
                </div>
                <div>
                  <span className="font-bold text-stone-900">Primary Purpose:</span> Macro-economic agricultural planning, crop suitability zoning, and regional public investment targeting.
                </div>
                <div>
                  <span className="font-bold text-stone-900">Source:</span> Planning Commission (1989) & User GIS Dataset.
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-100 mt-4 relative z-10 flex items-center justify-between">
              <SourceBadge source="SUPPLIED GIS DATA" />
              <button
                onClick={() => onSelectFramework('acz')}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 font-mono"
              >
                View 15 Zones <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card B: Agro-Ecological Regionalization */}
          <div className="bg-white rounded-2xl border-2 border-amber-600/60 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-100 text-amber-900">
                  FRAMEWORK B
                </span>
                <span className="text-xs font-mono font-bold text-amber-800">1992</span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-serif-academic text-stone-900">
                  Agro-Ecological Regionalization
                </h3>
                <div className="text-xs text-stone-500 font-mono mt-0.5">ICAR-NBSS&LUP (Sehgal et al.)</div>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div>
                  <span className="font-bold text-stone-900">Scale:</span> 20 Eco-Regions • 60 Sub-Regions (AESRs)
                </div>
                <div>
                  <span className="font-bold text-stone-900">Classification Basis:</span> Sequential overlay of Bioclimate, Soil Great Groups, Physiography, and Length of Growing Period (LGP).
                </div>
                <div>
                  <span className="font-bold text-stone-900">Primary Purpose:</span> Soil health management, land degradation monitoring, ecological carrying capacity, and technology transfer.
                </div>
                <div>
                  <span className="font-bold text-stone-900">Source:</span> ICAR-NBSS&LUP Technical Bulletin Pub. 24 & User GIS Dataset.
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-100 mt-4 relative z-10 flex items-center justify-between">
              <SourceBadge source="SUPPLIED GIS DATA" />
              <button
                onClick={() => onSelectFramework('aez')}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 font-mono"
              >
                View 20 Regions <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card C: Other Agricultural Zoning Frameworks */}
          <div className="bg-white rounded-2xl border border-stone-300 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-stone-100 text-stone-800">
                  FRAMEWORK C
                </span>
                <span className="text-xs font-mono text-stone-500">Historical & Institutional</span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-serif-academic text-stone-900">
                  Other Historical Frameworks
                </h3>
                <div className="text-xs text-stone-500 font-mono mt-0.5">ICAR-NARP, Murthy & Pandey, Mitra</div>
              </div>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="p-2.5 rounded bg-stone-50 border border-stone-200">
                  <div className="font-bold text-stone-900">ICAR-NARP (1979): 127 Zones</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">State-level research zones delineated by ICAR for extension and SAU field stations.</div>
                </div>
                <div className="p-2.5 rounded bg-stone-50 border border-stone-200">
                  <div className="font-bold text-stone-900">Murthy & Pandey (1978): 8 Regions</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Physiographic and broad water balance regionalization at a continental macro scale.</div>
                </div>
                <div className="p-2.5 rounded bg-stone-50 border border-stone-200">
                  <div className="font-bold text-stone-900">Mitra (1977): 7 Natural Regions</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Divided into 31 sub-regions and 89 divisions for demographic levels of development.</div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-100 mt-4 flex items-center justify-between">
              <SourceBadge source="SUPPLIED PDF" subtext="e-PG Pathshala RG-38 Module" />
              <button
                onClick={() => onSelectFramework('comparison')}
                className="inline-flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-stone-900 font-mono"
              >
                Compare Systems <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

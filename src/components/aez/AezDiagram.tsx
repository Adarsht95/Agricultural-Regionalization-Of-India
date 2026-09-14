import React, { useState } from 'react';
import { Layers, ArrowRight, ArrowDown, ArrowLeft, ArrowUp, Info, ShieldAlert } from 'lucide-react';

export const AezDiagram: React.FC = () => {
  const [activeElement, setActiveElement] = useState<string>('bioclimate');

  const elementDetails: Record<string, { title: string; desc: string; method: string }> = {
    bioclimate: {
      title: 'Bioclimate & Thermal Regimes',
      desc: 'Formulated using Thornthwaite-Mather Moisture Index (MI = [P - PET] / PET). Ranges from Arid to Perhumid.',
      method: 'Establishes the macro-climatic energy and moisture parameters.'
    },
    soil: {
      title: 'Soil Great Groups & Pedology',
      desc: 'Delineated from National Bureau of Soil Survey & Land Use Planning (NBSS&LUP) soil maps at 1:7 million scale.',
      method: 'Provides soil depth, texture, available water capacity (AWC), and nutrient reserves.'
    },
    physiography: {
      title: 'Physiographic Landscape Units',
      desc: 'Topographic landforms (Himalayas, Indo-Gangetic Plains, Peninsular Plateau, Coastal Plains) that modify macro-climates.',
      method: 'Controls runoff rate, slope stability, drainage density, and meso-climates.'
    },
    lgp: {
      title: 'Length of Growing Period (LGP)',
      desc: 'Number of days when precipitation exceeds 50% PET plus the period to exhaust up to 100mm stored soil water.',
      method: 'Integrates climate and soil into a single temporal metric for crop cycle suitability.'
    }
  };

  return (
    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold font-serif-academic text-stone-900">
            Interactive Agro-Ecological Regionalization Framework
          </h3>
          <p className="text-xs text-stone-500">
            ICAR-NBSS&LUP Sequential Layering Integration Model (Sehgal et al., 1992)
          </p>
        </div>
        <div className="text-[11px] font-mono text-amber-800 bg-amber-100/70 border border-amber-300 px-2 py-1 rounded">
          Scientific Flow Diagram
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Animated Central Interaction Quad */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs relative">
          
          {/* Top: Climate */}
          <button
            onClick={() => setActiveElement('bioclimate')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-2xs ${
              activeElement === 'bioclimate'
                ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            CLIMATE / BIOCLIMATE
          </button>

          <div className="my-1 text-blue-500">
            <ArrowDown className="w-5 h-5 animate-pulse" />
          </div>

          {/* Middle Row: Soil -> Core <- Physiography */}
          <div className="flex items-center justify-center gap-3 w-full my-2">
            
            <button
              onClick={() => setActiveElement('soil')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-2xs ${
                activeElement === 'soil'
                  ? 'bg-amber-700 text-white ring-4 ring-amber-200'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              SOIL
            </button>

            <div className="text-amber-600">
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>

            {/* Core Node */}
            <div className="p-4 rounded-2xl bg-[#1b4332] text-white text-center shadow-md border-2 border-emerald-500/40">
              <div className="text-xs font-mono font-bold text-amber-300 tracking-wider">
                AGRO-ECOLOGY
              </div>
              <div className="text-[10px] text-emerald-200 mt-0.5">
                Dynamic Ecological Synthesis
              </div>
            </div>

            <div className="text-stone-600">
              <ArrowLeft className="w-4 h-4 animate-pulse" />
            </div>

            <button
              onClick={() => setActiveElement('physiography')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-2xs ${
                activeElement === 'physiography'
                  ? 'bg-stone-800 text-white ring-4 ring-stone-300'
                : 'bg-stone-100 text-stone-800 border border-stone-300 hover:bg-stone-200'
              }`}
            >
              PHYSIOGRAPHY
            </button>
          </div>

          <div className="my-1 text-emerald-600">
            <ArrowUp className="w-5 h-5 animate-pulse" />
          </div>

          {/* Bottom: LGP */}
          <button
            onClick={() => setActiveElement('lgp')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-2xs ${
              activeElement === 'lgp'
                ? 'bg-emerald-700 text-white ring-4 ring-emerald-200'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            LENGTH OF GROWING PERIOD (LGP)
          </button>

          {/* Hierarchy Progression Footer */}
          <div className="mt-8 pt-4 border-t border-stone-200 w-full flex items-center justify-around text-xs font-mono text-center">
            <div>
              <div className="font-bold text-stone-900">20 REGIONS</div>
              <div className="text-[10px] text-stone-500">Macro AERs</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            <div>
              <div className="font-bold text-stone-900">60 SUB-REGIONS</div>
              <div className="text-[10px] text-stone-500">Meso AESRs</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            <div>
              <div className="font-bold text-stone-900">MICRO-ZONES / UNITS</div>
              <div className="text-[10px] text-stone-500">AEUs for Field Plans</div>
            </div>
          </div>

        </div>

        {/* Right Element Details */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-stone-200 shadow-2xs h-full flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold mb-1">
              Active Layer Detail
            </div>
            <h4 className="text-sm font-bold text-stone-900 mb-2">
              {elementDetails[activeElement].title}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              {elementDetails[activeElement].desc}
            </p>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900">Methodology Role:</span> {elementDetails[activeElement].method}
            </div>
          </div>

          <div className="text-[10px] font-mono text-stone-400 pt-4 border-t border-stone-100 mt-4">
            Source: Sehgal et al. (1992), ICAR-NBSS&LUP Pub. 24
          </div>
        </div>

      </div>
    </div>
  );
};

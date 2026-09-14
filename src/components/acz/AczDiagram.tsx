import React, { useState } from 'react';
import { CloudRain, Thermometer, Droplets, Sun, ArrowDown, Info, ShieldAlert } from 'lucide-react';

export const AczDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('rainfall');

  const nodeDetails: Record<string, { title: string; desc: string; role: string }> = {
    rainfall: {
      title: 'Rainfall & Precipitation Dynamics',
      desc: 'Mean annual volume, southwest and northeast monsoon distribution, and seasonal variability.',
      role: 'Determines whether crops are rainfed, kharif-dominant, or require extensive irrigation infrastructure.'
    },
    temperature: {
      title: 'Thermal Regimes & Extreme Ranges',
      desc: 'Mean January (winter minimums) and July (summer maximums) temperatures across agro-climatic zones.',
      role: 'Sets photoperiodic limits, frost risks in the Himalayas, and heat stress limits in western dry plains.'
    },
    moisture: {
      title: 'Water Balance & Moisture Availability',
      desc: 'Interaction of precipitation (P) with potential evapotranspiration (PET) and groundwater aquifer conditions.',
      role: 'Establishes the water deficit periods and guides sustainable groundwater draft levels.'
    },
    growing_conditions: {
      title: 'Growing Conditions & Seasonality',
      desc: 'Frost-free days, sunshine hours, and favorable agro-meteorological windows.',
      role: 'Dictates cropping calendars (Kharif, Rabi, Zaid) and multi-cropping intensity.'
    }
  };

  return (
    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold font-serif-academic text-stone-900">
            Conceptual Structure of Agro-Climatic Regionalization
          </h3>
          <p className="text-xs text-stone-500">
            Click any climatic parameter to explore its role in the Planning Commission (1989) typology
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-100/70 border border-amber-300 px-2 py-1 rounded">
          <ShieldAlert className="w-3.5 h-3.5" /> Conceptual Model (Non-Empirical Diagram)
        </div>
      </div>

      {/* Interactive Tree Structure */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Tree */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-3 bg-[#1b4332] text-white rounded-xl text-center font-mono font-bold text-sm shadow-xs">
            MACRO-CLIMATE FOUNDATION
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setSelectedNode('rainfall')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedNode === 'rainfall'
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-400/30'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <CloudRain className="w-4 h-4 text-blue-600" /> Rainfall
              </div>
              <div className="text-[10px] text-stone-500 mt-1 font-mono">Volume & Isohyets</div>
            </button>

            <button
              onClick={() => setSelectedNode('temperature')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedNode === 'temperature'
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/30'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Thermometer className="w-4 h-4 text-amber-600" /> Temperature
              </div>
              <div className="text-[10px] text-stone-500 mt-1 font-mono">Jan & Jul Isotherms</div>
            </button>

            <button
              onClick={() => setSelectedNode('moisture')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedNode === 'moisture'
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/30'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Droplets className="w-4 h-4 text-emerald-600" /> Moisture Index
              </div>
              <div className="text-[10px] text-stone-500 mt-1 font-mono">P vs PET Balance</div>
            </button>

            <button
              onClick={() => setSelectedNode('growing_conditions')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedNode === 'growing_conditions'
                  ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-400/30'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                <Sun className="w-4 h-4 text-purple-600" /> Growing Regime
              </div>
              <div className="text-[10px] text-stone-500 mt-1 font-mono">Seasonality & Frost</div>
            </button>
          </div>

          {/* Flow indicator */}
          <div className="flex justify-center text-emerald-800">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Agricultural Conditions Node */}
          <div className="p-3 bg-stone-100 rounded-xl border border-stone-300 text-center text-xs font-mono font-bold text-stone-800">
            AGRICULTURAL RESOURCE CONDITIONS
            <div className="text-[11px] font-sans font-normal text-stone-600 mt-0.5">
              Soil Types • Irrigation Facilities • Cropping Patterns • Land Productivity
            </div>
          </div>

          <div className="flex justify-center text-emerald-800">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Result Node */}
          <div className="p-3.5 bg-amber-500 text-stone-950 rounded-xl text-center font-mono font-bold text-xs shadow-xs">
            15 AGRO-CLIMATIC REGIONS OF INDIA
          </div>
        </div>

        {/* Right Info Box */}
        <div className="md:col-span-5 bg-white p-5 rounded-xl border border-stone-200 shadow-2xs h-full flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold mb-1">
              Selected Parameter Detail
            </div>
            <h4 className="text-sm font-bold text-stone-900 mb-2">
              {nodeDetails[selectedNode].title}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              {nodeDetails[selectedNode].desc}
            </p>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900">Planning Relevance:</span> {nodeDetails[selectedNode].role}
            </div>
          </div>

          <div className="text-[10px] font-mono text-stone-400 pt-4 border-t border-stone-100 mt-4">
            Source: Planning Commission & NRSA (1989)
          </div>
        </div>

      </div>
    </div>
  );
};

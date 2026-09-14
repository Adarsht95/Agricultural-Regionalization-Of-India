import React from 'react';
import { Thermometer, Mountain, Sprout, Clock, ArrowUpRight } from 'lucide-react';

interface ConceptCardsProps {
  onSelectConcept?: (conceptId: string) => void;
}

export const ConceptCards: React.FC<ConceptCardsProps> = ({ onSelectConcept }) => {
  const concepts = [
    {
      id: 'climate',
      title: 'CLIMATE',
      subtitle: 'Thermal & Moisture Regimes',
      icon: Thermometer,
      accent: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Precipitation, seasonal temperature extremes, and potential evapotranspiration determine regional crop calendars and water balance.',
      indicator: 'Rainfall: 10 cm (Arid) to 400+ cm (Perhumid)'
    },
    {
      id: 'soil',
      title: 'SOIL',
      subtitle: 'Pedological Foundation',
      icon: Sprout,
      accent: 'text-amber-700 bg-amber-50 border-amber-200',
      description: 'Soil depth, texture, available water capacity (AWC), and mineralogy dictate root penetration and plant nutrient availability.',
      indicator: 'Vertisols, Inceptisols, Alfisols, Entisols'
    },
    {
      id: 'physiography',
      title: 'PHYSIOGRAPHY',
      subtitle: 'Landforms & Topography',
      icon: Mountain,
      accent: 'text-stone-700 bg-stone-100 border-stone-300',
      description: 'Relief, slope gradient, and drainage networks act as natural modifiers to regional climate, microclimates, and runoff dynamics.',
      indicator: 'Mountains, Plateaus, Alluvial Plains, Coasts'
    },
    {
      id: 'growing_period',
      title: 'GROWING PERIOD',
      subtitle: 'Length of Growing Period (LGP)',
      icon: Clock,
      accent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description: 'Continuous days when rainfall exceeds 0.5 PET plus 100mm stored soil moisture, defining the ecological window for crop maturity.',
      indicator: 'LGP: <90 days to 300+ days'
    }
  ];

  return (
    <div className="py-12 bg-[#f8fafc] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Foundational Geographic Determinants
          </div>
          <h2 className="text-2xl font-bold font-serif-academic text-stone-900">
            Four Pillars of Agricultural Regionalization
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            How physical geography parameters intersect to establish agricultural suitability zones
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {concepts.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => onSelectConcept && onSelectConcept(c.id)}
                className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${c.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="text-sm font-bold font-mono tracking-wider text-stone-900">
                    {c.title}
                  </h3>
                  <div className="text-[11px] font-medium text-emerald-700 mb-2">
                    {c.subtitle}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[10px] font-mono text-stone-500">
                  {c.indicator}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

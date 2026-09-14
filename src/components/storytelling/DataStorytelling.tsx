import React, { useState } from 'react';
import { Compass, CloudRain, Sprout, Layers, MapPin, Cpu, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export const DataStorytelling: React.FC<{ onNavigateFramework: (id: string) => void }> = ({ onNavigateFramework }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      step: '01 / 08',
      title: 'India: A Continental Geographic Mosaic',
      lead: 'From 8°4\'N in the tropical Indian Ocean to 37°6\'N in the snow-bound Karakoram, India spans 329 million hectares of diverse relief.',
      visualText: '3.287 Million Sq Km • Mainland Coastline: 6,100 km • Elevation: 0m to 8,586m',
      bgClass: 'bg-stone-900 text-white',
      accentColor: 'text-amber-400'
    },
    {
      step: '02 / 08',
      title: 'Extreme Climatic Diversity',
      lead: 'Isohyets range from under 100 mm in western Jaisalmer to over 11,000 mm in Cherrapunji; temperatures range from -40°C in Ladakh to 50°C in the Thar Desert.',
      visualText: 'Monsoon Dynamic: 75% precipitation concentrated in 100 days (June–September)',
      bgClass: 'bg-[#0f291e] text-white',
      accentColor: 'text-blue-400'
    },
    {
      step: '03 / 08',
      title: 'Agricultural Cropping Heterogeneity',
      lead: 'Over 140 million hectares of net sown area supports diverse agricultural typologies: flooded rice deltas, wheat-mustard rabi tracts, rainfed millets, and mountain tea terraces.',
      visualText: 'Major Seasons: Kharif (Monsoon), Rabi (Winter), Zaid (Summer)',
      bgClass: 'bg-[#1b4332] text-white',
      accentColor: 'text-emerald-400'
    },
    {
      step: '04 / 08',
      title: 'The Need for Spatial Regionalization',
      lead: 'Uniform macro-economic policies failed to address localized water deficits and soil vulnerabilities. Geographic regionalization became mandatory to align crop choices with physical carrying capacity.',
      visualText: 'From Administrative Districts → Homogeneous Bio-Physical Land Units',
      bgClass: 'bg-[#264653] text-white',
      accentColor: 'text-amber-300'
    },
    {
      step: '05 / 08',
      title: 'Agro-Climatic Framework (1989)',
      lead: 'The Planning Commission and NRSA partitioned India into 15 Macro-Zones and 72 Sub-zones, structuring resource-based planning during the Eighth Five-Year Plan.',
      visualText: 'Core Basis: Topography, Rainfall, Temperature, Water Resources & Cropping Pattern',
      bgClass: 'bg-[#1e3a8a] text-white',
      accentColor: 'text-blue-300'
    },
    {
      step: '06 / 08',
      title: 'Agro-Ecological Precision (1992)',
      lead: 'ICAR-NBSS&LUP advanced regionalization by superimposing soil great groups and Length of Growing Period (LGP) onto bioclimate, creating 20 refined eco-regions.',
      visualText: 'FAO Methodology: Sequential Overlay of Bioclimate + Soil + Physiography + LGP',
      bgClass: 'bg-[#78350f] text-white',
      accentColor: 'text-amber-300'
    },
    {
      step: '07 / 08',
      title: 'Modern GIS & Remote Sensing Synthesis',
      lead: 'Satellite earth observation, digital elevation models, and vectorized attribute databases now enable continuous spatial monitoring of soil moisture, NDVI vigor, and water stress.',
      visualText: 'Multi-Criteria Evaluation • Topology-Preserving Spatial Analytics',
      bgClass: 'bg-[#0f172a] text-white',
      accentColor: 'text-cyan-400'
    },
    {
      step: '08 / 08',
      title: 'Climate-Resilient Agricultural Policy',
      lead: 'Contemporary initiatives like PM Dhan-Dhaanya (2025) apply agro-climatic logic at the district level to target stress-tolerant crops, water-saving technologies, and Shree Anna millets.',
      visualText: 'Zone-Realigned Farming • Soil Health Management • Food Security',
      bgClass: 'bg-[#14532d] text-white',
      accentColor: 'text-amber-300'
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="py-12 space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
          Guided Narrative Journey
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Data Storytelling: The Geographic Arc of Indian Agriculture
        </h2>
      </div>

      {/* Interactive Story Carousel Slide */}
      <div className={`rounded-3xl p-8 sm:p-12 shadow-xl transition-all duration-300 min-h-[360px] flex flex-col justify-between ${current.bgClass}`}>
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 ${current.accentColor}`}>
              {current.step}
            </span>
            <span className="text-xs font-mono text-stone-400">Step through the 8-stage narrative</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold font-serif-academic leading-tight">
            {current.title}
          </h3>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
            {current.lead}
          </p>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className={`text-xs font-mono font-semibold ${current.accentColor}`}>
            ❖ {current.visualText}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-mono flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-xs font-mono text-stone-400 px-2">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              disabled={currentSlide === slides.length - 1}
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-mono flex items-center gap-1 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

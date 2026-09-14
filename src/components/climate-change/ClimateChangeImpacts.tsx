import React from 'react';
import { AlertTriangle, TrendingUp, Droplets, Sun, Sprout, ShieldAlert, ArrowRight } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const ClimateChangeImpacts: React.FC = () => {
  const impacts = [
    {
      zone: 'Zone 6: Trans-Gangetic Plains',
      phenomenon: 'Groundwater Depletion & Winter Heat Spikes',
      evidenceType: 'OBSERVED DATA (CGWB 2024 / CSE)',
      detail: 'Over-exploitation of deep aquifers for rice-wheat monoculture (>80% overexploited blocks in Punjab/Haryana). Rising February/March terminal temperatures cause premature grain filling and shriveling in wheat.',
      policy: 'Happy Seeder in-situ residue management, Direct Seeding of Rice (DSR), diversification into maize and pulses.'
    },
    {
      zone: 'Zone 14: Western Dry Region',
      phenomenon: 'Extreme Heat & Extended Drought Cycles',
      evidenceType: 'OBSERVED DATA (IMD 2024–25)',
      detail: 'Summer maximum temperatures touched 48°C–50°C in 2024–25. Evapotranspiration rates increased by 12%, accelerating soil salinization in canal commands with shallow groundwater tables.',
      policy: 'Promotion of Shree Anna nutri-cereals (Bajra), solar-powered precision drip irrigation, shelterbelts.'
    },
    {
      zone: 'Zone 11 & 12: Coastal & Ghat Belts',
      phenomenon: 'Cyclonic Inundation & Extreme Heavy Rain Spells',
      evidenceType: 'PUBLISHED FINDINGS (Nature Scientific Reports 2024)',
      detail: 'Short-duration torrential downpours exceeding 200 mm/day causing soil erosion and landslides in the Western Ghats; seawater intrusion corrupting deltaic rice soils in the Bay of Bengal.',
      policy: 'Mangrove bio-shields, saline-tolerant rice cultivars, climate-smart village pilot programs (NMSA).'
    },
    {
      zone: 'Zone 1 & 2: Himalayan Belts',
      phenomenon: 'Shifting Agro-Climatic Tree Lines & Glacial Melt',
      evidenceType: 'PUBLISHED FINDINGS (ICAR-IISWC)',
      detail: 'Temperate apple orchards in Himachal Pradesh and Uttarakhand are migrating 200–400 meters uphill due to reduction in required winter chilling hours (below 7°C).',
      policy: 'Promotion of low-chilling apple varieties, contour vegetative barriers, and hillside micro-water harvesting.'
    }
  ];

  return (
    <div className="py-12 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-800">
            Global Environmental Change
          </span>
          <SourceBadge source="PEER-REVIEWED SOURCE" subtext="Nature Scientific Reports (2024)" />
          <SourceBadge source="OFFICIAL SOURCE" subtext="NMSA & Ministry of Agriculture (2025)" />
        </div>
        <h2 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Why Agricultural Regionalization Matters Under Climate Change
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Climate change is altering historical isohyets and isotherms, disrupting agricultural calendars, and shifting the spatial boundaries of India's agro-climatic zones. A static national policy is no longer viable; zone-realigned planning is critical for food security.
        </p>
      </div>

      {/* Conceptual Chain Diagram */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
          Cascade of Climate Disruption in Agricultural Geography
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono font-bold">
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
            Climate Variability
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            Rainfall Shifts
          </div>
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-900">
            Temperature Spikes
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
            Water Stress
          </div>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">
            Yield Vulnerability
          </div>
          <div className="p-3 rounded-xl bg-emerald-900 text-amber-300">
            Zone Realignment
          </div>
        </div>
      </div>

      {/* Zone Specific Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impacts.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                {item.zone}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-bold">
                {item.evidenceType}
              </span>
            </div>

            <h3 className="text-base font-bold font-serif-academic text-stone-900">
              {item.phenomenon}
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed">
              {item.detail}
            </p>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800">
              <span className="font-bold text-emerald-900 font-mono">Adaptation Strategy:</span> {item.policy}
            </div>
          </div>
        ))}
      </div>

      {/* CSE 2024 Fact Highlight */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-amber-950">
          <div className="font-bold font-mono text-sm text-amber-900 uppercase">
            Centre for Science and Environment (CSE) 2024 Report: Extreme Weather Impacts
          </div>
          <p className="leading-relaxed">
            In 2024, extreme weather events occurred on ~90% of days between January and September across India, damaging an estimated 3.2 million hectares of cropland. Zone 9 (Western Plateau), Zone 14 (Western Dry), and Zone 6 (Trans-Gangetic) registered the highest agricultural disruption.
          </p>
        </div>
      </div>

    </div>
  );
};

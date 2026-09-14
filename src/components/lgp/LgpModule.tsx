import React, { useState } from 'react';
import { Clock, Droplets, Sun, Calendar, Info, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const LgpModule: React.FC = () => {
  const [lgpValue, setLgpValue] = useState<number>(135);

  // Determine crop suitability based on LGP days
  const getLgpProfile = (days: number) => {
    if (days < 90) {
      return {
        category: 'Arid / Extremely Short (<90 days)',
        color: 'text-amber-800 bg-amber-100 border-amber-300',
        crops: ['Pearl Millet (Bajra)', 'Cluster Bean (Guar)', 'Moth Bean', 'Short-duration Pulses'],
        croppingSystem: 'Single short-duration rainfed kharif crop; severe terminal drought risk without irrigation.',
        soilMoistureRole: 'Stored soil moisture is depleted within 10-15 days following monsoon cessation.',
        regions: 'Western Dry Region (Zone 14), Cold Arid Ladakh (AER 1), Thar Desert (AER 2).'
      };
    } else if (days <= 150) {
      return {
        category: 'Semi-Arid / Medium (90–150 days)',
        color: 'text-emerald-800 bg-emerald-100 border-emerald-300',
        crops: ['Sorghum (Jowar)', 'Cotton', 'Groundnut', 'Soybean', 'Pigeon Pea (Tur)', 'Maize'],
        croppingSystem: 'Single medium-duration crop or intercropping (e.g. Cotton + Pigeon Pea, Sorghum + Pulses).',
        soilMoistureRole: 'Medium black soils (Vertisols) and loamy alluvium can sustain post-rain vegetative growth.',
        regions: 'Trans-Gangetic Plain (Zone 6), Western Plateau (Zone 9), Southern Plateau (Zone 10), Gujarat (Zone 13).'
      };
    } else if (days <= 180) {
      return {
        category: 'Subhumid (Dry) / Extended (150–180 days)',
        color: 'text-blue-800 bg-blue-100 border-blue-300',
        crops: ['Wheat (rabi)', 'Rice (kharif)', 'Gram', 'Mustard', 'Sugarcane', 'Potato'],
        croppingSystem: 'Double cropping possible (Kharif paddy followed by Rabi wheat or pulses/oilseeds).',
        soilMoistureRole: 'Substantial profile storage in deep Indo-Gangetic alluvium supports rabi establishment.',
        regions: 'Upper Gangetic Plain (Zone 5), Eastern Plateau (Zone 7), Central Plateau (Zone 8).'
      };
    } else if (days <= 210) {
      return {
        category: 'Subhumid (Moist) / Long (180–210 days)',
        color: 'text-indigo-800 bg-indigo-100 border-indigo-300',
        crops: ['Rice (Boro & Aman)', 'Jute', 'Maize', 'Vegetables', 'Pulses', 'Oilseeds'],
        croppingSystem: 'Intensive sequential double and triple cropping; optimal moisture balance.',
        soilMoistureRole: 'High water tables and prolonged post-monsoon soil moisture retention.',
        regions: 'Middle Gangetic Plain (Zone 4), East Coast deltas (Zone 11).'
      };
    } else {
      return {
        category: 'Humid to Perhumid / Very Long (>210 days)',
        color: 'text-teal-800 bg-teal-100 border-teal-300',
        crops: ['Tea', 'Coffee', 'Rubber', 'Black Pepper', 'Cardamom', 'Coconut', 'Arecanut', 'Paddy (Year-round)'],
        croppingSystem: 'Perennial plantation crops, multi-tier agroforestry, and year-round multi-season paddy.',
        soilMoistureRole: 'Precipitation exceeds PET for 7-10 months; moisture stress is virtually absent.',
        regions: 'Eastern Himalayas (Zone 2), West Coast Plains & Ghats (Zone 12), Island Region (Zone 15).'
      };
    }
  };

  const currentProfile = getLgpProfile(lgpValue);

  // Calculate timeline bar segments based on slider
  // 365 days mapped across months
  const wetMonthsStart = 5.5; // mid-June
  const wetMonthsDuration = (lgpValue / 365) * 12;

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div className="py-12 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Bioclimatic Metric
          </span>
          <SourceBadge source="OFFICIAL SOURCE" subtext="FAO & ICAR-NBSS&LUP" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          What is Length of Growing Period (LGP)?
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Length of Growing Period (LGP) is the continuous period in days during the year when rainfall exceeds 50% of Potential Evapotranspiration (P &gt; 0.5 PET), plus the period required to exhaust up to 100 mm of available soil moisture stored in the profile following the cessation of rain.
        </p>
      </div>

      {/* Scientific Formula Card */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <div className="text-xs font-mono font-bold text-emerald-900 mb-1">STAGE 1: HUMID / MOIST PERIOD</div>
          <div className="text-sm font-bold font-mono text-emerald-950">Precipitation &gt; 0.5 PET</div>
          <div className="text-[11px] text-stone-600 mt-1">Water supply satisfies evapotranspiration demand for seed germination and vegetative growth.</div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
          <div className="text-xs font-mono font-bold text-blue-900 mb-1">STAGE 2: POST-RAIN MOISTURE USE</div>
          <div className="text-sm font-bold font-mono text-blue-950">+ Up to 100 mm Stored Water</div>
          <div className="text-[11px] text-stone-600 mt-1">Depletion of soil moisture stored in the root zone extends crop maturation after rains halt.</div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
          <div className="text-xs font-mono font-bold text-amber-900 mb-1">STAGE 3: DRY DORMANT PERIOD</div>
          <div className="text-sm font-bold font-mono text-amber-950">P &lt; 0.5 PET &amp; AWC Exhausted</div>
          <div className="text-[11px] text-stone-600 mt-1">Rainfed agriculture ceases without artificial irrigation or drought-hardy fallows.</div>
        </div>
      </div>

      {/* HORIZONTAL ANNUAL TIMELINE (JAN - DEC) */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold font-serif-academic text-stone-900">
              Annual Moisture &amp; Growing Period Timeline (Monsoon Cycle)
            </h3>
            <p className="text-xs text-stone-500">
              Representative annual moisture trajectory for Peninsular and Northern India under LGP = {lgpValue} days
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-800 bg-amber-100/60 px-2.5 py-1 rounded border border-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" /> Conceptual Learning Visualization
          </div>
        </div>

        {/* 12 Months Grid Bar */}
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-1 text-center font-mono text-[11px] font-bold text-stone-500">
            {months.map((m, idx) => (
              <div key={m} className={`py-1 rounded ${idx >= 5 && idx <= 9 ? 'text-emerald-800 bg-emerald-50 font-bold' : ''}`}>
                {m}
              </div>
            ))}
          </div>

          {/* Timeline Bar Visualizer */}
          <div className="h-10 w-full rounded-xl bg-stone-100 p-1 flex relative overflow-hidden border border-stone-200">
            {/* Dry Season (Jan - May) */}
            <div className="w-[45%] h-full bg-amber-200/80 rounded-l-lg flex items-center justify-center text-[10px] font-mono text-amber-900 font-bold">
              Dry Period (P &lt; 0.5 PET)
            </div>

            {/* Active Growing Period (Jun - Oct/Nov depending on slider) */}
            <div
              className="h-full bg-emerald-600 flex items-center justify-center text-[10px] font-mono text-white font-bold transition-all duration-300 shadow-xs"
              style={{ width: `${Math.min(50, (lgpValue / 365) * 100)}%` }}
            >
              Growing Period ({lgpValue} Days)
            </div>

            {/* Post-Rain Stored Moisture / Receding */}
            <div
              className="h-full bg-blue-500 flex items-center justify-center text-[9px] font-mono text-white font-bold transition-all duration-300"
              style={{ width: `${Math.min(15, (lgpValue / 365) * 30)}%` }}
            >
              Stored Water
            </div>

            {/* Winter Dry */}
            <div className="flex-1 h-full bg-amber-200/80 rounded-r-lg flex items-center justify-center text-[10px] font-mono text-amber-900 font-bold">
              Winter Dry
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-500 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Humid/Rainy Period (P &gt; PET)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Soil Moisture Reserve (100mm)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-200"></span> Dry / Deficit Period</span>
            </div>
            <span>Monsoon Onset: June • Withdrawal: October</span>
          </div>
        </div>

        {/* INTERACTIVE LGP SLIDER */}
        <div className="pt-6 border-t border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold font-mono text-stone-800 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              Adjust Length of Growing Period (LGP): <span className="text-base text-emerald-800 font-bold">{lgpValue} Days</span>
            </label>
            <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${currentProfile.color}`}>
              {currentProfile.category}
            </span>
          </div>

          <input
            type="range"
            min="60"
            max="320"
            step="5"
            value={lgpValue}
            onChange={(e) => setLgpValue(parseInt(e.target.value))}
            className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
          />

          <div className="flex justify-between text-[10px] font-mono text-stone-400">
            <span>60 Days (Extremely Arid)</span>
            <span>150 Days (Semi-Arid Benchmark)</span>
            <span>210 Days (Subhumid Threshold)</span>
            <span>320 Days (Perhumid Tropics)</span>
          </div>
        </div>

        {/* DYNAMIC SUITABILITY CARD */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900">
              Agricultural Opportunities Under LGP = {lgpValue} Days
            </h4>
            <span className="text-[10px] font-mono text-stone-500">Grounded in ICAR-NBSS&amp;LUP Criteria</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold text-stone-800 block">Suitable Crop Assemblages:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentProfile.crops.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white text-emerald-900 border border-emerald-200 font-medium">
                    ✓ {c}
                  </span>
                ))}
              </div>
              <p className="text-stone-600 pt-1 leading-relaxed">{currentProfile.croppingSystem}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-stone-800 block">Pedological Interaction &amp; Representative Regions:</span>
              <p className="text-stone-600 leading-relaxed">{currentProfile.soilMoistureRole}</p>
              <div className="pt-1 text-emerald-800 font-medium">
                <span className="font-bold text-stone-800">Matching Zones:</span> {currentProfile.regions}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

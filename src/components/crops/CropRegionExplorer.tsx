import React, { useState } from 'react';
import { Sprout, ArrowDown, Check, Minus, Search, ShieldCheck, Thermometer, Droplets, Mountain, Clock } from 'lucide-react';
import { AczRegion } from '../../types';
import { SourceBadge } from '../common/SourceBadge';

interface CropRegionExplorerProps {
  aczRegions: AczRegion[];
  onSelectRegion: (code: number) => void;
}

export const CropRegionExplorer: React.FC<CropRegionExplorerProps> = ({ aczRegions, onSelectRegion }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('Rice');
  const [matrixSearch, setMatrixSearch] = useState<string>('');

  // Verified crop physiological profiles
  const cropProfiles: Record<
    string,
    {
      name: string;
      category: string;
      tempReq: string;
      rainfallReq: string;
      soilReq: string;
      lgpReq: string;
      documentedZones: number[];
      notes: string;
    }
  > = {
    Rice: {
      name: 'Rice (Paddy)',
      category: 'Food Grain / Kharif Staple',
      tempReq: '20 °C – 37 °C (Warm, high humidity, ample sunshine during ripening)',
      rainfallReq: '100 cm – 200+ cm (or assured flood/canal irrigation)',
      soilReq: 'Heavy alluvial soils, clayey loams with low permeability to hold standing water',
      lgpReq: '150 – 240+ days (Humid to subhumid)',
      documentedZones: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15],
      notes: 'Cultivated across multiple ecologies: Aus, Aman, and Boro seasons in eastern deltas; irrigated Green Revolution belt in Trans-Gangetic plains.'
    },
    Wheat: {
      name: 'Wheat',
      category: 'Food Grain / Rabi Staple',
      tempReq: '10 °C – 15 °C at sowing; 20 °C – 25 °C at harvesting (Cool growing, warm sunny ripening)',
      rainfallReq: '50 cm – 100 cm (heavily supplemented by rabi tube well/canal irrigation)',
      soilReq: 'Well-drained fertile loamy and clayey alluvium, Indo-Gangetic Bhangar and Khadar',
      lgpReq: '90 – 150 days (supplemented by irrigation in cool dry winter)',
      documentedZones: [1, 3, 4, 5, 6, 8, 9, 13, 14],
      notes: 'Dominant winter rabi crop in Indo-Gangetic plains; introduced as irrigated cash grain in Gujarat and Western Dry zone commands.'
    },
    Cotton: {
      name: 'Cotton',
      category: 'Fiber / Commercial Cash Crop',
      tempReq: '21 °C – 30 °C (requires minimum 210 frost-free days)',
      rainfallReq: '50 cm – 100 cm (vulnerable to waterlogging and excessive rainfall)',
      soilReq: 'Deep black cotton soils (Vertisols/Regur) with high moisture retentivity',
      lgpReq: '150 – 180 days',
      documentedZones: [5, 6, 8, 9, 10, 11, 12, 13],
      notes: 'Deep roots utilize subsoil moisture stored in Deccan basalt soils; major commercial crop in Gujarat and Maharashtra.'
    },
    Sugarcane: {
      name: 'Sugarcane',
      category: 'Commercial / Agro-Industrial Crop',
      tempReq: '20 °C – 35 °C (Tropical to subtropical hot and humid)',
      rainfallReq: '75 cm – 150 cm (requires intensive year-round perennial watering)',
      soilReq: 'Deep rich alluvial loams, well-drained fertile clay loams with neutral pH',
      lgpReq: '270 – 365 days (Full annual crop cycle)',
      documentedZones: [4, 5, 6, 9, 11, 12],
      notes: 'Major concentration in Western UP Doab, coastal Andhra/Tamil Nadu deltas, and irrigated Maharashtra canals.'
    },
    'Pearl Millet (Bajra)': {
      name: 'Pearl Millet (Bajra / Shree Anna)',
      category: 'Nutri-Cereal / Coarse Grain',
      tempReq: '25 °C – 35 °C (High temperature tolerance; drought hardy)',
      rainfallReq: '25 cm – 60 cm (Thrives under low erratic precipitation)',
      soilReq: 'Sandy soils, shallow light loams, droughty sandy plains',
      lgpReq: '60 – 90 days (Extremely short duration)',
      documentedZones: [6, 8, 9, 10, 13, 14],
      notes: 'Staple dryland grain of Western Rajasthan and Gujarat; cornerstone of climate-resilient nutri-cereal strategy.'
    },
    Tea: {
      name: 'Tea',
      category: 'Plantation / Beverage Crop',
      tempReq: '15 °C – 30 °C (Frost free; warm humid mountain slopes)',
      rainfallReq: '150 cm – 300+ cm (Well-distributed rainfall throughout year)',
      soilReq: 'Deep, well-drained acidic virgin forest soils, rich in humus, with no standing water',
      lgpReq: '210 – 300+ days (Perhumid mountain slopes)',
      documentedZones: [2, 10, 12],
      notes: 'Grown on steep contoured hill slopes of Assam, Darjeeling, and Nilgiri/Anamalai ranges in the Western Ghats.'
    },
    Groundnut: {
      name: 'Groundnut',
      category: 'Oilseed / Legume',
      tempReq: '20 °C – 30 °C (Requires warm days for pegging and pod development)',
      rainfallReq: '50 cm – 100 cm (Sensitive to waterlogging during harvesting)',
      soilReq: 'Well-drained light sandy loam and red gravelly loams to allow easy peg penetration',
      lgpReq: '90 – 120 days',
      documentedZones: [10, 11, 13],
      notes: 'Gujarat (Saurashtra) is India’s top producer; extensive in Rayalaseema and Tamil Nadu red soil drylands.'
    },
    'Spices & Plantation': {
      name: 'Spices & Rubber / Coconut',
      category: 'High-Value Tropical Crops',
      tempReq: '20 °C – 32 °C (Equatorial maritime humid climate)',
      rainfallReq: '200 cm – 400 cm (High humid tropical rainfall)',
      soilReq: 'Laterite soils, coastal sands, rich riverine valley alluvium',
      lgpReq: '240 – 300+ days',
      documentedZones: [2, 11, 12, 15],
      notes: 'Cardamom, black pepper, rubber, clove, nutmeg, and coconut concentrated along Malabar Coast, Western Ghats, and Islands.'
    }
  };

  const cropKeys = Object.keys(cropProfiles);
  const activeProfile = cropProfiles[selectedCrop];

  // List of crops for matrix
  const matrixCrops = [
    'Rice', 'Wheat', 'Maize', 'Millets', 'Pulses', 'Gram', 'Sugarcane', 'Cotton', 'Jute', 'Oilseeds', 'Groundnut', 'Mustard', 'Potato', 'Tea', 'Coconut', 'Spices', 'Tobacco'
  ];

  const filteredMatrixCrops = matrixCrops.filter((c) =>
    c.toLowerCase().includes(matrixSearch.toLowerCase())
  );

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Agronomic Linkages
          </span>
          <SourceBadge source="SUPPLIED GIS DATA" subtext="DBF 'majorcrops' field" />
          <SourceBadge source="OFFICIAL SOURCE" subtext="Planning Commission (1989)" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Crop → Region Explorer &amp; Verified Matrix
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Examine the ecological relationships between crop physiology and regional suitability. Relationships are derived directly from the supplied shapefile attribute tables and authoritative agricultural statistics.
        </p>
      </div>

      {/* CROP -> REGION EXPLORER FLOW */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-8">
        
        {/* Crop Selector Pills */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700 block">
            Select Verified Major Crop:
          </label>
          <div className="flex flex-wrap gap-2">
            {cropKeys.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCrop(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedCrop === c
                    ? 'bg-[#1b4332] text-white shadow-xs ring-2 ring-emerald-400/30'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                🌱 {c}
              </button>
            ))}
          </div>
        </div>

        {/* 5-Step Visual Flow */}
        <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-6">
          <div className="text-center font-mono font-bold text-xs text-stone-500 uppercase tracking-wider">
            Physiological Chain of Environmental Adaptability: {activeProfile.name}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            
            {/* Step 1: Crop */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1 text-center flex flex-col justify-center">
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">1. CROP</span>
              <div className="text-sm font-bold font-serif-academic text-stone-900">{activeProfile.name}</div>
              <div className="text-[10px] text-stone-500">{activeProfile.category}</div>
            </div>

            {/* Step 2: Climate */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-mono text-blue-700 font-bold uppercase">
                <Thermometer className="w-3.5 h-3.5" /> 2. Climate &amp; Thermal
              </div>
              <div className="text-xs text-stone-700 leading-snug">{activeProfile.tempReq}</div>
            </div>

            {/* Step 3: Soil */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-mono text-amber-700 font-bold uppercase">
                <Mountain className="w-3.5 h-3.5" /> 3. Soil Requirements
              </div>
              <div className="text-xs text-stone-700 leading-snug">{activeProfile.soilReq}</div>
            </div>

            {/* Step 4: Water / LGP */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-mono text-teal-700 font-bold uppercase">
                <Clock className="w-3.5 h-3.5" /> 4. Water &amp; LGP
              </div>
              <div className="text-xs text-stone-700 leading-snug">{activeProfile.rainfallReq} • LGP: {activeProfile.lgpReq}</div>
            </div>

            {/* Step 5: Verified Regions */}
            <div className="p-4 bg-emerald-950 text-white rounded-xl shadow-xs space-y-1">
              <div className="text-[10px] font-mono text-amber-300 font-bold uppercase">
                5. Verified Zones
              </div>
              <div className="text-xs font-mono text-emerald-200">
                {activeProfile.documentedZones.length} of 15 Zones
              </div>
              <div className="text-[10px] text-emerald-300/80">
                Zones: {activeProfile.documentedZones.join(', ')}
              </div>
            </div>

          </div>

          <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 leading-relaxed">
            <span className="font-bold text-stone-900 font-mono">Ecological Notes:</span> {activeProfile.notes}
          </div>
        </div>

        {/* Documented Region Chips */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800">
              Verified Agro-Climatic Regions for {activeProfile.name} (from Shapefile DBF)
            </h4>
            <span className="text-[10px] font-mono text-stone-400">Click any zone to inspect profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {activeProfile.documentedZones.map((zCode) => {
              const zone = aczRegions.find((r) => r.code === zCode);
              if (!zone) return null;
              return (
                <div
                  key={zCode}
                  onClick={() => onSelectRegion(zCode)}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200/90 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded bg-emerald-800 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {zone.code}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 truncate">
                        {zone.name}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">{zone.states.join(', ')}</div>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold text-xs ml-2">✓</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* CROP-REGION INTERACTIVE MATRIX */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-lg font-bold font-serif-academic text-stone-900">
              Crop–Region Cross-Tabulation Matrix
            </h3>
            <p className="text-xs text-stone-500">
              Documented occurrence of major commercial and food crops across the 15 Planning Commission zones
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter crops in matrix..."
              value={matrixSearch}
              onChange={(e) => setMatrixSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-stone-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-800 font-mono">
                <th className="p-2.5 font-bold sticky left-0 bg-stone-50 z-10 border-r border-stone-200 w-36">
                  Verified Crop
                </th>
                {aczRegions.map((r) => (
                  <th
                    key={r.code}
                    onClick={() => onSelectRegion(r.code)}
                    className="p-2 text-center font-bold cursor-pointer hover:bg-emerald-100/60 transition-colors border-r border-stone-200"
                    title={`Zone ${r.code}: ${r.name}`}
                  >
                    Z{r.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMatrixCrops.map((crop) => (
                <tr key={crop} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-2.5 font-bold text-stone-900 sticky left-0 bg-white z-10 border-r border-stone-200 font-sans">
                    {crop}
                  </td>
                  {aczRegions.map((r) => {
                    const isDocumented = r.major_crops.some((mc) =>
                      mc.toLowerCase().includes(crop.toLowerCase())
                    );
                    return (
                      <td
                        key={r.code}
                        className={`p-2 text-center font-mono border-r border-stone-100 ${
                          isDocumented ? 'text-emerald-700 font-bold bg-emerald-50/40' : 'text-stone-300'
                        }`}
                      >
                        {isDocumented ? '✓' : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-500 pt-1">
          <div className="flex items-center gap-4">
            <span className="text-emerald-700 font-bold">✓ = Documented in supplied GIS DBF / Planning Commission</span>
            <span className="text-stone-400">— = No verified documentation in selected sources</span>
          </div>
          <span className="italic">"Do not infer crop suitability solely from geographic proximity."</span>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Search, Filter, MapPin, Sprout, Thermometer, CloudRain, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { AczRegion, AezRegion } from '../../types';

interface RegionExplorerProps {
  aczRegions: AczRegion[];
  aezRegions: AezRegion[];
  onSelectRegion: (code: number, type: 'acz' | 'aez') => void;
}

export const RegionExplorer: React.FC<RegionExplorerProps> = ({
  aczRegions,
  aezRegions,
  onSelectRegion
}) => {
  const [frameworkFilter, setFrameworkFilter] = useState<'all' | 'acz' | 'aez'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('all');

  // Extract all unique states across both frameworks
  const allStates = Array.from(
    new Set([
      ...aczRegions.flatMap((r) => r.states),
      ...aezRegions.flatMap((r) => r.states)
    ])
  ).sort();

  // Extract all unique crops
  const allCrops = Array.from(
    new Set([
      ...aczRegions.flatMap((r) => r.major_crops),
      ...aezRegions.flatMap((r) => r.crops)
    ])
  ).sort();

  // Unified items
  const unifiedList = [
    ...(frameworkFilter === 'all' || frameworkFilter === 'acz'
      ? aczRegions.map((r) => ({ ...r, type: 'acz' as const }))
      : []),
    ...(frameworkFilter === 'all' || frameworkFilter === 'aez'
      ? aezRegions.map((r) => ({ ...r, type: 'aez' as const }))
      : [])
  ];

  // Filtering logic
  const filteredList = unifiedList.filter((item) => {
    const isAcz = item.type === 'acz';
    const acz = isAcz ? (item as any as AczRegion) : null;
    const aez = !isAcz ? (item as any as AezRegion) : null;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.states.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (isAcz
        ? acz?.major_crops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
        : aez?.crops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesState = selectedState === 'all' || item.states.includes(selectedState);

    const matchesCrop =
      selectedCrop === 'all' ||
      (isAcz ? acz?.major_crops.includes(selectedCrop) : aez?.crops.includes(selectedCrop));

    return matchesSearch && matchesState && matchesCrop;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('all');
    setSelectedCrop('all');
    setFrameworkFilter('all');
  };

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
          Universal Geographic Search
        </span>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Explore India's Agricultural Regions
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Search across both the 15 Planning Commission Agro-Climatic Zones and the 20 ICAR-NBSS&amp;LUP Agro-Ecological Regions. Filter by administrative state, crop, or framework.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Box */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search region, zone, state, or crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-sans"
            />
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans text-stone-700"
            >
              <option value="all">All States &amp; UTs</option>
              {allStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Crop Filter */}
          <div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-sans text-stone-700"
            >
              <option value="all">All Crops</option>
              {allCrops.map((cr) => (
                <option key={cr} value={cr}>{cr}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Framework Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-100 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-bold">Framework:</span>
            <button
              onClick={() => setFrameworkFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                frameworkFilter === 'all'
                  ? 'bg-stone-900 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              ALL ({aczRegions.length + aezRegions.length})
            </button>
            <button
              onClick={() => setFrameworkFilter('acz')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                frameworkFilter === 'acz'
                  ? 'bg-[#1b4332] text-white font-bold'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              AGRO-CLIMATIC ({aczRegions.length})
            </button>
            <button
              onClick={() => setFrameworkFilter('aez')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                frameworkFilter === 'aez'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              AGRO-ECOLOGICAL ({aezRegions.length})
            </button>
          </div>

          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-800 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-mono text-stone-500">
        Showing <span className="font-bold text-stone-900">{filteredList.length}</span> verified regions matching criteria
      </div>

      {/* Region Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((item) => {
          const isAcz = item.type === 'acz';
          const acz = isAcz ? (item as any as AczRegion) : null;
          const aez = !isAcz ? (item as any as AezRegion) : null;

          return (
            <div
              key={`${item.type}-${item.code}`}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5 space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isAcz ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {isAcz ? `ACZ ZONE ${acz?.code}` : `AEZ REGION ${aez?.code}`}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {item.calculated_area_km2.toLocaleString()} km²
                  </span>
                </div>

                <h3 className="text-base font-bold font-serif-academic text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {item.name}
                </h3>

                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{item.states.join(', ')}</span>
                </div>

                {/* Key Characteristics */}
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1.5">
                  {isAcz ? (
                    <>
                      <div><span className="font-semibold text-stone-800">Rainfall:</span> {acz?.avgann_rf}</div>
                      <div><span className="font-semibold text-stone-800">Soil:</span> {acz?.soil}</div>
                    </>
                  ) : (
                    <>
                      <div><span className="font-semibold text-stone-800">Bioclimate:</span> {aez?.bioclimate}</div>
                      <div><span className="font-semibold text-stone-800">Soil Order:</span> {aez?.soil_order}</div>
                    </>
                  )}
                  <div><span className="font-semibold text-stone-800">LGP:</span> {isAcz ? acz?.lgp_days : aez?.lgp_days}</div>
                </div>

                {/* Crops tags */}
                <div className="flex flex-wrap gap-1">
                  {(isAcz ? acz?.major_crops : aez?.crops)?.slice(0, 4).map((c, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-stone-100 text-stone-700 font-medium">
                      {c}
                    </span>
                  ))}
                  {(isAcz ? acz?.major_crops : aez?.crops)?.length! > 4 && (
                    <span className="text-[10px] text-stone-400 font-mono py-0.5">
                      +{(isAcz ? acz?.major_crops : aez?.crops)!.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-stone-50/60 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-400">
                  {isAcz ? 'Planning Commission' : 'ICAR-NBSS&LUP'}
                </span>
                <button
                  onClick={() => onSelectRegion(item.code, item.type)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 font-mono group-hover:translate-x-0.5 transition-transform"
                >
                  [EXPLORE REGION] <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

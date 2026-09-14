import React from 'react';
import { X, MapPin, Thermometer, CloudRain, Sprout, Mountain, Clock, AlertTriangle, Lightbulb, Compass, FileText, ExternalLink } from 'lucide-react';
import { AczRegion, AezRegion } from '../../types';
import { SourceBadge } from './SourceBadge';

interface ModalDrawerProps {
  region: AczRegion | AezRegion | null;
  type: 'acz' | 'aez';
  onClose: () => void;
}

export const ModalDrawer: React.FC<ModalDrawerProps> = ({ region, type, onClose }) => {
  if (!region) return null;

  const isAcz = type === 'acz';
  const acz = isAcz ? (region as AczRegion) : null;
  const aez = !isAcz ? (region as AezRegion) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col border-l border-stone-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#1b4332] text-white p-6 border-b border-emerald-800 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-400 text-stone-900">
                  {isAcz ? `ACZ ZONE ${acz?.code}` : `AEZ REGION ${aez?.code}`}
                </span>
                <span className="text-xs font-mono text-emerald-300">
                  {isAcz ? 'Planning Commission (1989)' : 'ICAR-NBSS&LUP (1992)'}
                </span>
              </div>
              <h2 className="text-xl font-bold font-serif-academic text-white tracking-wide">
                {region.name}
              </h2>
              <div className="text-xs text-emerald-200/90 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{region.states.join(', ')}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 hover:text-white transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8 flex-1">
          
          {/* AT A GLANCE METRICS */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 shadow-xs">
            <h3 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-3">
              At a Glance Parameters
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-blue-600 font-semibold mb-1">
                  <CloudRain className="w-4 h-4" /> Rainfall
                </div>
                <div className="font-mono text-stone-800 font-medium">
                  {isAcz ? acz?.avgann_rf : 'Variable across eco-region'}
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-amber-600 font-semibold mb-1">
                  <Thermometer className="w-4 h-4" /> Temp Range
                </div>
                <div className="font-mono text-stone-800 font-medium">
                  {isAcz ? `Jan: ${acz?.avgtmp_jan} | Jul: ${acz?.avgtmp_jul}` : aez?.bioclimate}
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
                  <Clock className="w-4 h-4" /> LGP (Days)
                </div>
                <div className="font-mono text-stone-800 font-medium">
                  {isAcz ? acz?.lgp_days : aez?.lgp_days}
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs col-span-2 sm:col-span-3">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold mb-1">
                  <Mountain className="w-4 h-4 text-stone-600" /> Soil Classification
                </div>
                <div className="text-stone-800">
                  {isAcz ? acz?.soil : aez?.soil_order}
                </div>
              </div>
            </div>
          </div>

          {/* 10-SECTION DETAILED PROFILE */}
          <div className="space-y-6 text-sm text-stone-700">
            
            {/* 1. Geographic Setting */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif-academic text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-700" /> 1. Geographic Setting
              </h4>
              <p className="leading-relaxed">
                {region.physiography}
              </p>
              <div className="text-xs font-mono text-stone-500 flex flex-wrap gap-4 pt-1">
                <span>Centroid: Lat {region.centroid[0]}°, Lon {region.centroid[1]}°</span>
                <span>Calculated Area: {region.calculated_area_km2.toLocaleString()} km² ({region.calculated_area_ha.toLocaleString()} ha)</span>
              </div>
            </div>

            {/* 2. Climate */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif-academic text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-600" /> 2. Climate & Agro-Meteorology
              </h4>
              {isAcz ? (
                <div className="space-y-1 text-xs">
                  <p><span className="font-semibold text-stone-900">January Temperature:</span> {acz?.avgtmp_jan}</p>
                  <p><span className="font-semibold text-stone-900">July Temperature:</span> {acz?.avgtmp_jul}</p>
                  <p><span className="font-semibold text-stone-900">Average Annual Rainfall:</span> {acz?.avgann_rf}</p>
                </div>
              ) : (
                <p className="leading-relaxed text-xs">
                  <span className="font-semibold text-stone-900">Bioclimatic Classification:</span> {aez?.bioclimate}. Characterized by moisture index and thermal regime matching the {aez?.name} delineation.
                </p>
              )}
            </div>

            {/* 3. Soil */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif-academic text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-amber-700" /> 3. Soil Characteristics
              </h4>
              <p className="leading-relaxed text-xs">
                {isAcz ? acz?.soil : `Dominant Soil Order: ${aez?.soil_order}. Soil depth, moisture retention capacity and parent lithology regulate crop rooting zones.`}
              </p>
            </div>

            {/* 4. Physiography */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif-academic text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
                <Mountain className="w-4 h-4 text-stone-600" /> 4. Physiography & Landforms
              </h4>
              <p className="leading-relaxed text-xs">
                {isAcz ? acz?.physiography : `Geomorphic unit: ${aez?.raw_physio}. Topography dictates runoff, drainage density, and agricultural terracing suitability.`}
              </p>
            </div>

            {/* 5. Growing Period (LGP) */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif-academic text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> 5. Length of Growing Period (LGP)
              </h4>
              <p className="leading-relaxed text-xs">
                Estimated LGP: <span className="font-semibold text-stone-900">{isAcz ? acz?.lgp_days : aez?.lgp_days}</span>.
                Determined by the number of days when precipitation exceeds 0.5 PET plus the period of stored soil moisture utilization.
              </p>
            </div>

            {/* 6 & 7. Crops & Agriculture */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif-academic text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" /> 6 & 7. Agricultural Characteristics & Major Crops
              </h4>
              <div className="flex flex-wrap gap-1.5 my-2">
                {(isAcz ? acz?.major_crops : aez?.crops)?.map((crop, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium">
                    ✓ {crop}
                  </span>
                ))}
              </div>
              {isAcz && acz?.horticulture && acz.horticulture.length > 0 && (
                <div className="text-xs pt-1">
                  <span className="font-semibold text-stone-900">Horticulture & Plantation:</span> {acz.horticulture.join(', ')}
                </div>
              )}
              {isAcz && acz?.pastoral_activities && (
                <div className="text-xs pt-1">
                  <span className="font-semibold text-stone-900">Allied Sectors / Pastoral Activities:</span> {acz.pastoral_activities}
                </div>
              )}
            </div>

            {/* 8. Regional Constraints */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif-academic text-rose-900 border-b border-rose-200 pb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> 8. Environmental & Agricultural Constraints
              </h4>
              <ul className="space-y-1 text-xs text-rose-950 list-disc list-inside">
                {(isAcz ? acz?.constraints : aez?.constraints)?.map((con, idx) => (
                  <li key={idx} className="leading-relaxed">{con}</li>
                ))}
              </ul>
            </div>

            {/* 9 & 10. Planning Relevance & Strategies */}
            {isAcz && acz?.development_strategies && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold font-serif-academic text-stone-900 border-b border-stone-200 pb-1 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" /> 9 & 10. Planning Relevance & Priority Strategies
                </h4>
                <ul className="space-y-1 text-xs text-stone-700 list-disc list-inside">
                  {acz.development_strategies.map((strat, idx) => (
                    <li key={idx} className="leading-relaxed">{strat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* DATA SOURCE & PROVENANCE */}
            <div className="pt-4 border-t-2 border-stone-200 space-y-3 bg-stone-50 p-4 rounded-xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                Data Provenance & Source Transparency
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <SourceBadge source={isAcz ? acz!.source_attribution.provenance_badge : 'SUPPLIED GIS DATA'} />
                <SourceBadge source="OFFICIAL SOURCE" subtext={isAcz ? 'Planning Commission (1989)' : 'ICAR-NBSS&LUP (1992)'} />
                <SourceBadge source="DERIVED FROM GIS" subtext="Geodesic polygon geometry area" />
              </div>
              <div className="text-[11px] font-mono text-stone-600 space-y-1">
                <div><span className="text-stone-900 font-semibold">GIS File:</span> {isAcz ? 'Agroclimatic_regions.shp' : 'Agro_Ecological_regions.shp'}</div>
                <div><span className="text-stone-900 font-semibold">Classification:</span> {isAcz ? 'Planning Commission & NRSA (1989)' : 'ICAR-NBSS&LUP (Sehgal et al., 1992)'}</div>
                <div><span className="text-stone-900 font-semibold">Literature Citation:</span> {isAcz ? acz?.source_attribution.literature_source : 'Technical Bulletin NBSS Pub. 24'}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1b4332] text-white hover:bg-emerald-900 text-xs font-semibold tracking-wide transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};

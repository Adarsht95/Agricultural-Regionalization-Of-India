import React from 'react';
import { Compass, BookOpen, Layers, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { AczRegion } from '../../types';
import { AczInteractiveMap } from './AczInteractiveMap';
import { AczDiagram } from './AczDiagram';
import { SourceBadge } from '../common/SourceBadge';

interface AczModuleProps {
  regions: AczRegion[];
  onSelectRegion: (code: number) => void;
  selectedRegionCode?: number | null;
}

export const AczModule: React.FC<AczModuleProps> = ({ regions, onSelectRegion, selectedRegionCode }) => {
  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-mono text-xs font-bold">
            FRAMEWORK I
          </span>
          <SourceBadge source="SUPPLIED GIS DATA" subtext="Agroclimatic_regions.shp" />
          <SourceBadge source="OFFICIAL SOURCE" subtext="Planning Commission (1989)" />
          <SourceBadge source="SUPPLIED PDF" subtext="e-PG Pathshala RG-38" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Agro-Climatic Regionalization
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          In 1989, the Planning Commission of India, in technical collaboration with the National Remote Sensing Agency (NRSA), delineated India into 15 Agro-Climatic Regions (further divided into 72 more homogeneous sub-zones). This initiative marked a historic transition from administrative boundaries to resource-based geographic units for agricultural planning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block font-mono">Institutional Origin:</span>
            Planning Commission of India & NRSA (1989), Seventh Five-Year Plan Mid-Term Review.
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block font-mono">Delineation Criteria:</span>
            Physiography, soils, rainfall, temperatures, water availability, and cropping suitability.
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block font-mono">Spatial Hierarchy:</span>
            15 Macro-Regions → 72 Homogeneous Sub-zones across 329 million hectares.
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold font-serif-academic text-stone-900">
              Interactive Agro-Climatic Map of India
            </h2>
            <p className="text-xs text-stone-500">
              Pan, zoom, hover or click any of the 15 verified zones to inspect attributes and agricultural profiles
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            EPSG:4326 WGS84 • Source: Agroclimatic_regions.shp
          </div>
        </div>

        <AczInteractiveMap
          regions={regions}
          onSelectRegion={onSelectRegion}
          selectedRegionCode={selectedRegionCode}
        />
      </div>

      {/* Conceptual Classification Diagram */}
      <div className="pt-6">
        <AczDiagram />
      </div>

      {/* Academic Synthesis: Planning Relevance */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
        <h3 className="text-base font-bold font-serif-academic text-stone-900">
          Agricultural Planning Relevance & Five Core Objectives
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          The Planning Commission identified five central objectives for agro-climatic regional planning to overcome the regional imbalances created by the early Green Revolution:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-medium text-stone-800 shadow-2xs">
            1. Optimize crop production based on inherent land capabilities
          </div>
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-medium text-stone-800 shadow-2xs">
            2. Increase farm household incomes through location-tailored packages
          </div>
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-medium text-stone-800 shadow-2xs">
            3. Generate sustainable rural employment and curb distress migration
          </div>
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-medium text-stone-800 shadow-2xs">
            4. Judicious and sustainable utilization of surface and groundwater
          </div>
          <div className="p-3 bg-white rounded-lg border border-stone-200 font-medium text-stone-800 shadow-2xs">
            5. Reduce inter-regional inequalities in agricultural development
          </div>
        </div>
      </div>

    </div>
  );
};

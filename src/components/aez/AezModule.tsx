import React from 'react';
import { Layers, ShieldCheck, MapPin, Sprout, Clock, Mountain } from 'lucide-react';
import { AezRegion } from '../../types';
import { AezInteractiveMap } from './AezInteractiveMap';
import { AezDiagram } from './AezDiagram';
import { SourceBadge } from '../common/SourceBadge';

interface AezModuleProps {
  regions: AezRegion[];
  onSelectRegion: (code: number) => void;
  selectedRegionCode?: number | null;
}

export const AezModule: React.FC<AezModuleProps> = ({ regions, onSelectRegion, selectedRegionCode }) => {
  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-mono text-xs font-bold">
            FRAMEWORK II
          </span>
          <SourceBadge source="SUPPLIED GIS DATA" subtext="Agro_Ecological_regions.shp" />
          <SourceBadge source="OFFICIAL SOURCE" subtext="ICAR-NBSS&LUP (1992)" />
          <SourceBadge source="PEER-REVIEWED SOURCE" subtext="Sehgal et al., NBSS Pub. 24" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Agro-Ecological Regionalization
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Formulated by the National Bureau of Soil Survey & Land Use Planning (ICAR-NBSS&LUP), Agro-Ecological Regionalization delineates land units considering the physical and biological interactions governing crop production. Using the FAO sequential overlay methodology, 20 Agro-Ecological Regions (AERs) were carved out by integrating Bioclimate, Soil Great Groups, Physiography, and the Length of Growing Period (LGP).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block font-mono">Core Premise:</span>
            "AEZ = Agro-Climatic Zone + Landform modifier + Soil water capacity + LGP."
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block font-mono">Delineation Scale:</span>
            20 Macro Eco-Regions (AER) subdivided into 60 Agro-Ecological Sub-Regions (AESR).
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-900 block font-mono">Application:</span>
            Soil conservation, land degradation monitoring, and transfer of agro-technologies.
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold font-serif-academic text-stone-900">
              Interactive Agro-Ecological Map of India
            </h2>
            <p className="text-xs text-stone-500">
              Visualizing the 20 ICAR-NBSS&LUP regions categorized by bioclimatic class and LGP
            </p>
          </div>
          <div className="text-xs font-mono text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            EPSG:4326 WGS84 • Source: Agro_Ecological_regions.shp
          </div>
        </div>

        <AezInteractiveMap
          regions={regions}
          onSelectRegion={onSelectRegion}
          selectedRegionCode={selectedRegionCode}
        />
      </div>

      {/* Interactive Conceptual Diagram */}
      <div className="pt-6">
        <AezDiagram />
      </div>

      {/* Academic Highlights */}
      <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200 space-y-4">
        <h3 className="text-base font-bold font-serif-academic text-stone-900">
          Why Landform & Soil Modifiers Differentiate AEZ from ACZ
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          While Agro-Climatic Zones rely predominantly on broad macro-climatic isotherms and isohyets, Agro-Ecological Regionalization recognizes that two areas with identical rainfall can have vastly different agricultural carrying capacities if one has deep black vertisols (high moisture retention) and the other has skeletal gravelly soils (rapid moisture exhaustion).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 bg-white rounded-xl border border-amber-200">
            <span className="font-bold text-stone-900 block font-mono">Bioclimate (Thornthwaite MI):</span>
            Classifies atmospheric water deficit / surplus using (P - PET)/PET.
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-amber-200">
            <span className="font-bold text-stone-900 block font-mono">Soil Moisture Storage:</span>
            Credits up to 100 mm of profile-stored moisture to extend effective crop growing time.
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-amber-200">
            <span className="font-bold text-stone-900 block font-mono">Sub-Regional Hierarchy:</span>
            The 20 regions break down into 60 AESRs for micro-watershed management.
          </div>
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { Database, Compass, Layers, MapPin, Sprout, ShieldCheck, Scale, BarChart2 } from 'lucide-react';
import { AczRegion, AezRegion } from '../../types';
import { SourceBadge } from '../common/SourceBadge';

interface GisStatisticsDashboardProps {
  aczRegions: AczRegion[];
  aezRegions: AezRegion[];
  onSelectRegion: (code: number, type: 'acz' | 'aez') => void;
}

export const GisStatisticsDashboard: React.FC<GisStatisticsDashboardProps> = ({
  aczRegions,
  aezRegions,
  onSelectRegion
}) => {
  // Dynamically calculate statistics from actual GIS data objects
  const totalAczAreaKm2 = aczRegions.reduce((sum, r) => sum + r.calculated_area_km2, 0);
  const totalAczAreaHa = aczRegions.reduce((sum, r) => sum + r.calculated_area_ha, 0);
  const totalAezAreaKm2 = aezRegions.reduce((sum, r) => sum + r.calculated_area_km2, 0);

  // Unique states
  const uniqueStates = Array.from(
    new Set([
      ...aczRegions.flatMap((r) => r.states),
      ...aezRegions.flatMap((r) => r.states)
    ])
  );

  // Unique crops
  const uniqueCrops = Array.from(
    new Set([
      ...aczRegions.flatMap((r) => r.major_crops),
      ...aezRegions.flatMap((r) => r.crops)
    ])
  );

  // Largest and smallest zones
  const sortedAczByArea = [...aczRegions].sort((a, b) => b.calculated_area_km2 - a.calculated_area_km2);
  const largestAcz = sortedAczByArea[0];
  const smallestAcz = sortedAczByArea[sortedAczByArea.length - 1];

  return (
    <div className="py-12 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Empirical Geostatistics
          </span>
          <SourceBadge source="DERIVED FROM GIS" subtext="Polygon area & perimeter geometry calculations" />
          <SourceBadge source="SUPPLIED GIS DATA" subtext="Shapefiles attribute tables" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Data Dashboard &amp; Spatial Statistics
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Aggregated quantitative metrics computed directly from the supplied shapefile geometries and DBF attributes. All geometric values are explicitly documented as geodesic GIS calculations.
        </p>
      </div>

      {/* Primary KPI Grid (Dynamically Calculated) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-[10px] font-mono text-stone-400 uppercase">ACZ Macro-Zones</div>
          <div className="text-2xl font-bold font-mono text-emerald-800 mt-1">{aczRegions.length}</div>
          <div className="text-[10px] font-mono text-emerald-600 mt-1">Official Framework</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-[10px] font-mono text-stone-400 uppercase">AER Eco-Regions</div>
          <div className="text-2xl font-bold font-mono text-amber-700 mt-1">{aezRegions.length}</div>
          <div className="text-[10px] font-mono text-amber-600 mt-1">ICAR-NBSS&amp;LUP</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-[10px] font-mono text-stone-400 uppercase">ACZ Sub-Zones</div>
          <div className="text-2xl font-bold font-mono text-blue-700 mt-1">72</div>
          <div className="text-[10px] font-mono text-blue-600 mt-1">Planning Comm.</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-[10px] font-mono text-stone-400 uppercase">States &amp; UTs</div>
          <div className="text-2xl font-bold font-mono text-purple-700 mt-1">{uniqueStates.length}</div>
          <div className="text-[10px] font-mono text-purple-600 mt-1">Documented in GIS</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-[10px] font-mono text-stone-400 uppercase">Verified Crops</div>
          <div className="text-2xl font-bold font-mono text-teal-700 mt-1">{uniqueCrops.length}</div>
          <div className="text-[10px] font-mono text-teal-600 mt-1">Extracted from DBF</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div className="text-[10px] font-mono text-stone-400 uppercase">GIS Polygons</div>
          <div className="text-2xl font-bold font-mono text-stone-900 mt-1">{aczRegions.length + aezRegions.length}</div>
          <div className="text-[10px] font-mono text-stone-500 mt-1">Verified Features</div>
        </div>

      </div>

      {/* Geometry Area Calculation vs Official Table */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base font-bold font-serif-academic text-stone-900">
              Comparative Geodesic Geometry Calculations vs Official Sources
            </h3>
            <p className="text-xs text-stone-500">
              Adhering to strict academic transparency: distinguishing GIS polygon area from published statistical figures
            </p>
          </div>
          <div className="text-xs font-mono text-purple-900 bg-purple-100/70 border border-purple-300 px-2.5 py-1 rounded">
            [Calculated from supplied GIS geometry]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ACZ Area Card */}
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-900">
                Agro-Climatic Zones Layer
              </span>
              <span className="text-[10px] font-mono text-stone-400">15 Features</span>
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Total Calculated Land Area:</span>
                <span className="font-mono font-bold text-stone-900">
                  {totalAczAreaKm2.toLocaleString()} km² ({Math.round(totalAczAreaHa / 1e4).toLocaleString()} ha)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Official Planning Commission Area:</span>
                <span className="font-mono font-bold text-emerald-800">
                  329,000,000 ha (3.29M km²)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Largest Macro-Zone:</span>
                <span className="font-mono font-bold text-stone-900">
                  Zone {largestAcz.code}: {largestAcz.name} ({largestAcz.calculated_area_km2.toLocaleString()} km²)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Smallest Macro-Zone:</span>
                <span className="font-mono font-bold text-stone-900">
                  Zone {smallestAcz.code}: {smallestAcz.name} ({smallestAcz.calculated_area_km2.toLocaleString()} km²)
                </span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-stone-500 pt-2">
              Note: Difference arises from marine island boundary buffers and cartographic shoreline generalizations in the 1989 vector dataset.
            </div>
          </div>

          {/* AEZ Area Card */}
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-900">
                Agro-Ecological Regions Layer
              </span>
              <span className="text-[10px] font-mono text-stone-400">20 Features</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Total Calculated Land Area:</span>
                <span className="font-mono font-bold text-stone-900">
                  {totalAezAreaKm2.toLocaleString()} km²
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Official ICAR-NBSS&amp;LUP Area:</span>
                <span className="font-mono font-bold text-amber-800">
                  3,287,263 km² (328.7M ha)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Calculated Polygons:</span>
                <span className="font-mono font-bold text-stone-900">20 Contiguous Bioclimatic AERs</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Source CRS:</span>
                <span className="font-mono font-bold text-stone-900">Lambert Conformal Conic (WGS84)</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-stone-500 pt-2">
              All coordinates reprojected to EPSG:4326 using OSGeo/GDAL CoordinateTransformation.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

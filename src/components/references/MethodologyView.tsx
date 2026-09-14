import React from 'react';
import { Layers, Database, CheckCircle2, ShieldCheck, Cpu, GitBranch, ArrowRight } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const MethodologyView: React.FC = () => {
  const pipeline = [
    {
      step: '1. Data Inspection & Ingestion',
      title: 'Local Spatial File Audit',
      detail: 'Direct programmatic interrogation of the user workspace shapefiles (`Agroclimatic_regions.shp` and `Agro_Ecological_regions.shp`), checking ESRI Shapefile components (.shp, .shx, .dbf, .prj, .sbn). Textual extraction from `Notes.docx` and supplied academic PDF documents using Python PyPDF2.'
    },
    {
      step: '2. Spatial CRS Validation',
      title: 'Coordinate Reference System Verification',
      detail: 'Validation of the native projection: `WGS_1984_Lambert_Conformal_Conic` (`+proj=lcc +lat_0=24 +lon_0=80 +lat_1=12.4729444 +lat_2=35.17280555 +x_0=4000000 +y_0=4000000 +datum=WGS84`). Reprojection to EPSG:4326 (WGS84) via OSGeo/GDAL CoordinateTransformation with traditional axis mapping (Lon/Lat).'
    },
    {
      step: '3. Web Optimization & Simplification',
      title: 'Topology-Preserving Vector Optimization',
      detail: 'Generation of dual vector tiers: (a) Full-fidelity GeoJSON for spatial fidelity, and (b) Web-optimized GeoJSON (0.004 degree tolerance, 5 decimal precision) reducing payloads from ~13 MB to ~950 KB for smooth 60 FPS client-side rendering in Leaflet.'
    },
    {
      step: '4. Attribute Standardization',
      title: 'Zero Hallucination Attribution',
      detail: 'Inspection and verbatim extraction of the DBF attribute tables (`regionname`, `avgtmp_jan`, `avgtmp_jul`, `avgann_rf`, `soil`, `majorcrops`, `area_ha`, `ae_regcode`, `physio_reg`, `area_sqkm`). Explicit cross-checking with Planning Commission (1989) and ICAR-NBSS&LUP (1992) literature.'
    },
    {
      step: '5. Geodesic Calculations',
      title: 'Empirical Geometry Metrics',
      detail: 'Computation of geodesic polygon surface areas (km² and ha) and boundary perimeters using native vector geometry, explicitly labeled as `[Calculated from supplied GIS geometry]` to distinguish from published census statistics.'
    },
    {
      step: '6. Interactive Visualization Delivery',
      title: 'Component Architecture',
      detail: 'Deployment of client-side React 18 + Leaflet + Recharts application with searchable matrix indices, interactive sliders, dynamic map layer toggles, and instant full profile modal inspectors.'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Technical Methodology
          </span>
          <SourceBadge source="OFFICIAL SOURCE" subtext="Data audit pipeline" />
        </div>
        <h3 className="text-2xl font-bold font-serif-academic text-stone-900">
          GIS Preprocessing Pipeline &amp; Data Provenance Methodology
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          Comprehensive documentation of the technical pipeline used to transform the supplied raw GIS shapefiles, DBF tables, and academic texts into this interactive digital geography atlas.
        </p>
      </div>

      {/* Distinction Alert: Data vs Interpretation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
          <div className="text-xs font-mono font-bold text-emerald-950 uppercase flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" /> EMPIRICAL DATA DEFINITION
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            Values extracted directly from the supplied shapefile DBF tables (e.g. `avgann_rf: 100 cm To 200 cm`, `soil: Regur`, polygon coordinates) and official publications. Never altered or modified.
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
          <div className="text-xs font-mono font-bold text-amber-950 uppercase flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-amber-700" /> DERIVED / INTERPRETATIVE VALUES
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Values calculated programmatically from vector geometries (e.g. geodesic area in km²) or synthesized from academic literature. Always explicitly badged with provenance metadata.
          </p>
        </div>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-4 pt-2">
        {pipeline.map((p, idx) => (
          <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-emerald-900">{p.step}</span>
              <span className="text-stone-400">Phase 0{idx + 1}</span>
            </div>
            <h4 className="text-sm font-bold text-stone-900 font-serif-academic">{p.title}</h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">{p.detail}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

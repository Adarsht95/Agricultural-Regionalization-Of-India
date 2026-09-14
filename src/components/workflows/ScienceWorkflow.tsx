import React, { useState } from 'react';
import { ArrowDown, Cpu, Database, Satellite, Layers, BarChart, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

export const ScienceWorkflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    {
      step: 1,
      title: 'INPUT DATASETS',
      subtitle: 'Multi-Source Environmental Layers',
      desc: 'Climatic time series (IMD gridded rainfall and temperature), NBSS&LUP 1:7M soil series maps, SRTM/Cartosat digital elevation models, and land-use statistics.',
      icon: Database
    },
    {
      step: 2,
      title: 'DATA INTEGRATION',
      subtitle: 'Standardization & Coordinate Alignment',
      desc: 'Harmonization of spatial data into common projections (Lambert Conformal Conic / WGS84) and extraction of contiguous agro-ecological attribute tables.',
      icon: Layers
    },
    {
      step: 3,
      title: 'GIS ANALYSIS & OVERLAY',
      subtitle: 'FAO Sequential Multi-Layer Overlay',
      desc: 'Sequential vector and raster overlay of Moisture Index (MI), thermal regimes, soil orders, and topographic terrain units.',
      icon: Cpu
    },
    {
      step: 4,
      title: 'SPATIAL CLASSIFICATION',
      subtitle: 'Homogeneity Grouping',
      desc: 'Delineation of contiguous polygons having homogeneous agro-meteorological conditions, LGP ranges, and landform characteristics.',
      icon: BarChart
    },
    {
      step: 5,
      title: 'AGRICULTURAL REGIONALIZATION',
      subtitle: 'Hierarchical Delineation',
      desc: 'Formulation of official spatial entities: 15 Planning Commission ACZs / 20 ICAR-NBSS&LUP AERs and 60 Sub-regions.',
      icon: CheckCircle2
    },
    {
      step: 6,
      title: 'POLICY & MANAGEMENT',
      subtitle: 'Actionable Location-Specific Strategy',
      desc: 'Operationalization via central flagship schemes (PM Dhan-Dhaanya 2025, NMSA), crop zoning, and climate resilience interventions.',
      icon: CheckCircle2
    }
  ];

  const rsSteps = [
    { label: 'Earth Observation Satellites', detail: 'IRS, Landsat, Sentinel multi-spectral imagery capturing surface reflectance.' },
    { label: 'Digital Image Processing', detail: 'Calculation of NDVI, NDWI, surface temperature, and crop vigor indices.' },
    { label: 'LULC Classification', detail: 'Automated delineation of net sown area, fallow land, irrigated vs rainfed tracts.' },
    { label: 'Spatial Modeling in GIS', detail: 'Multi-criteria evaluation (MCE) combining soil depth, slope gradient, and moisture availability.' },
    { label: 'Decision Support System', detail: 'Providing district and taluka level decision matrices for input allocation and drought mitigation.' }
  ];

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* SECTION 21: WORKFLOW */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Scientific Methodology
          </span>
          <SourceBadge source="OFFICIAL SOURCE" subtext="Planning Commission & NRSA (1989)" />
          <SourceBadge source="PEER-REVIEWED SOURCE" subtext="FAO Soils Bulletin & NBSS Pub. 24" />
        </div>
        <h2 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Agricultural Regionalization Scientific Workflow
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          The methodological sequence through which raw meteorological, pedological, and elevation data are synthesized through geographic information systems (GIS) into actionable agricultural zones.
        </p>
      </div>

      {/* Interactive Workflow Diagram */}
      <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.step;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#1b4332] text-white border-emerald-800 shadow-md ring-2 ring-emerald-400/30'
                    : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div>
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center font-mono text-xs font-bold ${
                    isActive ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {s.step}
                  </div>
                  <h4 className="text-xs font-bold font-mono tracking-wider">{s.title}</h4>
                  <div className={`text-[10px] mt-1 ${isActive ? 'text-emerald-200' : 'text-stone-500'}`}>
                    {s.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Step Deep Dive */}
        <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-emerald-800">
              Stage {activeStep} Technical Deep-Dive
            </span>
            <span className="text-[10px] font-mono text-stone-400">Step {activeStep} of 6</span>
          </div>
          <h3 className="text-base font-bold font-serif-academic text-stone-900">
            {steps[activeStep - 1].title} — {steps[activeStep - 1].subtitle}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
            {steps[activeStep - 1].desc}
          </p>
        </div>
      </div>

      {/* SECTION 22: REMOTE SENSING & GIS INTEGRATION */}
      <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 shadow-sm space-y-8">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
              Earth Observation Integration
            </span>
          </div>
          <h3 className="text-2xl font-bold font-serif-academic text-stone-900">
            How Remote Sensing &amp; GIS Support Agricultural Regionalization
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Satellite remote sensing provides multi-spectral, synoptic, and repetitive coverage of land surfaces, enabling automated spatial monitoring and thematic layer generation across India's vast territory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {rsSteps.map((item, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-mono text-xs font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <h4 className="text-xs font-bold text-stone-900">{item.label}</h4>
              <p className="text-[11px] text-stone-600 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900 font-mono">Academic Transparency Note:</span>
            {" "}The National Remote Sensing Agency (NRSA) contributed satellite-derived land use, forest cover, and surface water inventories during the 1989 Planning Commission delineation. The present website visualizes the resulting vector boundaries and DBF attribute tables supplied in the project files.
          </div>
        </div>
      </div>

    </div>
  );
};

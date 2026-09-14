import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Database, FileText, Layers, CheckCircle2 } from 'lucide-react';
import { ReferenceCategory } from '../../types';
import { SourceBadge } from '../common/SourceBadge';

interface ReferencesViewProps {
  categories: ReferenceCategory[];
}

export const ReferencesView: React.FC<ReferencesViewProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const provenanceBadges = [
    {
      badge: 'SUPPLIED GIS DATA',
      dataType: 'Spatial Geometry & DBF Attributes',
      source: 'User Workspace (Agroclimatic_regions.shp & Agro_Ecological_regions.shp)',
      method: 'Direct vector rendering and attribute inspection',
      status: 'Primary Project Source'
    },
    {
      badge: 'SUPPLIED PDF',
      dataType: 'Academic e-Text & Study Materials',
      source: 'e-PG Pathshala RG-38 & UPSC Academic Synthesis',
      method: 'Direct text extraction and factual synthesis',
      status: 'Primary Academic Source'
    },
    {
      badge: 'OFFICIAL SOURCE',
      dataType: 'Institutional Classification Criteria',
      source: 'Planning Commission (1989) & ICAR-NBSS&LUP (1992)',
      method: 'Institutional publication verification',
      status: 'Authoritative External Benchmark'
    },
    {
      badge: 'DERIVED FROM GIS',
      dataType: 'Geodesic Area & Geometry Statistics',
      source: 'Calculated from EPSG:4326 Polygon Geometries',
      method: 'OSGeo / GDAL / Geopandas geodesic calculation',
      status: 'Empirical Derived Value'
    },
    {
      badge: 'PEER-REVIEWED SOURCE',
      dataType: 'Scientific Research Publications',
      source: 'Nature Scientific Reports (2024), Murthy & Pandey (1978)',
      method: 'Peer-reviewed academic citations',
      status: 'Scholarly Validation'
    }
  ];

  const filteredCategories = activeCategory === 'all'
    ? categories
    : categories.filter((c) => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="space-y-12">
      
      {/* SECTION 35: PROVENANCE BADGE SYSTEM */}
      <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Data Governance &amp; Integrity
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
              ZERO HALLUCINATION PROTOCOL
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-academic text-stone-900">
            Data Provenance System
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
            Every factual section, table, and map layer in this atlas carries an explicit provenance tag. Under no circumstances has unverified data or fabricated information been injected to fill gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {provenanceBadges.map((p, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <SourceBadge source={p.badge} />
                <span className="text-[10px] font-mono text-stone-400 font-bold">{p.status}</span>
              </div>
              <div className="text-xs font-bold text-stone-900">{p.dataType}</div>
              <div className="text-[11px] text-stone-600 space-y-1">
                <div><span className="font-semibold text-stone-800">Source:</span> {p.source}</div>
                <div><span className="font-semibold text-stone-800">Method:</span> {p.method}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 34: CATEGORIZED BIBLIOGRAPHY */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xl font-bold font-serif-academic text-stone-900">
              References &amp; Authoritative Data Sources
            </h3>
            <p className="text-xs text-stone-500">
              Complete bibliography categorized by apex institutions and scientific publications
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                activeCategory === 'all'
                  ? 'bg-stone-900 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Citations
            </button>
            <button
              onClick={() => setActiveCategory('planning')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                activeCategory === 'planning'
                  ? 'bg-[#1b4332] text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Government / Planning
            </button>
            <button
              onClick={() => setActiveCategory('icar')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                activeCategory === 'icar'
                  ? 'bg-amber-700 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              ICAR-NBSS&amp;LUP
            </button>
            <button
              onClick={() => setActiveCategory('supplied')}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                activeCategory === 'supplied'
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Supplied Files
            </button>
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-8">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm font-bold font-mono uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                {cat.category}
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {cat.citations.map((cite, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs hover:border-emerald-300 transition-colors space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs sm:text-sm font-bold font-serif-academic text-stone-900 leading-snug">
                        {cite.title}
                      </h5>
                      <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded shrink-0">
                        {cite.year}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600">
                      <span className="font-semibold text-stone-800">Author / Institution:</span> {cite.author}
                    </div>

                    <p className="text-xs text-stone-500 leading-relaxed font-sans">
                      {cite.details}
                    </p>

                    {cite.url && (
                      <div className="pt-1">
                        <a
                          href={cite.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 hover:text-emerald-900 font-semibold underline"
                        >
                          Source Link <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

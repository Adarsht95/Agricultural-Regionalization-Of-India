import React from 'react';
import { Compass, ShieldCheck, ExternalLink } from 'lucide-react';
import { DEVELOPER_INFO, DEVELOPER_PROFILE_LINKS } from './ProfileIcons';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Title & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-serif-academic text-base font-bold tracking-wide">
              <Compass className="w-5 h-5 text-emerald-400" />
              AGRICULTURAL REGIONALIZATION OF INDIA
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              An interactive digital geography atlas and scientific learning platform developed for academic, educational, and spatial analysis purposes.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-800 text-[11px] font-mono text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              Academic Provenance Grounded
            </div>
          </div>

          {/* Column 2: Core Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4 font-mono">
              Atlas Modules
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('acz')} className="hover:text-emerald-400 transition-colors">
                  Agro-Climatic Regionalization (15 Zones)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('aez')} className="hover:text-emerald-400 transition-colors">
                  Agro-Ecological Regionalization (20 Eco-Regions)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('comparison')} className="hover:text-emerald-400 transition-colors">
                  ACZ vs AEZ Comparative Framework
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('lgp_soil')} className="hover:text-emerald-400 transition-colors">
                  Length of Growing Period (LGP) &amp; Soils
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gis_explorer')} className="hover:text-emerald-400 transition-colors">
                  GIS Multi-Layer Console
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('crop_matrix')} className="hover:text-emerald-400 transition-colors">
                  Crop–Region Relationship Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Exploration */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4 font-mono">
              Learning &amp; Tools
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('sandbox')} className="hover:text-emerald-400 transition-colors">
                  Build-an-Agro-Ecological-Region Sandbox
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-emerald-400 transition-colors">
                  Test Your Geography (Academic Quiz)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('references')} className="hover:text-emerald-400 transition-colors">
                  Authoritative References &amp; Bibliography
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('references')} className="hover:text-emerald-400 transition-colors">
                  GIS Preprocessing &amp; Methodology
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('references')} className="hover:text-emerald-400 transition-colors">
                  Searchable Academic Glossary
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Attribution */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4 font-mono">
              Primary Sources
            </h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Spatial boundaries &amp; attributes derived directly from user-supplied GIS shapefiles and authenticated by:
            </p>
            <div className="space-y-1.5 text-[11px] font-mono text-stone-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Planning Commission of India &amp; NRSA (1989)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                ICAR-NBSS&amp;LUP (Sehgal et al., 1992)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                e-PG Pathshala Module RG-38 &amp; UPSC Study Text
              </div>
            </div>
          </div>
        </div>

        {/* Developer Profile & Attribution Section */}
        <div className="py-8 border-b border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-medium text-stone-200 flex items-center gap-2">
              <span className="text-stone-400">Developed by</span>
              <a
                href={DEVELOPER_INFO.links.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-bold hover:underline inline-flex items-center gap-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 rounded"
                title={`Open ${DEVELOPER_INFO.name}'s Linktree profile (opens in a new tab)`}
              >
                {DEVELOPER_INFO.name}
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
            <div className="text-xs text-stone-400">
              {DEVELOPER_INFO.designation}, {DEVELOPER_INFO.department}
            </div>
            <div className="text-[11px] text-stone-500">
              {DEVELOPER_INFO.institution}, {DEVELOPER_INFO.location}
            </div>
          </div>

          {/* Compact Profile Icons */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
              Connect with Developer:
            </div>
            <div className="flex items-center gap-2">
              {DEVELOPER_PROFILE_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    title={`${link.name} — ${DEVELOPER_INFO.name}`}
                    className={`w-9 h-9 rounded-lg bg-stone-800/90 border border-stone-700/80 flex items-center justify-center text-stone-300 transition-all duration-200 hover:scale-105 hover:bg-stone-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-stone-900 ${link.brandColorHover} ${link.brandBorderHover}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; 2026 <span className="text-stone-400">Agricultural Regionalization of India</span> — An Interactive Geography Atlas.
          </div>
          <div className="text-[11px] italic text-stone-400">
            &quot;Developed for academic and educational purposes. Accuracy, source transparency and data provenance prioritized.&quot;
          </div>
        </div>
      </div>
    </footer>
  );
};

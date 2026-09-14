import React from 'react';
import { DEVELOPER_INFO, DEVELOPER_PROFILE_LINKS } from '../common/ProfileIcons';
import { ExternalLink, GraduationCap, MapPin, Building2 } from 'lucide-react';

interface DeveloperProfileProps {
  compact?: boolean;
}

export const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ compact = false }) => {
  return (
    <section 
      aria-labelledby="developer-profile-heading"
      className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden"
    >
      {/* Subtle Academic Header Accent */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-emerald-200">
          <GraduationCap className="w-4 h-4 text-amber-300" />
          Academic &amp; Developer Attribution
        </div>
        <span className="text-[11px] font-mono text-emerald-300/80 hidden sm:inline">
          Cartographic &amp; Spatial Implementation
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Developer Info Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono font-semibold text-emerald-800">
              {DEVELOPER_INFO.designation}
            </div>
            
            <h2 
              id="developer-profile-heading"
              className="text-2xl font-bold font-serif-academic text-stone-900 tracking-tight"
            >
              {DEVELOPER_INFO.name}
            </h2>

            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex items-center gap-2 font-medium text-stone-700">
                <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{DEVELOPER_INFO.department}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 pl-5">
                <span>{DEVELOPER_INFO.institution}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 pl-5">
                <MapPin className="w-3 h-3 text-stone-400 shrink-0 -ml-5" />
                <span>{DEVELOPER_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-500 max-w-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
            <p className="italic text-[11px] leading-relaxed">
              Responsible for the GIS data processing, reprojection, vector geometry analysis, and interactive cartography implemented in this atlas.
            </p>
          </div>
        </div>

        {/* Connect Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
            CONNECT WITH {DEVELOPER_INFO.name.toUpperCase()}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DEVELOPER_PROFILE_LINKS.map((profile) => {
              const Icon = profile.icon;
              return (
                <a
                  key={profile.id}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.ariaLabel}
                  title={profile.tooltip}
                  className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-700 text-xs font-medium transition-all duration-200 hover:shadow-xs hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-1 ${profile.brandColorHover} ${profile.brandBgHover} ${profile.brandBorderHover}`}
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-semibold truncate">{profile.name}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                  
                  {/* Tooltip on hover */}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-stone-900 px-2 py-1 text-[10px] font-mono text-white opacity-0 shadow transition-opacity group-hover:opacity-100 z-10">
                    {profile.tooltip}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

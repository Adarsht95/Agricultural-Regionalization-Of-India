import React, { useState, useEffect, useRef } from 'react';
import { Layers, MapPin, Compass, Sprout, BookOpen, BarChart3, HelpCircle, Menu, X, ShieldCheck, ChevronDown, ExternalLink } from 'lucide-react';
import { DEVELOPER_INFO, DEVELOPER_PROFILE_LINKS } from './ProfileIcons';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProvenance: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenProvenance }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setConnectOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setConnectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    { id: 'atlas', label: 'Atlas Overview', icon: Compass },
    { id: 'acz', label: 'Agro-Climatic (15)', icon: MapPin },
    { id: 'aez', label: 'Agro-Ecological (20)', icon: Layers },
    { id: 'comparison', label: 'ACZ vs AEZ', icon: BarChart3 },
    { id: 'lgp_soil', label: 'LGP & Soil', icon: Sprout },
    { id: 'gis_explorer', label: 'GIS Explorer', icon: Layers },
    { id: 'crop_matrix', label: 'Crops Matrix', icon: Sprout },
    { id: 'sandbox', label: 'Build-a-Region', icon: Compass },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'references', label: 'Sources & Data', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1b4332] text-white shadow-md border-b border-emerald-900/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => setActiveTab('atlas')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-700/80 border border-emerald-500/30 flex items-center justify-center text-amber-300 font-bold shadow-xs group-hover:bg-emerald-600 transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wider uppercase text-emerald-100 font-serif-academic flex items-center gap-2">
                Agricultural Regionalization of India
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED GIS
                </span>
              </div>
              <div className="text-[11px] text-emerald-300/80 tracking-wide font-sans">
                An Interactive Geography Atlas &amp; Educational Platform
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-900 font-semibold shadow-xs'
                      : 'text-emerald-100/90 hover:bg-emerald-800/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Compact Developer Credit, Connect Option, & Controls */}
          <div className="flex items-center gap-3">
            
            {/* Desktop Developer Credit (Subtle, Compact, Clickable) */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-emerald-200/90 font-sans pl-2.5 border-l border-emerald-800/80">
              <span className="text-emerald-300/70 text-[11px] font-normal">Developed by</span>
              <a
                href={DEVELOPER_INFO.links.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-100 hover:text-amber-300 hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-amber-300 rounded px-1"
                title={`Open ${DEVELOPER_INFO.name}'s Linktree profile in a new tab`}
              >
                {DEVELOPER_INFO.name}
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>

              {/* Compact Profiles / Connect Option with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setConnectOpen(!connectOpen)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 hover:text-white border border-emerald-600/50 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-300"
                  aria-haspopup="true"
                  aria-expanded={connectOpen}
                  aria-label="Connect with Adarsh T - Academic profiles"
                >
                  <span>Connect</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${connectOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Connect Dropdown Menu */}
                {connectOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 rounded-xl bg-stone-900 border border-stone-700/80 shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                    role="menu"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-stone-400 border-b border-stone-800 mb-1">
                      Academic Profiles
                    </div>
                    {DEVELOPER_PROFILE_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          className="flex items-center gap-2.5 px-3 py-2 text-stone-200 hover:text-white hover:bg-stone-800 transition-colors group"
                          onClick={() => setConnectOpen(false)}
                          title={link.tooltip}
                          aria-label={link.ariaLabel}
                        >
                          <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="font-medium text-xs">{link.name}</span>
                          <ExternalLink className="w-3 h-3 ml-auto opacity-40 group-hover:opacity-100" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Provenance Badge */}
            <button
              onClick={onOpenProvenance}
              className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/40 text-emerald-200 transition-colors"
              title="View Data Provenance Policy"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden md:inline">Provenance</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-800 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-[#153427] border-t border-emerald-800/80 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-amber-500 text-stone-900 font-bold'
                    : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}

          {/* Mobile Developer Credit & Profile Links */}
          <div className="mt-3 pt-3 border-t border-emerald-800/80 px-2 space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-200">
              <span className="text-emerald-300/80">Developed by</span>
              <a
                href={DEVELOPER_INFO.links.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-300 hover:underline inline-flex items-center gap-1"
                title={`Open ${DEVELOPER_INFO.name}'s Linktree profile`}
              >
                {DEVELOPER_INFO.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="text-[11px] text-emerald-300/70">
              {DEVELOPER_INFO.designation}, {DEVELOPER_INFO.department}
            </div>

            {/* Mobile Accessible Profile Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {DEVELOPER_PROFILE_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0e271d] text-emerald-100 hover:text-white hover:bg-emerald-800 text-xs border border-emerald-800/90"
                    aria-label={link.ariaLabel}
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

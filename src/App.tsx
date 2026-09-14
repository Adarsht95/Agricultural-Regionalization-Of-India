import React, { useEffect, useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ModalDrawer } from './components/common/ModalDrawer';
import { HeroSection } from './components/home/HeroSection';
import { ConceptCards } from './components/home/ConceptCards';
import { WhatIsRegionalization } from './components/intro/WhatIsRegionalization';
import { FrameworksOverview } from './components/intro/FrameworksOverview';
import { AczModule } from './components/acz/AczModule';
import { AezModule } from './components/aez/AezModule';
import { LgpModule } from './components/lgp/LgpModule';
import { SoilModule } from './components/soil/SoilModule';
import { LandscapeCrossSection } from './components/physiography/LandscapeCrossSection';
import { AczVsAezDashboard } from './components/comparison/AczVsAezDashboard';
import { GisLayerExplorer } from './components/gis/GisLayerExplorer';
import { RegionExplorer } from './components/explorer/RegionExplorer';
import { CropRegionExplorer } from './components/crops/CropRegionExplorer';
import { ClimateDashboard } from './components/climate/ClimateDashboard';
import { ScienceWorkflow } from './components/workflows/ScienceWorkflow';
import { ClimateChangeImpacts } from './components/climate-change/ClimateChangeImpacts';
import { BuildARegionTool } from './components/sandbox/BuildARegionTool';
import { DataStorytelling } from './components/storytelling/DataStorytelling';
import { GisStatisticsDashboard } from './components/statistics/GisStatisticsDashboard';
import { GeographyQuiz } from './components/quiz/GeographyQuiz';
import { GlossaryView } from './components/references/GlossaryView';
import { ReferencesView } from './components/references/ReferencesView';
import { MethodologyView } from './components/references/MethodologyView';
import { DeveloperProfile } from './components/developer/DeveloperProfile';
import { fetchMetadata, fetchGlossaryAndRefs } from './data/dataService';
import { MasterMetadata, GlossaryAndRefs } from './types';
import { ShieldCheck, Compass, X, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [metadata, setMetadata] = useState<MasterMetadata | null>(null);
  const [glossaryRefs, setGlossaryRefs] = useState<GlossaryAndRefs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('atlas');

  // Selected Region for Inspector Drawer
  const [selectedRegion, setSelectedRegion] = useState<{ code: number; type: 'acz' | 'aez' } | null>(null);

  // Provenance policy modal
  const [showProvenanceModal, setShowProvenanceModal] = useState<boolean>(false);

  // Secondary sub-tab for references view
  const [referenceSubTab, setReferenceSubTab] = useState<'references' | 'methodology' | 'glossary' | 'developer'>('references');

  useEffect(() => {
    Promise.all([fetchMetadata(), fetchGlossaryAndRefs()])
      .then(([meta, refs]) => {
        setMetadata(meta);
        setGlossaryRefs(refs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load application data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelectRegion = (code: number, type: 'acz' | 'aez' = 'acz') => {
    setSelectedRegion({ code, type });
  };

  const handleCloseDrawer = () => {
    setSelectedRegion(null);
  };

  // Find active region object
  const activeRegionObject = selectedRegion && metadata
    ? selectedRegion.type === 'acz'
      ? metadata.acz_regions.find((r) => r.code === selectedRegion.code) || null
      : metadata.aez_regions.find((r) => r.code === selectedRegion.code) || null
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfbf9] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shadow-lg animate-pulse mb-4">
          <Compass className="w-7 h-7 animate-spin" />
        </div>
        <div className="text-sm font-bold font-serif-academic text-stone-900">
          Loading Agricultural Regionalization Atlas...
        </div>
        <div className="text-xs font-mono text-stone-500 mt-1">
          Parsing GIS vector layers and verified DBF attribute tables
        </div>
      </div>
    );
  }

  if (error || !metadata || !glossaryRefs) {
    return (
      <div className="min-h-screen bg-[#fbfbf9] flex flex-col items-center justify-center p-4">
        <div className="max-w-md bg-white p-6 rounded-2xl border border-rose-200 shadow-md text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <h2 className="text-lg font-bold font-serif-academic text-stone-900">Failed to Load Atlas Data</h2>
          <p className="text-xs text-stone-600 font-mono">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-mono font-bold"
          >
            Reload Platform
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-stone-800">
      
      {/* Sticky Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProvenance={() => setShowProvenanceModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: ATLAS OVERVIEW / HOME */}
        {activeTab === 'atlas' && (
          <div className="space-y-4">
            <HeroSection
              onExploreAcz={() => {
                setActiveTab('acz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreAez={() => {
                setActiveTab('aez');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectRegion={(code, type) => handleSelectRegion(code, type)}
            />

            <ConceptCards
              onSelectConcept={(conceptId) => {
                if (conceptId === 'climate') setActiveTab('crop_matrix');
                else if (conceptId === 'soil' || conceptId === 'growing_period' || conceptId === 'physiography') setActiveTab('lgp_soil');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <WhatIsRegionalization />

            <FrameworksOverview
              frameworks={metadata.frameworks}
              onSelectFramework={(id) => {
                setActiveTab(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <DataStorytelling
              onNavigateFramework={(id) => {
                setActiveTab(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Interactive GIS Explorer Preview */}
            <div className="py-12 bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-serif-academic text-stone-900">
                      Live GIS Spatial Console
                    </h2>
                    <p className="text-xs text-stone-500">
                      Dual-vector layer overlay of Agro-Climatic (15) and Agro-Ecological (20) regions
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('gis_explorer');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-mono font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    Open Full GIS Console →
                  </button>
                </div>
                <GisLayerExplorer onSelectRegion={(code, type) => handleSelectRegion(code, type)} />
              </div>
            </div>

            {/* Searchable Region Explorer Preview */}
            <RegionExplorer
              aczRegions={metadata.acz_regions}
              aezRegions={metadata.aez_regions}
              onSelectRegion={(code, type) => handleSelectRegion(code, type)}
            />

            {/* Empirical Statistics Dashboard */}
            <GisStatisticsDashboard
              aczRegions={metadata.acz_regions}
              aezRegions={metadata.aez_regions}
              onSelectRegion={(code, type) => handleSelectRegion(code, type)}
            />

            {/* Developer Profile & Academic Attribution Section */}
            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <DeveloperProfile />
            </div>
          </div>
        )}

        {/* TAB 2: AGRO-CLIMATIC MODULE (15) */}
        {activeTab === 'acz' && (
          <div className="space-y-4">
            <AczModule
              regions={metadata.acz_regions}
              onSelectRegion={(code) => handleSelectRegion(code, 'acz')}
              selectedRegionCode={selectedRegion?.type === 'acz' ? selectedRegion.code : null}
            />
          </div>
        )}

        {/* TAB 3: AGRO-ECOLOGICAL MODULE (20) */}
        {activeTab === 'aez' && (
          <div className="space-y-4">
            <AezModule
              regions={metadata.aez_regions}
              onSelectRegion={(code) => handleSelectRegion(code, 'aez')}
              selectedRegionCode={selectedRegion?.type === 'aez' ? selectedRegion.code : null}
            />
          </div>
        )}

        {/* TAB 4: ACZ VS AEZ COMPARISON */}
        {activeTab === 'comparison' && (
          <div className="space-y-4">
            <AczVsAezDashboard />
            <ScienceWorkflow />
            <ClimateChangeImpacts />
          </div>
        )}

        {/* TAB 5: LGP & SOIL MODULE */}
        {activeTab === 'lgp_soil' && (
          <div className="space-y-4">
            <LgpModule />
            <SoilModule />
            <LandscapeCrossSection />
          </div>
        )}

        {/* TAB 6: GIS LAYER EXPLORER */}
        {activeTab === 'gis_explorer' && (
          <div className="space-y-4">
            <GisLayerExplorer onSelectRegion={(code, type) => handleSelectRegion(code, type)} />
            <GisStatisticsDashboard
              aczRegions={metadata.acz_regions}
              aezRegions={metadata.aez_regions}
              onSelectRegion={(code, type) => handleSelectRegion(code, type)}
            />
          </div>
        )}

        {/* TAB 7: CROP–REGION MATRIX & CLIMATE */}
        {activeTab === 'crop_matrix' && (
          <div className="space-y-4">
            <CropRegionExplorer
              aczRegions={metadata.acz_regions}
              onSelectRegion={(code) => handleSelectRegion(code, 'acz')}
            />
            <ClimateDashboard
              regions={metadata.acz_regions}
              onSelectRegion={(code) => handleSelectRegion(code, 'acz')}
            />
          </div>
        )}

        {/* TAB 8: BUILD-A-REGION SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="space-y-4">
            <BuildARegionTool />
          </div>
        )}

        {/* TAB 9: GEOGRAPHY QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            <GeographyQuiz />
          </div>
        )}

        {/* TAB 10: REFERENCES & METHODOLOGY */}
        {activeTab === 'references' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Sub-tab navigation */}
            <div className="flex border-b border-stone-200 gap-2 pb-2 overflow-x-auto">
              <button
                onClick={() => setReferenceSubTab('references')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-colors whitespace-nowrap ${
                  referenceSubTab === 'references'
                    ? 'bg-[#1b4332] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                1. Authoritative References &amp; Citations
              </button>
              <button
                onClick={() => setReferenceSubTab('methodology')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-colors whitespace-nowrap ${
                  referenceSubTab === 'methodology'
                    ? 'bg-[#1b4332] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                2. GIS Preprocessing Pipeline
              </button>
              <button
                onClick={() => setReferenceSubTab('glossary')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-colors whitespace-nowrap ${
                  referenceSubTab === 'glossary'
                    ? 'bg-[#1b4332] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                3. Academic Glossary
              </button>
              <button
                onClick={() => setReferenceSubTab('developer')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-colors whitespace-nowrap ${
                  referenceSubTab === 'developer'
                    ? 'bg-[#1b4332] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                4. Developer Profile &amp; Academic Attribution
              </button>
            </div>

            {referenceSubTab === 'references' && (
              <ReferencesView categories={glossaryRefs.references} />
            )}
            {referenceSubTab === 'methodology' && (
              <MethodologyView />
            )}
            {referenceSubTab === 'glossary' && (
              <GlossaryView glossary={glossaryRefs.glossary} />
            )}
            {referenceSubTab === 'developer' && (
              <DeveloperProfile />
            )}
          </div>
        )}

      </main>

      {/* Global Slide-Over Region Detail Drawer */}
      <ModalDrawer
        region={activeRegionObject}
        type={selectedRegion?.type || 'acz'}
        onClose={handleCloseDrawer}
      />

      {/* Provenance Policy Modal */}
      {showProvenanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> Academic Governance Protocol
                </span>
                <h3 className="text-xl font-bold font-serif-academic text-stone-900">
                  Data Provenance &amp; Zero-Hallucination Policy
                </h3>
              </div>
              <button
                onClick={() => setShowProvenanceModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                This interactive atlas is designed specifically for academic, educational, and GIS analysis purposes. Accuracy, source transparency, and data provenance are strictly prioritized over filling information gaps.
              </p>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <span className="font-bold text-stone-900 font-mono">Source Hierarchy Applied:</span>
                <ol className="list-decimal list-inside space-y-1 text-stone-700 text-[11px]">
                  <li>User-supplied GIS shapefiles (`Agroclimatic_regions.shp` &amp; `Agro_Ecological_regions.shp`)</li>
                  <li>User-supplied PDF notes (e-PG Pathshala RG-38 &amp; UPSC study text) and `Notes.docx`</li>
                  <li>Official Planning Commission of India &amp; NRSA reports (1989)</li>
                  <li>ICAR &amp; ICAR-NBSS&amp;LUP Technical Bulletins (Sehgal et al., 1992)</li>
                  <li>Peer-reviewed scholarly literature (Nature 2024, Murthy &amp; Pandey 1978)</li>
                </ol>
              </div>

              <p>
                <strong>Unverified Information Rule:</strong> If information is not available in the authenticated sources, the platform explicitly displays <em>"Information not available from the selected sources"</em> rather than generating speculative data.
              </p>

              <p>
                <strong>Geometry Calculations:</strong> Polygon surface areas calculated from GIS vector geometry are labeled as <code>[Calculated from supplied GIS geometry]</code> to prevent conflation with published tabular statistics.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setShowProvenanceModal(false)}
                className="px-5 py-2 rounded-xl bg-[#1b4332] text-white hover:bg-emerald-900 text-xs font-mono font-bold"
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer setActiveTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
};

export default App;

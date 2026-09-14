import React, { useEffect, useRef } from 'react';
import { Compass, Layers, ArrowRight, ShieldCheck, Database, Map as MapIcon, Sprout, Thermometer, Mountain, Clock } from 'lucide-react';
import L from 'leaflet';

interface HeroSectionProps {
  onExploreAcz: () => void;
  onExploreAez: () => void;
  onSelectRegion?: (code: number, type: 'acz' | 'aez') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreAcz, onExploreAez, onSelectRegion }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet mini preview map
    const map = L.map(mapContainerRef.current, {
      center: [22.8, 82.5],
      zoom: 4.4,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      touchZoom: false
    });

    mapInstanceRef.current = map;

    // Base layer: CartoDB Positron
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Color palette for 15 ACZs
    const aczColors = [
      '#1b4332', '#2d6a4f', '#40916c', '#52b788', '#74c69d',
      '#d97706', '#b45309', '#92400e', '#78350f', '#0284c7',
      '#0369a1', '#075985', '#4f46e5', '#ca8a04', '#0d9488'
    ];

    // Load web-optimized GeoJSON for hero background visualization
    fetch('/data/agro_climatic_zones_web.geojson')
      .then((res) => res.json())
      .then((geojson) => {
        if (!mapInstanceRef.current) return;

        const geoLayer = L.geoJSON(geojson, {
          style: (feature) => {
            const code = feature?.properties?.regioncode || 1;
            const color = aczColors[(code - 1) % aczColors.length];
            return {
              fillColor: color,
              weight: 1.5,
              opacity: 0.9,
              color: '#ffffff',
              fillOpacity: 0.65
            };
          },
          onEachFeature: (feature, layer) => {
            const props = feature.properties;
            layer.bindTooltip(`
              <div style="font-family: Inter, sans-serif; padding: 4px 6px;">
                <div style="font-size: 10px; font-weight: 700; color: #1b4332; text-transform: uppercase;">Zone ${props.regioncode}</div>
                <div style="font-size: 12px; font-weight: 600; color: #0f172a;">${props.regionname}</div>
                <div style="font-size: 10px; color: #64748b;">${props.avgann_rf || ''}</div>
              </div>
            `, { sticky: true, className: 'custom-map-tooltip' });

            layer.on({
              mouseover: (e) => {
                const target = e.target;
                target.setStyle({ fillOpacity: 0.85, weight: 2.5, color: '#f59e0b' });
              },
              mouseout: (e) => {
                geoLayer.resetStyle(e.target);
              },
              click: () => {
                if (onSelectRegion && props.regioncode) {
                  onSelectRegion(props.regioncode, 'acz');
                }
              }
            });
          }
        }).addTo(map);

        map.fitBounds(geoLayer.getBounds(), { padding: [20, 20] });
      })
      .catch((err) => console.error("Hero preview map failed to load GeoJSON:", err));

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-radial from-stone-50 via-[#f8fafc] to-stone-100 overflow-hidden pt-8 pb-12 border-b border-stone-200">
      
      {/* Subtle geographic grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1b4332 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Academic badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-mono font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              ICAR-NBSS&LUP & Planning Commission Delineations
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-academic text-stone-900 tracking-tight leading-[1.15]">
                AGRICULTURAL REGIONALIZATION OF INDIA
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-800 tracking-wide font-sans">
                An Interactive Geography Atlas
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              Explore how climate, soils, physiography, water availability, and length of growing period shape India's agricultural regions. Grounded in user-supplied GIS shapefiles and authoritative institutional frameworks.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onExploreAcz}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1b4332] hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all group"
              >
                <Compass className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
                EXPLORE AGRO-CLIMATIC REGIONS
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreAez}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all group"
              >
                <Layers className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
                EXPLORE AGRO-ECOLOGICAL REGIONS
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Academic Stat Pillows */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <div className="text-xl font-bold font-mono text-emerald-800">15</div>
                <div className="text-[10px] font-mono uppercase text-stone-500">Agro-Climatic Zones</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <div className="text-xl font-bold font-mono text-amber-700">20</div>
                <div className="text-[10px] font-mono uppercase text-stone-500">Agro-Ecological Reg.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <div className="text-xl font-bold font-mono text-blue-700">72</div>
                <div className="text-[10px] font-mono uppercase text-stone-500">ACZ Sub-Zones</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <div className="text-xl font-bold font-mono text-stone-800">329M</div>
                <div className="text-[10px] font-mono uppercase text-stone-500">Ha Land Covered</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual: Interactive Leaflet Map Preview */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl p-2 bg-white border border-stone-200 shadow-xl overflow-hidden group">
              <div className="relative h-[440px] sm:h-[480px] w-full rounded-xl overflow-hidden bg-stone-100">
                
                {/* Map Container */}
                <div ref={mapContainerRef} className="w-full h-full z-0"></div>

                {/* Floating Map Label Badge */}
                <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-stone-200/80 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] font-mono font-semibold text-stone-800">
                    Live Spatial Overview: 15 Planning Commission ACZs
                  </span>
                </div>

                {/* Bottom interactive helper */}
                <div className="absolute bottom-3 right-3 z-10 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md shadow-xs">
                  Hover to inspect • Click region to open profile
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Search, RotateCcw, ZoomIn, ZoomOut, Layers, Info, Filter, Check } from 'lucide-react';
import { AczRegion } from '../../types';

interface AczInteractiveMapProps {
  regions: AczRegion[];
  onSelectRegion: (code: number) => void;
  selectedRegionCode?: number | null;
}

export const AczInteractiveMap: React.FC<AczInteractiveMapProps> = ({
  regions,
  onSelectRegion,
  selectedRegionCode
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<AczRegion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 15 distinct, harmonious cartographic colors for the 15 ACZs
  const aczColorMap: Record<number, string> = {
    1: '#1b4332',  // Western Himalayan (Forest Green)
    2: '#2d6a4f',  // Eastern Himalayan (Rich Green)
    3: '#0284c7',  // Lower Gangetic Plain (Delta Blue)
    4: '#0369a1',  // Middle Gangetic Plain (River Blue)
    5: '#075985',  // Upper Gangetic Plain (Deep Aqua)
    6: '#0891b2',  // Trans Gangetic Plain (Cyan/Alluvial)
    7: '#b45309',  // Eastern Plateau & Hills (Terracotta)
    8: '#d97706',  // Central Plateau & Hills (Amber)
    9: '#78350f',  // Western Plateau & Hills (Regur/Basalt Brown)
    10: '#92400e', // Southern Plateau & Hills (Red Earth)
    11: '#059669', // East Coast Plains & Hills (Coastal Emerald)
    12: '#10b981', // West Coast Plains & Ghats (Humid Malabar Green)
    13: '#eab308', // Gujarat Plains & Hills (Warm Yellow)
    14: '#f97316', // Western Dry Region (Arid Orange)
    15: '#0d9488'  // Island Region (Tropical Teal)
  };

  const categories = ['all', 'Himalayan', 'Gangetic', 'Plateau', 'Coastal', 'Arid & Semi-Arid', 'Islands'];

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [22.8, 82.5],
      zoom: 4.8,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // CartoDB Positron base layer for clean geographic context
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Fetch web-optimized GeoJSON
    fetch(`${import.meta.env.BASE_URL}data/agro_climatic_zones_web.geojson`)
      .then((res) => res.json())
      .then((data) => {
        if (!mapInstanceRef.current) return;

        const geoLayer = L.geoJSON(data, {
          style: (feature) => {
            const code = feature?.properties?.regioncode || 1;
            const isSelected = selectedRegionCode === code;
            return {
              fillColor: aczColorMap[code] || '#475569',
              weight: isSelected ? 3 : 1.2,
              opacity: 0.9,
              color: isSelected ? '#f59e0b' : '#ffffff',
              fillOpacity: isSelected ? 0.85 : 0.65
            };
          },
          onEachFeature: (feature, layer) => {
            const code = feature.properties?.regioncode;
            const regionData = regions.find((r) => r.code === code);

            layer.on({
              mouseover: (e) => {
                const target = e.target;
                target.setStyle({
                  weight: 2.5,
                  color: '#f59e0b',
                  fillOpacity: 0.85
                });
                if (regionData) {
                  setHoveredRegion(regionData);
                }
              },
              mouseout: (e) => {
                if (selectedRegionCode !== code) {
                  geoLayer.resetStyle(e.target);
                }
                setHoveredRegion(null);
              },
              click: () => {
                if (code) {
                  onSelectRegion(code);
                  const bounds = (layer as any).getBounds();
                  map.fitBounds(bounds, { padding: [40, 40], maxZoom: 7 });
                }
              }
            });
          }
        }).addTo(map);

        geoLayerRef.current = geoLayer;
      })
      .catch((err) => console.error('Failed to load ACZ GeoJSON:', err));

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update styles when selectedRegionCode changes
  useEffect(() => {
    if (!geoLayerRef.current) return;
    geoLayerRef.current.eachLayer((layer: any) => {
      const code = layer.feature?.properties?.regioncode;
      const isSelected = selectedRegionCode === code;
      layer.setStyle({
        weight: isSelected ? 3 : 1.2,
        color: isSelected ? '#f59e0b' : '#ffffff',
        fillOpacity: isSelected ? 0.85 : 0.65
      });
      if (isSelected && mapInstanceRef.current) {
        mapInstanceRef.current.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 7 });
      }
    });
  }, [selectedRegionCode]);

  // Reset map view
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([22.8, 82.5], 4.8);
    }
  };

  // Filter regions by search and category
  const filteredRegions = regions.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toString() === searchQuery.trim() ||
      r.states.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.major_crops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden flex flex-col lg:flex-row h-[780px]">
      
      {/* Left Sidebar: Controls, Search, Region List */}
      <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col h-full bg-stone-50/50">
        
        {/* Search & Header */}
        <div className="p-4 border-b border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900">
              15 Agro-Climatic Zones
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
              Planning Commission 1989
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search zone, state, or crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-sans"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1b4332] text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat === 'all' ? 'ALL ZONES' : cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Region Scroll List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredRegions.map((region) => {
            const isSelected = selectedRegionCode === region.code;
            const color = aczColorMap[region.code];
            return (
              <div
                key={region.code}
                onClick={() => onSelectRegion(region.code)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/80 border-amber-500 shadow-sm ring-1 ring-amber-400'
                    : 'bg-white border-stone-200/90 hover:border-emerald-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-mono font-bold shrink-0 shadow-2xs mt-0.5"
                    style={{ backgroundColor: color }}
                  >
                    {region.code}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {region.name}
                      </h4>
                      <span className="text-[10px] font-mono text-stone-400 shrink-0">
                        {region.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 truncate mt-0.5">
                      {region.states.join(', ')}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-stone-600 mt-1.5 pt-1.5 border-t border-stone-100">
                      <span>🌧 {region.avgann_rf}</span>
                      <span>🌱 {region.major_crops.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Summary footer */}
        <div className="p-3 bg-white border-t border-stone-200 text-[11px] font-mono text-stone-500 flex items-center justify-between">
          <span>Showing {filteredRegions.length} of 15 zones</span>
          <button
            onClick={handleResetView}
            className="flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold"
          >
            <RotateCcw className="w-3 h-3" /> Reset View
          </button>
        </div>

      </div>

      {/* Right Map Canvas & Floating Panels */}
      <div className="flex-1 relative bg-stone-100 h-full">
        
        {/* Leaflet DOM container */}
        <div ref={mapContainerRef} className="w-full h-full z-0"></div>

        {/* Top-Right Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors"
            title="Reset to All-India"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Inspector Card */}
        {hoveredRegion && (
          <div className="absolute top-4 left-4 z-10 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-300 shadow-xl pointer-events-none transition-all animate-in fade-in duration-150">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-mono font-bold"
                style={{ backgroundColor: aczColorMap[hoveredRegion.code] }}
              >
                {hoveredRegion.code}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                {hoveredRegion.category} Zone
              </span>
            </div>
            <h4 className="text-sm font-bold font-serif-academic text-stone-900 leading-snug">
              {hoveredRegion.name}
            </h4>
            <div className="text-xs text-stone-600 mt-1">
              <span className="font-semibold text-stone-800">States:</span> {hoveredRegion.states.join(', ')}
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              <span className="font-semibold text-stone-800">Rainfall:</span> {hoveredRegion.avgann_rf}
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              <span className="font-semibold text-stone-800">Soil:</span> {hoveredRegion.soil}
            </div>
            <div className="text-[11px] font-mono text-emerald-800 mt-2 pt-2 border-t border-stone-200 font-medium">
              Click polygon to open complete 10-section profile →
            </div>
          </div>
        )}

        {/* Bottom-Left Mini Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md p-2.5 rounded-lg border border-stone-200 shadow-md text-[10px] font-mono max-w-xs hidden sm:block">
          <div className="font-bold text-stone-800 mb-1">AGRO-CLIMATIC ZONAL TYPOLOGY</div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-stone-600">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#1b4332'}}></span> 1–2 Himalayan</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#0284c7'}}></span> 3–6 Gangetic</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#b45309'}}></span> 7–10 Plateau</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#059669'}}></span> 11–12 Coastal</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#f97316'}}></span> 13–14 Arid/Semi-Arid</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#0d9488'}}></span> 15 Islands</div>
          </div>
        </div>

      </div>

    </div>
  );
};

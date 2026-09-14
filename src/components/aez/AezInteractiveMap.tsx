import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Search, RotateCcw, ZoomIn, ZoomOut, Layers, Filter } from 'lucide-react';
import { AezRegion } from '../../types';

interface AezInteractiveMapProps {
  regions: AezRegion[];
  onSelectRegion: (code: number) => void;
  selectedRegionCode?: number | null;
}

export const AezInteractiveMap: React.FC<AezInteractiveMapProps> = ({
  regions,
  onSelectRegion,
  selectedRegionCode
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<AezRegion | null>(null);
  const [selectedBioclimate, setSelectedBioclimate] = useState<string>('all');

  // Palette mapped to Bioclimatic classes
  const getBioclimateColor = (bioclimate: string): string => {
    if (bioclimate.includes('Cold Arid')) return '#475569';
    if (bioclimate.includes('Hot Arid')) return '#ea580c';
    if (bioclimate.includes('Semi-Arid')) return '#d97706';
    if (bioclimate.includes('Subhumid (Dry)')) return '#65a30d';
    if (bioclimate.includes('Subhumid') || bioclimate.includes('Moist')) return '#16a34a';
    if (bioclimate.includes('Warm Subhumid')) return '#0d9488';
    if (bioclimate.includes('Perhumid') || bioclimate.includes('Humid')) return '#0284c7';
    return '#854d0e';
  };

  const bioclimates = [
    'all',
    'Arid',
    'Semi-Arid',
    'Subhumid',
    'Perhumid'
  ];

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [22.8, 82.5],
      zoom: 4.8,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    fetch('/data/agro_ecological_zones_web.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (!mapInstanceRef.current) return;

        const geoLayer = L.geoJSON(data, {
          style: (feature) => {
            const code = feature?.properties?.ae_regcode || 1;
            const reg = regions.find((r) => r.code === code);
            const color = reg ? getBioclimateColor(reg.bioclimate) : '#64748b';
            const isSelected = selectedRegionCode === code;
            return {
              fillColor: color,
              weight: isSelected ? 3 : 1.2,
              opacity: 0.9,
              color: isSelected ? '#f59e0b' : '#ffffff',
              fillOpacity: isSelected ? 0.85 : 0.65
            };
          },
          onEachFeature: (feature, layer) => {
            const code = feature.properties?.ae_regcode;
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
      .catch((err) => console.error('Failed to load AEZ GeoJSON:', err));

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update styles when selectedRegionCode changes
  useEffect(() => {
    if (!geoLayerRef.current) return;
    geoLayerRef.current.eachLayer((layer: any) => {
      const code = layer.feature?.properties?.ae_regcode;
      const isSelected = selectedRegionCode === code;
      const reg = regions.find((r) => r.code === code);
      const color = reg ? getBioclimateColor(reg.bioclimate) : '#64748b';

      layer.setStyle({
        fillColor: color,
        weight: isSelected ? 3 : 1.2,
        color: isSelected ? '#f59e0b' : '#ffffff',
        fillOpacity: isSelected ? 0.85 : 0.65
      });
      if (isSelected && mapInstanceRef.current) {
        mapInstanceRef.current.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 7 });
      }
    });
  }, [selectedRegionCode]);

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([22.8, 82.5], 4.8);
    }
  };

  const filteredRegions = regions.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toString() === searchQuery.trim() ||
      r.bioclimate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.soil_order.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.crops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBio =
      selectedBioclimate === 'all' || r.bioclimate.toLowerCase().includes(selectedBioclimate.toLowerCase());

    return matchesSearch && matchesBio;
  });

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden flex flex-col lg:flex-row h-[780px]">
      
      {/* Left Sidebar */}
      <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col h-full bg-stone-50/50">
        
        <div className="p-4 border-b border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
              20 Agro-Ecological Regions
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
              ICAR-NBSS&LUP 1992
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search eco-region, soil, bioclimate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-sans"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {bioclimates.map((bio) => (
              <button
                key={bio}
                onClick={() => setSelectedBioclimate(bio)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-colors ${
                  selectedBioclimate === bio
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {bio === 'all' ? 'ALL REGIONS' : bio.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredRegions.map((region) => {
            const isSelected = selectedRegionCode === region.code;
            const color = getBioclimateColor(region.bioclimate);
            return (
              <div
                key={region.code}
                onClick={() => onSelectRegion(region.code)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 shadow-sm ring-1 ring-amber-400'
                    : 'bg-white border-stone-200/90 hover:border-amber-300 hover:shadow-2xs'
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
                    <h4 className="text-xs font-bold text-stone-900 leading-snug">
                      {region.name}
                    </h4>
                    <div className="text-[11px] text-amber-800 font-mono mt-0.5">
                      {region.bioclimate} • LGP: {region.lgp_days}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 truncate">
                      Soil: {region.soil_order}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-white border-t border-stone-200 text-[11px] font-mono text-stone-500 flex items-center justify-between">
          <span>Showing {filteredRegions.length} of 20 regions</span>
          <button
            onClick={handleResetView}
            className="flex items-center gap-1 text-amber-800 hover:text-amber-950 font-bold"
          >
            <RotateCcw className="w-3 h-3" /> Reset View
          </button>
        </div>

      </div>

      {/* Right Map Canvas */}
      <div className="flex-1 relative bg-stone-100 h-full">
        <div ref={mapContainerRef} className="w-full h-full z-0"></div>

        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Inspector */}
        {hoveredRegion && (
          <div className="absolute top-4 left-4 z-10 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-300 shadow-xl pointer-events-none animate-in fade-in duration-150">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-mono font-bold"
                style={{ backgroundColor: getBioclimateColor(hoveredRegion.bioclimate) }}
              >
                {hoveredRegion.code}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                AER {hoveredRegion.code} • {hoveredRegion.bioclimate}
              </span>
            </div>
            <h4 className="text-sm font-bold font-serif-academic text-stone-900 leading-snug">
              {hoveredRegion.name}
            </h4>
            <div className="text-xs text-stone-600 mt-1">
              <span className="font-semibold text-stone-800">LGP:</span> {hoveredRegion.lgp_days}
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              <span className="font-semibold text-stone-800">Soil Order:</span> {hoveredRegion.soil_order}
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              <span className="font-semibold text-stone-800">Crops:</span> {hoveredRegion.crops.slice(0, 3).join(', ')}
            </div>
            <div className="text-[11px] font-mono text-amber-800 mt-2 pt-2 border-t border-stone-200 font-medium">
              Click to view complete ecological profile →
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md p-2.5 rounded-lg border border-stone-200 shadow-md text-[10px] font-mono max-w-xs hidden sm:block">
          <div className="font-bold text-stone-800 mb-1">BIOCLIMATE ZONING (NBSS&LUP)</div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-stone-600">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#475569'}}></span> Cold Arid (AER 1)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#ea580c'}}></span> Hot Arid (AER 2)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#d97706'}}></span> Semi-Arid (AER 3-8)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#16a34a'}}></span> Subhumid (AER 9-13)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs" style={{backgroundColor: '#0284c7'}}></span> Perhumid (AER 16-20)</div>
          </div>
        </div>

      </div>

    </div>
  );
};

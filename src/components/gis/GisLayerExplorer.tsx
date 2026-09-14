import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Eye, EyeOff, Sliders, MapPin, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Database } from 'lucide-react';
import { SourceBadge } from '../common/SourceBadge';

interface GisLayerExplorerProps {
  onSelectRegion?: (code: number, type: 'acz' | 'aez') => void;
}

export const GisLayerExplorer: React.FC<GisLayerExplorerProps> = ({ onSelectRegion }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layers state
  const [showAcz, setShowAcz] = useState(true);
  const [showAez, setShowAez] = useState(false);
  const [showCentroids, setShowCentroids] = useState(false);
  const [basemapType, setBasemapType] = useState<'positron' | 'satellite' | 'osm'>('positron');
  const [aczOpacity, setAczOpacity] = useState(0.7);
  const [aezOpacity, setAezOpacity] = useState(0.7);

  // Layer references
  const aczGeoLayerRef = useRef<L.GeoJSON | null>(null);
  const aezGeoLayerRef = useRef<L.GeoJSON | null>(null);
  const centroidsLayerRef = useRef<L.LayerGroup | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [22.8, 82.5],
      zoom: 4.8,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Basemap URLs
    const getBaseUrl = (type: string) => {
      if (type === 'satellite') {
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      }
      if (type === 'osm') {
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      }
      return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    };

    const tile = L.tileLayer(getBaseUrl('positron'), { maxZoom: 19 }).addTo(map);
    baseTileLayerRef.current = tile;

    // Layer group for centroids
    const centroidGroup = L.layerGroup();
    centroidsLayerRef.current = centroidGroup;

    // 1. Fetch ACZ GeoJSON
    fetch('/data/agro_climatic_zones_web.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (!mapInstanceRef.current) return;

        const aczColors = ['#1b4332', '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#d97706', '#b45309', '#92400e', '#78350f', '#0284c7', '#0369a1', '#075985', '#4f46e5', '#ca8a04', '#0d9488'];

        const aczLayer = L.geoJSON(data, {
          style: (feat) => {
            const code = feat?.properties?.regioncode || 1;
            return {
              fillColor: aczColors[(code - 1) % aczColors.length],
              weight: 1.5,
              opacity: 0.9,
              color: '#ffffff',
              fillOpacity: 0.7
            };
          },
          onEachFeature: (feat, layer) => {
            const p = feat.properties;
            layer.bindTooltip(`
              <div style="font-family: Inter, sans-serif; font-size: 11px;">
                <strong>[ACZ Zone ${p.regioncode}]</strong> ${p.regionname}<br/>
                <span style="color: #64748b;">${p.state || ''}</span>
              </div>
            `);

            layer.on({
              click: () => {
                if (onSelectRegion && p.regioncode) {
                  onSelectRegion(p.regioncode, 'acz');
                }
              }
            });

            // Calculate centroid for centroids layer
            const bounds = (layer as any).getBounds();
            const center = bounds.getCenter();
            const marker = L.circleMarker(center, {
              radius: 5,
              fillColor: '#f59e0b',
              color: '#000000',
              weight: 1,
              fillOpacity: 0.9
            }).bindTooltip(`Zone ${p.regioncode} Centroid: Lat ${center.lat.toFixed(2)}, Lon ${center.lng.toFixed(2)}`);
            centroidGroup.addLayer(marker);
          }
        });

        aczGeoLayerRef.current = aczLayer;
        if (showAcz) {
          aczLayer.addTo(map);
        }
      });

    // 2. Fetch AEZ GeoJSON
    fetch('/data/agro_ecological_zones_web.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (!mapInstanceRef.current) return;

        const aezLayer = L.geoJSON(data, {
          style: () => ({
            fillColor: '#854d0e',
            weight: 2,
            opacity: 0.9,
            color: '#d97706',
            fillOpacity: 0.65,
            dashArray: '4, 4'
          }),
          onEachFeature: (feat, layer) => {
            const p = feat.properties;
            layer.bindTooltip(`
              <div style="font-family: Inter, sans-serif; font-size: 11px;">
                <strong>[AEZ Region ${p.ae_regcode}]</strong><br/>
                ${p.physio_reg || ''}
              </div>
            `);

            layer.on({
              click: () => {
                if (onSelectRegion && p.ae_regcode) {
                  onSelectRegion(p.ae_regcode, 'aez');
                }
              }
            });
          }
        });

        aezGeoLayerRef.current = aezLayer;
        if (showAez) {
          aezLayer.addTo(map);
        }
      });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update basemap
  useEffect(() => {
    if (!mapInstanceRef.current || !baseTileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(baseTileLayerRef.current);

    let url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    if (basemapType === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    } else if (basemapType === 'osm') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }

    const newTile = L.tileLayer(url, { maxZoom: 19 }).addTo(mapInstanceRef.current);
    baseTileLayerRef.current = newTile;
    newTile.bringToBack();
  }, [basemapType]);

  // Toggle ACZ Layer & Opacity
  useEffect(() => {
    if (!mapInstanceRef.current || !aczGeoLayerRef.current) return;
    if (showAcz) {
      if (!mapInstanceRef.current.hasLayer(aczGeoLayerRef.current)) {
        aczGeoLayerRef.current.addTo(mapInstanceRef.current);
      }
      aczGeoLayerRef.current.setStyle({ fillOpacity: aczOpacity });
    } else {
      if (mapInstanceRef.current.hasLayer(aczGeoLayerRef.current)) {
        mapInstanceRef.current.removeLayer(aczGeoLayerRef.current);
      }
    }
  }, [showAcz, aczOpacity]);

  // Toggle AEZ Layer & Opacity
  useEffect(() => {
    if (!mapInstanceRef.current || !aezGeoLayerRef.current) return;
    if (showAez) {
      if (!mapInstanceRef.current.hasLayer(aezGeoLayerRef.current)) {
        aezGeoLayerRef.current.addTo(mapInstanceRef.current);
      }
      aezGeoLayerRef.current.setStyle({ fillOpacity: aezOpacity });
    } else {
      if (mapInstanceRef.current.hasLayer(aezGeoLayerRef.current)) {
        mapInstanceRef.current.removeLayer(aezGeoLayerRef.current);
      }
    }
  }, [showAez, aezOpacity]);

  // Toggle Centroids
  useEffect(() => {
    if (!mapInstanceRef.current || !centroidsLayerRef.current) return;
    if (showCentroids) {
      centroidsLayerRef.current.addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.removeLayer(centroidsLayerRef.current);
    }
  }, [showCentroids]);

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Spatial GIS Console
          </span>
          <SourceBadge source="SUPPLIED GIS DATA" subtext="Both Shp files verified" />
          <SourceBadge source="DERIVED FROM GIS" subtext="WGS84 EPSG:4326 reprojection" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          GIS Layer Explorer
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Interact directly with the vector GIS layers extracted from the user-supplied shapefiles. Toggle layer visibilities, adjust opacity, switch legal basemaps, and inspect spatial overlaps.
        </p>
      </div>

      {/* Map + Control Sidebar */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden flex flex-col lg:flex-row h-[740px]">
        
        {/* Layer Controls Sidebar */}
        <div className="w-full lg:w-80 p-5 bg-stone-50 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-800" /> Active GIS Layers
              </h3>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                Live Console
              </span>
            </div>

            {/* Layer 1: Agro-Climatic Regions */}
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold text-stone-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAcz}
                    onChange={(e) => setShowAcz(e.target.checked)}
                    className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Agro-Climatic (15 Zones)</span>
                </label>
                <span className="text-[10px] font-mono text-stone-400">15 Shp</span>
              </div>
              
              {showAcz && (
                <div className="pt-2 border-t border-stone-100 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-stone-500">
                    <span>Opacity</span>
                    <span>{Math.round(aczOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={aczOpacity}
                    onChange={(e) => setAczOpacity(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                </div>
              )}
            </div>

            {/* Layer 2: Agro-Ecological Regions */}
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold text-stone-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAez}
                    onChange={(e) => setShowAez(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Agro-Ecological (20 Regions)</span>
                </label>
                <span className="text-[10px] font-mono text-stone-400">20 Shp</span>
              </div>

              {showAez && (
                <div className="pt-2 border-t border-stone-100 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-stone-500">
                    <span>Opacity</span>
                    <span>{Math.round(aezOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={aezOpacity}
                    onChange={(e) => setAezOpacity(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
              )}
            </div>

            {/* Layer 3: Zone Centroids */}
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-stone-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCentroids}
                  onChange={(e) => setShowCentroids(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Zonal Centroids (Lat/Lon)</span>
              </label>
              <span className="text-[10px] font-mono text-stone-400">Points</span>
            </div>

            {/* Basemap Options */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-700">
                Basemap Selector
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setBasemapType('positron')}
                  className={`p-2 rounded-lg text-[10px] font-mono text-center border transition-all ${
                    basemapType === 'positron'
                      ? 'bg-emerald-800 text-white font-bold border-emerald-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Positron
                </button>
                <button
                  onClick={() => setBasemapType('satellite')}
                  className={`p-2 rounded-lg text-[10px] font-mono text-center border transition-all ${
                    basemapType === 'satellite'
                      ? 'bg-emerald-800 text-white font-bold border-emerald-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => setBasemapType('osm')}
                  className={`p-2 rounded-lg text-[10px] font-mono text-center border transition-all ${
                    basemapType === 'osm'
                      ? 'bg-emerald-800 text-white font-bold border-emerald-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  OSM
                </button>
              </div>
            </div>
          </div>

          {/* GIS Metadata Disclaimer */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 text-[10px] font-mono text-stone-500 space-y-1">
            <div><span className="font-bold text-stone-800">Original CRS:</span> Lambert Conformal Conic</div>
            <div><span className="font-bold text-stone-800">Transformed CRS:</span> WGS84 (EPSG:4326)</div>
            <div><span className="font-bold text-stone-800">Geometry Integrity:</span> Topology Preserved</div>
          </div>

        </div>

        {/* Map Canvas */}
        <div className="flex-1 relative bg-stone-100 h-full">
          <div ref={mapContainerRef} className="w-full h-full z-0"></div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={() => mapInstanceRef.current?.zoomIn()}
              className="w-8 h-8 rounded-lg bg-white/95 border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => mapInstanceRef.current?.zoomOut()}
              className="w-8 h-8 rounded-lg bg-white/95 border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => mapInstanceRef.current?.setView([22.8, 82.5], 4.8)}
              className="w-8 h-8 rounded-lg bg-white/95 border border-stone-200 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom attribution overlay */}
          <div className="absolute bottom-3 right-3 z-10 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-mono px-3 py-1.5 rounded-lg shadow-sm">
            Overlay Mode: {showAcz && showAez ? 'ACZ (15) + AEZ (20) Dual Layer' : showAcz ? 'Agro-Climatic (15)' : showAez ? 'Agro-Ecological (20)' : 'Base only'}
          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';
import { CloudRain, Thermometer, Info, ShieldCheck, Scale, Compass } from 'lucide-react';
import { AczRegion } from '../../types';
import { SourceBadge } from '../common/SourceBadge';

interface ClimateDashboardProps {
  regions: AczRegion[];
  onSelectRegion: (code: number) => void;
}

export const ClimateDashboard: React.FC<ClimateDashboardProps> = ({ regions, onSelectRegion }) => {
  const [activeChart, setActiveChart] = useState<'rainfall' | 'temperature' | 'area'>('rainfall');

  // Prepare chart data for Rainfall
  const rainfallData = regions.map((r) => ({
    code: `Z${r.code}`,
    name: r.name,
    minRainfall: r.rainfall_num_min,
    maxRainfall: r.rainfall_num_max,
    rangeLabel: r.avgann_rf,
    fullRegion: r
  }));

  // Prepare chart data for Temperature
  const temperatureData = regions.map((r) => ({
    code: `Z${r.code}`,
    name: r.name,
    janMin: r.temp_jan_min,
    janMax: r.temp_jan_max,
    julMin: r.temp_jul_min,
    julMax: r.temp_jul_max,
    janLabel: r.avgtmp_jan,
    julLabel: r.avgtmp_jul,
    fullRegion: r
  }));

  // Prepare chart data for Area (in Million Hectares)
  const areaData = regions.map((r) => ({
    code: `Z${r.code}`,
    name: r.name,
    areaMha: parseFloat((r.calculated_area_ha / 1e6).toFixed(2)),
    areaKm2: r.calculated_area_km2,
    fullRegion: r
  }));

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
            Empirical Visualization
          </span>
          <SourceBadge source="SUPPLIED GIS DATA" subtext="Shapefile DBF attribute table" />
          <SourceBadge source="OFFICIAL SOURCE" subtext="Planning Commission (1989)" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Agro-Meteorological Climate Dashboard
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Interactive empirical charts generated directly from the supplied shapefile DBF attribute values. Every metric is clearly displayed with its official unit of measurement and institutional source period.
        </p>
      </div>

      {/* Chart Selector Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveChart('rainfall')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeChart === 'rainfall'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" /> ANNUAL RAINFALL RANGES (MM)
          </button>
          <button
            onClick={() => setActiveChart('temperature')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeChart === 'temperature'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" /> TEMPERATURE REGIMES (°C)
          </button>
          <button
            onClick={() => setActiveChart('area')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeChart === 'area'
                ? 'bg-[#1b4332] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> REGIONAL AREA (M HA)
          </button>
        </div>

        <div className="text-[11px] font-mono text-stone-500">
          Source Dataset: <span className="font-bold text-stone-800">Agroclimatic_regions.dbf</span>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
        
        {/* Chart Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base font-bold font-serif-academic text-stone-900">
              {activeChart === 'rainfall' && 'Annual Isohyetal Rainfall Distribution by Zone'}
              {activeChart === 'temperature' && 'Winter (January) vs Summer (July) Thermal Extremes'}
              {activeChart === 'area' && 'Geodesic Land Surface Area by Agro-Climatic Zone'}
            </h3>
            <div className="text-xs text-stone-500 font-mono mt-0.5">
              {activeChart === 'rainfall' && 'Variable: Mean Annual Rainfall • Unit: Millimeters (mm) [Converted from cm in DBF]'}
              {activeChart === 'temperature' && 'Variable: Monthly Surface Air Temperature • Unit: Degrees Celsius (°C)'}
              {activeChart === 'area' && 'Variable: Delineated Land Area • Unit: Million Hectares (M ha) & Sq Km'}
            </div>
          </div>

          <div className="text-[11px] font-mono text-stone-400">
            Click any bar to inspect zone details
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-[440px] w-full">
          {activeChart === 'rainfall' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rainfallData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectRegion(e.activePayload[0].payload.fullRegion.code);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="code" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <YAxis
                  unit=" mm"
                  tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xl font-sans text-xs space-y-1">
                          <div className="font-bold text-stone-900">{d.code}: {d.name}</div>
                          <div className="text-blue-700 font-mono font-bold">Rainfall: {d.rangeLabel}</div>
                          <div className="text-stone-500 font-mono text-[10px]">Min: {d.minRainfall} mm • Max: {d.maxRainfall} mm</div>
                          <div className="text-[10px] text-emerald-800 pt-1 font-mono">Click bar to view full profile</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="minRainfall" name="Lower Range (mm)" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="maxRainfall" name="Upper Range (mm)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'temperature' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={temperatureData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectRegion(e.activePayload[0].payload.fullRegion.code);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="code" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <YAxis
                  unit=" °C"
                  tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xl font-sans text-xs space-y-1">
                          <div className="font-bold text-stone-900">{d.code}: {d.name}</div>
                          <div className="text-blue-700 font-mono">January: {d.janLabel}</div>
                          <div className="text-amber-700 font-mono">July: {d.julLabel}</div>
                          <div className="text-[10px] text-emerald-800 pt-1 font-mono">Click bar to view full profile</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="janMin" name="Jan Min (°C)" fill="#60a5fa" />
                <Bar dataKey="janMax" name="Jan Max (°C)" fill="#2563eb" />
                <Bar dataKey="julMin" name="Jul Min (°C)" fill="#f59e0b" />
                <Bar dataKey="julMax" name="Jul Max (°C)" fill="#d97706" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'area' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={areaData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectRegion(e.activePayload[0].payload.fullRegion.code);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="code" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <YAxis
                  unit=" M ha"
                  tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  label={{ value: 'Area (Million Hectares)', angle: -90, position: 'insideLeft', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xl font-sans text-xs space-y-1">
                          <div className="font-bold text-stone-900">{d.code}: {d.name}</div>
                          <div className="text-emerald-800 font-mono font-bold">Calculated Area: {d.areaMha} M ha</div>
                          <div className="text-stone-500 font-mono text-[10px]">{d.areaKm2.toLocaleString()} km²</div>
                          <div className="text-[10px] text-emerald-800 pt-1 font-mono">Calculated from supplied GIS geometry</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="areaMha" name="Area (Million Hectares)" fill="#1b4332" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Source & Period Metadata Footer */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono">
          <div>
            <span className="font-bold text-stone-900">Source:</span> Planning Commission (1989) &amp; GIS Shapefile DBF Attributes.
          </div>
          <div>
            <span className="font-bold text-stone-900">Coverage:</span> 15 Verified Macro-Zones covering 329M ha.
          </div>
        </div>

      </div>

    </div>
  );
};

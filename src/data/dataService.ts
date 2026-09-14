import { MasterMetadata, GlossaryAndRefs, AczRegion, AezRegion } from '../types';

let cachedMetadata: MasterMetadata | null = null;
let cachedGlossaryRefs: GlossaryAndRefs | null = null;

export async function fetchMetadata(): Promise<MasterMetadata> {
  if (cachedMetadata) return cachedMetadata;
  const res = await fetch('/data/regionalization_metadata.json');
  if (!res.ok) throw new Error(`Failed to load regionalization metadata: ${res.statusText}`);
  cachedMetadata = await res.json();
  return cachedMetadata!;
}

export async function fetchGlossaryAndRefs(): Promise<GlossaryAndRefs> {
  if (cachedGlossaryRefs) return cachedGlossaryRefs;
  const res = await fetch('/data/glossary_and_references.json');
  if (!res.ok) throw new Error(`Failed to load glossary & references: ${res.statusText}`);
  cachedGlossaryRefs = await res.json();
  return cachedGlossaryRefs!;
}

export async function fetchGeoJSON(type: 'acz' | 'aez', optimized: boolean = true) {
  const fileName = type === 'acz' 
    ? (optimized ? 'agro_climatic_zones_web.geojson' : 'agro_climatic_zones.geojson')
    : (optimized ? 'agro_ecological_zones_web.geojson' : 'agro_ecological_zones.geojson');
  
  const res = await fetch(`/data/${fileName}`);
  if (!res.ok) throw new Error(`Failed to load GeoJSON (${fileName}): ${res.statusText}`);
  return await res.json();
}

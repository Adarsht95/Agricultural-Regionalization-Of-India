export interface SourceAttribution {
  spatial_source: string;
  classification_source: string;
  literature_source: string;
  provenance_badge: 'SUPPLIED GIS DATA' | 'SUPPLIED PDF' | 'OFFICIAL SOURCE' | 'PEER-REVIEWED SOURCE' | 'DERIVED FROM GIS';
}

export interface AczRegion {
  code: number;
  name: string;
  category: 'Himalayan' | 'Gangetic' | 'Plateau' | 'Coastal' | 'Arid & Semi-Arid' | 'Islands';
  states: string[];
  avgtmp_jan: string;
  avgtmp_jul: string;
  avgann_rf: string;
  rainfall_num_min: number;
  rainfall_num_max: number;
  temp_jan_min: number;
  temp_jan_max: number;
  temp_jul_min: number;
  temp_jul_max: number;
  soil: string;
  soil_types: string[];
  physiography: string;
  lgp_days: string;
  major_crops: string[];
  horticulture: string[];
  pastoral_activities: string;
  water_resources: string;
  constraints: string[];
  development_strategies: string[];
  shapefile_area_ha: string;
  calculated_area_km2: number;
  calculated_area_ha: number;
  calculated_perimeter_km: number;
  centroid: [number, number];
  bbox: [number, number, number, number];
  source_attribution: SourceAttribution;
}

export interface AezRegion {
  code: number;
  name: string;
  raw_physio: string;
  bioclimate: string;
  soil_order: string;
  lgp_days: string;
  lgp_class: '<90' | '90-150' | '150-180' | '180-210' | '210+';
  physiography: string;
  states: string[];
  crops: string[];
  constraints: string[];
  area_sqkm_dbf: number;
  calculated_area_km2: number;
  calculated_area_ha: number;
  calculated_perimeter_km: number;
  centroid: [number, number];
  bbox: [number, number, number, number];
}

export interface Framework {
  id: string;
  name: string;
  institution: string;
  year: number;
  count: number;
  sub_units: string;
  primary_basis: string;
  primary_purpose: string;
  source_doc: string;
}

export interface MasterMetadata {
  project: {
    title: string;
    version: string;
    generated_at: string;
    crs_original: string;
    crs_web: string;
    total_acz_zones: number;
    total_aez_regions: number;
  };
  frameworks: Framework[];
  acz_regions: AczRegion[];
  aez_regions: AezRegion[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
  source: string;
}

export interface ReferenceCitation {
  title: string;
  author: string;
  year: string;
  details: string;
  url?: string;
}

export interface ReferenceCategory {
  category: string;
  citations: ReferenceCitation[];
}

export interface GlossaryAndRefs {
  glossary: GlossaryItem[];
  references: ReferenceCategory[];
}

export interface QuizQuestion {
  id: number;
  type: 'mcq' | 'boolean';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceBadge: string;
}

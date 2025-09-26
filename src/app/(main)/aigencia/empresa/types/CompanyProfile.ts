// Domain Types - Single Responsibility Principle
export interface CompanyProfile {
  // Información básica
  name: string;
  industry: string;
  size: string;
  founded: string;
  website: string;
  description: string;
  
  // Storytelling
  mission: string;
  vision: string;
  values: string[];
  brandStory: string;
  
  // Productos/Servicios
  products: Product[];
  productDescription?: string;
  
  // Audiencia objetivo
  targetAudience: TargetAudience;
  targetAgeGroup?: string;
  targetSocioeconomic?: string;
  audienceBehavior?: string;
  
  // Competencia
  competitors: string[];
  differentiators: string[];
  competitiveAnalysis?: string;
  competitiveAdvantage?: string;
  
  // Branding
  brandPersonality: string[];
  tone: string;
  keywords: string[];
  brandDescription?: string;
  visualStyle?: string;
  communicationTone?: string;
  
  // Canales
  channels: string[];
  contentTypes: string[];
  socialPlatforms?: string[];
  marketingGoal?: string;
  marketingBudget?: string;
  contentStrategy?: string;
  otherChannels?: string;
}

export interface Product {
  name: string;
  description: string;
  targetAudience: string;
  price: string;
}

export interface TargetAudience {
  demographics: string;
  psychographics: string;
  painPoints: string[];
  goals: string[];
  description?: string;
}

export type SectionId = 'basic' | 'storytelling' | 'products' | 'audience' | 'competition' | 'branding' | 'channels';

export interface SectionConfig {
  id: SectionId;
  label: string;
  icon: any;
  step: number;
}





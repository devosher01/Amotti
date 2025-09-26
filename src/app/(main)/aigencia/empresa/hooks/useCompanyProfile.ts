import { useState, useEffect } from 'react';
import { CompanyProfile, SectionId } from '../types/CompanyProfile';

// Custom Hook - Single Responsibility Principle
export const useCompanyProfile = () => {
  const [profile, setProfile] = useState<CompanyProfile>({
    name: '',
    industry: '',
    size: '',
    founded: '',
    website: '',
    description: '',
    mission: '',
    vision: '',
    values: [],
    brandStory: '',
    products: [],
    targetAudience: {
      demographics: '',
      psychographics: '',
      painPoints: [],
      goals: []
    },
    competitors: [],
    differentiators: [],
    brandPersonality: [],
    tone: '',
    keywords: [],
    channels: [],
    contentTypes: []
  });

  const [activeSection, setActiveSection] = useState<SectionId>('basic');
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calcular porcentaje de completitud
  useEffect(() => {
    const fields = [
      profile.name,
      profile.industry,
      profile.description,
      profile.mission,
      profile.vision,
      profile.brandStory,
      profile.targetAudience.demographics,
      profile.targetAudience.psychographics,
    ];
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    const percentage = Math.round((filledFields / fields.length) * 100);
    setCompletionPercentage(percentage);
  }, [profile]);

  // Función para verificar completitud de secciones
  const getSectionCompletionStatus = (sectionId: SectionId): boolean => {
    switch (sectionId) {
      case 'basic':
        return !!(profile.name && profile.industry && profile.description);
      case 'storytelling':
        return !!(profile.mission && profile.vision && profile.brandStory && profile.values.length > 0);
      case 'products':
        return profile.products.length > 0;
      case 'audience':
        return !!(profile.targetAudience.demographics && profile.targetAudience.psychographics && 
                 profile.targetAudience.painPoints.length > 0 && profile.targetAudience.goals.length > 0);
      case 'competition':
        return !!(profile.competitors.length > 0 && profile.differentiators.length > 0);
      case 'branding':
        return !!(profile.tone && profile.brandPersonality.length > 0 && profile.keywords.length > 0);
      case 'channels':
        return !!(profile.channels.length > 0 && profile.contentTypes.length > 0);
      default:
        return false;
    }
  };

  const addArrayItem = (key: keyof CompanyProfile, value: string) => {
    if (!value.trim()) return;
    setProfile(prev => ({
      ...prev,
      [key]: [...(prev[key] as string[]), value.trim()]
    }));
  };

  const removeArrayItem = (key: keyof CompanyProfile, index: number) => {
    setProfile(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log('💾 Guardando perfil de empresa:', profile);
    // Aquí se guardaría en la base de datos
  };

  return {
    profile,
    setProfile,
    activeSection,
    setActiveSection,
    completionPercentage,
    getSectionCompletionStatus,
    addArrayItem,
    removeArrayItem,
    handleSave,
  };
};


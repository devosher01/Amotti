import { useState, useCallback } from 'react';

export interface UseCampaignGeneratorReturn {
  isModalOpen: boolean;
  openCampaignGenerator: () => void;
  closeCampaignGenerator: () => void;
}

export function useCampaignGenerator(): UseCampaignGeneratorReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCampaignGenerator = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeCampaignGenerator = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openCampaignGenerator,
    closeCampaignGenerator
  };
}
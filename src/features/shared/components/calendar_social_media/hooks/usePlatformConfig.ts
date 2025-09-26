import { useState, useCallback } from "react";

export interface GlobalConfig {
  autoPublish: boolean;
  urlShortener: boolean;
  hashtagOptimization: boolean;
}

export interface FacebookConfig {
  autoTagFriends: boolean;
  locationTagging: boolean;
  audienceTargeting: boolean;
}

export interface InstagramConfig {
  autoAddHashtags: boolean;
  storyHighlights: boolean;
  locationTagging: boolean;
}

export const usePlatformConfig = () => {
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>({
    autoPublish: true,
    urlShortener: false,
    hashtagOptimization: true,
  });

  const [facebookConfig, setFacebookConfig] = useState<FacebookConfig>({
    autoTagFriends: false,
    locationTagging: true,
    audienceTargeting: false,
  });

  const [instagramConfig, setInstagramConfig] = useState<InstagramConfig>({
    autoAddHashtags: true,
    storyHighlights: false,
    locationTagging: true,
  });

  const updateGlobalConfig = useCallback((key: keyof GlobalConfig, value: boolean) => {
    setGlobalConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateFacebookConfig = useCallback((key: keyof FacebookConfig, value: boolean) => {
    setFacebookConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateInstagramConfig = useCallback((key: keyof InstagramConfig, value: boolean) => {
    setInstagramConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    globalConfig,
    facebookConfig,
    instagramConfig,
    updateGlobalConfig,
    updateFacebookConfig,
    updateInstagramConfig,
  };
};
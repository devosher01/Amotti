import { useState, useEffect, useCallback } from "react";
import { SocialMediaPostType } from "../types";

interface UsePostFormProps {
  initialPost?: SocialMediaPostType | null;
  isOpen: boolean;
}

export const usePostForm = ({ initialPost, isOpen }: UsePostFormProps) => {
  const [formData, setFormData] = useState<SocialMediaPostType>({
    id: "",
    title: "",
    content: "",
    scheduledTime: new Date(),
    platforms: ["instagram"],
    status: "draft",
    mediaUrls: [],
  });

  const [hasImage, setHasImage] = useState(false);
  const [selectedContentTypes, setSelectedContentTypes] = useState<Record<string, string>>({
    facebook: "post",
    instagram: "post"
  });

  useEffect(() => {
    if (initialPost) {
      setFormData({
        ...initialPost,
        scheduledTime: initialPost.scheduledTime ? new Date(initialPost.scheduledTime) : new Date(),
      });
    } else {
      setFormData({
        id: "",
        title: "",
        content: "",
        scheduledTime: new Date(),
        platforms: ["instagram"],
        status: "draft",
        mediaUrls: [],
      });
    }
  }, [initialPost, isOpen]);

  const handleInputChange = useCallback((field: keyof SocialMediaPostType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleDateTimeChange = useCallback((newValue: unknown) => {
    if (newValue instanceof Date) {
      setFormData(prev => ({ ...prev, scheduledTime: newValue }));
    }
  }, []);

  const togglePlatform = useCallback((platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  }, []);

  const handleContentTypeChange = useCallback((platform: string, contentType: string) => {
    setSelectedContentTypes(prev => ({
      ...prev,
      [platform]: contentType
    }));
  }, []);

  const getCurrentContentType = useCallback((platform: string) => {
    return selectedContentTypes[platform] || "post";
  }, [selectedContentTypes]);

  return {
    formData,
    hasImage,
    setHasImage,
    selectedContentTypes,
    handleInputChange,
    handleDateTimeChange,
    togglePlatform,
    handleContentTypeChange,
    getCurrentContentType,
  };
};
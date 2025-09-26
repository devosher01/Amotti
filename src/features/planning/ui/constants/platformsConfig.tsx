import React from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhoto,
  IconVideo,
  IconPlus,
} from "@tabler/icons-react";

export interface ContentType {
  value: string;
  label: string;
  icon: React.ReactElement;
  description: string;
}

export interface Platform {
  value: string;
  label: string;
  icon: React.ReactElement;
  color: string;
  contentTypes: ContentType[];
}

export const PLATFORMS_CONFIG: Platform[] = [
  {
    value: "facebook",
    label: "Facebook",
    icon: <IconBrandFacebook size={20} />,
    color: "#1877F2",
    contentTypes: [
      { 
        value: "post", 
        label: "POST", 
        icon: <IconPhoto size={16} />, 
        description: "Publicación estándar" 
      },
      { 
        value: "reel", 
        label: "REEL", 
        icon: <IconVideo size={16} />, 
        description: "Video corto vertical" 
      },
      { 
        value: "story", 
        label: "HISTORIA", 
        icon: <IconPlus size={16} />, 
        description: "Contenido temporal 24h" 
      }
    ]
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: <IconBrandInstagram size={20} />,
    color: "#E4405F",
    contentTypes: [
      { 
        value: "post", 
        label: "POST", 
        icon: <IconPhoto size={16} />, 
        description: "Publicación estándar" 
      },
      { 
        value: "reel", 
        label: "REEL", 
        icon: <IconVideo size={16} />, 
        description: "Video corto vertical" 
      },
      { 
        value: "story", 
        label: "HISTORIA", 
        icon: <IconPlus size={16} />, 
        description: "Contenido temporal 24h" 
      },
    ]
  }
];

export const DEFAULT_CONTENT_TYPES: Record<string, string> = {
  facebook: "post",
  instagram: "post"
};

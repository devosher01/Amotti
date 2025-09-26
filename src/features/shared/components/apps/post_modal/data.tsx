import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhoto,
  IconVideo,
  IconPlus,
} from "@tabler/icons-react";
import { PlatformType } from "./types";

export const platforms: PlatformType[] = [
  {
    value: "facebook",
    label: "Facebook",
    icon: <IconBrandFacebook size={20} />,
    color: "#1877F2",
    contentTypes: [
      { value: "post", label: "POST", icon: <IconPhoto size={16} />, description: "Publicación estándar" },
      { value: "reel", label: "REEL", icon: <IconVideo size={16} />, description: "Video corto vertical" },
      { value: "story", label: "HISTORIA", icon: <IconPlus size={16} />, description: "Contenido temporal 24h" }
    ]
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: <IconBrandInstagram size={20} />,
    color: "#E4405F",
    contentTypes: [
      { value: "post", label: "POST", icon: <IconPhoto size={16} />, description: "Publicación estándar" },
      { value: "reel", label: "REEL", icon: <IconVideo size={16} />, description: "Video corto vertical" },
      { value: "story", label: "HISTORIA", icon: <IconPlus size={16} />, description: "Contenido temporal 24h" },
      { value: "carousel", label: "CARRUSEL", icon: <IconPhoto size={16} />, description: "Múltiples imágenes" }
    ]
  }
]; 
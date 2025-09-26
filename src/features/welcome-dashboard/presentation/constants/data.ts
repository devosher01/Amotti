import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCalendar,
  IconChartLine,
  IconBrain,
  IconRocket,
  IconLink,
  IconSettings,
  IconCheck,
} from "@tabler/icons-react";

export const socialPlatforms = [
  {
    name: "Instagram",
    key: "instagram",
    icon: IconBrandInstagram,
    enabled: true,
  },
  {
    name: "Facebook",
    key: "facebook", 
    icon: IconBrandFacebook,
    enabled: true,
  },
  {
    name: "Twitter",
    key: "twitter",
    icon: IconBrandTwitter,
    enabled: false,
  },
  {
    name: "LinkedIn",
    key: "linkedin",
    icon: IconBrandLinkedin,
    enabled: false,
  },
  {
    name: "TikTok",
    key: "tiktok",
    icon: IconBrandTiktok,
    enabled: false,
  },
  {
    name: "YouTube",
    key: "youtube",
    icon: IconBrandYoutube,
    enabled: false,
  },
];

export const features = [
  {
    icon: IconCalendar,
    title: "Planificación Inteligente",
    description: "Programa tu contenido con IA y automatiza tus publicaciones",
    link: "/new/planificacion",
  },
  {
    icon: IconChartLine, 
    title: "Analíticas Avanzadas",
    description: "Métricas detalladas y insights accionables para crecer",
    link: "/new/analytics",
  },
  {
    icon: IconBrain,
    title: "AIgencia Creativa",
    description: "Asistente IA que genera contenido y optimiza campañas",
    link: "/new/aigencia",
  },
];

export const onboardingSteps = [
  { 
    label: 'Bienvenido', 
    title: '¡Bienvenido a Amotii!', 
    description: 'Tu plataforma todo-en-uno para marketing en redes sociales', 
    icon: IconRocket 
  },
  { 
    label: 'Conectar Redes', 
    title: 'Conecta tus Redes Sociales', 
    description: 'Vincula tus cuentas para gestionar todo desde un lugar', 
    icon: IconLink 
  },
  { 
    label: 'Configurar Perfil', 
    title: 'Personaliza tu Experiencia', 
    description: 'Configura tu perfil y preferencias de marketing', 
    icon: IconSettings 
  },
  { 
    label: 'Listo', 
    title: '¡Todo Configurado!', 
    description: 'Ya puedes empezar a maximizar tu marketing digital', 
    icon: IconCheck 
  },
];

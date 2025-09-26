import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

import {
  IconCalendar,
  IconList,
  IconListCheck,
  IconChartLine,
  IconBrain,
  IconRobot,
  IconWand,
  IconHome,
  IconSettings,
  IconUser,
  IconBuilding,
  IconUsers,
  IconTestPipe,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Principal",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Planificación",
  },
  {
    id: uniqueId(),
    title: "Calendario",
    icon: IconCalendar,
    href: "/planificacion/calendario",
  },
  {
    id: uniqueId(),
    title: "Autolistas",
    icon: IconList,
    href: "/planificacion/autolistas",
  },
  {
    id: uniqueId(),
    title: "Listado",
    icon: IconListCheck,
    href: "/planificacion/listado",
  },
  {
    navlabel: true,
    subheader: "Analítica",
  },

  {
    id: uniqueId(),
    title: "Facebook",
    icon: IconChartLine,
    href: "/analytics/facebook",
  },
  {
    id: uniqueId(),
    title: "Instagram",
    icon: IconChartLine,
    href: "/analytics/instagram",
  },
  // {
  //   navlabel: true,
  //   subheader: "AIgencia",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Generador de Contenido",
  //   icon: IconBrain,
  //   href: "/aigencia/generador",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Asistente IA",
  //   icon: IconRobot,
  //   href: "/aigencia/asistente",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Optimización",
  //   icon: IconWand,
  //   href: "/aigencia/optimizacion",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Perfil de Empresa",
  //   icon: IconBuilding,
  //   href: "/aigencia/empresa",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Buyer Personas",
  //   icon: IconUsers,
  //   href: "/aigencia/buyer-personas",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Testing",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Calendario Testing",
  //   icon: IconTestPipe,
  //   href: "/calendar-testing",
  //   chip: "NUEVO",
  //   chipColor: "success",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Configuración",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Perfil",
  //   icon: IconUser,
  //   href: "/configuracion/perfil",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Configuración",
  //   icon: IconSettings,
  //   href: "/configuracion/settings",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Autenticación",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Iniciar Sesión",
  //   icon: IconLogin,
  //   href: "/new/auth/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Registro",
  //   icon: IconUserPlus,
  //   href: "/new/auth/register",
  // },
];

export default Menuitems;

"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { professionalBranding } from "@/utils/theme/ProfessionalBranding";
import Link from "next/link";
import SocialMediaScheduler from "@/features/shared/components/calendar_social_media/SocialMediaScheduler";
import { PublicationsCalendarPage } from "@/features/planning/ui/pages/PublicationsCalendarPage";

export default function CalendarioPage() {
  const customizer = useSelector((state: AppState) => state.customizer);
  const isDark = customizer.activeMode === 'dark';

  return (
    <PublicationsCalendarPage
    />
  );
}
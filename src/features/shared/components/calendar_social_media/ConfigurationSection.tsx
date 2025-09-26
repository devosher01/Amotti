"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import {
  IconChevronDown,
  IconSettings,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";
import CustomSwitch from "../forms/theme-elements/CustomSwitch";

interface ConfigurationItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
  settings?: {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    description?: string;
  }[];
}

interface ConfigurationSectionProps {
  items: ConfigurationItem[];
}

const ConfigurationSection: React.FC<ConfigurationSectionProps> = ({ items }) => {
  const theme = useTheme();

  return (
    <Stack spacing={0}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
                      <Accordion
              sx={{
                '&:before': { display: 'none' },
                boxShadow: 'none',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '6px',
                mb: 0.5,
              }}
            >
              <AccordionSummary
                expandIcon={<IconChevronDown size={16} />}
                sx={{
                  minHeight: '40px',
                  '& .MuiAccordionSummary-content': {
                    margin: '4px 0',
                  },
                }}
              >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      bgcolor: item.color || theme.palette.primary.main,
                      color: 'white',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
                    {item.title}
                  </Typography>
                </Box>
            </AccordionSummary>
            
            <AccordionDetails sx={{ pt: 0, pb: 1 }}>
              <Stack spacing={1}>
                {item.settings?.map((setting, settingIndex) => (
                  <Box key={settingIndex}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 0.5,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                          {setting.label}
                        </Typography>
                        {setting.description && (
                          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                            {setting.description}
                          </Typography>
                        )}
                      </Box>
                      <CustomSwitch
                        checked={setting.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setting.onChange(e.target.checked)}
                      />
                    </Box>
                    {settingIndex < (item.settings?.length || 0) - 1 && (
                      <Divider sx={{ mt: 1 }} />
                    )}
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default ConfigurationSection; 
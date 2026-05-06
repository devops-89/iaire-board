"use client";
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { FontWeights } from "@/utils/style";

interface SectionHeaderProps {
  title: string;
  badge?: string;
  color: string;
}

export const SectionHeader = ({ title, badge, color }: SectionHeaderProps) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
    <Box sx={{ width: 4, height: 24, bgcolor: color, borderRadius: 2 }} />
    <Typography
      sx={{
        fontSize: "18px",
        fontWeight: FontWeights.MEDIUM,
        color: "#122333",
      }}
    >
      {title}
    </Typography>
    {badge && (
      <Chip
        label={badge}
        sx={{
          height: 22,
          bgcolor: "rgba(18, 35, 51, 0.05)",
          fontSize: "10px",
          fontWeight: 700,
          color: "rgba(18, 35, 51, 0.6)",
        }}
      />
    )}
  </Box>
);

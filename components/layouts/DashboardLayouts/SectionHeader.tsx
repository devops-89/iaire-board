"use client";
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { FontWeights } from "@/utils/style";
import { Colors } from "@/utils/enum";

interface SectionHeaderProps {
  title: string;
  badge?: string;
  color: string;
}

export const SectionHeader = ({ title, badge, color }: SectionHeaderProps) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
    <Box
      sx={{
        width: 4,
        height: 24,
        bgcolor: color || Colors.PRIMARY_DARK,
        borderRadius: 2,
      }}
    />
    <Typography
      sx={{
        fontSize: "18px",
        fontWeight: FontWeights.MEDIUM,
        color: Colors.PRIMARY_DARK,
      }}
    >
      {title}
    </Typography>
    {badge && (
      <Chip
        label={badge}
        sx={{
          height: 22,
          bgcolor: Colors.ACCENT_MINT,
          fontSize: "10px",
          fontWeight: 700,
          color: Colors.PRIMARY_DARK,
        }}
      />
    )}
  </Box>
);

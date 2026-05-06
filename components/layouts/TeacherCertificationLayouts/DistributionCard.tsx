"use client";
import React from "react";
import { Box, Typography, Paper, LinearProgress, styled } from "@mui/material";
import { DashboardData } from "@/assets/generic-data";

const StyledProgress = styled(LinearProgress)(
  ({ color_hex }: { color_hex: string }) => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: `${color_hex}15`,
    "& .MuiLinearProgress-bar": {
      borderRadius: 4,
      backgroundColor: color_hex,
    },
  }),
);

const DistributionItem = ({ label, value, schools, color }: any) => (
  <Box sx={{ mb: 2.5 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#122333" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: color }}>
        {schools} Schools
      </Typography>
    </Box>
    <StyledProgress variant="determinate" value={value} color_hex={color} />
  </Box>
);

export const DistributionCard = () => {
  const data = DashboardData.teacherTraining?.distribution || [];

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        height: "100%",
        border: "1px solid rgba(0,0,0,0.02)",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#122333",
          mb: 4,
        }}
      >
        School-wise Distribution
      </Typography>

      <Box>
        {data.map((item: any, index: number) => (
          <DistributionItem key={index} {...item} />
        ))}
      </Box>
    </Paper>
  );
};

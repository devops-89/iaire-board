"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Grid,
  Chip,
} from "@mui/material";
import { 
  Lightbulb as InnovationIcon, 
  Description as ResearchIcon, 
  AutoAwesome as BothIcon, 
  Group as TotalIcon 
} from "@mui/icons-material";
import { DashboardData } from "@/assets/generic-data";

// Icon mapping based on keys from generic-data.ts
const IconMap: any = {
  innovation: InnovationIcon,
  research: ResearchIcon,
  both: BothIcon,
  total: TotalIcon,
};

const MiniStat = ({ label, value, pct, iconKey, color }: any) => {
  const Icon = IconMap[iconKey] || TotalIcon;
  
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.05)",
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
      }}
    >
      <Box
        sx={{
          bgcolor: `${color}10`,
          p: 1.2,
          borderRadius: "12px",
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon sx={{ fontSize: 24 }} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#122333",
            opacity: 0.8,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 800,
            color: color,
            lineHeight: 1.1,
            my: 0.3,
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "rgba(0,0,0,0.5)" }}
        >
          {pct}
        </Typography>
      </Box>
    </Paper>
  );
};

const ProgressBar = ({ label, value, color, max }: any) => (
  <Box sx={{ mb: 3 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 0.8,
      }}
    >
      <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#122333" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "12px", fontWeight: 800, color: "#122333" }}>
        {value.toLocaleString()}
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={(value / max) * 100}
      sx={{
        height: 10,
        borderRadius: 5,
        bgcolor: "#F5F1E8",
        "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 5 },
      }}
    />
  </Box>
);

export const TeacherTrainingStatus = () => {
  const overview = DashboardData.teacherTraining?.overview;
  const miniStats = overview?.miniStats || [];
  const breakdown = overview?.breakdown || [];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 5 }}>
        {miniStats.map((stat: any, index: number) => (
          <MiniStat key={index} {...stat} />
        ))}
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Paper
          sx={{
            p: 2.5,
            borderRadius: "24px",
            border: "1px solid rgba(0,0,0,0.05)",
            bgcolor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 800, mb: 2, color: "#122333" }}
          >
            Teacher Status Breakdown
          </Typography>
          <Box sx={{ mt: 1 }}>
            {breakdown.map((row: any) => (
              <ProgressBar
                key={row.label}
                label={row.label}
                value={row.count}
                color={row.color}
                max={5000}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mt: 1.5 }}>
            {breakdown.map((s: any) => (
              <Chip
                key={s.label}
                label={s.label}
                size="small"
                sx={{
                  fontSize: "9px",
                  fontWeight: 700,
                  bgcolor: `${s.color}10`,
                  color: s.color,
                  px: 0.8,
                  height: 20,
                }}
              />
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

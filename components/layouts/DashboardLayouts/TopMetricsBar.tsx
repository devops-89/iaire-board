"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const TopMetric = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      textAlign: "center",
      flex: 1,
      borderRight: "1px solid rgba(255,255,255,0.1)",
      "&:last-child": { borderRight: "none" },
    }}
  >
    <Typography
      sx={{ color: "#fff", fontSize: "28px", fontWeight: 800, mb: 0.5 }}
    >
      {value}
    </Typography>
    <Typography
      sx={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600 }}
    >
      {label}
    </Typography>
  </Box>
);

export const TopMetricsBar = () => {
  return (
    <Paper
      sx={{
        bgcolor: "#122333",
        borderRadius: "20px",
        p: 3,
        mb: 6,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(18, 35, 51, 0.15)",
      }}
    >
      <TopMetric label="Total Schools" value="2,847" />
      <TopMetric label="Teachers Trained" value="14,320" />
      <TopMetric label="Students Trained" value="1,08,500" />
      <TopMetric label="Patents Filed" value="3,214" />
      <TopMetric label="Research Papers" value="5,830" />
      <TopMetric label="Student Startups" value="842" />
    </Paper>
  );
};

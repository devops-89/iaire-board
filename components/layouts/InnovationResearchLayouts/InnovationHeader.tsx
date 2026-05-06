"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

export const InnovationHeader = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 900,
          color: "#122333",
          mb: 1,
        }}
      >
        Innovation & Research Status (School-wise)
      </Typography>
      <Typography
        sx={{
          fontSize: "15px",
          color: "rgba(18, 35, 51, 0.5)",
          fontWeight: 500,
        }}
      >
        Tracking intellectual property, patents, and academic research contributions across global institutions.
      </Typography>
    </Box>
  );
};

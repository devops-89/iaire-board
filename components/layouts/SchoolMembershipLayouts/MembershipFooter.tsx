"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

export const MembershipFooter = () => {
  return (
    <Box
      sx={{
        mt: 6,
        p: 3,
        borderRadius: "20px",
        bgcolor: "#fff",
        border: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(0,0,0,0.4)",
        }}
      >
        • Chartered: Highest tier recognition
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(0,0,0,0.4)",
        }}
      >
        • Accredited: Quality assured partners
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(0,0,0,0.4)",
        }}
      >
        • Fellow: Honorary institutional status
      </Typography>
    </Box>
  );
};

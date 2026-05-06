"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  Groups as StaffIcon,
  Stars as StarIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

export const MetricCards = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
      {/* Total Certified Staff Card */}
      <Paper
        sx={{
          p: 4,
          borderRadius: "24px",
          bgcolor: "#122333",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: "10px",
              bgcolor: "rgba(255,193,7,0.2)",
              color: "#FFC107",
              display: "flex",
            }}
          >
            <StaffIcon sx={{ fontSize: 24 }} />
          </Box>
          <Typography sx={{ fontSize: "14px", fontWeight: 700, opacity: 0.9 }}>
            Total Certified Staff
          </Typography>
        </Box>

        <Typography sx={{ fontSize: "48px", fontWeight: 900, mb: 1, color: "#fff" }}>
          3,482
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
            +12% increase from last quarter
          </Typography>
        </Box>
      </Paper>

      {/* Top Performing District Card */}
      <Paper
        sx={{
          p: 4,
          borderRadius: "24px",
          bgcolor: "#F3F4F6",
          border: "1px solid rgba(0,0,0,0.05)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: "50%",
            bgcolor: "rgba(18, 35, 51, 0.1)",
            color: "rgba(18, 35, 51, 0.4)",
            mb: 3,
          }}
        >
          <StarIcon sx={{ fontSize: 40 }} />
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: "rgba(18, 35, 51, 0.4)",
            mb: 0.5,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Top Performing District
        </Typography>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#122333",
          }}
        >
          Silicon Valley Central
        </Typography>
      </Paper>
    </Box>
  );
};

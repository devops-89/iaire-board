"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Avatar,
  alpha,
} from "@mui/material";
import {
  Business as SchoolIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

export const IndividualDistributionCard = ({
  label,
  value,
  schools,
  color,
  icon,
}: any) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: "24px",
      border: `1px solid ${alpha(color, 0.1)}`,
      background: "#FFFFFF",
      height: "100%",
      minHeight: "180px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: `0 20px 40px ${alpha(color, 0.08)}`,
        borderColor: alpha(color, 0.3),
      },
    }}
  >
    <Box>
      <Avatar
        sx={{
          bgcolor: alpha(color, 0.1),
          color: color,
          width: 44,
          height: 44,
          borderRadius: "12px",
          mb: 1.5,
        }}
      >
        {icon || <SchoolIcon sx={{ fontSize: 22 }} />}
      </Avatar>

      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "rgba(18, 35, 51, 0.5)",
          mb: 0.5,
          lineHeight: 1.3,
        }}
      >
        {label}
      </Typography>
    </Box>

    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 800,
            color: Colors.PRIMARY_BLACK,
            letterSpacing: "-1px",
          }}
        >
          {schools}
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 700,
            color: color,
          }}
        >
          Schools
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: alpha(color, 0.1),
          "& .MuiLinearProgress-bar": {
            bgcolor: color,
            borderRadius: 3,
          },
        }}
      />
    </Box>
  </Paper>
);

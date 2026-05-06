"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Colors } from "@/utils/enum";

export const MembershipHeader = () => {
  return (
    <Box sx={{ mb: 5 }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: 800,
              color: Colors.PRIMARY_BLACK,
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            School Membership Overview
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "rgba(18, 35, 51, 0.5)",
              fontWeight: 500,
            }}
          >
            Comprehensive analytics and tracking for institutional
            enrollment and tiered memberships.
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: "rgba(0,0,0,0.3)",
            textTransform: "uppercase",
          }}
        >
          Last Updated: Today, 10:45 AM
        </Typography>
      </Stack>
    </Box>
  );
};

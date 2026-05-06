"use client";
import React from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import {
  GetApp as ExportIcon,
  FiberManualRecord as LiveIcon,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

// Mapping for dynamic header content based on actual pathnames
const PAGE_CONFIG: any = {
  "/dashboard": {
    title: "IAIRE Overview Dashboard",
    description: "Academic Year 2024–25 • All Affiliated Schools",
    showActions: true,
  },
  "/membership-overview": {
    title: "School Membership Overview",
    description: "Comprehensive analytics and tracking for institutional enrollment and tiered memberships.",
    showActions: false,
  },
  "/teacher-certification": {
    title: "Teacher Certification Distribution",
    description: "Monitoring academic excellence through standardized teacher training and global certifications.",
    showActions: false,
  },
  "/innovation-research": {
    title: "Innovation & Research Status",
    description: "Tracking intellectual property, patents, and academic research publications across schools.",
    showActions: false,
  },
  "/student-startup": {
    title: "Student Startup Status",
    description: "Fostering entrepreneurship and monitoring student-led startup ventures and funding.",
    showActions: false,
  },
};

export const Navbar = () => {
  const pathname = usePathname();
  
  // Find matching config or fallback to dashboard
  const activeKey = Object.keys(PAGE_CONFIG).find(key => pathname.includes(key)) || "/dashboard";
  const config = PAGE_CONFIG[activeKey];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: ["-webkit-sticky", "sticky"],
        top: 0,
        zIndex: 1100,
        bgcolor: "#FAF7F0",
        mx: -6,
        px: 6,
        pt: 2,
        pb: 2,
        mb: 4,
        borderBottom: "1px solid rgba(18, 35, 51, 0.1)",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#122333",
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
          }}
        >
          {config.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "rgba(18, 35, 51, 0.6)",
            mt: 0.5,
          }}
        >
          {config.description}
        </Typography>
      </Box>

      {config.showActions && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            icon={
              <LiveIcon
                sx={{ fontSize: "10px !important", color: "#00D1C1 !important" }}
              />
            }
            label="Live Data"
            sx={{
              bgcolor: "#E6F9F8",
              color: "#008B81",
              fontWeight: 700,
              fontSize: "12px",
              border: "1px solid rgba(0, 209, 193, 0.2)",
              "& .MuiChip-label": { px: 1.5 },
            }}
          />
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            sx={{
              bgcolor: "#122333",
              color: "#fff",
              textTransform: "none",
              borderRadius: "100px",
              px: 3,
              py: 1,
              fontWeight: 700,
              fontSize: "13px",
              "&:hover": { bgcolor: "#1A2B3B" },
            }}
          >
            Export Report
          </Button>
        </Box>
      )}
    </Box>
  );
};

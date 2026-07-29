"use client";
import React from "react";
import { Box, Button, Typography, Chip, IconButton } from "@mui/material";
import {
  GetApp as ExportIcon,
  FiberManualRecord as LiveIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

const PAGE_CONFIG: any = {
  "/admin": {
    title: "Board Admin Profile",
    description: "",
    showActions: false,
  },
  "/dashboard": {
    title: "Dashboard",
    description: "",
    showActions: false,
  },
  "/membership-overview": {
    title: "School Membership",
    description: "",
    showActions: false,
  },
  "/teacher-certification": {
    title: "Teacher Certification",
    description: "",
    showActions: false,
  },
  "/innovation-research": {
    title: "Innovation & Research",
    description: "",
    showActions: false,
  },
  "/student-startup": {
    title: "Student Startups",
    description: "",
    showActions: false,
  },
  "/team": {
    title: "Team Overview",
    description: "",
    showActions: false,
  },
  "/school": {
    title: "School Profile",
    description: "",
    showActions: false,
  },
  "/teacher": {
    title: "Teacher Profile",
    description: "",
    showActions: false,
  },
};

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const pathname = usePathname();
  const activeKey =
    Object.keys(PAGE_CONFIG).find((key) => pathname.includes(key)) ||
    "/dashboard";
  const config = PAGE_CONFIG[activeKey] || { title: "Dashboard", description: "", showActions: false };

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
        mx: { xs: -1.5, sm: -2 },
        px: { xs: 1.5, sm: 2 },
        height: { xs: "60px", sm: "72px" },
        mb: { xs: 2.5, sm: 4 },
        borderBottom: "1px solid rgba(18, 35, 51, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {onMenuClick && (
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: { xs: "flex", lg: "none" },
              color: "#122333",
              p: 0.8,
              borderRadius: "10px",
              bgcolor: "rgba(18, 35, 51, 0.05)",
              "&:hover": { bgcolor: "rgba(18, 35, 51, 0.1)" },
            }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box>
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "22px" },
              fontWeight: 700,
              color: "#122333",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            {config.title}
          </Typography>
          {config.description && (
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: 500,
                color: "rgba(18, 35, 51, 0.6)",
                mt: 0.5,
                display: { xs: "none", sm: "block" },
              }}
            >
              {config.description}
            </Typography>
          )}
        </Box>
      </Box>

      {config.showActions && (
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          <Chip
            icon={
              <LiveIcon
                sx={{
                  fontSize: "10px !important",
                  color: "#00D1C1 !important",
                }}
              />
            }
            label="Live Data"
            sx={{
              bgcolor: "#E6F9F8",
              color: "#008B81",
              fontWeight: 700,
              fontSize: "12px",
              border: "1px solid rgba(0, 209, 193, 0.2)",
              display: { xs: "none", sm: "inline-flex" },
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
              px: { xs: 1.5, sm: 3 },
              py: 0.8,
              fontWeight: 700,
              fontSize: { xs: "12px", sm: "13px" },
              "&:hover": { bgcolor: "#1A2B3B" },
            }}
          >
            Export
          </Button>
        </Box>
      )}
    </Box>
  );
};

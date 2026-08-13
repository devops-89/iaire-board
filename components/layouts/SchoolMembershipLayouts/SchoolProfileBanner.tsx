"use client";
import React from "react";
import { Paper, Grid, Avatar, Box, Typography, Chip } from "@mui/material";
import {
  LocationOnOutlined as LocationIcon,
  CalendarTodayOutlined as CalendarIcon,
  Language as WebIcon,
} from "@mui/icons-material";

interface SchoolProfileBannerProps {
  school: any;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const SchoolProfileBanner = ({
  school,
  capitalizeWord,
}: SchoolProfileBannerProps) => {
  if (!school) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 4 },
        borderRadius: "24px",
        background: "linear-gradient(135deg, #111E2E 0%, #0A1420 100%)",
        boxShadow: "0 20px 40px rgba(18, 35, 51, 0.08)",
        position: "relative",
        overflow: "hidden",
        mb: 4,
        color: "#fff",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 209, 193, 0.12) 0%, transparent 70%)",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Row 1: Avatar + School Name + Active Chip */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2.5 },
            flexWrap: "wrap",
          }}
        >
          <Avatar
            src={school.schoolLogoDownloadUrl || school.logo || undefined}
            sx={{
              width: { xs: 48, sm: 80 },
              height: { xs: 48, sm: 80 },
              borderRadius: { xs: "14px", sm: "20px" },
              bgcolor: "rgba(255, 255, 255, 0.08)",
              color: "#00D1C1",
              fontSize: { xs: "20px", sm: "32px" },
              fontWeight: 800,
              border: "2px solid rgba(0, 209, 193, 0.3)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              flexShrink: 0,
            }}
          >
            {!school.schoolLogoDownloadUrl && !school.logo
              ? school.name?.charAt(0).toUpperCase()
              : undefined}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "24px" },
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              {school.name}
            </Typography>
          </Box>

          <Chip
            label={school.isActive ? "Active Institution" : "Inactive"}
            icon={
              school.isActive ? (
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "#10B981",
                    ml: 1,
                    boxShadow: "0 0 8px #10B981",
                  }}
                />
              ) : undefined
            }
            sx={{
              bgcolor: school.isActive
                ? "rgba(16, 185, 129, 0.15)"
                : "rgba(255, 255, 255, 0.1)",
              color: school.isActive ? "#10B981" : "rgba(255, 255, 255, 0.65)",
              fontWeight: 800,
              fontSize: "11px",
              borderRadius: "8px",
              height: "26px",
              border: `1px solid ${
                school.isActive
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(255, 255, 255, 0.2)"
              }`,
              pl: school.isActive ? 0.5 : 0,
              "& .MuiChip-icon": { color: "inherit", margin: 0 },
              "& .MuiChip-label": { px: 1, color: "inherit" },
            }}
          />
        </Box>

        {/* Row 2: Location, Registration Year, Website under avatar & title */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 1.5, sm: 3 },
            mt: { xs: 1.5, sm: 2 },
            pt: { xs: 0.5, sm: 0 },
          }}
        >
          {school.city && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <LocationIcon
                sx={{
                  color: "rgba(255, 255, 255, 0.65)",
                  fontSize: 16,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "13px" },
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {capitalizeWord(school.city)},{" "}
                {capitalizeWord(school.state) || "India"}
              </Typography>
            </Box>
          )}
          {school.registrationYear && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <CalendarIcon
                sx={{
                  color: "rgba(255, 255, 255, 0.65)",
                  fontSize: 16,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "13px" },
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                Registered: {school.registrationYear}
              </Typography>
            </Box>
          )}
          {school.website && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
              <WebIcon
                sx={{
                  color: "rgba(255, 255, 255, 0.65)",
                  fontSize: 16,
                }}
              />
              <Typography
                component="a"
                href={
                  school.website.startsWith("http")
                    ? school.website
                    : `https://${school.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: { xs: "12px", sm: "13px" },
                  fontWeight: 600,
                  color: "#00D1C1",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {school.website}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

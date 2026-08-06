"use client";
import React from "react";
import { Paper, Grid, Avatar, Box, Typography, Chip } from "@mui/material";

interface TeacherProfileBannerProps {
  displayName: string;
  schoolName: string;
  isTeacherActive: boolean;
}

export const TeacherProfileBanner = ({
  displayName,
  schoolName,
  isTeacherActive,
}: TeacherProfileBannerProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5, md: 4 },
        borderRadius: { xs: "18px", sm: "24px" },
        background: "linear-gradient(135deg, #111E2E 0%, #0A1420 100%)",
        boxShadow: "0 20px 40px rgba(18, 35, 51, 0.08)",
        position: "relative",
        overflow: "hidden",
        mb: { xs: 2.5, sm: 4 },
        color: "#fff",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 209, 193, 0.12) 0%, transparent 70%)",
        },
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ alignItems: "center" }}>
        <Grid size={{ xs: "auto" }}>
          <Avatar
            sx={{
              width: { xs: 64, sm: 80, md: 90 },
              height: { xs: 64, sm: 80, md: 90 },
              borderRadius: { xs: "16px", sm: "24px" },
              bgcolor: "rgba(255, 255, 255, 0.08)",
              color: "#00D1C1",
              fontSize: { xs: "24px", sm: "28px", md: "32px" },
              fontWeight: 800,
              border: "2px solid rgba(0, 209, 193, 0.3)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid size={{ xs: "grow" }}>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "24px", md: "26px" },
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                wordBreak: "break-word",
              }}
            >
              {displayName}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "14px" },
                color: "rgba(255, 255, 255, 0.65)",
                fontWeight: 600,
                mt: 0.5,
                wordBreak: "break-word",
              }}
            >
              Teacher • {schoolName}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: "auto" }} sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
          <Chip
            label={isTeacherActive ? "Active Profile" : "Inactive"}
            icon={
              isTeacherActive ? (
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
              bgcolor: isTeacherActive
                ? "rgba(16, 185, 129, 0.15)"
                : "rgba(255, 255, 255, 0.1)",
              color: isTeacherActive ? "#10B981" : "rgba(255, 255, 255, 0.65)",
              fontWeight: 800,
              fontSize: "12px",
              borderRadius: "10px",
              border: `1px solid ${
                isTeacherActive
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(255, 255, 255, 0.2)"
              }`,
              pl: isTeacherActive ? 0.5 : 0,
              "& .MuiChip-icon": { color: "inherit", margin: 0 },
              "& .MuiChip-label": { pl: 1, color: "inherit" },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

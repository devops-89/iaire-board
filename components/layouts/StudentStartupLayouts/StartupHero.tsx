"use client";
import React from "react";
import { Box, Typography, Paper, Stack, Divider, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { RocketLaunch as StartupIcon } from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface StartupHeroProps {
  total: number;
  activeProjects: number;
  growth: string;
  loading: boolean;
}

export const StartupHero: React.FC<StartupHeroProps> = ({
  total,
  activeProjects,
  growth,
  loading,
}) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: "32px",
          bgcolor: "#122333",
          color: Colors.WHITE,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "180px",
          width: "100%",
          boxShadow: "0 24px 48px rgba(18, 35, 51, 0.15)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "20px",
              bgcolor: "rgba(0, 209, 193, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00D1C1",
              boxShadow: "0 8px 16px rgba(0, 209, 193, 0.1)",
            }}
          >
            <StartupIcon sx={{ fontSize: 40 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                opacity: 0.6,
                letterSpacing: "1px",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Number of student startups
            </Typography>
            {loading ? (
              <CircularProgress size={30} sx={{ color: "#00D1C1", mt: 1 }} />
            ) : (
              <Typography
                sx={{
                  fontSize: { xs: "40px", md: "56px" },
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#00D1C1",
                  letterSpacing: "-2px",
                }}
              >
                {total}
              </Typography>
            )}
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={6}
          sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                opacity: 0.5,
                mb: 1,
              }}
            >
              ACTIVE PROJECTS
            </Typography>
            <Typography sx={{ fontSize: "28px", fontWeight: 900 }}>
              {loading ? "..." : activeProjects}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: "rgba(255,255,255,0.1)", width: "1px" }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                opacity: 0.5,
                mb: 1,
              }}
            >
              ECOSYSTEM GROWTH
            </Typography>
            <Typography
              sx={{ fontSize: "28px", fontWeight: 900, color: "#10B981" }}
            >
              {growth}
            </Typography>
          </Box>
        </Stack>

        {/* Background Decoration */}
        <StartupIcon
          sx={{
            position: "absolute",
            right: -50,
            bottom: -50,
            fontSize: "240px",
            opacity: 0.04,
            transform: "rotate(-15deg)",
          }}
        />
      </Paper>
    </Grid>
  );
};

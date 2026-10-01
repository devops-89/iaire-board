"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
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
          borderRadius: "24px",
          bgcolor: Colors.PRIMARY_DARK,
          color: Colors.WHITE,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "180px",
          width: "100%",
          boxShadow: "0 10px 30px rgba(16, 18, 22, 0.08)",
          border: `1px solid ${Colors.BORDER_STONE}`,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
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
              width: 72,
              height: 72,
              borderRadius: "18px",
              bgcolor: Colors.ACCENT_MINT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: Colors.PRIMARY_DARK,
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
            }}
          >
            <StartupIcon sx={{ fontSize: 36 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 700,
                opacity: 0.65,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Number of student startups
            </Typography>
            {loading ? (
              <CircularProgress
                size={28}
                sx={{ color: Colors.ACCENT_MINT, mt: 1 }}
              />
            ) : (
              <Typography
                sx={{
                  fontSize: { xs: "36px", md: "50px" },
                  fontWeight: 900,
                  lineHeight: 1,
                  color: Colors.ACCENT_MINT,
                  letterSpacing: "-1.5px",
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
              sx={{
                fontSize: "28px",
                fontWeight: 900,
                color: Colors.ACCENT_MINT,
              }}
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

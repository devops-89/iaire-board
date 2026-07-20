"use client";
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DetailCard } from "./DetailCard";
import { SectionHeader } from "./SectionHeader";
import { DashboardData } from "@/assets/generic-data";

const GRID_5_COL = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(5, 1fr)"
  },
  gap: 2,
  width: "100%",
  alignItems: "stretch"
};

const GRID_6_COL = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(6, 1fr)"
  },
  gap: 2,
  width: "100%",
  alignItems: "stretch"
};

const GRID_4_COL = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)"
  },
  gap: 2,
  width: "100%",
  alignItems: "stretch"
};

const GRID_3_COL = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(3, 1fr)"
  },
  gap: 2,
  width: "100%",
  alignItems: "stretch"
};

export const MembershipOverview = () => {
  const metrics = DashboardData.membership?.detailedMetrics || [];

  return (
    <Box sx={{ mb: 6 }}>
      <SectionHeader
        title="School Membership Status"
        badge={`${metrics.length} metrics`}
        color="#00D1C1"
      />
      <Box sx={GRID_6_COL}>
        {metrics.map((item: any, index: number) => (
          <DetailCard
            key={index}
            title={item.title}
            value={item.value}
            subtext={item.subtext || "+12%"}
            color={item.color}
            iconKey={item.iconKey}
          />
        ))}
      </Box>
    </Box>
  );
};

export const TeacherCountOverview = () => {
  const bands = DashboardData.teacherTraining?.bands || [];

  return (
    <Box sx={{ mb: 6 }}>
      <SectionHeader
        title="Certified Teachers per School"
        badge={`${bands.length} bands`}
        color="#F5A623"
      />
      <Box sx={GRID_5_COL}>
        {bands.map((item: any, index: number) => (
          <DetailCard
            key={index}
            title={item.title}
            value={item.value}
            subtext={item.subtext}
            color={item.color}
            iconKey={item.iconKey}
          />
        ))}
      </Box>
    </Box>
  );
};

export const IPResearchOverview = () => {
  const innovation = DashboardData.innovation;
  const schoolStats = innovation?.detailedStats?.schools || [];
  const totalStats = innovation?.detailedStats?.totals || [];

  return (
    <Box sx={{ mb: 6 }}>
      <SectionHeader
        title="Intellectual Property & Research"
        badge="Schools + Totals"
        color="#4A90E2"
      />
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Row 1: Schools (4 Columns) */}
        <Box sx={GRID_4_COL}>
          {schoolStats.map((item: any, index: number) => (
            <DetailCard
              key={`school-${index}`}
              title={item.title}
              value={item.value}
              subtext={item.subtext}
              color={item.color}
              iconKey={item.iconKey}
            />
          ))}
        </Box>

        {/* Row 2: Totals (4 Columns) */}
        <Box sx={GRID_4_COL}>
          {totalStats.map((item: any, index: number) => (
            <DetailCard
              key={`total-${index}`}
              title={item.title}
              value={item.value}
              subtext={item.subtext}
              color={item.color}
              iconKey={item.iconKey}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const StartupOverview = () => {
  const portfolio = DashboardData.studentSuccess?.startupPortfolio || [];

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={GRID_3_COL}>
        {portfolio.map((item: any, index: number) => {
          const titleSuffix = item.cat.replace(" Startups", "");
          return (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "16px",
                bgcolor: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderTop: `4px solid ${item.color}`,
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 30px ${item.color}15`,
                  borderColor: `${item.color}40`,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#122333",
                  lineHeight: 1.3,
                  mb: 2,
                }}
              >
                Student Startups <br /> {titleSuffix}
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    bgcolor: `${item.color}15`,
                    color: item.color,
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {item.status}
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

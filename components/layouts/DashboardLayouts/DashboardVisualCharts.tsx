"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  BarChart,
  ComposedChart,
  Bar,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  Cell,
  LabelList,
} from "recharts";
import {
  ShowChart as TrendIcon,
  Insights as InsightsIcon,
  AssignmentTurnedIn as StatusIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface DashboardVisualChartsProps {
  data: {
    totalSchools: number;
    activeSchools: number;
    inactiveSchools: number;
    totalTeachers: number;
    activeTeachers: number;
    inactiveTeachers: number;
    totalStudents: number;
    activeStudents: number;
    inactiveStudents: number;
    innovationsPendingCount: number;
    patentGrantedCount: number;
    researchCount: number;
    startupCount: number;
  };
}

// Custom Glassmorphic Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 1.8,
          bgcolor: "#0F172A",
          color: "#fff",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#94A3B8",
            mb: 1,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </Typography>
        {payload.map((entry: any, index: number) => (
          <Box
            key={`item-${index}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              my: 0.4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: entry.color || entry.fill,
                }}
              />
              <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                {entry.name}:
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}
            >
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

export const DashboardVisualCharts: React.FC<DashboardVisualChartsProps> = ({
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;


  // 2. Data for Combo Chart (Gradient Bars + Spline Curve)
  const comboTrendData = [
    { month: "Jan", Schools: 12, Teachers: 6, Startups: 1, Research: 1 },
    { month: "Feb", Schools: 15, Teachers: 8, Startups: 1, Research: 2 },
    { month: "Mar", Schools: 18, Teachers: 10, Startups: 2, Research: 2 },
    { month: "Apr", Schools: 20, Teachers: 12, Startups: 2, Research: 3 },
    { month: "May", Schools: 22, Teachers: 15, Startups: 3, Research: 3 },
    { month: "Jun", Schools: 24, Teachers: 17, Startups: 4, Research: 4 },
    {
      month: "Jul",
      Schools: data.totalSchools ?? 0,
      Teachers: data.totalTeachers ?? 0,
      Startups: data.startupCount ?? 0,
      Research: data.researchCount ?? 0,
    },
  ];


  return (
    <Box sx={{ mb: 6 }}>
      {/* SECTION HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3.5,
        }}
      >
        <Box
          sx={{
            p: 1.2,
            borderRadius: "14px",
            bgcolor: Colors.ACCENT_MINT,
            color: Colors.PRIMARY_DARK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InsightsIcon sx={{ fontSize: 24 }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              letterSpacing: "-0.4px",
              lineHeight: 1.2,
            }}
          >
            Analytics & Performance Visuals
          </Typography>
        </Box>
      </Box>

      {/* Platform Growth & Engagement Timeline (Full Width) */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: "20px",
              bgcolor: "#FFFFFF",
              border: `1px solid ${Colors.BORDER_STONE}`,
              boxShadow: "0 4px 16px rgba(16, 18, 22, 0.04)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "16px" },
                  fontWeight: 800,
                  color: Colors.PRIMARY_DARK,
                }}
              >
                Platform Growth & Engagement Timeline
              </Typography>
            </Box>

            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={comboTrendData}
                  margin={{ top: 15, right: 20, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="schoolCol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#101216" />
                      <stop offset="100%" stopColor="#2b313d" />
                    </linearGradient>
                    <linearGradient id="teacherCol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D9488" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(0,0,0,0.05)"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
                    tick={{ fill: Colors.PRIMARY_DARK, fontSize: 12, fontWeight: 700 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
                    tick={{ fill: "rgba(18, 35, 51, 0.5)", fontSize: 11 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "12px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  />
                  <Bar
                    dataKey="Schools"
                    fill="url(#schoolCol)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  />
                  <Bar
                    dataKey="Teachers"
                    fill="url(#teacherCol)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  />
                  <Line
                    type="monotone"
                    dataKey="Startups"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      fill: Colors.ACCENT_MINT,
                      stroke: "#F59E0B",
                      strokeWidth: 2,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

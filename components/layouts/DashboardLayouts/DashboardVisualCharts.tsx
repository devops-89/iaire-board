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
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  Cell,
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

  // 1. Data for Active vs Inactive Segmented Progress Breakdown
  const schoolsActive = data.activeSchools ?? 0;
  const schoolsInactive = data.inactiveSchools ?? 0;
  const schoolsTotal = data.totalSchools ?? 0;
  const schoolsPct = schoolsTotal > 0 ? Math.round((schoolsActive / schoolsTotal) * 100) : 0;

  const teachersActive = data.activeTeachers ?? 0;
  const teachersInactive = data.inactiveTeachers ?? 0;
  const teachersTotal = data.totalTeachers ?? 0;
  const teachersPct = teachersTotal > 0 ? Math.round((teachersActive / teachersTotal) * 100) : 0;

  const studentsActive = data.activeStudents ?? 0;
  const studentsInactive = data.inactiveStudents ?? 0;
  const studentsTotal = data.totalStudents ?? 0;
  const studentsPct = studentsTotal > 0 ? Math.round((studentsActive / studentsTotal) * 100) : 0;

  const engagementBreakdown = [
    {
      label: "Schools Engagement",
      active: schoolsActive,
      inactive: schoolsInactive,
      total: schoolsTotal,
      pct: schoolsPct,
    },
    {
      label: "Teachers Active Ratio",
      active: teachersActive,
      inactive: teachersInactive,
      total: teachersTotal,
      pct: teachersPct,
    },
    {
      label: "Students Development",
      active: studentsActive,
      inactive: studentsInactive,
      total: studentsTotal,
      pct: studentsPct,
    },
  ];

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

  // 3. Data for Innovation & IP Metrics Bar Chart
  const ipMetricsData = [
    {
      name: "Pending Innovations",
      count: data.innovationsPendingCount ?? 0,
      color: Colors.PRIMARY,
    },
    {
      name: "Patents Granted",
      count: data.patentGrantedCount ?? 0,
      color: `${Colors.PRIMARY}CC`,
    },
    {
      name: "Research Papers",
      count: data.researchCount ?? 0,
      color: `${Colors.PRIMARY}99`,
    },
    {
      name: "Student Startups",
      count: data.startupCount ?? 0,
      color: `${Colors.PRIMARY}66`,
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
            bgcolor: `${Colors.PRIMARY}12`,
            color: Colors.PRIMARY,
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
              color: "#122333",
              letterSpacing: "-0.4px",
              lineHeight: 1.2,
            }}
          >
            Analytics & Performance Visuals
          </Typography>
        </Box>
      </Box>

      {/* ROW 1: 100% Segmented Progress Meters + Innovation Meters */}
      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        {/* CHART 1: Innovation & IP Distribution Bar Chart (Left) */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "20px",
              bgcolor: "#FFFFFF",
              border: "1px solid rgba(18, 35, 51, 0.08)",
              boxShadow: "0 6px 20px rgba(18, 35, 51, 0.03)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: 800,
                  color: "#122333",
                  mb: 2,
                }}
              >
                Innovation & IP Metrics Distribution
              </Typography>
            </Box>

            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                layout="vertical"
                data={ipMetricsData}
                margin={{ top: 5, right: 15, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="rgba(0,0,0,0.05)"
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
                  tick={{ fill: "rgba(18, 35, 51, 0.5)", fontSize: 11 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
                  tick={{ fill: "#122333", fontSize: 10, fontWeight: 700 }}
                  width={110}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} maxBarSize={24}>
                  {ipMetricsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* CHART 2: Active vs Inactive Segmented Meters (Right) */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: "20px",
              bgcolor: "#FFFFFF",
              border: "1px solid rgba(18, 35, 51, 0.08)",
              boxShadow: "0 6px 20px rgba(18, 35, 51, 0.03)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: 800,
                  color: "#122333",
                  mb: 2,
                }}
              >
                Active-Inactive Ratio
              </Typography>
            </Box>

            {/* Segmented Progress Meters */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.8 }}>
              {engagementBreakdown.map((item, idx) => (
                <Box key={idx}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      mb: 0.8,
                      gap: { xs: 0.5, sm: 0 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#122333",
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: { xs: 1, sm: 1.5 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: Colors.PRIMARY,
                        }}
                      >
                        {item.active} Active
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#EF4444",
                        }}
                      >
                        {item.inactive} Inactive
                      </Typography>
                      <Chip
                        label={`${item.pct}%`}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "11px",
                          fontWeight: 800,
                          bgcolor: `${Colors.PRIMARY}14`,
                          color: Colors.PRIMARY,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Dual Bar Track */}
                  <Box
                    sx={{
                      height: 6,
                      width: "100%",
                      bgcolor: "#EF444425",
                      borderRadius: 3,
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${item.pct}%`,
                        height: "100%",
                        bgcolor: Colors.PRIMARY,
                        borderRadius: "3px 0 0 3px",
                        transition: "width 0.6s ease",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                mt: 2.5,
                pt: 2,
                borderTop: "1px solid rgba(18, 35, 51, 0.06)",
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 2, sm: 3 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: Colors.PRIMARY,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgba(18, 35, 51, 0.6)",
                    fontWeight: 600,
                  }}
                >
                  Active Members
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#EF4444",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgba(18, 35, 51, 0.6)",
                    fontWeight: 600,
                  }}
                >
                  Inactive Members
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* ROW 2: Composed Combo Chart (Gradient Columns + Spline Curve) */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3, md: 3.5 },
              borderRadius: "20px",
              bgcolor: "#FFFFFF",
              border: "1px solid rgba(18, 35, 51, 0.08)",
              boxShadow: "0 6px 20px rgba(18, 35, 51, 0.03)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#122333",
                }}
              >
                Platform Growth & Engagement Timeline
              </Typography>
            </Box>

            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart
                data={comboTrendData}
                margin={{ top: 15, right: 20, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="schoolCol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={Colors.PRIMARY} />
                    <stop offset="100%" stopColor="#113A3C" />
                  </linearGradient>
                  <linearGradient id="teacherCol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284C7" />
                    <stop offset="100%" stopColor="#0369A1" />
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
                  tick={{ fill: "#122333", fontSize: 11, fontWeight: 700 }}
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
                  maxBarSize={28}
                />
                <Bar
                  dataKey="Teachers"
                  fill="url(#teacherCol)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
                <Line
                  type="monotone"
                  dataKey="Startups"
                  stroke="#0D9488"
                  strokeWidth={3.5}
                  dot={{
                    r: 5,
                    fill: "#0D9488",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

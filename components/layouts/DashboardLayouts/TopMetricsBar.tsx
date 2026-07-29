"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Skeleton,
  alpha,
} from "@mui/material";
import {
  School as SchoolIcon,
  People as TeachersIcon,
  Groups as StudentsIcon,
  HourglassEmpty as PendingIcon,
  WorkspacePremium as PatentsIcon,
  Description as ResearchIcon,
  RocketLaunch as StartupsIcon,
} from "@mui/icons-material";
import { schoolControllers } from "@/api/school";
import { Colors } from "@/utils/enum";
import { DashboardVisualCharts } from "./DashboardVisualCharts";

const defaultStats = {
  totalSchools: 0,
  activeSchools: 0,
  inactiveSchools: 0,
  totalTeachers: 0,
  activeTeachers: 0,
  inactiveTeachers: 0,
  totalStudents: 0,
  activeStudents: 0,
  inactiveStudents: 0,
  innovationsPendingCount: 0,
  patentGrantedCount: 0,
  researchCount: 0,
  startupCount: 0,
};

const formatValue = (val: number | null | undefined) => (val ?? 0);

// Grouped Metric Card (Schools, Teachers, Students)
const GroupedMetricCard = ({
  title,
  value,
  icon,
  activeValue,
  inactiveValue,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  activeValue: number;
  inactiveValue: number;
  loading: boolean;
}) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.8 },
          borderRadius: "20px",
          bgcolor: "#FFFFFF",
          border: "1px solid rgba(32, 103, 106, 0.12)",
          borderTop: `4px solid ${Colors.PRIMARY}`,
          boxShadow: "0 6px 20px rgba(18, 35, 51, 0.03)",
          transition: "all 0.25s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: { xs: "150px", sm: "170px" },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 14px 32px ${alpha(Colors.PRIMARY, 0.12)}`,
            borderColor: alpha(Colors.PRIMARY, 0.3),
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "11px", sm: "12px" },
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.55)",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                bgcolor: `${Colors.PRIMARY}10`,
                color: Colors.PRIMARY,
                p: { xs: 0.9, sm: 1.1 },
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          </Box>

          {loading ? (
            <Skeleton width="45%" height={44} sx={{ my: 0.5 }} />
          ) : (
            <Typography
              sx={{
                fontSize: { xs: "28px", sm: "36px" },
                fontWeight: 800,
                color: "#122333",
                lineHeight: 1,
                letterSpacing: "-1px",
                mb: 2,
              }}
            >
              {formatValue(value)}
            </Typography>
          )}
        </Box>

        {/* Bottom Active / Inactive Row */}
        <Box
          sx={{
            pt: 1.5,
            borderTop: "1px solid rgba(18, 35, 51, 0.06)",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: { xs: 1, sm: 2 },
          }}
        >
          {loading ? (
            <Skeleton width="80%" height={20} />
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "#10B981",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgba(18, 35, 51, 0.65)",
                    fontWeight: 600,
                  }}
                >
                  Active:{" "}
                  <span style={{ color: "#122333", fontWeight: 700 }}>
                    {formatValue(activeValue)}
                  </span>
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "1px",
                  height: 12,
                  bgcolor: "rgba(18, 35, 51, 0.12)",
                  display: { xs: "none", sm: "block" },
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "#EF4444",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgba(18, 35, 51, 0.65)",
                    fontWeight: 600,
                  }}
                >
                  Inactive:{" "}
                  <span style={{ color: "#122333", fontWeight: 700 }}>
                    {formatValue(inactiveValue)}
                  </span>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

// Single Metric Card (Pending Innovations, Patents, Research, Startups)
const SingleMetricCard = ({
  title,
  value,
  icon,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderRadius: "20px",
          bgcolor: "#FFFFFF",
          border: "1px solid rgba(32, 103, 106, 0.12)",
          borderTop: `4px solid ${Colors.PRIMARY}`,
          boxShadow: "0 6px 20px rgba(18, 35, 51, 0.03)",
          transition: "all 0.25s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: { xs: "110px", sm: "125px" },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 14px 32px ${alpha(Colors.PRIMARY, 0.12)}`,
            borderColor: alpha(Colors.PRIMARY, 0.3),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              fontWeight: 700,
              color: "rgba(18, 35, 51, 0.55)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              maxWidth: "75%",
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              bgcolor: `${Colors.PRIMARY}10`,
              color: Colors.PRIMARY,
              p: { xs: 0.8, sm: 1 },
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>

        {loading ? (
          <Skeleton width="45%" height={40} sx={{ my: 0.5 }} />
        ) : (
          <Typography
            sx={{
              fontSize: { xs: "26px", sm: "32px" },
              fontWeight: 800,
              color: "#122333",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            {formatValue(value)}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export const TopMetricsBar = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await schoolControllers.getSchoolStats();
        if (res?.data?.success && res?.data?.data?.data) {
          setStats(res.data.data.data);
        } else {
          const body = res?.data?.data || res?.data;
          if (body && typeof body.totalSchools === "number") {
            setStats(body);
          } else {
            setStats(defaultStats);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setStats(defaultStats);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const data = stats || defaultStats;

  return (
    <Box sx={{ mb: 6 }}>
      {/* Row 1: 3 Grouped Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <GroupedMetricCard
          title="Schools Overview"
          value={data.totalSchools}
          activeValue={data.activeSchools}
          inactiveValue={data.inactiveSchools}
          icon={<SchoolIcon sx={{ fontSize: 22 }} />}
          loading={loading}
        />

        <GroupedMetricCard
          title="Teachers Engagement"
          value={data.totalTeachers}
          activeValue={data.activeTeachers}
          inactiveValue={data.inactiveTeachers}
          icon={<TeachersIcon sx={{ fontSize: 22 }} />}
          loading={loading}
        />

        <GroupedMetricCard
          title="Students Development"
          value={data.totalStudents}
          activeValue={data.activeStudents}
          inactiveValue={data.inactiveStudents}
          icon={<StudentsIcon sx={{ fontSize: 22 }} />}
          loading={loading}
        />
      </Grid>

      {/* Row 2: 4 Standalone Cards */}
      <Grid container spacing={3}>
        <SingleMetricCard
          title="Pending Innovations"
          value={data.innovationsPendingCount}
          icon={<PendingIcon sx={{ fontSize: 20 }} />}
          loading={loading}
        />
        <SingleMetricCard
          title="Patents Granted"
          value={data.patentGrantedCount}
          icon={<PatentsIcon sx={{ fontSize: 20 }} />}
          loading={loading}
        />
        <SingleMetricCard
          title="Research Papers"
          value={data.researchCount}
          icon={<ResearchIcon sx={{ fontSize: 20 }} />}
          loading={loading}
        />
        <SingleMetricCard
          title="Student Startups"
          value={data.startupCount}
          icon={<StartupsIcon sx={{ fontSize: 20 }} />}
          loading={loading}
        />
      </Grid>

      {/* Visual Analytics Charts */}
      <Box sx={{ mt: 5 }}>
        <DashboardVisualCharts data={data} />
      </Box>
    </Box>
  );
};

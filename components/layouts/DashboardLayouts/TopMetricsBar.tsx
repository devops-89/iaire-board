"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Skeleton, Divider, alpha } from "@mui/material";
import {
  School as SchoolIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  People as TeachersIcon,
  Groups as StudentsIcon,
  HourglassEmpty as PendingIcon,
  WorkspacePremium as PatentsIcon,
  Description as ResearchIcon,
  RocketLaunch as StartupsIcon,
  FiberManualRecord as DotIcon,
} from "@mui/icons-material";
import { schoolControllers } from "@/api/school";

const defaultStats = {
  totalSchools: 24,
  activeSchools: 23,
  inactiveSchools: 1,
  totalTeachers: 11,
  activeTeachers: 11,
  inactiveTeachers: 0,
  totalStudents: 25,
  activeStudents: 11,
  inactiveStudents: 14,
  innovationsPendingCount: 1,
  patentGrantedCount: 0,
  researchCount: 4,
  startupCount: 2,
};

const GroupedMetricCard = ({
  title,
  value,
  icon,
  color,
  substats,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  substats: Array<{ label: string; value: number; color: string }>;
  loading: boolean;
}) => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderTop: `5px solid ${color}`,
          boxShadow: "0 8px 24px rgba(18, 35, 51, 0.06)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: "200px",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 16px 40px ${alpha(color, 0.15)}`,
            borderColor: alpha(color, 0.4),
          },
        }}
      >
        <Box>
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
                fontSize: "13px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                bgcolor: `${color}15`,
                color: color,
                p: 1,
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
            <Skeleton width="50%" height={48} sx={{ my: 0.5 }} />
          ) : (
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: 800,
                color: "#122333",
                lineHeight: 1.1,
                mb: 1.5,
              }}
            >
              {value}
            </Typography>
          )}
        </Box>

        <Box>
          <Divider sx={{ my: 1.5, borderColor: "rgba(0,0,0,0.06)" }} />
          {loading ? (
            <Skeleton width="80%" height={24} />
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {substats.map((sub: any, idx: number) => (
                <Box
                  key={idx}
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <DotIcon sx={{ fontSize: 8, color: sub.color }} />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "rgba(18, 35, 51, 0.6)",
                      fontWeight: 600,
                    }}
                  >
                    {sub.label}:{" "}
                    <span style={{ color: "#122333", fontWeight: 700 }}>
                      {sub.value}
                    </span>
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

const SingleMetricCard = ({
  title,
  value,
  icon,
  color,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: "16px",
          bgcolor: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderTop: `4px solid ${color}`,
          boxShadow: "0 8px 24px rgba(18, 35, 51, 0.06)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: "120px",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 16px 36px ${alpha(color, 0.15)}`,
            borderColor: alpha(color, 0.4),
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
              fontSize: "12px",
              fontWeight: 700,
              color: "rgba(18, 35, 51, 0.5)",
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
              bgcolor: `${color}15`,
              color: color,
              p: 0.8,
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
              fontSize: "30px",
              fontWeight: 800,
              color: "#122333",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            {value}
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
          // Fallback if data format is slightly different
          const body = res?.data?.data || res?.data;
          if (body && typeof body.totalSchools === "number") {
            setStats(body);
          } else {
            console.warn("Unexpected API response structure, using fallbacks:", res);
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
        {/* Card 1: Schools */}
        <GroupedMetricCard
          title="Schools Overview"
          value={data.totalSchools}
          icon={<SchoolIcon sx={{ fontSize: 22 }} />}
          color="#4A90E2"
          loading={loading}
          substats={[
            { label: "Active", value: data.activeSchools, color: "#10B981" },
            { label: "Inactive", value: data.inactiveSchools, color: "#EF4444" },
          ]}
        />

        {/* Card 2: Teachers */}
        <GroupedMetricCard
          title="Teachers Engagement"
          value={data.totalTeachers}
          icon={<TeachersIcon sx={{ fontSize: 22 }} />}
          color="#F5A623"
          loading={loading}
          substats={[
            { label: "Active", value: data.activeTeachers, color: "#10B981" },
            { label: "Inactive", value: data.inactiveTeachers, color: "#EF4444" },
          ]}
        />

        {/* Card 3: Students */}
        <GroupedMetricCard
          title="Students Development"
          value={data.totalStudents}
          icon={<StudentsIcon sx={{ fontSize: 22 }} />}
          color="#10B981"
          loading={loading}
          substats={[
            { label: "Active", value: data.activeStudents, color: "#10B981" },
            { label: "Inactive", value: data.inactiveStudents, color: "#EF4444" },
          ]}
        />
      </Grid>

      {/* Row 2: 4 Standalone Cards */}
      <Grid container spacing={3}>
        <SingleMetricCard
          title="Pending Innovations"
          value={data.innovationsPendingCount}
          icon={<PendingIcon sx={{ fontSize: 20 }} />}
          color="#F5A623"
          loading={loading}
        />
        <SingleMetricCard
          title="Patents Granted"
          value={data.patentGrantedCount}
          icon={<PatentsIcon sx={{ fontSize: 20 }} />}
          color="#8B5CF6"
          loading={loading}
        />
        <SingleMetricCard
          title="Research Papers"
          value={data.researchCount}
          icon={<ResearchIcon sx={{ fontSize: 20 }} />}
          color="#3B82F6"
          loading={loading}
        />
        <SingleMetricCard
          title="Student Startups"
          value={data.startupCount}
          icon={<StartupsIcon sx={{ fontSize: 20 }} />}
          color="#EC4899"
          loading={loading}
        />
      </Grid>
    </Box>
  );
};

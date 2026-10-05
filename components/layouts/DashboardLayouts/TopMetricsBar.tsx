"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Skeleton } from "@mui/material";
import {
  School as SchoolIcon,
  People as TeachersIcon,
  Groups as StudentsIcon,
} from "@mui/icons-material";
import { schoolControllers } from "@/api/school";
import { Colors } from "@/utils/enum";

const formatValue = (val: number | string | null | undefined) =>
  val !== null && val !== undefined && val !== "" ? val : "--";

const GroupedMetricCard = ({
  title,
  value,
  icon,
  activeValue,
  inactiveValue,
  loading,
}: {
  title: string;
  value?: number | string | null;
  icon: React.ReactNode;
  activeValue?: number | string | null;
  inactiveValue?: number | string | null;
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
          border: `1px solid ${Colors.BORDER_STONE}`,
          boxShadow: "0 4px 16px rgba(16, 18, 22, 0.04)",
          transition: "all 0.25s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: { xs: "150px", sm: "170px" },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(16, 18, 22, 0.08)",
            borderColor: Colors.PRIMARY_DARK,
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
                color: "rgba(16, 18, 22, 0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
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
                color: Colors.PRIMARY_DARK,
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
                  <span style={{ color: Colors.PRIMARY_DARK, fontWeight: 700 }}>
                    {formatValue(activeValue)}
                  </span>
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "1px",
                  height: 12,
                  bgcolor: "rgba(16, 18, 22, 0.12)",
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
                    color: "rgba(16, 18, 22, 0.65)",
                    fontWeight: 600,
                  }}
                >
                  Inactive:{" "}
                  <span style={{ color: Colors.PRIMARY_DARK, fontWeight: 700 }}>
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
          setStats(body || null);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      {/* Institutional Overview Heading */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 4,
            height: 22,
            bgcolor: Colors.PRIMARY_DARK,
            borderRadius: 2,
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "17px", sm: "19px" },
            fontWeight: 800,
            color: Colors.PRIMARY_DARK,
            letterSpacing: "-0.3px",
          }}
        >
          Institutional Overview
        </Typography>
      </Box>

      {/* Row 1: 3 Grouped Cards */}
      <Grid container spacing={3}>
        <GroupedMetricCard
          title="Schools Overview"
          value={stats?.totalSchools}
          activeValue={stats?.activeSchools}
          inactiveValue={stats?.inactiveSchools}
          icon={<SchoolIcon sx={{ fontSize: 22 }} />}
          loading={loading}
        />

        <GroupedMetricCard
          title="Teachers Engagement"
          value={stats?.totalTeachers}
          activeValue={stats?.activeTeachers}
          inactiveValue={stats?.inactiveTeachers}
          icon={<TeachersIcon sx={{ fontSize: 22 }} />}
          loading={loading}
        />

        <GroupedMetricCard
          title="Students Development"
          value={stats?.totalStudents}
          activeValue={stats?.activeStudents}
          inactiveValue={stats?.inactiveStudents}
          icon={<StudentsIcon sx={{ fontSize: 22 }} />}
          loading={loading}
        />
      </Grid>
    </Box>
  );
};

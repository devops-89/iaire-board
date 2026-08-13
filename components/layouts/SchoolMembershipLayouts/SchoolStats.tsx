"use client";
import React from "react";
import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import {
  PeopleOutlined as PeopleIcon,
  SchoolOutlined as SchoolIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SchoolStatsProps {
  teachersCount: number;
  studentsCount: number;
}

export const SchoolStats = ({
  teachersCount,
  studentsCount,
}: SchoolStatsProps) => {
  return (
    <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
      {/* Total Teachers Card */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: "24px",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 16px 40px rgba(18, 35, 51, 0.06)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2.5,
              p: { xs: 2, sm: 3 },
              "&:last-child": { pb: { xs: 2, sm: 3 } },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "12px",
                bgcolor: "rgba(59, 130, 246, 0.08)",
                color: "#3B82F6",
                flexShrink: 0,
              }}
            >
              <PeopleIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(18, 35, 51, 0.4)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Total Teachers
              </Typography>
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: Colors.PRIMARY_DARK,
                  mt: 0.5,
                }}
              >
                {teachersCount}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Enrolled Students Card */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: "24px",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 16px 40px rgba(18, 35, 51, 0.06)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2.5,
              p: { xs: 2, sm: 3 },
              "&:last-child": { pb: { xs: 2, sm: 3 } },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "12px",
                bgcolor: "rgba(16, 185, 129, 0.08)",
                color: "#10B981",
              }}
            >
              <SchoolIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(18, 35, 51, 0.4)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Total Students
              </Typography>
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: Colors.PRIMARY_DARK,
                  mt: 0.5,
                }}
              >
                {studentsCount}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

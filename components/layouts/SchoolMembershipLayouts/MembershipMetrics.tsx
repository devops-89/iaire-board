"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Stack,
  alpha,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Business as SchoolIcon,
  Email as EmailIcon,
  Verified as VerifiedIcon,
  WorkspacePremium as PremiumIcon,
  Groups as GroupsIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";
import { DashboardData } from "@/assets/generic-data";

// Icon mapping for Membership Metrics
const IconMap: any = {
  school: SchoolIcon,
  groups: GroupsIcon,
  premium: PremiumIcon,
  verified: VerifiedIcon,
};

const MembershipCard = ({ title, value, iconKey, color, hasAction }: any) => {
  const Icon = IconMap[iconKey] || SchoolIcon;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "24px",
        border: `1px solid ${alpha(color, 0.1)}`,
        background: "#FFFFFF",
        height: "100%",
        minHeight: "210px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 20px 40px ${alpha(color, 0.08)}`,
          borderColor: alpha(color, 0.3),
        },
      }}
    >
      <Box>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.1),
              color: color,
              width: 50,
              height: 50,
              borderRadius: "14px",
            }}
          >
            <Icon />
          </Avatar>
          {hasAction && (
            <Button
              variant="contained"
              startIcon={<EmailIcon />}
              sx={{
                bgcolor: "#FF9800",
                color: "#fff",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "11px",
                px: 1.5,
                py: 0.8,
                boxShadow: "0 8px 16px rgba(255, 152, 0, 0.2)",
                "&:hover": { bgcolor: "#F57C00" },
              }}
            >
              Remind
            </Button>
          )}
        </Stack>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "rgba(18, 35, 51, 0.5)",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 800,
            color: Colors.PRIMARY_BLACK,
            letterSpacing: "-1px",
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#10B981",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TrendingIcon sx={{ fontSize: 14, mr: 0.5 }} /> +12%
        </Typography>
      </Stack>
    </Paper>
  );
};

export const MembershipMetrics = () => {
  const metrics = DashboardData.membership?.detailedMetrics || [];

  return (
    <Grid container spacing={3}>
      {metrics.map((m: any, i: number) => (
        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
          <MembershipCard {...m} />
        </Grid>
      ))}
    </Grid>
  );
};

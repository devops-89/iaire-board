"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  VerifiedUser as ShieldIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { useAuth } from "@/hooks/auth/useAuth";

const formatLastLogin = (dateString: string) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatRoleName = (role: string) => {
  if (!role) return "Administrator";
  return role
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getInitials = (name: string) => {
  if (!name) return "AD";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const AdminProfile = () => {
  const { user } = useAuth();

  const userName = user?.name || user?.fullName || "CISCE Admin";
  const userEmail = user?.email || "--";
  const userPhone = user?.phone || "--";
  const userRole = user?.role || "BOARD_ADMIN";
  const userAvatar = user?.avatar || user?.profileImageDownloadUrl || user?.profileImage || "";

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "28px",
        bgcolor: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.04)",
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Avatar
            src={userAvatar}
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#00D1C1",
              fontSize: "32px",
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0, 209, 193, 0.2)",
            }}
          >
            {getInitials(userName)}
          </Avatar>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography
                sx={{ fontSize: "24px", fontWeight: 800, color: "#122333" }}
              >
                {userName}
              </Typography>
              <ShieldIcon sx={{ color: "#00D1C1", fontSize: "20px" }} />
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "rgba(18, 35, 51, 0.5)",
                fontWeight: 600,
              }}
            >
              {formatRoleName(userRole)} • Full Access
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            color: "#122333",
            borderColor: "rgba(0,0,0,0.1)",
            px: 3,
          }}
        >
          Edit Profile
        </Button>
      </Box>

      <Divider sx={{ mb: 4, opacity: 0.6 }} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1,
                bgcolor: "#f8f9fa",
                borderRadius: "10px",
                color: "rgba(18, 35, 51, 0.4)",
              }}
            >
              <MailIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "rgba(18, 35, 51, 0.4)",
                  fontWeight: 700,
                }}
              >
                EMAIL ADDRESS
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {userEmail}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1,
                bgcolor: "#f8f9fa",
                borderRadius: "10px",
                color: "rgba(18, 35, 51, 0.4)",
              }}
            >
              <PhoneIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "rgba(18, 35, 51, 0.4)",
                  fontWeight: 700,
                }}
              >
                PHONE NUMBER
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {userPhone}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1,
                bgcolor: "#f8f9fa",
                borderRadius: "10px",
                color: "rgba(18, 35, 51, 0.4)",
              }}
            >
              <ShieldIcon />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "rgba(18, 35, 51, 0.4)",
                  fontWeight: 700,
                }}
              >
                LAST LOGIN
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {user?.lastLoginAt ? formatLastLogin(user.lastLoginAt) : "Today, 10:45 AM"}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

"use client";
import React from "react";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import { AdminPanelSettingsOutlined as AdminIcon } from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherAdminsCardProps {
  schoolAdmins: any[];
}

export const TeacherAdminsCard = ({ schoolAdmins }: TeacherAdminsCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "24px",
        border: "1px solid rgba(18, 35, 51, 0.05)",
        bgcolor: "#fff",
        boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(139, 92, 246, 0.08)",
            color: "#8B5CF6",
          }}
        >
          <AdminIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 800, color: Colors.PRIMARY_DARK }}
        >
          School Administrators
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {!schoolAdmins || schoolAdmins.length === 0 ? (
          <Typography
            sx={{
              color: "rgba(18, 35, 51, 0.4)",
              fontWeight: 600,
              fontSize: "13px",
              textAlign: "center",
              py: 2,
            }}
          >
            No administrators registered
          </Typography>
        ) : (
          schoolAdmins.map((admin: any) => {
            const adminName =
              admin.fullName ||
              (admin.firstName || admin.lastName
                ? `${admin.firstName || ""} ${admin.lastName || ""}`.trim()
                : "") ||
              admin.username ||
              "Admin";
            return (
              <Box
                key={admin.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: "16px",
                  border: "1px solid rgba(18, 35, 51, 0.04)",
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#fff",
                    borderColor: "rgba(18, 35, 51, 0.08)",
                    boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                    transform: "translateX(2px)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    fontSize: 13,
                    fontWeight: 700,
                    bgcolor: "rgba(18, 35, 51, 0.05)",
                    color: Colors.PRIMARY_DARK,
                  }}
                >
                  {adminName.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: Colors.PRIMARY_DARK,
                    }}
                  >
                    {adminName}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: "11px",
                      color: "rgba(18, 35, 51, 0.5)",
                      fontWeight: 500,
                    }}
                  >
                    {admin.email}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Paper>
  );
};

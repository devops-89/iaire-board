"use client";
import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import {
  BadgeOutlined as RoleIcon,
  CalendarTodayOutlined as DateIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherAccountCardProps {
  role: string;
  formattedDate: string;
  approvedAt: any;
  formattedApprovedDate: string;
}

export const TeacherAccountCard = ({
  role,
  formattedDate,
  approvedAt,
  formattedApprovedDate,
}: TeacherAccountCardProps) => {
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
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 800,
          color: Colors.PRIMARY_DARK,
          mb: 3.5,
        }}
      >
        Account Information
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: "8px",
              bgcolor: "rgba(139, 92, 246, 0.08)",
              color: "#8B5CF6",
            }}
          >
            <RoleIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(18, 35, 51, 0.5)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              System Role
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: Colors.PRIMARY_DARK,
                fontWeight: 700,
                mt: 0.2,
              }}
            >
              {role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(18, 35, 51, 0.06)" }} />

        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: "8px",
              bgcolor: "rgba(100, 116, 139, 0.08)",
              color: "#64748B",
            }}
          >
            <DateIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(18, 35, 51, 0.5)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Registered On
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: Colors.PRIMARY_DARK,
                fontWeight: 700,
                mt: 0.2,
              }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>

        {approvedAt && (
          <>
            <Divider sx={{ borderColor: "rgba(18, 35, 51, 0.06)" }} />
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  bgcolor: "rgba(16, 185, 129, 0.08)",
                  color: "#10B981",
                }}
              >
                <DateIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(18, 35, 51, 0.5)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Approved On
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: Colors.PRIMARY_DARK,
                    fontWeight: 700,
                    mt: 0.2,
                  }}
                >
                  {formattedApprovedDate}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

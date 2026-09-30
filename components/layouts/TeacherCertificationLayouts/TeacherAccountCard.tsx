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
        p: { xs: 2.5, sm: 3.5, md: 4 },
        borderRadius: "20px",
        border: `1px solid ${Colors.BORDER_STONE}`,
        bgcolor: "#fff",
        boxShadow: "0 4px 20px rgba(16, 18, 22, 0.04)",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "15px", sm: "16px" },
          fontWeight: 800,
          color: Colors.PRIMARY_DARK,
          mb: { xs: 2.5, sm: 3.5 },
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
              bgcolor: Colors.ACCENT_MINT,
              color: Colors.PRIMARY_DARK,
              border: `1px solid ${Colors.BORDER_STONE}`,
              flexShrink: 0,
            }}
          >
            <RoleIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
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
                wordBreak: "break-word",
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
              bgcolor: Colors.ACCENT_MINT,
              color: Colors.PRIMARY_DARK,
              border: `1px solid ${Colors.BORDER_STONE}`,
              flexShrink: 0,
            }}
          >
            <DateIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
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
                wordBreak: "break-word",
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
                  bgcolor: Colors.ACCENT_MINT,
                  color: Colors.PRIMARY_DARK,
                  border: `1px solid ${Colors.BORDER_STONE}`,
                  flexShrink: 0,
                }}
              >
                <DateIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
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
                    wordBreak: "break-word",
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

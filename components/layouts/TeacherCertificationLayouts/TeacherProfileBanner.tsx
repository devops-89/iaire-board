"use client";
import React from "react";
import { Paper, Grid, Avatar, Box, Typography, Chip } from "@mui/material";
import { Colors } from "@/utils/enum";

interface TeacherProfileBannerProps {
  displayName: string;
  schoolName: string;
  isTeacherActive: boolean;
}

export const TeacherProfileBanner = ({
  displayName,
  schoolName,
  isTeacherActive,
}: TeacherProfileBannerProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5, md: 4 },
        borderRadius: { xs: "18px", sm: "24px" },
        bgcolor: Colors.PRIMARY_DARK,
        boxShadow: "0 10px 30px rgba(16, 18, 22, 0.08)",
        border: `1px solid ${Colors.BORDER_STONE}`,
        position: "relative",
        overflow: "hidden",
        mb: { xs: 2.5, sm: 4 },
        color: "#fff",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(221, 255, 247, 0.08) 0%, transparent 70%)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, sm: 2.5 },
          flexWrap: "wrap",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Avatar
          sx={{
            width: { xs: 48, sm: 80 },
            height: { xs: 48, sm: 80 },
            borderRadius: { xs: "14px", sm: "20px" },
            bgcolor: Colors.ACCENT_MINT,
            color: Colors.PRIMARY_DARK,
            fontSize: { xs: "20px", sm: "32px" },
            fontWeight: 800,
            border: `2px solid ${Colors.BORDER_STONE}`,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            flexShrink: 0,
          }}
        >
          {displayName.charAt(0).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "24px" },
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              wordBreak: "break-word",
            }}
          >
            {displayName}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              color: "rgba(255, 255, 255, 0.65)",
              fontWeight: 600,
              mt: 0.5,
              wordBreak: "break-word",
            }}
          >
            Teacher • {schoolName}
          </Typography>
        </Box>

        <Chip
          label={isTeacherActive ? "Active Profile" : "Inactive"}
          icon={
            isTeacherActive ? (
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#0D9488",
                  ml: 1,
                }}
              />
            ) : undefined
          }
          sx={{
            bgcolor: isTeacherActive
              ? Colors.ACCENT_MINT
              : "rgba(255, 255, 255, 0.1)",
            color: isTeacherActive ? Colors.PRIMARY_DARK : "rgba(255, 255, 255, 0.65)",
            fontWeight: 800,
            fontSize: "11px",
            borderRadius: "8px",
            height: "26px",
            border: `1px solid ${
              isTeacherActive
                ? "rgba(13, 148, 136, 0.25)"
                : "rgba(255, 255, 255, 0.2)"
            }`,
            pl: isTeacherActive ? 0.5 : 0,
            "& .MuiChip-icon": { color: "inherit", margin: 0 },
            "& .MuiChip-label": { px: 1, color: "inherit" },
          }}
        />
      </Box>
    </Paper>
  );
};

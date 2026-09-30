"use client";
import React from "react";
import { Paper, Typography, Grid, Box } from "@mui/material";
import {
  EmailOutlined as EmailIcon,
  PersonOutlined as PersonIcon,
  PhoneOutlined as PhoneIcon,
  WcOutlined as GenderIcon,
  MenuBookOutlined as SubjectIcon,
  WorkOutlineOutlined as ExpIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherPersonalCardProps {
  teacherData: any;
  subjects: string;
  experienceVal: string;
}

export const TeacherPersonalCard = ({
  teacherData,
  subjects,
  experienceVal,
}: TeacherPersonalCardProps) => {
  if (!teacherData) return null;

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
        Personal & Academic Profile
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 3.5 }}>
        {/* Username */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              gap: 2,
              alignItems: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                border: `1px solid ${Colors.BORDER_STONE}`,
                flexShrink: 0,
              }}
            >
              <PersonIcon sx={{ fontSize: 20 }} />
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
                Username
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
                  wordBreak: "break-word",
                }}
              >
                {teacherData.username || "--"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              gap: 2,
              alignItems: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                border: `1px solid ${Colors.BORDER_STONE}`,
                flexShrink: 0,
              }}
            >
              <EmailIcon sx={{ fontSize: 20 }} />
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
                Email Address
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
                  wordBreak: "break-word",
                }}
              >
                {teacherData.email || "--"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              gap: 2,
              alignItems: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                border: `1px solid ${Colors.BORDER_STONE}`,
                flexShrink: 0,
              }}
            >
              <PhoneIcon sx={{ fontSize: 20 }} />
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
                Phone Number
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
                  wordBreak: "break-word",
                }}
              >
                {teacherData.phone || "--"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Gender */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              gap: 2,
              alignItems: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                border: `1px solid ${Colors.BORDER_STONE}`,
                flexShrink: 0,
              }}
            >
              <GenderIcon sx={{ fontSize: 20 }} />
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
                Gender
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
                  textTransform: "capitalize",
                  wordBreak: "break-word",
                }}
              >
                {teacherData.gender ? teacherData.gender.toLowerCase() : "--"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Subjects */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              gap: 2,
              alignItems: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                border: `1px solid ${Colors.BORDER_STONE}`,
                flexShrink: 0,
              }}
            >
              <SubjectIcon sx={{ fontSize: 20 }} />
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
                Primary Subjects
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
                  wordBreak: "break-word",
                }}
              >
                {subjects}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Experience */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              gap: 2,
              alignItems: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "10px",
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                border: `1px solid ${Colors.BORDER_STONE}`,
                flexShrink: 0,
              }}
            >
              <ExpIcon sx={{ fontSize: 20 }} />
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
                Teaching Experience
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
                  wordBreak: "break-word",
                }}
              >
                {experienceVal}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

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
        Personal & Academic Profile
      </Typography>

      <Grid container spacing={3.5}>
        {/* Username */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: 2.5,
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
                bgcolor: "rgba(59, 130, 246, 0.08)",
                color: "#3B82F6",
              }}
            >
              <PersonIcon sx={{ fontSize: 20 }} />
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
                Username
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
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
              p: 2.5,
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
                bgcolor: "rgba(139, 92, 246, 0.08)",
                color: "#8B5CF6",
              }}
            >
              <EmailIcon sx={{ fontSize: 20 }} />
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
                Email Address
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
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
              p: 2.5,
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
                bgcolor: "rgba(16, 185, 129, 0.08)",
                color: "#10B981",
              }}
            >
              <PhoneIcon sx={{ fontSize: 20 }} />
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
                Phone Number
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
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
              p: 2.5,
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
                bgcolor: "rgba(236, 72, 153, 0.08)",
                color: "#EC4899",
              }}
            >
              <GenderIcon sx={{ fontSize: 20 }} />
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
                Gender
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
                  textTransform: "capitalize",
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
              p: 2.5,
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
                bgcolor: "rgba(245, 158, 11, 0.08)",
                color: "#F59E0B",
              }}
            >
              <SubjectIcon sx={{ fontSize: 20 }} />
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
                Primary Subjects
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
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
              p: 2.5,
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
                bgcolor: "rgba(20, 184, 166, 0.08)",
                color: "#14B8A6",
              }}
            >
              <ExpIcon sx={{ fontSize: 20 }} />
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
                Teaching Experience
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 0.5,
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

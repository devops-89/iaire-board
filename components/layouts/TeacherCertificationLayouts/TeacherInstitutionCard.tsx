"use client";
import React from "react";
import { Paper, Typography, Grid, Box, Avatar, Divider } from "@mui/material";
import {
  SchoolOutlined as SchoolIcon,
  CorporateFareOutlined as BoardIcon,
  LocationOnOutlined as LocationIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherInstitutionCardProps {
  teacherData: any;
  schoolName: string;
  boardName: string;
  boardCode: string;
  boardDesc: string;
  schoolLocation: string;
}

export const TeacherInstitutionCard = ({
  teacherData,
  schoolName,
  boardName,
  boardCode,
  boardDesc,
  schoolLocation,
}: TeacherInstitutionCardProps) => {
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
        Associated Institution Details
      </Typography>

      <Grid container spacing={3}>
        {/* School & Board Details Card */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {/* School Block */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Avatar
                src={
                  teacherData.school?.schoolLogoDownloadUrl ||
                  teacherData.school?.logo ||
                  undefined
                }
                variant="rounded"
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "rgba(6, 182, 212, 0.08)",
                  color: "#06B6D4",
                  border: "1px solid rgba(18, 35, 51, 0.08)",
                  p:
                    teacherData.school?.logo ||
                    teacherData.school?.schoolLogoDownloadUrl
                      ? 0.5
                      : 0,
                }}
              >
                <SchoolIcon sx={{ fontSize: 24 }} />
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(18, 35, 51, 0.45)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Associated School
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: Colors.PRIMARY_DARK,
                    fontWeight: 800,
                    mt: 0.5,
                    lineHeight: 1.3,
                  }}
                >
                  {schoolName}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(18, 35, 51, 0.06)" }} />

            {/* Board Block */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Avatar
                src={
                  teacherData.board?.boardLogoDownloadUrl ||
                  teacherData.board?.logo ||
                  undefined
                }
                variant="rounded"
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "rgba(79, 70, 229, 0.08)",
                  color: "#4F46E5",
                  border: "1px solid rgba(18, 35, 51, 0.08)",
                  p:
                    teacherData.board?.logo ||
                    teacherData.board?.boardLogoDownloadUrl
                      ? 0.5
                      : 0,
                }}
              >
                <BoardIcon sx={{ fontSize: 24 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(18, 35, 51, 0.45)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Affiliated Board
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: Colors.PRIMARY_DARK,
                    fontWeight: 800,
                    mt: 0.5,
                    lineHeight: 1.3,
                  }}
                >
                  {boardName} {boardCode && `(${boardCode})`}
                </Typography>
                {boardDesc && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "rgba(18, 35, 51, 0.5)",
                      mt: 1,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {boardDesc}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* School Location Card */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px solid rgba(18, 35, 51, 0.03)",
              display: "flex",
              gap: 2.5,
              alignItems: "flex-start",
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                borderColor: "rgba(18, 35, 51, 0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                bgcolor: "rgba(244, 63, 94, 0.08)",
                color: "#F43F5E",
                border: "1px solid rgba(18, 35, 51, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocationIcon sx={{ fontSize: 26 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "rgba(18, 35, 51, 0.45)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                School Location
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: Colors.PRIMARY_DARK,
                  fontWeight: 700,
                  mt: 1,
                  lineHeight: 1.5,
                }}
              >
                {schoolLocation}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

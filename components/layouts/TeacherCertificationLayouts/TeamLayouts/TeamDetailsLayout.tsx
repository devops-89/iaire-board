"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";
import { teamControllers } from "@/api/team";

import { TeamStats } from "./TeamStats";
import { MentorCard } from "./MentorCard";
import { AssistantMentorCard } from "./AssistantMentorCard";
import { SchoolCard } from "./SchoolCard";
import { CreatorCard } from "./CreatorCard";
import { MembersCard } from "./MembersCard";
import { SubmissionsTables } from "./SubmissionsTables";

export const TeamDetailsLayout = () => {
  const params = useParams();
  const router = useRouter();
  const teamId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        setLoading(true);
        const res = await teamControllers.getTeamDetails(teamId);
        if (res?.data?.success && res?.data?.data) {
          setTeamData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch team details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (teamId) {
      fetchTeamDetails();
    }
  }, [teamId]);

  const handleBack = () => {
    router.back();
  };

  const capitalizeWord = (str: string | undefined | null) => {
    if (!str) return "";
    return str
      .split(" ")
      .filter(Boolean)
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join(" ");
  };

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();
    if (
      s === "FUNDED" ||
      s === "ACTIVE" ||
      s === "APPROVED" ||
      s === "GRANTED" ||
      s === "PUBLISHED"
    )
      return { bg: Colors.ACCENT_MINT, text: Colors.PRIMARY_DARK };
    if (s === "ARCHIVED" || s === "INACTIVE" || s === "DRAFT")
      return { bg: "#F1F3F4", text: "#5F6368" };
    if (s === "REJECTED") return { bg: "rgba(239, 68, 68, 0.08)", text: "#DC2626" };
    return { bg: "rgba(245, 158, 11, 0.08)", text: "#D97706" };
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#fafaf8",
          fontFamily: Poppins.style.fontFamily,
        }}
      >
        <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar onMenuClick={handleDrawerToggle} />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: Colors.PRIMARY }} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (!teamData) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#fafaf8",
          fontFamily: Poppins.style.fontFamily,
        }}
      >
        <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar onMenuClick={handleDrawerToggle} />
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: Colors.PRIMARY_DARK, mb: 2, fontWeight: 700 }}
            >
              Team not found
            </Typography>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ bgcolor: Colors.PRIMARY }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  const {
    title,
    type,
    teamCode,
    mentor,
    assistantMentor,
    createdByUser,
    members = [],
    school,
    board,
    startups = [],
    innovations = [],
    researchSubmissions = [],
    innovationCount = 0,
    researchSubmissionsCount = 0,
    startupsCount = 0,
    pendingInnovationCount = 0,
    patentGrantedInnovationCount = 0,
  } = teamData;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#fafaf8",
        fontFamily: Poppins.style.fontFamily,
      }}
    >
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        <Navbar onMenuClick={handleDrawerToggle} />

        {/* Back Button */}
        <Box sx={{ display: "flex", alignItems: "center", mt: { xs: 1.5, sm: 3 }, mb: { xs: 2.5, sm: 4 } }}>
          <Button
            startIcon={<BackIcon />}
            onClick={handleBack}
            sx={{
              color: Colors.PRIMARY_DARK,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              borderRadius: "12px",
              border: `1px solid ${Colors.BORDER_STONE}`,
              bgcolor: "#fff",
              px: 2,
              py: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: Colors.ACCENT_MINT,
                transform: "translateX(-2px)",
              },
            }}
          >
            Back
          </Button>
        </Box>

        {/* Premium Slate Gradient Banner */}
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
              background:
                "radial-gradient(circle, rgba(221, 255, 247, 0.08) 0%, transparent 70%)",
            },
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: "auto" }}>
              <Avatar
                sx={{
                  width: { xs: 64, sm: 80, md: 90 },
                  height: { xs: 64, sm: 80, md: 90 },
                  borderRadius: { xs: "16px", sm: "24px" },
                  bgcolor: Colors.ACCENT_MINT,
                  color: Colors.PRIMARY_DARK,
                  fontSize: { xs: "24px", sm: "28px", md: "32px" },
                  fontWeight: 800,
                  border: `2px solid ${Colors.BORDER_STONE}`,
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                {title?.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid size={{ xs: "grow" }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    fontFamily: Poppins.style.fontFamily,
                    fontSize: { xs: "20px", sm: "24px", md: "28px" },
                    letterSpacing: "-0.5px",
                    wordBreak: "break-word",
                    mb: 1,
                  }}
                >
                  {capitalizeWord(title)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Chip
                    label={type || "GENERAL"}
                    size="small"
                    sx={{
                      bgcolor: Colors.ACCENT_MINT,
                      color: Colors.PRIMARY_DARK,
                      border: "1px solid rgba(13, 148, 136, 0.25)",
                      fontWeight: 800,
                      fontSize: "11px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: { xs: "11px", sm: "14px" },
                      color: "rgba(255, 255, 255, 0.7)",
                      wordBreak: "break-word",
                    }}
                  >
                    Team Code: {teamCode || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Statistics Section */}
        <TeamStats
          innovationCount={innovationCount}
          researchSubmissionsCount={researchSubmissionsCount}
          startupsCount={startupsCount}
          pendingInnovationCount={pendingInnovationCount}
          patentGrantedInnovationCount={patentGrantedInnovationCount}
        />

        {/* Details Grid */}
        <Grid container spacing={{ xs: 2.5, sm: 3 }} sx={{ mb: 4 }}>
          {/* Left Column: Mentors and School Details */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, sm: 3 } }}>
              <MentorCard mentor={mentor} capitalizeWord={capitalizeWord} />
              <AssistantMentorCard
                assistantMentor={assistantMentor}
                capitalizeWord={capitalizeWord}
              />
              <SchoolCard
                school={school}
                board={board}
                capitalizeWord={capitalizeWord}
              />
              <CreatorCard
                createdByUser={createdByUser}
                capitalizeWord={capitalizeWord}
              />
            </Box>
          </Grid>

          {/* Right Column: Student Members */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                position: { xs: "static", md: "sticky" },
                top: 24,
              }}
            >
              <MembersCard
                members={members}
                capitalizeWord={capitalizeWord}
                getStatusColor={getStatusColor}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Submissions Tables */}
        <SubmissionsTables
          startups={startups}
          innovations={innovations}
          researchSubmissions={researchSubmissions}
          getStatusColor={getStatusColor}
        />
      </Box>
    </Box>
  );
};

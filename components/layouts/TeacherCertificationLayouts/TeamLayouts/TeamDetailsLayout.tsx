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
      return { bg: "#E6F4EA", text: "#137333" };
    if (s === "ARCHIVED" || s === "INACTIVE" || s === "DRAFT")
      return { bg: "#F1F3F4", text: "#5F6368" };
    if (s === "REJECTED") return { bg: "#FCE8E6", text: "#C5221F" };
    return { bg: "#FEF7E0", text: "#B06000" };
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#FAF7F0",
          fontFamily: Poppins.style.fontFamily,
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: Colors.PRIMARY }} />
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
          bgcolor: "#FAF7F0",
          fontFamily: Poppins.style.fontFamily,
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            p: 4,
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
        bgcolor: "#FAF7F0",
        fontFamily: Poppins.style.fontFamily,
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto",
          px: 2,
          pb: 2,
        }}
      >
        <Navbar />

        {/* Back Button */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 4 }}>
          <Button
            startIcon={<BackIcon />}
            onClick={handleBack}
            sx={{
              color: Colors.PRIMARY_DARK,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              borderRadius: "10px",
              border: "1px solid rgba(18, 35, 51, 0.08)",
              bgcolor: "#fff",
              px: 2,
              py: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(18, 35, 51, 0.04)",
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
            p: 4,
            borderRadius: "24px",
            background: "linear-gradient(135deg, #111E2E 0%, #0A1420 100%)",
            boxShadow: "0 20px 40px rgba(18, 35, 51, 0.08)",
            position: "relative",
            overflow: "hidden",
            mb: 4,
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
                "radial-gradient(circle, rgba(32, 103, 106, 0.2) 0%, transparent 70%)",
            },
          }}
        >
          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            <Grid>
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "24px",
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                  color: Colors.PRIMARY,
                  fontSize: "32px",
                  fontWeight: 800,
                  border: `2px solid ${Colors.PRIMARY}`,
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                {title?.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid size="grow">
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      fontFamily: Poppins.style.fontFamily,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {capitalizeWord(title)}
                  </Typography>
                  <Chip
                    label={type || "GENERAL"}
                    size="small"
                    sx={{
                      bgcolor: "rgba(32, 103, 106, 0.2)",
                      color: "#00D1C1",
                      border: "1px solid rgba(0, 209, 193, 0.3)",
                      fontWeight: 700,
                      fontSize: "11px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    mt: 1,
                  }}
                >
                  Team Code: {teamCode || "N/A"}
                </Typography>
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
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Left Column: Mentors and School Details */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
            <MembersCard
              members={members}
              capitalizeWord={capitalizeWord}
              getStatusColor={getStatusColor}
            />
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

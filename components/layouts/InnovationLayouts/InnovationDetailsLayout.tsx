"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, CircularProgress, Typography } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { innovationControllers } from "@/api/innovation";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";

// Subcomponents (Direct imports from same directory)
import { HeaderCard } from "./HeaderCard";
import { ProblemSolutionCard } from "./ProblemSolutionCard";
import { CreatorCard } from "./CreatorCard";
import { SchoolInfoCard } from "./SchoolInfoCard";
import { SubmissionDetailsCard } from "./SubmissionDetailsCard";

export const InnovationDetailsLayout = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [innovation, setInnovation] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await innovationControllers.getInnovationDetails(id);
        if (res?.data && res.data.success) {
          const payload = res.data.data;
          const data = payload.data || payload;
          setInnovation(data);
        }
      } catch (error) {
        console.error("Failed to fetch innovation details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleBack = () => {
    router.push("/innovation-research");
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
        <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", lg: "calc(100% - 250px)" },
          }}
        >
          <CircularProgress sx={{ color: Colors.PRIMARY_DARK }} />
        </Box>
      </Box>
    );
  }

  if (!innovation) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#FAF7F0",
          fontFamily: Poppins.style.fontFamily,
        }}
      >
        <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            p: 4,
            width: { xs: "100%", lg: "calc(100% - 250px)" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ color: "rgba(18, 35, 51, 0.4)", fontWeight: 600 }}>
            Innovation details not found
          </Typography>
          <Button
            onClick={handleBack}
            startIcon={<BackIcon />}
            sx={{ textTransform: "none", color: Colors.PRIMARY_DARK }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#FAF7F0",
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
          overflowX: "hidden",
          px: { xs: 1.5, sm: 2, md: 3 },
          pb: 3,
          position: "relative",
          bgcolor: "#FAF7F0",
          width: { xs: "100%", lg: "calc(100% - 250px)" },
        }}
      >
        <Navbar onMenuClick={handleDrawerToggle} />

        {/* Back Button Row */}
        <Box sx={{ mt: 3, mb: 3 }}>
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
            Back to Innovation & Research
          </Button>
        </Box>

        {/* Dynamic Detail layout */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Main Info Header Card */}
          <Grid size={{ xs: 12 }}>
            <HeaderCard
              title={innovation.title}
              createdAt={innovation.createdAt}
              status={innovation.status}
            />
          </Grid>

          {/* Left Column - Details Description & Creator cards */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid size={{ xs: 12 }}>
                <ProblemSolutionCard
                  problemDescription={innovation.problemDescription}
                  solution={innovation.solution || innovation.solutionDescription}
                />
              </Grid>
              {innovation.creator && (
                <Grid size={{ xs: 12 }}>
                  <CreatorCard creator={innovation.creator} />
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Right Column - Sidebar School & Metadata details */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {innovation.school && (
                <Grid size={{ xs: 12 }}>
                  <SchoolInfoCard
                    school={innovation.school}
                    countryName={innovation.country?.name}
                  />
                </Grid>
              )}
              <Grid size={{ xs: 12 }}>
                <SubmissionDetailsCard
                  team={innovation.team}
                  teamId={innovation.teamId}
                  attorneyTemplateDownloadUrl={innovation.attorneyTemplateDownloadUrl}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

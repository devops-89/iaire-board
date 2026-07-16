"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, CircularProgress, Typography } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { teacherControllers } from "@/api/teacher";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";
import { Teacher } from "@/utils/types";

// Import modular components
import { TeacherProfileBanner } from "./TeacherProfileBanner";
import { TeacherPersonalCard } from "./TeacherPersonalCard";
import { TeacherInstitutionCard } from "./TeacherInstitutionCard";
import { TeacherAccountCard } from "./TeacherAccountCard";
import { TeacherAdminsCard } from "./TeacherAdminsCard";
import { TeacherTeamsCard } from "./TeacherTeamsCard";

export const TeacherDetailsLayout = () => {
  const params = useParams();
  const router = useRouter();
  const teacherId = params?.id ? parseInt(params.id as string) : null;

  const [teacherData, setTeacherData] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [teamPage, setTeamPage] = useState<number>(1);
  const teamsPerPage = 10;

  useEffect(() => {
    if (!teacherId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await teacherControllers.getTeacherDetails(teacherId);
        if (res?.data && res.data.success) {
          const data = res.data.data.data || res.data.data;
          setTeacherData(data);
        }
      } catch (error) {
        console.error("Failed to fetch teacher details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [teacherId]);

  const handleBack = () => {
    router.push("/teacher-certification");
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
          <CircularProgress sx={{ color: Colors.PRIMARY_DARK }} />
        </Box>
      </Box>
    );
  }

  if (!teacherData) {
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
            Teacher not found
          </Typography>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ bgcolor: Colors.PRIMARY_DARK }}
          >
            Back to Teachers
          </Button>
        </Box>
      </Box>
    );
  }

  const isTeacherActive =
    teacherData.status === "ACTIVE" ||
    teacherData.status === "active" ||
    teacherData.status === "Active" ||
    teacherData.isActive === true ||
    (teacherData as any).isActive === "true" ||
    (teacherData as any).active === true ||
    (teacherData as any).is_active === true ||
    (teacherData as any).is_active === 1;

  const rawDisplayName =
    teacherData.fullName ||
    ((teacherData as any).firstName || (teacherData as any).lastName
      ? `${(teacherData as any).firstName || ""} ${(teacherData as any).lastName || ""}`.trim()
      : "") ||
    teacherData.username ||
    "Teacher";

  const displayName = rawDisplayName
    .split(" ")
    .filter(Boolean)
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");

  const schoolName = teacherData.school?.name || "No Associated School";
  const schoolLocation =
    [
      teacherData.school?.addressLine1,
      teacherData.school?.city,
      teacherData.school?.state,
      teacherData.school?.zipCode,
    ]
      .filter(Boolean)
      .join(", ") || "--";

  const boardName = teacherData.board?.name || "--";
  const boardCode = teacherData.board?.code || "";
  const boardDesc = teacherData.board?.description || "";

  const subjects = teacherData.primarySubjects?.join(", ") || "--";
  const experienceVal = teacherData.experienceinYears
    ? `${teacherData.experienceinYears} Years`
    : "--";

  const formattedDate = teacherData.createdAt
    ? new Date(teacherData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "--";

  const formattedApprovedDate = (teacherData as any).approvedAt
    ? new Date((teacherData as any).approvedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "--";

  const teamsList = (teacherData as any)?.teams || [];

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

        {/* Back Button Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 3,
            mb: 4,
          }}
        >
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
            Back to Teachers
          </Button>
        </Box>

        {/* Profile Banner */}
        <TeacherProfileBanner
          displayName={displayName}
          schoolName={schoolName}
          isTeacherActive={isTeacherActive}
        />

        {/* Two Columns Grid */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Personal Details Card */}
              <TeacherPersonalCard
                teacherData={teacherData}
                subjects={subjects}
                experienceVal={experienceVal}
              />

              {/* Institution Details Card */}
              <TeacherInstitutionCard
                teacherData={teacherData}
                schoolName={schoolName}
                boardName={boardName}
                boardCode={boardCode}
                boardDesc={boardDesc}
                schoolLocation={schoolLocation}
              />
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                position: "sticky",
                top: "24px",
              }}
            >
              {/* Account Metadata Card */}
              <TeacherAccountCard
                role={teacherData.role || "--"}
                formattedDate={formattedDate}
                approvedAt={(teacherData as any).approvedAt}
                formattedApprovedDate={formattedApprovedDate}
              />

              {/* School Administrators Card */}
              <TeacherAdminsCard
                schoolAdmins={teacherData.schoolAdmins || []}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Associated Teams & Innovations Card (Full Width) */}
        <Box sx={{ mt: 4 }}>
          <TeacherTeamsCard
            teamsList={teamsList}
            teamPage={teamPage}
            setTeamPage={setTeamPage}
            teamsPerPage={teamsPerPage}
            router={router}
          />
        </Box>
      </Box>
    </Box>
  );
};

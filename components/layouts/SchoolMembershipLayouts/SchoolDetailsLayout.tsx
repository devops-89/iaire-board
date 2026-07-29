"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress, Tabs, Tab } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";
import { schoolControllers } from "@/api/school";

// Modular sub-components
import { SchoolProfileBanner } from "./SchoolProfileBanner";
import { SchoolStats } from "./SchoolStats";
import { SchoolProfileTab } from "./SchoolProfileTab";
import { SchoolTeachersTab } from "./SchoolTeachersTab";
import { SchoolStudentsTab } from "./SchoolStudentsTab";

interface SchoolDetails {
  school: {
    id: number;
    name: string;
    code: string | null;
    boardId: number;
    address: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    logo: string | null;
    schoolLogoDownloadUrl: string | null;
    affiliationNumber: string | null;
    affiliationCertificate: string | null;
    affiliationCertificateDownloadUrl: string | null;
    registrationYear: number | null;
    website: string | null;
    isActive: boolean;
  };
  teachers: any[];
  students: any[];
}

export const SchoolDetailsLayout = () => {
  const params = useParams();
  const router = useRouter();
  const schoolId = params?.id ? parseInt(params.id as string) : null;

  const [schoolData, setSchoolData] = useState<SchoolDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Pagination states for teachers and students tables
  const [teacherPage, setTeacherPage] = useState<number>(1);
  const [studentPage, setStudentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!schoolId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await schoolControllers.getSchoolDetails(schoolId);
        if (res?.data && res.data.success) {
          setSchoolData(res.data.data.data || res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch school details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [schoolId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    router.push("/membership-overview");
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
            flexDirection: "column",
            overflowX: "hidden",
            width: { xs: "100%", lg: "calc(100% - 250px)" },
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
            <CircularProgress sx={{ color: Colors.PRIMARY_DARK }} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (!schoolData || !schoolData.school) {
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
            flexDirection: "column",
            overflowX: "hidden",
            width: { xs: "100%", lg: "calc(100% - 250px)" },
          }}
        >
          <Navbar onMenuClick={handleDrawerToggle} />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: Colors.PRIMARY_DARK, fontWeight: 700 }}
            >
              School Details Not Found
            </Typography>
            <Button
              startIcon={<BackIcon />}
              onClick={handleBack}
              sx={{
                bgcolor: Colors.PRIMARY_DARK,
                color: "#fff",
                "&:hover": { bgcolor: "#1A2B3B" },
                borderRadius: "8px",
                px: 3,
                py: 1,
              }}
            >
              Back to overview
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  const { school, teachers, students } = schoolData;

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

  const fullAddress = [
    capitalizeWord(school.addressLine1),
    capitalizeWord(school.addressLine2),
    capitalizeWord(school.city),
    capitalizeWord(school.state),
    school.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

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
            Back to Institutions
          </Button>
        </Box>

        {/* School Profile Banner Card */}
        <SchoolProfileBanner school={school} capitalizeWord={capitalizeWord} />

        {/* Premium Statistics Metrics */}
        <SchoolStats
          teachersCount={teachers?.length || 0}
          studentsCount={students?.length || 0}
        />

        {/* Tab section selection */}
        <Box
          sx={{ borderBottom: 1, borderColor: "rgba(18, 35, 51, 0.08)", mb: 3 }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                bgcolor: Colors.PRIMARY_DARK,
                height: "3px",
                borderRadius: "3px",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
                fontSize: "15px",
                color: "rgba(18, 35, 51, 0.4)",
                px: 1,
                mr: { xs: 2, sm: 4 },
                minWidth: "auto",
                transition: "all 0.2s ease",
                "&.Mui-selected": {
                  color: Colors.PRIMARY_DARK,
                },
                "&:hover": {
                  color: Colors.PRIMARY_DARK,
                  opacity: 0.8,
                },
              },
            }}
          >
            <Tab label="Institution Profile" />
            <Tab label={`Teachers (${teachers?.length || 0})`} />
            <Tab label={`Students (${students?.length || 0})`} />
          </Tabs>
        </Box>

        {/* Tab content */}
        {activeTab === 0 && (
          <SchoolProfileTab
            school={school}
            fullAddress={fullAddress}
            capitalizeWord={capitalizeWord}
          />
        )}

        {/* Teachers Tab */}
        {activeTab === 1 && (
          <SchoolTeachersTab
            teachers={teachers || []}
            teacherPage={teacherPage}
            setTeacherPage={setTeacherPage}
            itemsPerPage={itemsPerPage}
          />
        )}

        {/* Students Tab */}
        {activeTab === 2 && (
          <SchoolStudentsTab
            students={students || []}
            studentPage={studentPage}
            setStudentPage={setStudentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </Box>
    </Box>
  );
};

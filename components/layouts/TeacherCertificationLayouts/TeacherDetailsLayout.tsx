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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  EmailOutlined as EmailIcon,
  PersonOutlined as PersonIcon,
  BadgeOutlined as RoleIcon,
  SchoolOutlined as SchoolIcon,
  CalendarTodayOutlined as DateIcon,
  PhoneOutlined as PhoneIcon,
  WcOutlined as GenderIcon,
  MenuBookOutlined as SubjectIcon,
  WorkOutlineOutlined as ExpIcon,
  CorporateFareOutlined as BoardIcon,
  AdminPanelSettingsOutlined as AdminIcon,
  GroupOutlined as StudentIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
  LocationOnOutlined as LocationIcon,
  GroupsOutlined as TeamIcon,
  LightbulbOutlined as InnovationIcon,
  RocketLaunchOutlined as StartupIcon,
  WorkspacePremiumOutlined as PatentIcon,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { teacherControllers } from "@/api/teacher";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";
import { Teacher } from "@/utils/types";

export const TeacherDetailsLayout = () => {
  const params = useParams();
  const router = useRouter();
  const teacherId = params?.id ? parseInt(params.id as string) : null;

  const [teacherData, setTeacherData] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [studentPage, setStudentPage] = useState<number>(1);
  const studentsPerPage = 10;
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
          <Typography variant="h5" sx={{ color: Colors.PRIMARY_DARK, mb: 2, fontWeight: 700 }}>
            Teacher not found
          </Typography>
          <Button variant="contained" onClick={handleBack} sx={{ bgcolor: Colors.PRIMARY_DARK }}>
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
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const schoolName = teacherData.school?.name || "No Associated School";
  const schoolLocation = [
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

  const totalStudents = teacherData.students?.length || 0;
  const totalStudentPages = Math.ceil(totalStudents / studentsPerPage) || 1;
  const indexOfFirstStudent = (studentPage - 1) * studentsPerPage;
  const indexOfLastStudent = indexOfFirstStudent + studentsPerPage;
  const currentStudents = teacherData.students?.slice(indexOfFirstStudent, indexOfLastStudent) || [];

  const teamsList = (teacherData as any)?.teams || [];

  const totalTeams = teamsList.length;
  const totalTeamsPages = Math.ceil(totalTeams / teamsPerPage) || 1;
  const indexOfFirstTeam = (teamPage - 1) * teamsPerPage;
  const indexOfLastTeam = indexOfFirstTeam + teamsPerPage;
  const currentTeams = teamsList.slice(indexOfFirstTeam, indexOfLastTeam);

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

        {/* Profile Banner Card - Premium Slate Gradient with glass highlight */}
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
              background: "radial-gradient(circle, rgba(0, 209, 193, 0.12) 0%, transparent 70%)",
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
                  color: "#00D1C1",
                  fontSize: "32px",
                  fontWeight: 800,
                  border: "2px solid rgba(0, 209, 193, 0.3)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid size="grow">
              <Box>
                <Typography
                  sx={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.2,
                  }}
                >
                  {displayName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.65)",
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  Teacher • {schoolName}
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Chip
                label={isTeacherActive ? "Active Profile" : "Inactive"}
                icon={
                  isTeacherActive ? (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#10B981",
                        ml: 1,
                        boxShadow: "0 0 8px #10B981",
                      }}
                    />
                  ) : undefined
                }
                sx={{
                  bgcolor: isTeacherActive
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(255, 255, 255, 0.1)",
                  color: isTeacherActive ? "#10B981" : "rgba(255, 255, 255, 0.65)",
                  fontWeight: 800,
                  fontSize: "12px",
                  borderRadius: "10px",
                  border: `1px solid ${
                    isTeacherActive
                      ? "rgba(16, 185, 129, 0.3)"
                      : "rgba(255, 255, 255, 0.2)"
                  }`,
                  pl: isTeacherActive ? 0.5 : 0,
                  "& .MuiChip-icon": { color: "inherit", margin: 0 },
                  "& .MuiChip-label": { pl: 1, color: "inherit" },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Two Columns Grid */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Profile Details Card */}
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
                        <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                          Username
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.5 }}>
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
                        <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                          Email Address
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.5 }}>
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
                        <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                          Phone Number
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.5 }}>
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
                        <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                          Gender
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.5, textTransform: "capitalize" }}>
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
                        <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                          Primary Subjects
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.5 }}>
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
                        <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                          Teaching Experience
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.5 }}>
                          {experienceVal}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Institution Details Card */}
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
                          src={teacherData.school?.schoolLogoDownloadUrl || teacherData.school?.logo || undefined}
                          variant="rounded"
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: "rgba(6, 182, 212, 0.08)",
                            color: "#06B6D4",
                            border: "1px solid rgba(18, 35, 51, 0.08)",
                            p: teacherData.school?.logo || teacherData.school?.schoolLogoDownloadUrl ? 0.5 : 0,
                          }}
                        >
                          <SchoolIcon sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Associated School
                          </Typography>
                          <Typography sx={{ fontSize: "15px", color: Colors.PRIMARY_DARK, fontWeight: 800, mt: 0.5, lineHeight: 1.3 }}>
                            {schoolName}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ borderColor: "rgba(18, 35, 51, 0.06)" }} />

                      {/* Board Block */}
                      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                        <Avatar
                          src={teacherData.board?.boardLogoDownloadUrl || teacherData.board?.logo || undefined}
                          variant="rounded"
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: "rgba(79, 70, 229, 0.08)",
                            color: "#4F46E5",
                            border: "1px solid rgba(18, 35, 51, 0.08)",
                            p: teacherData.board?.logo || teacherData.board?.boardLogoDownloadUrl ? 0.5 : 0,
                          }}
                        >
                          <BoardIcon sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Affiliated Board
                          </Typography>
                          <Typography sx={{ fontSize: "15px", color: Colors.PRIMARY_DARK, fontWeight: 800, mt: 0.5, lineHeight: 1.3 }}>
                            {boardName} {boardCode && `(${boardCode})`}
                          </Typography>
                          {boardDesc && (
                            <Typography sx={{ fontSize: "12px", color: "rgba(18, 35, 51, 0.5)", mt: 1, fontWeight: 600, lineHeight: 1.4 }}>
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
                        <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          School Location
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 1, lineHeight: 1.5 }}>
                          {schoolLocation}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Registered Students Card */}
              <Paper
                elevation={0}
                sx={{
                  pt: 4,
                  px: 4,
                  pb: 0,
                  borderRadius: "24px",
                  border: "1px solid rgba(18, 35, 51, 0.05)",
                  bgcolor: "#fff",
                  boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: "rgba(37, 99, 235, 0.08)",
                      color: "#2563EB",
                    }}
                  >
                    <StudentIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: 800, color: Colors.PRIMARY_DARK }}>
                    Registered Students ({totalStudents})
                  </Typography>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: "rgba(18, 35, 51, 0.03)" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, py: 1.5 }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, py: 1.5 }}>
                          Email Address
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, py: 1.5 }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                            <Typography sx={{ color: "rgba(18, 35, 51, 0.4)", fontWeight: 600, fontSize: "13px" }}>
                              No registered students
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentStudents.map((student: any) => {
                          const studentName =
                            student.fullName ||
                            (student.firstName || student.lastName
                              ? `${student.firstName || ""} ${student.lastName || ""}`.trim()
                              : "") ||
                            student.username ||
                            "Student";
                          return (
                            <TableRow key={student.id} sx={{ "&:hover": { bgcolor: "rgba(18, 35, 51, 0.01)" } }}>
                              <TableCell sx={{ py: 1.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                  <Avatar
                                    src={student.profileImageDownloadUrl || undefined}
                                    sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700 }}
                                  >
                                    {studentName.charAt(0).toUpperCase()}
                                  </Avatar>
                                  <Typography sx={{ fontSize: "13px", fontWeight: 700, color: Colors.PRIMARY_DARK }}>
                                    {studentName}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px", fontWeight: 600, color: "rgba(18, 35, 51, 0.8)", py: 1.5 }}>
                                {student.email}
                              </TableCell>
                              <TableCell sx={{ py: 1.5 }}>
                                <Chip
                                  label={student.status || "ACTIVE"}
                                  size="small"
                                  sx={{
                                    bgcolor:
                                      student.status === "ACTIVE" || student.status === "active"
                                        ? "rgba(16, 185, 129, 0.08)"
                                        : "rgba(107, 114, 128, 0.08)",
                                    color:
                                      student.status === "ACTIVE" || student.status === "active"
                                        ? "#10B981"
                                        : "#6B7280",
                                    fontWeight: 800,
                                    fontSize: "10px",
                                    borderRadius: "6px",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {totalStudents > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 4,
                      py: 2.5,
                      borderTop: "1px solid rgba(18, 35, 51, 0.05)",
                      bgcolor: "#FBF9F6",
                      gap: 2,
                      mt: 3,
                      mx: -4,
                      mb: 0,
                      borderRadius: "0 0 24px 24px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "rgba(18, 35, 51, 0.5)",
                      }}
                    >
                      Showing {indexOfFirstStudent + 1} to{" "}
                      {Math.min(indexOfLastStudent, totalStudents)} of {totalStudents} students
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        onClick={() => setStudentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={studentPage === 1}
                        size="small"
                        sx={{
                          border: "1px solid rgba(18, 35, 51, 0.08)",
                          borderRadius: "8px",
                          bgcolor: "#fff",
                          "&:hover": { bgcolor: "rgba(18, 35, 51, 0.04)" },
                          width: 34,
                          height: 34,
                          "&.Mui-disabled": { opacity: 0.4 },
                        }}
                      >
                        <PrevIcon sx={{ fontSize: 16 }} />
                      </IconButton>

                      {Array.from({ length: totalStudentPages }, (_, i) => {
                        const pageNum = i + 1;
                        const isActive = pageNum === studentPage;
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => setStudentPage(pageNum)}
                            sx={{
                              minWidth: 34,
                              height: 34,
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: isActive ? 800 : 600,
                              color: isActive ? "#fff" : Colors.PRIMARY_DARK,
                              bgcolor: isActive ? Colors.PRIMARY_DARK : "transparent",
                              border: isActive ? "none" : "1px solid transparent",
                              "&:hover": {
                                bgcolor: isActive
                                  ? Colors.PRIMARY_DARK
                                  : "rgba(18, 35, 51, 0.04)",
                                opacity: isActive ? 0.9 : 1,
                                borderColor: isActive
                                  ? "transparent"
                                  : "rgba(18, 35, 51, 0.1)",
                              },
                              p: 0,
                            }}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}

                      <IconButton
                        onClick={() => setStudentPage((prev) => Math.min(prev + 1, totalStudentPages))}
                        disabled={studentPage === totalStudentPages || totalStudentPages === 0}
                        size="small"
                        sx={{
                          border: "1px solid rgba(18, 35, 51, 0.08)",
                          borderRadius: "8px",
                          bgcolor: "#fff",
                          "&:hover": { bgcolor: "rgba(18, 35, 51, 0.04)" },
                          width: 34,
                          height: 34,
                          "&.Mui-disabled": { opacity: 0.4 },
                        }}
                      >
                        <NextIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: "24px" }}>
              {/* Account Metadata Card */}
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
                        bgcolor: "rgba(139, 92, 246, 0.08)",
                        color: "#8B5CF6",
                      }}
                    >
                      <RoleIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                        System Role
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.2 }}>
                        {teacherData.role}
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
                        bgcolor: "rgba(100, 116, 139, 0.08)",
                        color: "#64748B",
                      }}
                    >
                      <DateIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                        Registered On
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.2 }}>
                        {formattedDate}
                      </Typography>
                    </Box>
                  </Box>

                  {teacherData.approvedAt && (
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
                            bgcolor: "rgba(16, 185, 129, 0.08)",
                            color: "#10B981",
                          }}
                        >
                          <DateIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 700, textTransform: "uppercase" }}>
                            Approved On
                          </Typography>
                          <Typography sx={{ fontSize: "13px", color: Colors.PRIMARY_DARK, fontWeight: 700, mt: 0.2 }}>
                            {formattedApprovedDate}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Paper>

              {/* School Administrators Card */}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: "rgba(139, 92, 246, 0.08)",
                      color: "#8B5CF6",
                    }}
                  >
                    <AdminIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: 800, color: Colors.PRIMARY_DARK }}>
                    School Administrators
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  {!teacherData.schoolAdmins || teacherData.schoolAdmins.length === 0 ? (
                    <Typography sx={{ color: "rgba(18, 35, 51, 0.4)", fontWeight: 600, fontSize: "13px", textAlign: "center", py: 2 }}>
                      No administrators registered
                    </Typography>
                  ) : (
                    teacherData.schoolAdmins.map((admin: any) => {
                      const adminName =
                        admin.fullName ||
                        (admin.firstName || admin.lastName
                          ? `${admin.firstName || ""} ${admin.lastName || ""}`.trim()
                          : "") ||
                        admin.username ||
                        "Admin";
                      return (
                        <Box
                          key={admin.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: "16px",
                            border: "1px solid rgba(18, 35, 51, 0.04)",
                            bgcolor: "rgba(18, 35, 51, 0.015)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: "#fff",
                              borderColor: "rgba(18, 35, 51, 0.08)",
                              boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                              transform: "translateX(2px)",
                            },
                          }}
                        >
                          <Avatar sx={{ width: 38, height: 38, fontSize: 13, fontWeight: 700, bgcolor: "rgba(18, 35, 51, 0.05)", color: Colors.PRIMARY_DARK }}>
                            {adminName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography noWrap sx={{ fontSize: "13px", fontWeight: 700, color: Colors.PRIMARY_DARK }}>
                              {adminName}
                            </Typography>
                            <Typography noWrap sx={{ fontSize: "11px", color: "rgba(18, 35, 51, 0.5)", fontWeight: 500 }}>
                              {admin.email}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Associated Teams & Innovations Card (Full Width) */}
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              pt: 4,
              px: 4,
              pb: 0,
              borderRadius: "24px",
              border: "1px solid rgba(18, 35, 51, 0.05)",
              bgcolor: "#fff",
              boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  bgcolor: "rgba(139, 92, 246, 0.08)",
                  color: "#8B5CF6",
                }}
              >
                <TeamIcon sx={{ fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontSize: "16px", fontWeight: 800, color: Colors.PRIMARY_DARK }}>
                Associated Teams & Innovations ({totalTeams})
              </Typography>
            </Box>

            <TableContainer>
              <Table>
                <TableHead
                  sx={{
                    bgcolor: "rgba(18, 35, 51, 0.015)",
                    borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        fontSize: "11px",
                        color: Colors.PRIMARY_DARK,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        py: 1.8,
                        px: 3,
                      }}
                    >
                      Team Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        fontSize: "11px",
                        color: Colors.PRIMARY_DARK,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        py: 1.8,
                        px: 3,
                      }}
                    >
                      Innovations
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        fontSize: "11px",
                        color: Colors.PRIMARY_DARK,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        py: 1.8,
                        px: 3,
                      }}
                    >
                      Startups
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        fontSize: "11px",
                        color: Colors.PRIMARY_DARK,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        py: 1.8,
                        px: 3,
                      }}
                    >
                      Granted Patents
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        fontSize: "11px",
                        color: Colors.PRIMARY_DARK,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        py: 1.8,
                        px: 3,
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentTeams.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <Typography sx={{ color: "rgba(18, 35, 51, 0.4)", fontWeight: 600, fontSize: "13px" }}>
                          No associated teams
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentTeams.map((team: any) => {
                      const rawTeamName = team.title || team.name || team.teamName || "Unnamed Team";
                      const teamName = rawTeamName
                        .split(" ")
                        .filter(Boolean)
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ");
                      const innovationCountVal = team.innovationCount || team.innovationsCount || team.projectCount || (team.projects && Array.isArray(team.projects) ? team.projects.length : 0) || 0;
                      const startupsCountVal = team.startupsCount || 0;
                      const patentsCountVal = team.grantedPatentsCount || team.patentsCount || 0;
                      const teamStatus = team.status || "ACTIVE";
                      const isTeamActive = teamStatus === "ACTIVE" || teamStatus === "active";

                      return (
                        <TableRow
                          key={team.id}
                          sx={{
                            transition: "all 0.2s ease",
                            borderBottom: "1px solid rgba(18, 35, 51, 0.04)",
                            "&:last-child": { borderBottom: "none" },
                            "&:hover": {
                              bgcolor: "rgba(18, 35, 51, 0.015)",
                            },
                          }}
                        >
                          <TableCell sx={{ py: 1.8, px: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  fontSize: 12,
                                  fontWeight: 800,
                                  bgcolor: "rgba(139, 92, 246, 0.08)",
                                  color: "#8B5CF6",
                                  border: "1px solid rgba(139, 92, 246, 0.15)",
                                }}
                              >
                                {teamName.charAt(0).toUpperCase()}
                              </Avatar>
                              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: Colors.PRIMARY_DARK }}>
                                {teamName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 1.8, px: 3 }}>
                             <Box
                               sx={{
                                 fontSize: "12px",
                                 fontWeight: 800,
                                 color: "#D97706",
                                 bgcolor: "rgba(245, 158, 11, 0.08)",
                                 px: 1.2,
                                 py: 0.4,
                                 borderRadius: "6px",
                                 border: "1px solid rgba(245, 158, 11, 0.15)",
                                 display: "inline-block",
                               }}
                             >
                               {innovationCountVal} Projects
                             </Box>
                           </TableCell>
                           <TableCell sx={{ py: 1.8, px: 3 }}>
                             <Box
                               sx={{
                                 fontSize: "12px",
                                 fontWeight: 800,
                                 color: "#008B81",
                                 bgcolor: "rgba(0, 209, 193, 0.08)",
                                 px: 1.2,
                                 py: 0.4,
                                 borderRadius: "6px",
                                 border: "1px solid rgba(0, 209, 193, 0.15)",
                                 display: "inline-block",
                               }}
                             >
                               {startupsCountVal} Startups
                             </Box>
                           </TableCell>
                           <TableCell sx={{ py: 1.8, px: 3 }}>
                             <Box
                               sx={{
                                 fontSize: "12px",
                                 fontWeight: 800,
                                 color: "#2563EB",
                                 bgcolor: "rgba(59, 130, 246, 0.08)",
                                 px: 1.2,
                                 py: 0.4,
                                 borderRadius: "6px",
                                 border: "1px solid rgba(59, 130, 246, 0.15)",
                                 display: "inline-block",
                               }}
                             >
                               {patentsCountVal} Patents
                             </Box>
                           </TableCell>
                          <TableCell sx={{ py: 1.8, px: 3 }}>
                            <Chip
                              label={teamStatus}
                              size="small"
                              sx={{
                                bgcolor: isTeamActive
                                  ? "rgba(16, 185, 129, 0.08)"
                                  : "rgba(245, 158, 11, 0.08)",
                                color: isTeamActive ? "#10B981" : "#F59E0B",
                                fontWeight: 800,
                                fontSize: "10px",
                                borderRadius: "6px",
                                border: `1px solid ${
                                  isTeamActive
                                    ? "rgba(16, 185, 129, 0.15)"
                                    : "rgba(245, 158, 11, 0.15)"
                                }`,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {totalTeams > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 4,
                  py: 2.5,
                  borderTop: "1px solid rgba(18, 35, 51, 0.05)",
                  bgcolor: "#FBF9F6",
                  gap: 2,
                  mt: 3,
                  mx: -4,
                  mb: 0,
                  borderRadius: "0 0 24px 24px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "rgba(18, 35, 51, 0.5)",
                  }}
                >
                  Showing {indexOfFirstTeam + 1} to{" "}
                  {Math.min(indexOfLastTeam, totalTeams)} of {totalTeams} teams
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => setTeamPage((prev) => Math.max(prev - 1, 1))}
                    disabled={teamPage === 1}
                    size="small"
                    sx={{
                      border: "1px solid rgba(18, 35, 51, 0.08)",
                      borderRadius: "8px",
                      bgcolor: "#fff",
                      "&:hover": { bgcolor: "rgba(18, 35, 51, 0.04)" },
                      width: 34,
                      height: 34,
                      "&.Mui-disabled": { opacity: 0.4 },
                    }}
                  >
                    <PrevIcon sx={{ fontSize: 16 }} />
                  </IconButton>

                  {Array.from({ length: totalTeamsPages }, (_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === teamPage;
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => setTeamPage(pageNum)}
                        sx={{
                          minWidth: 34,
                          height: 34,
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: isActive ? 800 : 600,
                          color: isActive ? "#fff" : Colors.PRIMARY_DARK,
                          bgcolor: isActive ? Colors.PRIMARY_DARK : "transparent",
                          border: isActive ? "none" : "1px solid transparent",
                          "&:hover": {
                            bgcolor: isActive
                              ? Colors.PRIMARY_DARK
                              : "rgba(18, 35, 51, 0.04)",
                            opacity: isActive ? 0.9 : 1,
                            borderColor: isActive
                              ? "transparent"
                              : "rgba(18, 35, 51, 0.1)",
                          },
                          p: 0,
                        }}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <IconButton
                    onClick={() => setTeamPage((prev) => Math.min(prev + 1, totalTeamsPages))}
                    disabled={teamPage === totalTeamsPages || totalTeamsPages === 0}
                    size="small"
                    sx={{
                      border: "1px solid rgba(18, 35, 51, 0.08)",
                      borderRadius: "8px",
                      bgcolor: "#fff",
                      "&:hover": { bgcolor: "rgba(18, 35, 51, 0.04)" },
                      width: 34,
                      height: 34,
                      "&.Mui-disabled": { opacity: 0.4 },
                    }}
                  >
                    <NextIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

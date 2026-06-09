"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  ArrowBack as BackIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Language as WebIcon,
  Description as DocIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  AssignmentTurnedIn as CertificateIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";
import { schoolControllers } from "@/api/school";

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

  useEffect(() => {
    if (!schoolId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await schoolControllers.getSchoolDetails(schoolId);
        if (res?.data && res.data.success) {
          setSchoolData(res.data.data.data);
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
          bgcolor: "#FAF6F0",
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
            flexDirection: "column",
          }}
        >
          <Navbar />
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
          bgcolor: "#FAF6F0",
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
            flexDirection: "column",
          }}
        >
          <Navbar />
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
  const fullAddress = [
    school.addressLine1,
    school.addressLine2,
    school.city,
    school.state,
    school.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#FAF6F0",
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
          px: 4,
          pb: 4,
        }}
      >
        <Navbar />

        {/* Back Button & Title Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "24px",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
            position: "relative",
            overflow: "hidden",
            mb: 4,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "6px",
              height: "100%",
              bgcolor: school.isActive ? "#10B981" : "#6B7280",
            },
          }}
        >
          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            <Grid>
              <Avatar
                src={school.schoolLogoDownloadUrl || school.logo || undefined}
                sx={{
                  width: 96,
                  height: 96,
                  borderRadius: "24px",
                  bgcolor: "rgba(18, 35, 51, 0.05)",
                  color: Colors.PRIMARY_DARK,
                  fontSize: "32px",
                  fontWeight: 800,
                  border: "2px solid rgba(18, 35, 51, 0.08)",
                }}
              >
                {!school.schoolLogoDownloadUrl && !school.logo
                  ? school.name.charAt(0)
                  : undefined}
              </Avatar>
            </Grid>
            <Grid size={{ xs: 12, sm: "grow" }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: Colors.PRIMARY_DARK,
                    letterSpacing: "-0.5px",
                    lineHeight: 1.2,
                  }}
                >
                  {school.name}
                </Typography>
                <Chip
                  icon={
                    school.isActive ? (
                      <ActiveIcon sx={{ fontSize: "16px !important" }} />
                    ) : (
                      <InactiveIcon sx={{ fontSize: "16px !important" }} />
                    )
                  }
                  label={school.isActive ? "Active Institution" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: school.isActive
                      ? "rgba(16, 185, 129, 0.08)"
                      : "rgba(107, 114, 128, 0.08)",
                    color: school.isActive ? "#10B981" : "#6B7280",
                    fontWeight: 800,
                    fontSize: "11px",
                    borderRadius: "8px",
                    border: `1px solid ${school.isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(107, 114, 128, 0.15)"}`,
                    pl: 0.5,
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1.5 }}>
                {school.city && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <LocationIcon
                      sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: 18 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(18, 35, 51, 0.6)",
                      }}
                    >
                      {school.city}, {school.state || "India"}
                    </Typography>
                  </Box>
                )}
                {school.registrationYear && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <CalendarIcon
                      sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: 18 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(18, 35, 51, 0.6)",
                      }}
                    >
                      Registered: {school.registrationYear}
                    </Typography>
                  </Box>
                )}
                {school.website && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <WebIcon
                      sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: 18 }}
                    />
                    <Typography
                      component="a"
                      href={
                        school.website.startsWith("http")
                          ? school.website
                          : `https://${school.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#00D1C1",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {school.website}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Premium Mini metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "18px",
                border: "1px solid rgba(18, 35, 51, 0.05)",
                bgcolor: "#fff",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: "20px !important",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(0, 209, 193, 0.08)",
                    color: "#00D1C1",
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                  }}
                >
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.4)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    TOTAL TEACHERS
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: Colors.PRIMARY_DARK,
                    }}
                  >
                    {teachers?.length || 0}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "18px",
                border: "1px solid rgba(18, 35, 51, 0.05)",
                bgcolor: "#fff",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: "20px !important",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(16, 185, 129, 0.08)",
                    color: "#10B981",
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                  }}
                >
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.4)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    TOTAL STUDENTS
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: Colors.PRIMARY_DARK,
                    }}
                  >
                    {students?.length || 0}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tab section selection */}
        <Box
          sx={{ borderBottom: 1, borderColor: "rgba(18, 35, 51, 0.08)", mb: 3 }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
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
                mr: 4,
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
          <Grid container spacing={4}>
            {/* General Info Card */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  border: "1px solid rgba(18, 35, 51, 0.05)",
                  bgcolor: "#fff",
                  boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: Colors.PRIMARY_DARK,
                    mb: 3,
                  }}
                >
                  Contact & Address Details
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                    >
                      <LocationIcon
                        sx={{ color: "rgba(18, 35, 51, 0.4)", mt: 0.5 }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "rgba(18, 35, 51, 0.4)",
                            textTransform: "uppercase",
                            mb: 0.5,
                          }}
                        >
                          FULL ADDRESS
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          {fullAddress || "No address details available."}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          mb: 0.5,
                        }}
                      >
                        CITY
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {school.city || "--"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          mb: 0.5,
                        }}
                      >
                        STATE
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {school.state || "--"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          mb: 0.5,
                        }}
                      >
                        POSTAL ZIP CODE
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {school.zipCode || "--"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          mb: 0.5,
                        }}
                      >
                        AFFILIATION BOARD
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {school.boardId === 1
                          ? "CISCE Board"
                          : `Board ID: ${school.boardId}`}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Documents & Certificates Card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  border: "1px solid rgba(18, 35, 51, 0.05)",
                  bgcolor: "#fff",
                  boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: Colors.PRIMARY_DARK,
                    mb: 3,
                  }}
                >
                  Accreditation & Certificates
                </Typography>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    borderRadius: "16px",
                    bgcolor: "rgba(18, 35, 51, 0.02)",
                    border: "1px dashed rgba(18, 35, 51, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(0, 209, 193, 0.1)",
                      color: "#00D1C1",
                      width: 64,
                      height: 64,
                      mb: 2,
                    }}
                  >
                    <CertificateIcon sx={{ fontSize: 32 }} />
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 800,
                      color: Colors.PRIMARY_DARK,
                      mb: 0.5,
                    }}
                  >
                    Affiliation Certificate
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(18, 35, 51, 0.4)",
                      mb: 2,
                    }}
                  >
                    {school.affiliationNumber
                      ? `Affiliation No: ${school.affiliationNumber}`
                      : "Official affiliation document"}
                  </Typography>

                  {school.affiliationCertificateDownloadUrl ||
                  school.affiliationCertificate ? (
                    <Button
                      variant="contained"
                      component="a"
                      href={
                        school.affiliationCertificateDownloadUrl ||
                        school.affiliationCertificate ||
                        undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<DocIcon />}
                      sx={{
                        bgcolor: Colors.PRIMARY_DARK,
                        color: "#fff",
                        "&:hover": { bgcolor: "#1A2B3B" },
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "13px",
                        borderRadius: "10px",
                        px: 3,
                        py: 1,
                        boxShadow: "none",
                      }}
                    >
                      View Certificate
                    </Button>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "rgba(18, 35, 51, 0.4)",
                        fontWeight: 700,
                      }}
                    >
                      No certificate uploaded
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Teachers Tab */}
        {activeTab === 1 && (
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
            {teachers && teachers.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: "rgba(18, 35, 51, 0.04)" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        Designation / Subject
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map((teacher: any) => (
                      <TableRow
                        key={teacher.id}
                        sx={{
                          "&:hover": { bgcolor: "rgba(18, 35, 51, 0.01)" },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          #{teacher.id}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Avatar
                              src={teacher.avatar}
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "rgba(18, 35, 51, 0.05)",
                                color: Colors.PRIMARY_DARK,
                                fontWeight: 700,
                                fontSize: 13,
                              }}
                            >
                              {teacher.fullName?.charAt(0) ||
                                teacher.name?.charAt(0)}
                            </Avatar>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: Colors.PRIMARY_DARK,
                              }}
                            >
                              {teacher.fullName || teacher.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.6)",
                            fontWeight: 600,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <EmailIcon
                              sx={{
                                fontSize: 16,
                                color: "rgba(18, 35, 51, 0.3)",
                              }}
                            />
                            {teacher.email}
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          <Chip
                            label={
                              teacher.designation ||
                              teacher.subject ||
                              "Teacher"
                            }
                            size="small"
                            sx={{
                              bgcolor: "rgba(0, 209, 193, 0.06)",
                              color: "#00D1C1",
                              fontWeight: 800,
                              fontSize: "11px",
                              borderRadius: "6px",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 8,
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(18, 35, 51, 0.03)",
                    color: "rgba(18, 35, 51, 0.2)",
                    width: 72,
                    height: 72,
                    mb: 2,
                  }}
                >
                  <PeopleIcon sx={{ fontSize: 36 }} />
                </Avatar>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: Colors.PRIMARY_DARK,
                    mb: 0.5,
                  }}
                >
                  No Teachers Registered
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(18, 35, 51, 0.4)",
                  }}
                >
                  There are currently no teachers associated with this school.
                </Typography>
              </Box>
            )}
          </Paper>
        )}

        {/* Students Tab */}
        {activeTab === 2 && (
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
            {students && students.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: "rgba(18, 35, 51, 0.04)" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 800,
                          fontSize: "11px",
                          color: Colors.PRIMARY_DARK,
                          textTransform: "uppercase",
                        }}
                      >
                        Grade / Class
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student: any) => (
                      <TableRow
                        key={student.id}
                        sx={{
                          "&:hover": { bgcolor: "rgba(18, 35, 51, 0.01)" },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          #{student.id}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Avatar
                              src={student.avatar}
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "rgba(18, 35, 51, 0.05)",
                                color: Colors.PRIMARY_DARK,
                                fontWeight: 700,
                                fontSize: 13,
                              }}
                            >
                              {student.fullName?.charAt(0) ||
                                student.name?.charAt(0)}
                            </Avatar>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: Colors.PRIMARY_DARK,
                              }}
                            >
                              {student.fullName || student.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.6)",
                            fontWeight: 600,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <EmailIcon
                              sx={{
                                fontSize: 16,
                                color: "rgba(18, 35, 51, 0.3)",
                              }}
                            />
                            {student.email}
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          <Chip
                            label={student.grade || student.class || "Student"}
                            size="small"
                            sx={{
                              bgcolor: "rgba(16, 185, 129, 0.06)",
                              color: "#10B981",
                              fontWeight: 800,
                              fontSize: "11px",
                              borderRadius: "6px",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 8,
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(18, 35, 51, 0.03)",
                    color: "rgba(18, 35, 51, 0.2)",
                    width: 72,
                    height: 72,
                    mb: 2,
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 36 }} />
                </Avatar>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: Colors.PRIMARY_DARK,
                    mb: 0.5,
                  }}
                >
                  No Students Registered
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(18, 35, 51, 0.4)",
                  }}
                >
                  There are currently no students enrolled in this institution.
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

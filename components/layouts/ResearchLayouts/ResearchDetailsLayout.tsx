"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  Typography,
  Paper,
  Chip,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  MenuBookOutlined as ResearchIcon,
  InfoOutlined as InfoIcon,
  Business as SchoolIcon,
  Person as PersonIcon,
  Download as DownloadIcon,
  Language as WebIcon,
  Topic as TopicIcon,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { researchControllers } from "@/api/research";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase();
  if (
    s === "APPROVED" ||
    s === "ACTIVE" ||
    s === "PATENT_GRANTED" ||
    s === "PUBLISHED"
  ) {
    return { bg: "rgba(15, 157, 88, 0.08)", text: "#0F9D58" };
  }
  if (s === "REJECTED" || s === "INACTIVE" || s === "CLOSED") {
    return { bg: "rgba(219, 68, 85, 0.08)", text: "#DB4437" };
  }
  return { bg: "rgba(244, 180, 0, 0.08)", text: "#F4B400" };
};

const formatText = (text: string) => {
  if (!text) return "--";
  return text
    .replace(/_/g, " ")
    .replace(/"/g, "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

const formatStatus = (status: string) => {
  if (!status) return "--";
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

export const ResearchDetailsLayout = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [research, setResearch] = useState<any | null>(null);
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
        const res = await researchControllers.getResearchDetails(id);
        if (res?.data && res.data.success) {
          const payload = res.data.data;
          const data = payload.data || payload;
          setResearch(data);
        }
      } catch (error) {
        console.error("Failed to fetch research details:", error);
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

  if (!research) {
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
            Research details not found
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

  const statusStyle = getStatusColor(research?.status);

  const formattedDate = research.createdAt
    ? new Date(research.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "--";

  // Build school address safely
  const school = research.school;
  const schoolAddressParts = [
    school?.addressLine1 || school?.address,
    school?.city,
    school?.state,
    research.country?.name || school?.country?.name || "India",
  ].filter(Boolean);
  const schoolAddress = schoolAddressParts.join(", ") || "--";

  const creator = research.creator;

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
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: "24px",
                border: "1px solid rgba(18, 35, 51, 0.05)",
                boxShadow: "0 10px 40px rgba(18, 35, 51, 0.02)",
                bgcolor: "#fff",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  flexWrap: "wrap",
                  gap: 1.5,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "18px", sm: "24px" },
                      fontWeight: 800,
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "-0.5px",
                      mb: 1,
                    }}
                  >
                    {formatText(research.title)}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ alignItems: "center", flexWrap: "wrap" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "rgba(18, 35, 51, 0.4)",
                        fontWeight: 600,
                      }}
                    >
                      Submitted on: {formattedDate}
                    </Typography>

                    {research.topic && (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <TopicIcon
                          sx={{ fontSize: 16, color: "rgba(18, 35, 51, 0.4)" }}
                        />
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.6)",
                            fontWeight: 700,
                          }}
                        >
                          Topic: {research.topic}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Box>
                <Chip
                  label={formatStatus(research.status || "PENDING")}
                  sx={{
                    bgcolor: statusStyle.bg,
                    color: statusStyle.text,
                    fontWeight: 800,
                    fontSize: "12px",
                    px: 1,
                    py: 2,
                    borderRadius: "8px",
                  }}
                />
              </Stack>
            </Paper>
          </Grid>

          {/* Left Column - Details Description & Creator cards */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={4}>
              {/* Research Description Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  border: "1px solid rgba(18, 35, 51, 0.05)",
                  boxShadow: "0 10px 40px rgba(18, 35, 51, 0.02)",
                  bgcolor: "#fff",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mb: 2, alignItems: "center" }}
                >
                  <ResearchIcon sx={{ color: "#2196F3", fontSize: 24 }} />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: Colors.PRIMARY_DARK,
                    }}
                  >
                    Research Description
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "rgba(18, 35, 51, 0.7)",
                    fontWeight: 500,
                    lineHeight: 1.6,
                  }}
                >
                  {research.description || "No research description provided."}
                </Typography>
              </Paper>

              {/* Creator details card - "Submitted By" with Parent Information */}
              {creator && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "24px",
                    border: "1px solid rgba(18, 35, 51, 0.05)",
                    boxShadow: "0 10px 40px rgba(18, 35, 51, 0.02)",
                    bgcolor: "#fff",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ mb: 3, alignItems: "center" }}
                  >
                    <PersonIcon
                      sx={{ color: Colors.PRIMARY_DARK, fontSize: 24 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 800,
                        color: Colors.PRIMARY_DARK,
                      }}
                    >
                      Submitted By
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mb: 4, alignItems: "center" }}
                  >
                    {creator.profileImageDownloadUrl || creator.profileImage ? (
                      <Avatar
                        src={
                          creator.profileImageDownloadUrl ||
                          creator.profileImage
                        }
                        sx={{
                          width: 56,
                          height: 56,
                          border: "2px solid #fff",
                          boxShadow: "0 4px 10px rgba(18,35,51,0.08)",
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: "rgba(18,35,51,0.05)",
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                    )}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: 800,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {creator.fullName ||
                          `${creator.firstName || ""} ${creator.lastName || ""}`.trim() ||
                          "--"}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "rgba(18, 35, 51, 0.4)",
                          fontWeight: 600,
                        }}
                      >
                        {creator.email}
                      </Typography>
                    </Box>
                  </Stack>

                  <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 0.5,
                        }}
                      >
                        Role
                      </Typography>
                      <Chip
                        label={formatStatus(creator.role)}
                        size="small"
                        sx={{
                          bgcolor:
                            creator.role?.toUpperCase() === "STUDENT"
                              ? "rgba(33, 150, 243, 0.08)"
                              : "rgba(15, 157, 88, 0.08)",
                          color:
                            creator.role?.toUpperCase() === "STUDENT"
                              ? "#2196F3"
                              : "#0F9D58",
                          fontWeight: 700,
                          fontSize: "11px",
                          borderRadius: "6px",
                        }}
                      />
                    </Grid>

                    {creator.phone && (
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "rgba(18, 35, 51, 0.4)",
                            textTransform: "uppercase",
                            mb: 0.5,
                          }}
                        >
                          Phone
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          {creator.countryCode || ""} {creator.phone}
                        </Typography>
                      </Grid>
                    )}

                    {creator.gender && (
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "rgba(18, 35, 51, 0.4)",
                            textTransform: "uppercase",
                            mb: 0.5,
                          }}
                        >
                          Gender
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          {formatStatus(creator.gender)}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>

                  {/* Parent Details inside Creator Card */}
                  {(creator.fatherName || creator.motherName) && (
                    <>
                      <Divider
                        sx={{ my: 3, borderColor: "rgba(18,35,51,0.06)" }}
                      />

                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 800,
                          color: Colors.PRIMARY_DARK,
                          mb: 2.5,
                        }}
                      >
                        Parent / Guardian Information
                      </Typography>

                      <Grid container spacing={4}>
                        {/* Father Info */}
                        {creator.fatherName && (
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 800,
                                color: Colors.PRIMARY_DARK,
                                mb: 1.5,
                                borderBottom: "1px solid rgba(18,35,51,0.06)",
                                pb: 0.5,
                              }}
                            >
                              Father's Details
                            </Typography>
                            <Stack spacing={1.5}>
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    color: "rgba(18, 35, 51, 0.4)",
                                    textTransform: "uppercase",
                                    mb: 0.2,
                                  }}
                                >
                                  Name
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: Colors.PRIMARY_DARK,
                                  }}
                                >
                                  {creator.fatherName}
                                </Typography>
                              </Box>
                              {creator.fatherEmail && (
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      color: "rgba(18, 35, 51, 0.4)",
                                      textTransform: "uppercase",
                                      mb: 0.2,
                                    }}
                                  >
                                    Email
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 600,
                                      color: Colors.PRIMARY_DARK,
                                    }}
                                  >
                                    {creator.fatherEmail}
                                  </Typography>
                                </Box>
                              )}
                              {creator.fatherPhone && (
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      color: "rgba(18, 35, 51, 0.4)",
                                      textTransform: "uppercase",
                                      mb: 0.2,
                                    }}
                                  >
                                    Phone
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 600,
                                      color: Colors.PRIMARY_DARK,
                                    }}
                                  >
                                    {creator.fatherPhone}
                                  </Typography>
                                </Box>
                              )}
                              {creator.fatherProfession && (
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      color: "rgba(18, 35, 51, 0.4)",
                                      textTransform: "uppercase",
                                      mb: 0.2,
                                    }}
                                  >
                                    Profession
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 600,
                                      color: Colors.PRIMARY_DARK,
                                    }}
                                  >
                                    {creator.fatherProfession}
                                  </Typography>
                                </Box>
                              )}
                            </Stack>
                          </Grid>
                        )}

                        {/* Mother Info */}
                        {creator.motherName && (
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography
                              sx={{
                                fontSize: "12px",
                                fontWeight: 800,
                                color: Colors.PRIMARY_DARK,
                                mb: 1.5,
                                borderBottom: "1px solid rgba(18,35,51,0.06)",
                                pb: 0.5,
                              }}
                            >
                              Mother's Details
                            </Typography>
                            <Stack spacing={1.5}>
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    color: "rgba(18, 35, 51, 0.4)",
                                    textTransform: "uppercase",
                                    mb: 0.2,
                                  }}
                                >
                                  Name
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: Colors.PRIMARY_DARK,
                                  }}
                                >
                                  {creator.motherName}
                                </Typography>
                              </Box>
                              {creator.motherEmail && (
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      color: "rgba(18, 35, 51, 0.4)",
                                      textTransform: "uppercase",
                                      mb: 0.2,
                                    }}
                                  >
                                    Email
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 600,
                                      color: Colors.PRIMARY_DARK,
                                    }}
                                  >
                                    {creator.motherEmail}
                                  </Typography>
                                </Box>
                              )}
                              {creator.motherPhone && (
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      color: "rgba(18, 35, 51, 0.4)",
                                      textTransform: "uppercase",
                                      mb: 0.2,
                                    }}
                                  >
                                    Phone
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 600,
                                      color: Colors.PRIMARY_DARK,
                                    }}
                                  >
                                    {creator.motherPhone}
                                  </Typography>
                                </Box>
                              )}
                              {creator.motherProfession && (
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      color: "rgba(18, 35, 51, 0.4)",
                                      textTransform: "uppercase",
                                      mb: 0.2,
                                    }}
                                  >
                                    Profession
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 600,
                                      color: Colors.PRIMARY_DARK,
                                    }}
                                  >
                                    {creator.motherProfession}
                                  </Typography>
                                </Box>
                              )}
                            </Stack>
                          </Grid>
                        )}
                      </Grid>
                    </>
                  )}
                </Paper>
              )}
            </Stack>
          </Grid>

          {/* Right Column - Sidebar School & Metadata details */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={4}>
              {/* School Information Card */}
              {school && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "24px",
                    border: "1px solid rgba(18, 35, 51, 0.05)",
                    boxShadow: "0 10px 40px rgba(18, 35, 51, 0.02)",
                    bgcolor: "#fff",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ mb: 3, alignItems: "center" }}
                  >
                    <SchoolIcon sx={{ color: "#2196F3", fontSize: 24 }} />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 800,
                        color: Colors.PRIMARY_DARK,
                      }}
                    >
                      School Information
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2.5,
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    {school.schoolLogoDownloadUrl || school.logo ? (
                      <Avatar
                        src={school.schoolLogoDownloadUrl || school.logo}
                        variant="rounded"
                        sx={{
                          width: 64,
                          height: 64,
                          border: "1px solid rgba(18,35,51,0.08)",
                          bgcolor: "#fafafa",
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 64,
                          height: 64,
                          bgcolor: "rgba(33, 150, 243, 0.1)",
                          color: "#2196F3",
                          flexShrink: 0,
                        }}
                      >
                        <SchoolIcon sx={{ fontSize: 32 }} />
                      </Avatar>
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: 800,
                          color: Colors.PRIMARY_DARK,
                          lineHeight: 1.3,
                          mb: 0.5,
                        }}
                      >
                        {school.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "rgba(18, 35, 51, 0.5)",
                          fontWeight: 600,
                          wordBreak: "break-word",
                        }}
                      >
                        Code: {school.code || "--"} | Affiliation:{" "}
                        {school.affiliationNumber || "--"}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: "rgba(18,35,51,0.06)" }} />

                  <Stack spacing={2}>
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
                        School Address
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {schoolAddress}
                      </Typography>
                    </Box>

                    {school.board?.name && (
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
                          Board Association
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          {school.board.name}
                        </Typography>
                      </Box>
                    )}

                    {(research.country?.name || school.country?.name) && (
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
                          Country
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          {research.country?.name || school.country?.name}
                        </Typography>
                      </Box>
                    )}

                    {school.website && (
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
                          Website
                        </Typography>
                        <Button
                          href={school.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<WebIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            textTransform: "none",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#2196F3",
                            p: 0,
                            minWidth: 0,
                            "&:hover": {
                              bgcolor: "transparent",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Visit Website
                        </Button>
                      </Box>
                    )}
                  </Stack>
                </Paper>
              )}

              {/* Metadata Details & Templates */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  border: "1px solid rgba(18, 35, 51, 0.05)",
                  boxShadow: "0 10px 40px rgba(18, 35, 51, 0.02)",
                  bgcolor: "#fff",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mb: 3, alignItems: "center" }}
                >
                  <InfoIcon sx={{ color: Colors.PRIMARY_DARK, fontSize: 24 }} />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: Colors.PRIMARY_DARK,
                    }}
                  >
                    Submissions Details
                  </Typography>
                </Stack>

                <Stack spacing={2.5}>
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
                      Team Association
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: Colors.PRIMARY_DARK,
                      }}
                    >
                      {research.team?.title ||
                        research.team?.name ||
                        (research.teamId
                          ? `Team #${research.teamId}`
                          : "No Team Assigned")}
                    </Typography>
                    {research.team?.teamCode && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "rgba(18, 35, 51, 0.5)",
                          mt: 0.5,
                        }}
                      >
                        Code: {research.team.teamCode}
                      </Typography>
                    )}
                  </Box>

                  {research.attorneyTemplateDownloadUrl && (
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 1,
                        }}
                      >
                        Template Attachments
                      </Typography>
                      <Button
                        href={research.attorneyTemplateDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        sx={{
                          textTransform: "none",
                          fontSize: "12px",
                          fontWeight: 700,
                          bgcolor: Colors.PRIMARY_DARK,
                          color: "#fff",
                          borderRadius: "10px",
                          py: 1,
                          width: "100%",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "rgba(18,35,51,0.9)",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Attorney Template
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

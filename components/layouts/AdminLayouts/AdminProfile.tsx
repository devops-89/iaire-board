"use client";
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  Divider,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  Edit as EditIcon,
  VerifiedUser as ShieldIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  CorporateFare as BoardIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Groups as GroupIcon,
  ConfirmationNumber as CodeIcon,
  CheckCircle as VerifiedCheckIcon,
  Description as DescriptionIcon,
  Public as WorldIcon,
  Tag as TagIcon,
  LocationCity as CityIcon,
} from "@mui/icons-material";
import { useAuth } from "@/hooks/auth/useAuth";
import { schoolControllers } from "@/api/school";
import { EditAdminProfileModal } from "./EditAdminProfileModal";

const formatLastLogin = (dateString: string) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatRoleName = (role: string) => {
  if (!role) return "Administrator";
  return role
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getInitials = (name: string) => {
  if (!name) return "AD";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getStringVal = (val: any, fallback: string = "--"): string => {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object") {
    return val.name || val.title || val.label || val.code || fallback;
  }
  return fallback;
};

export const AdminProfile = () => {
  const { user, fetchUserDetails } = useAuth();
  const [liveStats, setLiveStats] = React.useState<any>(null);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"profile" | "board">(
    "profile",
  );
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");

  const handleOpenModal = (mode: "profile" | "board") => {
    setModalMode(mode);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = async () => {
    if (fetchUserDetails) {
      await fetchUserDetails();
    }
    setToastMsg(
      modalMode === "profile"
        ? "Personal profile updated successfully!"
        : "Board details updated successfully!",
    );
    setToastOpen(true);
  };

  React.useEffect(() => {
    const initProfileData = async () => {
      setPageLoading(true);
      try {
        if (fetchUserDetails) {
          await fetchUserDetails();
        }
        const res = await schoolControllers.getSchoolStats();
        if (res?.data?.success && res?.data?.data?.data) {
          setLiveStats(res.data.data.data);
        } else if (res?.data?.data) {
          setLiveStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load admin profile data", error);
      } finally {
        setPageLoading(false);
      }
    };
    initProfileData();
  }, []);

  const userName = user?.name || user?.fullName || "--";
  const userEmail = user?.email || "--";
  const userPhone = user?.phone || "--";
  const userRole = user?.role || "BOARD_ADMIN";
  const userBio = getStringVal(user?.bio, "");
  const userAvatar =
    user?.profileImageDownloadUrl ||
    user?.profile_image_download_url ||
    user?.profileImageDownloadPath ||
    user?.profile_image_download_path ||
    user?.avatar ||
    (typeof user?.profileImage === "string" ? user?.profileImage : "") ||
    "";

  // Board details strictly extracted from API
  const boardName = getStringVal(
    user?.board?.name ||
      user?.boardName ||
      (typeof user?.board === "string" ? user?.board : null),
    "--",
  );

  const boardCode = getStringVal(
    user?.board?.code || user?.boardCode || user?.board?.membershipCode,
    "--",
  );

  const boardLogo =
    user?.boardLogoDownloadUrl ||
    user?.board?.boardLogoDownloadUrl ||
    user?.board?.logoDownloadUrl ||
    user?.board?.logo_download_url ||
    user?.board?.logoDownloadPath ||
    user?.board?.logo_download_path ||
    user?.board_logo_download_url ||
    user?.logoDownloadUrl ||
    user?.logo_download_url ||
    user?.board?.logo ||
    user?.logo ||
    "";

  const countryObj = user?.board?.country || user?.country;
  const boardCountry = getStringVal(countryObj?.name || countryObj, "--");

  const boardDescription = getStringVal(
    user?.board?.description || user?.boardDescription || user?.description,
    "",
  );

  const boardAuthorities =
    user?.boardAuthorities ||
    user?.board?.boardAuthorities ||
    user?.authorities ||
    user?.board?.authorities ||
    [];

  const totalSchools =
    liveStats?.totalSchools !== undefined
      ? `${liveStats.totalSchools} Schools`
      : "--";

  const totalTeachers =
    liveStats?.totalTeachers !== undefined
      ? `${liveStats.totalTeachers} Teachers`
      : "--";

  if (pageLoading && !user?.email && !user?.boardName && !user?.board) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#00D1C1" }} />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "rgba(18, 35, 51, 0.5)",
          }}
        >
          Loading profile details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
    >
      {/* Admin User Profile Card */}
      <Paper
        sx={{
          p: 4,
          borderRadius: "32px",
          bgcolor: "#fff",
          boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Avatar
              src={userAvatar}
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#00D1C1",
                fontSize: "32px",
                fontWeight: 700,
                boxShadow: "0 8px 24px rgba(0, 209, 193, 0.2)",
              }}
            >
              {getInitials(userName)}
            </Avatar>
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Typography
                  sx={{ fontSize: "24px", fontWeight: 800, color: "#122333" }}
                >
                  {userName}
                </Typography>
                <ShieldIcon sx={{ color: "#00D1C1", fontSize: "20px" }} />
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "rgba(18, 35, 51, 0.5)",
                  fontWeight: 600,
                }}
              >
                {formatRoleName(userRole)} • Full Access
              </Typography>
              {userBio && (
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "rgba(18, 35, 51, 0.6)",
                    fontWeight: 500,
                    mt: 0.5,
                    maxWidth: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {userBio}
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            variant="outlined"
            onClick={() => handleOpenModal("profile")}
            startIcon={<EditIcon />}
            sx={{
              borderRadius: "16px",
              textTransform: "none",
              fontWeight: 700,
              color: "#122333",
              borderColor: "rgba(0,0,0,0.1)",
              px: 3,
              py: 1,
            }}
          >
            Edit Profile
          </Button>
        </Box>

        <Divider sx={{ mb: 4, opacity: 0.6 }} />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  p: 1.2,
                  bgcolor: "#f8f9fa",
                  borderRadius: "14px",
                  color: "rgba(18, 35, 51, 0.4)",
                }}
              >
                <MailIcon />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgba(18, 35, 51, 0.4)",
                    fontWeight: 700,
                  }}
                >
                  EMAIL ADDRESS
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {userEmail}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  p: 1.2,
                  bgcolor: "#f8f9fa",
                  borderRadius: "14px",
                  color: "rgba(18, 35, 51, 0.4)",
                }}
              >
                <PhoneIcon />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgba(18, 35, 51, 0.4)",
                    fontWeight: 700,
                  }}
                >
                  PHONE NUMBER
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {userPhone}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Board Details Card */}
      <Paper
        sx={{
          p: 4,
          borderRadius: "32px",
          bgcolor: "#fff",
          boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                p: 1.2,
                borderRadius: "14px",
                bgcolor: "rgba(0, 209, 193, 0.1)",
                color: "#00D1C1",
                display: "flex",
              }}
            >
              <BoardIcon />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "18px", fontWeight: 800, color: "#122333" }}
              >
                Board Details
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            onClick={() => handleOpenModal("board")}
            startIcon={<EditIcon />}
            sx={{
              borderRadius: "16px",
              textTransform: "none",
              fontWeight: 700,
              color: "#122333",
              borderColor: "rgba(0,0,0,0.1)",
              px: 3,
              py: 1,
            }}
          >
            Edit Board Details
          </Button>
        </Box>

        <Divider sx={{ mb: 3.5, opacity: 0.6 }} />

        <Grid container spacing={3}>
          {/* Board Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: "22px",
                bgcolor: "rgba(18, 35, 51, 0.015)",
                border: "1px solid rgba(18, 35, 51, 0.04)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 0.8,
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  color: "#122333",
                  border: "1px solid rgba(18, 35, 51, 0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 48,
                  minHeight: 48,
                  overflow: "hidden",
                }}
              >
                {boardLogo ? (
                  <Box
                    component="img"
                    src={boardLogo}
                    alt="Board Logo"
                    referrerPolicy="no-referrer"
                    sx={{
                      maxHeight: 32,
                      maxWidth: 64,
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <BoardIcon fontSize="small" />
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(18, 35, 51, 0.4)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: 0.5,
                  }}
                >
                  Board Name
                </Typography>
                <Typography
                  sx={{ fontSize: "15px", fontWeight: 700, color: "#122333" }}
                >
                  {boardName}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Board Code */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: "22px",
                bgcolor: "rgba(18, 35, 51, 0.015)",
                border: "1px solid rgba(18, 35, 51, 0.04)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  color: "#122333",
                  border: "1px solid rgba(18, 35, 51, 0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 48,
                  minHeight: 48,
                }}
              >
                <CodeIcon fontSize="small" />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(18, 35, 51, 0.4)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: 0.5,
                  }}
                >
                  Board Code
                </Typography>
                <Typography
                  sx={{ fontSize: "15px", fontWeight: 700, color: "#122333" }}
                >
                  {boardCode}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Country */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: "22px",
                bgcolor: "rgba(18, 35, 51, 0.015)",
                border: "1px solid rgba(18, 35, 51, 0.04)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  color: "#122333",
                  border: "1px solid rgba(18, 35, 51, 0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 48,
                  minHeight: 48,
                }}
              >
                <WorldIcon fontSize="small" />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(18, 35, 51, 0.4)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    mb: 0.5,
                  }}
                >
                  Country
                </Typography>
                <Typography
                  sx={{ fontSize: "15px", fontWeight: 700, color: "#122333" }}
                >
                  {boardCountry}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Board Description (if present in API) */}
          {boardDescription && (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "22px",
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  border: "1px solid rgba(18, 35, 51, 0.04)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "16px",
                    bgcolor: "#fff",
                    color: "#122333",
                    border: "1px solid rgba(18, 35, 51, 0.08)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 48,
                    minHeight: 48,
                  }}
                >
                  <DescriptionIcon fontSize="small" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "rgba(18, 35, 51, 0.4)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      mb: 0.5,
                    }}
                  >
                    Board Description
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#122333",
                      lineHeight: 1.6,
                    }}
                  >
                    {boardDescription}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Board Authorities Card */}
      {boardAuthorities && boardAuthorities.length > 0 && (
        <Paper
          sx={{
            p: 4,
            borderRadius: "32px",
            bgcolor: "#fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: "14px",
                  bgcolor: "rgba(0, 209, 193, 0.1)",
                  color: "#00D1C1",
                  display: "flex",
                }}
              >
                <GroupIcon />
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 800, color: "#122333" }}
                >
                  Board Authorities
                </Typography>
              </Box>
            </Box>
            <Chip
              label={`${boardAuthorities.length} Authority ${
                boardAuthorities.length === 1 ? "Member" : "Members"
              }`}
              size="small"
              sx={{
                bgcolor: "rgba(0, 209, 193, 0.1)",
                color: "#00D1C1",
                fontWeight: 700,
                borderRadius: "10px",
                fontSize: "12px",
              }}
            />
          </Box>

          <Divider sx={{ mb: 3.5, opacity: 0.6 }} />

          <Grid container spacing={3}>
            {boardAuthorities.map((auth: any, index: number) => {
              const authName =
                auth.fullName || auth.name || auth.AuthorityFullName || "--";
              const authRole = formatRoleName(
                auth.role || auth.AuthorityRole || "Authority Member",
              );
              const authEmail = auth.email || auth.AuthorityEmail || "--";
              const rawPhone = auth.phone || auth.AuthorityPhone || "";
              const cCode = auth.countryCode || auth.AuthorityCountryCode || "";
              const authPhone = rawPhone ? `${cCode} ${rawPhone}`.trim() : "--";
              const authIsdCode = auth.isdCode || auth.AuthorityIsdCode || "--";
              const authBoardId = auth.boardId ? `#${auth.boardId}` : "--";

              return (
                <Grid size={{ xs: 12, md: 6 }} key={auth.id || index}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "24px",
                      bgcolor: "rgba(18, 35, 51, 0.015)",
                      border: "1px solid rgba(18, 35, 51, 0.04)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      height: "100%",
                    }}
                  >
                    {/* Member Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: "#122333",
                            color: "#00D1C1",
                            fontWeight: 700,
                            fontSize: "16px",
                            boxShadow: "0 4px 12px rgba(18, 35, 51, 0.1)",
                          }}
                        >
                          {getInitials(authName)}
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                              color: "#122333",
                            }}
                          >
                            {authName}
                          </Typography>
                          <Chip
                            label={authRole}
                            size="small"
                            sx={{
                              mt: 0.5,
                              bgcolor: "#00D1C1",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "10px",
                              height: "20px",
                              borderRadius: "6px",
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ opacity: 0.4 }} />

                    {/* Member Contact & Details Grid */}
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              p: 0.8,
                              borderRadius: "10px",
                              bgcolor: "#fff",
                              color: "rgba(18, 35, 51, 0.5)",
                              display: "flex",
                              border: "1px solid rgba(18, 35, 51, 0.08)",
                            }}
                          >
                            <MailIcon sx={{ fontSize: 16 }} />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 700,
                                color: "rgba(18, 35, 51, 0.4)",
                                textTransform: "uppercase",
                              }}
                            >
                              Email
                            </Typography>
                            <Typography
                              noWrap
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#122333",
                              }}
                            >
                              {authEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              p: 0.8,
                              borderRadius: "10px",
                              bgcolor: "#fff",
                              color: "rgba(18, 35, 51, 0.5)",
                              display: "flex",
                              border: "1px solid rgba(18, 35, 51, 0.08)",
                            }}
                          >
                            <PhoneIcon sx={{ fontSize: 16 }} />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 700,
                                color: "rgba(18, 35, 51, 0.4)",
                                textTransform: "uppercase",
                              }}
                            >
                              Phone
                            </Typography>
                            <Typography
                              noWrap
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#122333",
                              }}
                            >
                              {authPhone}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              p: 0.8,
                              borderRadius: "10px",
                              bgcolor: "#fff",
                              color: "rgba(18, 35, 51, 0.5)",
                              display: "flex",
                              border: "1px solid rgba(18, 35, 51, 0.08)",
                            }}
                          >
                            <CityIcon sx={{ fontSize: 16 }} />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 700,
                                color: "rgba(18, 35, 51, 0.4)",
                                textTransform: "uppercase",
                              }}
                            >
                              ISD Code
                            </Typography>
                            <Typography
                              noWrap
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#122333",
                              }}
                            >
                              {authIsdCode}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              p: 0.8,
                              borderRadius: "10px",
                              bgcolor: "#fff",
                              color: "rgba(18, 35, 51, 0.5)",
                              display: "flex",
                              border: "1px solid rgba(18, 35, 51, 0.08)",
                            }}
                          >
                            <TagIcon sx={{ fontSize: 16 }} />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 700,
                                color: "rgba(18, 35, 51, 0.4)",
                                textTransform: "uppercase",
                              }}
                            >
                              Board ID
                            </Typography>
                            <Typography
                              noWrap
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#122333",
                              }}
                            >
                              {authBoardId}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      )}

      {/* Edit Profile & Board Modal */}
      <EditAdminProfileModal
        open={isEditModalOpen}
        mode={modalMode}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSuccess={handleEditSuccess}
      />

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{ width: "100%", borderRadius: "12px", fontWeight: 600 }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

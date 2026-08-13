"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  Paper,
  Fade,
  Select,
  MenuItem,
  InputAdornment,
  Divider,
  InputBase,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Person as PersonIcon,
  CorporateFare as BoardIcon,
  PhotoCamera as CameraIcon,
  CheckCircle as SuccessIcon,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";
import { authControllers } from "@/api/auth";
import { Colors } from "@/utils/enum";
import { Poppins } from "@/utils/font";

interface EditAdminProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
  onSuccess: () => void;
  mode: "profile" | "board";
}

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+65", flag: "🇸🇬" },
  { code: "+49", flag: "🇩🇪" },
];

const customFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "18px",
    bgcolor: "#FAFAFA",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "rgba(18, 35, 51, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: Colors.PRIMARY,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.PRIMARY,
      borderWidth: "2px",
    },
    "&.Mui-focused": {
      bgcolor: "#FFFFFF",
      boxShadow: "0 4px 16px rgba(0, 209, 193, 0.08)",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: 500,
    color: "rgba(18, 35, 51, 0.6)",
    "&.Mui-focused": {
      color: Colors.PRIMARY,
      fontWeight: 700,
    },
  },
};

export const EditAdminProfileModal = ({
  open,
  onClose,
  user,
  onSuccess,
  mode,
}: EditAdminProfileModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [bio, setBio] = useState("");
  const [boardName, setBoardName] = useState("");
  const [boardCode, setBoardCode] = useState("");

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [isProfileImageRemoved, setIsProfileImageRemoved] = useState(false);

  const [boardLogoFile, setBoardLogoFile] = useState<File | null>(null);
  const [boardLogoPreview, setBoardLogoPreview] = useState<string>("");
  const [isBoardLogoRemoved, setIsBoardLogoRemoved] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user && open) {
      const nameParts = (user.fullName || user.name || "").split(" ");
      setFirstName(user.firstName || nameParts[0] || "");
      setLastName(user.lastName || nameParts.slice(1).join(" ") || "");
      setEmail(user.email || "");

      const userPhoneStr = String(user.phone || user.phoneNumber || "").trim();
      let extractedCode = "+91";
      let rawPhone = userPhoneStr;

      if (userPhoneStr) {
        const sortedCodes = [...COUNTRY_CODES].sort(
          (a, b) => b.code.length - a.code.length,
        );
        const matchedObj = sortedCodes.find((c) =>
          userPhoneStr.startsWith(c.code),
        );

        if (matchedObj) {
          extractedCode = matchedObj.code;
          rawPhone = userPhoneStr.slice(matchedObj.code.length).trim();
        } else {
          const directCode = user.countryCode || user.phoneCode;
          const isValidDirect = COUNTRY_CODES.some(
            (c) => c.code === directCode,
          );
          if (isValidDirect) {
            extractedCode = directCode;
          }
          rawPhone = userPhoneStr.replace(/^\+\d+/, "").replace(/\D/g, "");
        }
      }

      const isValidCode = COUNTRY_CODES.some((c) => c.code === extractedCode);
      setCountryCode(isValidCode ? extractedCode : "+91");
      setPhone(rawPhone.slice(0, 10));
      setBio(user.bio || "");

      const bName =
        user.board?.name ||
        user.boardName ||
        (typeof user.board === "string" ? user.board : "");
      setBoardName(bName);

      const bCode =
        user.board?.code || user.boardCode || user.board?.membershipCode || "";
      setBoardCode(bCode);

      const pAvatar =
        user?.profileImageDownloadUrl ||
        user?.profile_image_download_url ||
        user?.profileImageDownloadPath ||
        user?.profile_image_download_path ||
        user?.avatar ||
        (typeof user?.profileImage === "string" ? user?.profileImage : "") ||
        "";
      setProfileImagePreview(pAvatar);

      const bLogo =
        user?.boardLogoDownloadUrl ||
        user?.board?.boardLogoDownloadUrl ||
        user?.board?.logoDownloadUrl ||
        user?.board?.logo_download_url ||
        user?.board?.logoDownloadPath ||
        user?.board?.logo_download_path ||
        user?.board_logo_download_url ||
        user?.logoDownloadUrl ||
        user?.logo_download_url ||
        (typeof user?.board?.logo === "string" ? user?.board?.logo : "") ||
        (typeof user?.logo === "string" ? user?.logo : "") ||
        "";
      setBoardLogoPreview(bLogo);

      setProfileImageFile(null);
      setBoardLogoFile(null);
      setIsProfileImageRemoved(false);
      setIsBoardLogoRemoved(false);
      setErrorMsg("");
    }
  }, [user, open]);

  const ALLOWED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/avif",
    "image/svg+xml",
  ];
  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

  const isAllowedImageType = (file: File) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.type)) return true;
    const ext = file.name.split(".").pop()?.toLowerCase();
    return ["png", "jpg", "jpeg", "webp", "avif", "svg"].includes(ext || "");
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!isAllowedImageType(file)) {
        setErrorMsg(
          "Invalid image format! Please upload PNG, JPG, WEBP, or SVG.",
        );
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMsg(
          "File size exceeds 5MB limit! Please upload a smaller image.",
        );
        return;
      }
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
      setIsProfileImageRemoved(false);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview("");
    setIsProfileImageRemoved(true);
    setErrorMsg("");
  };

  const handleBoardLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!isAllowedImageType(file)) {
        setErrorMsg(
          "Invalid image format! Please upload PNG, JPG, WEBP, or SVG.",
        );
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMsg(
          "File size exceeds 5MB limit! Please upload a smaller logo.",
        );
        return;
      }
      setBoardLogoFile(file);
      setBoardLogoPreview(URL.createObjectURL(file));
      setIsBoardLogoRemoved(false);
    }
  };

  const handleRemoveBoardLogo = () => {
    setBoardLogoFile(null);
    setBoardLogoPreview("");
    setIsBoardLogoRemoved(true);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const userId = user?.id || user?._id || user?.sub;
      if (!userId) {
        throw new Error("User ID not found");
      }

      const formData = new FormData();

      if (mode === "profile") {
        if (email) formData.append("email", email);
        if (firstName) formData.append("firstName", firstName);
        if (lastName) formData.append("lastName", lastName);
        if (phone) {
          const digitsOnly = phone.replace(/\D/g, "");
          formData.append("phone", digitsOnly);
          formData.append("countryCode", countryCode);
        }
        if (bio) formData.append("bio", bio);
        if (profileImageFile) {
          formData.append("profileImage", profileImageFile);
        } else if (isProfileImageRemoved) {
          formData.append("profileImage", "null");
        }
      } else {
        if (boardName) formData.append("boardName", boardName);
        if (boardCode) formData.append("boardCode", boardCode);
        if (boardLogoFile) {
          formData.append("boardLogo", boardLogoFile);
        } else if (isBoardLogoRemoved) {
          formData.append("boardLogo", "null");
        }
      }

      const response = await authControllers.updateUserDetails(
        userId,
        formData,
      );

      if (response?.data?.success || response?.status === 200) {
        onSuccess();
        onClose();
      } else {
        setErrorMsg(response?.data?.message || "Failed to update details");
      }
    } catch (err: any) {
      console.error("Error updating details:", err);
      setErrorMsg(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred while updating",
      );
    } finally {
      setLoading(false);
    }
  };

  const isProfileMode = mode === "profile";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(8px)",
            bgcolor: "rgba(18, 35, 51, 0.4)",
          },
        },
        paper: {
          sx: {
            borderRadius: { xs: "20px !important", sm: "32px !important" },
            m: { xs: 1.5, sm: 2 },
            maxHeight: { xs: "calc(100% - 32px)", sm: "calc(100% - 64px)" },
            p: 0.5,
            fontFamily: Poppins.style.fontFamily,
            boxShadow: "0 24px 48px rgba(18, 35, 51, 0.15)",
            overflow: "hidden",
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          p: 3,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "16px",
              bgcolor: "rgba(0, 209, 193, 0.12)",
              color: Colors.PRIMARY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0, 209, 193, 0.15)",
            }}
          >
            {isProfileMode ? (
              <PersonIcon sx={{ fontSize: 26 }} />
            ) : (
              <BoardIcon sx={{ fontSize: 26 }} />
            )}
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#122333",
                lineHeight: 1.2,
                letterSpacing: "-0.3px",
              }}
            >
              {isProfileMode
                ? "Edit Admin Personal Profile"
                : "Edit Board Details"}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "rgba(18, 35, 51, 0.5)",
                fontWeight: 500,
                mt: 0.3,
              }}
            >
              {isProfileMode
                ? "Update your personal details and avatar"
                : "Update official board name, code, and logo"}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            bgcolor: "rgba(18, 35, 51, 0.04)",
            color: "rgba(18, 35, 51, 0.6)",
            "&:hover": {
              bgcolor: "rgba(18, 35, 51, 0.08)",
              color: "#122333",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{ p: 3, pt: 1, maxHeight: "65vh", overflowY: "auto" }}
        >
          {errorMsg && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                borderRadius: "14px",
                bgcolor: "#FEF2F2",
                border: "1px solid #FCA5A5",
                color: "#991B1B",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {errorMsg}
            </Box>
          )}

          {/* MODE: Profile */}
          {isProfileMode ? (
            <Fade in={isProfileMode} timeout={300}>
              <Grid container spacing={2.5}>
                {/* Avatar Card */}
                <Grid size={{ xs: 12 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: "24px",
                      bgcolor: "rgba(18, 35, 51, 0.015)",
                      border: "1px solid rgba(18, 35, 51, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        src={profileImagePreview}
                        slotProps={{ img: { referrerPolicy: "no-referrer" } }}
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: Colors.PRIMARY,
                          fontSize: "28px",
                          fontWeight: 700,
                          boxShadow: "0 8px 20px rgba(0, 209, 193, 0.25)",
                          border: "3px solid #FFFFFF",
                        }}
                      >
                        {(firstName?.charAt(0) || "U") +
                          (lastName?.charAt(0) || "")}
                      </Avatar>
                      <IconButton
                        component="label"
                        sx={{
                          position: "absolute",
                          bottom: -2,
                          right: -2,
                          bgcolor: Colors.PRIMARY_DARK,
                          color: "#FFF",
                          width: 28,
                          height: 28,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          "&:hover": { bgcolor: Colors.PRIMARY },
                        }}
                      >
                        <CameraIcon sx={{ fontSize: 16 }} />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleProfileImageChange}
                        />
                      </IconButton>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#122333",
                        }}
                      >
                        Profile Picture
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "rgba(18, 35, 51, 0.5)",
                          mt: 0.3,
                          mb: 1.5,
                        }}
                      >
                        PNG, JPG, WEBP formats up to 5MB
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.2,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<UploadIcon />}
                          size="small"
                          sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "12px",
                            borderColor: "rgba(18, 35, 51, 0.15)",
                            color: "#122333",
                            px: 2,
                          }}
                        >
                          Choose New Photo
                          <input
                            type="file"
                            hidden
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            onChange={handleProfileImageChange}
                          />
                        </Button>
                        {(profileImagePreview || profileImageFile) && (
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={handleRemoveProfileImage}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: 700,
                              fontSize: "12px",
                              borderColor: "#FCA5A5",
                              color: "#DC2626",
                              px: 1.5,
                              "&:hover": {
                                bgcolor: "#FEF2F2",
                                borderColor: "#EF4444",
                              },
                            }}
                          >
                            Remove Photo
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                    sx={customFieldSx}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    sx={customFieldSx}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    type="email"
                    sx={customFieldSx}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setPhone(digits);
                    }}
                    variant="outlined"
                    placeholder="9875676488"
                    sx={customFieldSx}
                    slotProps={{
                      htmlInput: {
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              variant="standard"
                              disableUnderline
                              MenuProps={{
                                slotProps: {
                                  paper: {
                                    sx: {
                                      maxHeight: 280,
                                      borderRadius: "16px",
                                      boxShadow:
                                        "0 10px 30px rgba(18, 35, 51, 0.15)",
                                      p: 0.5,
                                    },
                                  },
                                },
                              }}
                              sx={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: Colors.PRIMARY_DARK,
                                "& .MuiSelect-select": {
                                  py: 0,
                                  pr: "20px !important",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                },
                              }}
                            >
                              {!COUNTRY_CODES.some(
                                (c) => c.code === countryCode,
                              ) && (
                                <MenuItem key={countryCode} value={countryCode}>
                                  <span>🌐</span>
                                  <span>{countryCode}</span>
                                </MenuItem>
                              )}
                              {COUNTRY_CODES.map((c) => (
                                <MenuItem
                                  key={c.code}
                                  value={c.code}
                                  sx={{
                                    borderRadius: "8px",
                                    fontSize: "13.5px",
                                    fontWeight: 600,
                                    my: 0.2,
                                    display: "flex",
                                    gap: 1.2,
                                  }}
                                >
                                  <span>{c.flag}</span>
                                  <span>{c.code}</span>
                                </MenuItem>
                              ))}
                            </Select>
                            <Divider
                              sx={{ height: 24, ml: 1, mr: 0.5, opacity: 0.5 }}
                              orientation="vertical"
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Bio / About"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={2}
                    placeholder="Board Admin focused on clarity and collaboration."
                    sx={customFieldSx}
                  />
                </Grid>
              </Grid>
            </Fade>
          ) : (
            /* MODE: Board */
            <Fade in={!isProfileMode} timeout={300}>
              <Grid container spacing={2.5}>
                {/* Board Logo Upload Card */}
                <Grid size={{ xs: 12 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: "24px",
                      bgcolor: "rgba(18, 35, 51, 0.015)",
                      border: "1px solid rgba(18, 35, 51, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "18px",
                        border: "1px solid rgba(18, 35, 51, 0.1)",
                        bgcolor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        p: 1,
                        boxShadow: "0 4px 12px rgba(18, 35, 51, 0.04)",
                        flexShrink: 0,
                      }}
                    >
                      {boardLogoPreview ? (
                        <Box
                          component="img"
                          src={boardLogoPreview}
                          alt="Board Logo Preview"
                          referrerPolicy="no-referrer"
                          sx={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <BoardIcon
                          sx={{ color: "rgba(18, 35, 51, 0.3)", fontSize: 36 }}
                        />
                      )}
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#122333",
                        }}
                      >
                        Board Authority Logo
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "rgba(18, 35, 51, 0.5)",
                          mt: 0.3,
                          mb: 1.5,
                        }}
                      >
                        Official board emblem (PNG, JPG, AVIF, SVG)
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1.2,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<UploadIcon />}
                          size="small"
                          sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "12px",
                            borderColor: "rgba(18, 35, 51, 0.15)",
                            color: "#122333",
                            px: 2,
                          }}
                        >
                          Upload Board Logo
                          <input
                            type="file"
                            hidden
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/avif"
                            onChange={handleBoardLogoChange}
                          />
                        </Button>
                        {(boardLogoPreview || boardLogoFile) && (
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={handleRemoveBoardLogo}
                            sx={{
                              borderRadius: "10px",
                              textTransform: "none",
                              fontWeight: 700,
                              fontSize: "12px",
                              borderColor: "#FCA5A5",
                              color: "#DC2626",
                              px: 1.5,
                              "&:hover": {
                                bgcolor: "#FEF2F2",
                                borderColor: "#EF4444",
                              },
                            }}
                          >
                            Remove Logo
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 8 }}>
                  <TextField
                    fullWidth
                    label="Board Name"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    variant="outlined"
                    sx={customFieldSx}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Board Code"
                    value={boardCode}
                    onChange={(e) => setBoardCode(e.target.value)}
                    variant="outlined"
                    sx={customFieldSx}
                  />
                </Grid>
              </Grid>
            </Fade>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            pt: 2,
            borderTop: "1px solid rgba(18, 35, 51, 0.06)",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={onClose}
            disabled={loading}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              color: "rgba(18, 35, 51, 0.6)",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "rgba(18, 35, 51, 0.04)" },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <SuccessIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              bgcolor: Colors.PRIMARY,
              color: "#FFFFFF",
              px: 4,
              py: 1,
              boxShadow: "0 8px 20px rgba(0, 209, 193, 0.3)",
              "&:hover": {
                bgcolor: "#00B8AA",
                boxShadow: "0 10px 24px rgba(0, 209, 193, 0.4)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

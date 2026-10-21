"use client";
import React, { useState } from "react";
import { Poppins } from "@/utils/font";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Link,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowForward as ArrowForwardIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuthForms } from "@/hooks/auth/useAuthForms";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    loginFormik,
    showPassword,
    setShowPassword,
    loading,
    snackbar,
    handleCloseSnackbar,
  } = useAuthForms();

  const formik = loginFormik;

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: Colors.INPUT_BG || "#F1F5F9",
      borderRadius: "10px",
      height: "56px",
      transition: "all 0.2s ease-in-out",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(18, 35, 51, 0.08)",
        transition: "all 0.2s",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(18, 35, 51, 0.2)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: Colors.PRIMARY_BLACK,
        borderWidth: "1.5px",
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d32f2f",
      },
      "& input": {
        fontSize: "14px",
        fontWeight: 500,
      },
      "& input::placeholder": {
        color: "#475569",
        opacity: 0,
      },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px ${Colors.INPUT_BG || "#F1F5F9"} inset`,
        WebkitTextFillColor: Colors.PRIMARY_BLACK,
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px",
      color: "rgba(18, 35, 51, 0.5)",
      fontWeight: 500,
      transform: "translate(44px, 16px) scale(1)",
      zIndex: 1,
      pointerEvents: "none",
      transition: "all 0.2s ease-out",
      "&.Mui-focused, &.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)",
        color: Colors.PRIMARY_BLACK,
        fontWeight: 600,
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#d32f2f",
      fontWeight: 500,
      mx: 0,
      mt: 0.5,
    },
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f8fafc",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        fontFamily: Poppins.style.fontFamily,
      }}
    >
      {/* Background Blobs strictly contained within viewport without causing scroll */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Left: Brand Teal & ACCENT_MINT Glow */}
        <Box
          sx={{
            position: "absolute",
            top: "-30%",
            left: "-10%",
            width: "70%",
            height: "70%",
            background:
              "linear-gradient(to top, rgba(0, 209, 193, 0.35) 0%, rgba(221, 255, 247, 0.45) 55%, transparent 75%)",
            filter: "blur(110px)",
            borderRadius: "50%",
          }}
        />
        {/* Right: Brand BACKGROUND_BLOB Periwinkle Glow */}
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            right: "-10%",
            width: "65%",
            height: "60%",
            background:
              "linear-gradient(to bottom, rgba(209, 213, 255, 0.55) 0%, rgba(196, 202, 255, 0.35) 55%, transparent 75%)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 3, sm: 5, md: 8 },
          py: 2.2,
          zIndex: 1,
        }}
      >
        <Link href="/" sx={{ display: "inline-flex", textDecoration: "none" }}>
          <Box
            component="img"
            src="/IAIRE_logo.png"
            alt="IAIRE"
            sx={{
              height: { xs: 34, sm: 40 },
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0)",
              cursor: "pointer",
              display: "block",
            }}
          />
        </Link>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            height: { xs: 34, sm: 40 },
          }}
        >
          <Typography
            sx={{
              color: "rgba(18, 35, 51, 0.65)",
              fontWeight: 500,
              fontSize: { xs: "13px", sm: "14px" },
              display: { xs: "none", sm: "block" },
              fontFamily: Poppins.style.fontFamily,
              lineHeight: 1,
            }}
          >
            Don&apos;t have an account?
          </Typography>
          <Button
            component={Link}
            href="/signup"
            endIcon={
              <ArrowForwardIcon
                sx={{
                  fontSize: "15px !important",
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            }
            sx={{
              height: { xs: 34, sm: 40 },
              borderRadius: "100px",
              bgcolor: "#122333",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "13.5px",
              textTransform: "none",
              px: { xs: 2.2, sm: 2.6 },
              fontFamily: Poppins.style.fontFamily,
              boxShadow: "0 2px 8px rgba(18, 35, 51, 0.12)",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                bgcolor: "#000000",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(18, 35, 51, 0.22)",
                transform: "translateY(-1px)",
                "& svg": {
                  transform: "translateX(3px)",
                },
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Container
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          pb: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "450px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            borderRadius: "24px",
            p: { xs: 3, md: 5 },
            boxShadow: "0 10px 36px 0 rgba(31, 38, 135, 0.15)",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: FontWeights.BOLD,
              mb: 1,
              color: Colors.PRIMARY_BLACK,
              fontSize: "28px",
            }}
          >
            Welcome back to IAIRE
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              mb: 4,
              color: Colors.GREY || "rgba(18, 35, 51, 0.5)",
              fontWeight: 500,
            }}
          >
            Please login to continue
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={textFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{ color: "#94a3b8", fontSize: 20, ml: 1 }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={textFieldSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        sx={{ color: "#94a3b8", fontSize: 20, ml: 1 }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#94a3b8" }}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: 20 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Link
                href="/forgot-password"
                underline="none"
                sx={{
                  fontSize: "13px",
                  color: "#122333",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#122333",
                color: "#fff",
                height: "52px",
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "16px",
                mt: 1,
                "&:hover": { bgcolor: "#1A2B3B" },
              }}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

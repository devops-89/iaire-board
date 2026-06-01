"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Poppins } from "@/utils/font";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { resetPasswordValidationSchema } from "@/utils/validation";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { ResetPasswordFormValues } from "@/utils/types";
import { authControllers } from "@/api/auth";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await authControllers.resetPassword({
          email,
          otp,
          newPassword: values.password,
        });

        if (response.data?.success) {
          setSnackbar({
            open: true,
            message: "Password reset successful! Redirecting to login...",
            severity: "success",
          });
          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          setSnackbar({
            open: true,
            message: response.data?.message || "Failed to reset password.",
            severity: "error",
          });
        }
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Failed to reset password. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const passwordError = formik.touched.password && Boolean(formik.errors.password);
  const confirmPasswordError = formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword);

  const inputSx = (hasError: boolean) => ({
    "& .MuiOutlinedInput-root": {
      bgcolor: Colors.INPUT_BG,
      borderRadius: "10px",
      height: "56px",
      transition: "border 0.2s",
      border: hasError ? "1.5px solid #d32f2f" : "1px solid #dadee5ff",
      "&.Mui-focused": {
        border: hasError ? "1.5px solid #d32f2f" : `1.5px solid ${Colors.DARK}`,
      },
      "& fieldset": { border: "none" },
      "& input": { fontSize: FontSizes.SMALL, fontWeight: FontWeights.MEDIUM },
      "& input::placeholder": { color: "#475569", opacity: 0.8 },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px ${Colors.INPUT_BG} inset`,
        WebkitTextFillColor: Colors.PRIMARY_BLACK,
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#d32f2f",
      fontWeight: FontWeights.MEDIUM,
      mx: 0,
      mt: 0.5,
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: Poppins.style.fontFamily,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-40%",
          left: "-10%",
          width: "80%",
          height: "70%",
          background: "linear-gradient(to top, rgba(192, 132, 252, 0.6) 0%, transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "5%",
          right: "-5%",
          width: "70%",
          height: "60%",
          background: "linear-gradient(to bottom, rgba(254, 215, 170, 0.6) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ px: { xs: 4, md: 8 }, py: 4, zIndex: 1 }}>
        <Typography
          sx={{
            fontSize: FontSizes.TITLE,
            fontWeight: FontWeights.BOLD,
            color: Colors.DARK,
            letterSpacing: "-0.04em",
          }}
        >
          IAIRE
        </Typography>
      </Box>

      {/* Main Content */}
      <Container
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          pb: 10,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "480px",
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
              fontSize: FontSizes.HEADING,
            }}
          >
            Reset Password
          </Typography>
          <Typography
            sx={{
              fontSize: FontSizes.DESCRIPTION,
              mb: 4,
              color: Colors.GREY,
              fontWeight: FontWeights.MEDIUM,
            }}
          >
            Create a new password for your account: <br />
            <strong>{email}</strong>
          </Typography>

          {/* Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={passwordError}
              helperText={formik.touched.password && formik.errors.password}
              sx={inputSx(passwordError as boolean)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: Colors.GREY, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: Colors.GREY }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={confirmPasswordError}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              sx={inputSx(confirmPasswordError as boolean)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: Colors.GREY, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: Colors.GREY }}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={() => formik.handleSubmit()}
              sx={{
                bgcolor: Colors.PRIMARY_BLACK,
                color: Colors.WHITE,
                height: "48px",
                borderRadius: "100px",
                fontWeight: FontWeights.BOLD,
                fontSize: FontSizes.BUTTON,
                textTransform: "none",
                mt: 1,
                "&:hover": { bgcolor: Colors.PRIMARY_BLACK, opacity: 0.9 },
              }}
            >
              {loading ? "Resetting..." : "Reset Password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography>Loading reset form...</Typography>
      </Box>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
// Renamed helper function for consistency
const VerifyOtpContent = ResetPasswordContent;

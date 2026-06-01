"use client";
import React, { useRef, useState, Suspense } from "react";
import { Poppins } from "@/utils/font";
import {
  Box,
  Typography,
  Button,
  Container,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { verifyOtpValidationSchema } from "@/utils/validation";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { VerifyOtpFormValues } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/redux/slices/authSlice";
import { authControllers } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formik = useFormik<VerifyOtpFormValues>({
    initialValues: {
      otp: "",
    },
    validationSchema: verifyOtpValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const mode = searchParams.get("mode") || "";
        const response = await authControllers.verifyEmailOtp({
          email,
          otp: values.otp,
        });

        if (response.data?.success) {
          if (mode === "forgot") {
            setSnackbar({
              open: true,
              message: "OTP verified successfully! Redirecting to reset password...",
              severity: "success",
            });
            setTimeout(() => {
              router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(values.otp)}`);
            }, 1500);
          } else {
            const accessToken = response.data?.data?.tokens?.accessToken || response.data?.data?.token;
            if (accessToken) {
              localStorage.setItem("token", accessToken);
              let userData = response.data?.data?.user || null;
              if (!userData) {
                try {
                  const decoded: any = jwtDecode(accessToken);
                  userData = {
                    id: String(decoded.id || decoded.sub || decoded.userId || ""),
                    name: decoded.name || "User",
                    email: decoded.email || email,
                    role: decoded.role || "admin",
                    avatar: decoded.avatar || "/images/profile.png",
                  };
                } catch (e) {
                  console.error("Token decoding failed", e);
                }
              }

              dispatch(loginAction({ user: userData, token: accessToken }));
              setSnackbar({
                open: true,
                message: "Verification successful! Logging you in...",
                severity: "success",
              });
              setTimeout(() => {
                router.replace("/dashboard");
              }, 1500);
            } else {
              setSnackbar({
                open: true,
                message: "Verification succeeded, but token was missing.",
                severity: "error",
              });
            }
          }
        } else {
          setSnackbar({
            open: true,
            message: response.data?.message || "Invalid OTP.",
            severity: "error",
          });
        }
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "OTP verification failed. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleResendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      setSnackbar({
        open: true,
        message: "Email address is missing.",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await authControllers.resendOtp(email);
      if (response.data?.success) {
        setSnackbar({
          open: true,
          message: response.data?.message || "OTP resent successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: response.data?.message || "Failed to resend OTP.",
          severity: "error",
        });
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to resend OTP. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    formik.setFieldValue("otp", combinedOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
            Verify OTP
          </Typography>
          <Typography
            sx={{
              fontSize: FontSizes.DESCRIPTION,
              mb: 4,
              color: Colors.GREY,
              fontWeight: FontWeights.MEDIUM,
            }}
          >
            Enter the 6-digit code sent to your email: <br />
            <strong>{email}</strong>
          </Typography>

          {/* OTP Inputs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 1, sm: 1.5 },
              mb: 3,
            }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  width: "50px",
                  height: "60px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  textAlign: "center",
                  borderRadius: "12px",
                  border: "1.5px solid #dadee5ff",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  color: Colors.PRIMARY_BLACK,
                  outline: "none",
                  transition: "all 0.2s",
                  fontFamily: Poppins.style.fontFamily,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4285F4")}
                onBlur={(e) => (e.target.style.borderColor = "#dadee5ff")}
              />
            ))}
          </Box>

          {formik.errors.otp && formik.touched.otp && (
            <Typography sx={{ color: "#d32f2f", fontSize: "12px", mb: 2, fontWeight: 500 }}>
              {formik.errors.otp}
            </Typography>
          )}

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
              "&:hover": { bgcolor: Colors.PRIMARY_BLACK, opacity: 0.9 },
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ fontSize: FontSizes.SMALL, color: Colors.GREY }}>
              Didn't receive the code?{" "}
              <Link
                href="#"
                onClick={handleResendOtp}
                underline="none"
                sx={{
                  color: Colors.DARK,
                  fontWeight: FontWeights.BOLD,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                Resend OTP
              </Link>
            </Typography>

            <Link
              href="/"
              underline="none"
              sx={{
                fontFamily: Poppins.style.fontFamily,
                color: Colors.GREY,
                fontWeight: FontWeights.SEMIBOLD,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                fontSize: FontSizes.SMALL,
                "&:hover": { color: Colors.PRIMARY_BLACK }
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Login
            </Link>
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

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography>Loading verification...</Typography>
      </Box>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}

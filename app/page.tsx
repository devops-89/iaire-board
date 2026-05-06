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
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowForward as ArrowForwardIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Login submitted:", values);
      router.push("/admin");
    },
  });

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 4, md: 8 },
          py: 4,
          zIndex: 1,
        }}
      >
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              color: Colors.PRIMARY_BLACK || "rgba(0,0,0,0.6)",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            Don't have an account?
          </Typography>
          <Link
            href="/signup"
            underline="none"
            sx={{
              color: Colors.PRIMARY_BLACK,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "14px",
            }}
          >
            Sign up <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
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
          pb: 10,
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
                      <EmailIcon sx={{ color: "#94a3b8", fontSize: 20, ml: 1 }} />
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
                      <LockIcon sx={{ color: "#94a3b8", fontSize: 20, ml: 1 }} />
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    sx={{
                      color: "rgba(18, 35, 51, 0.2)",
                      "&.Mui-checked": { color: "#122333" },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{ fontSize: "13px", color: "rgba(18, 35, 51, 0.6)" }}
                  >
                    Remember me
                  </Typography>
                }
              />
              <Link
                href="/forgot-password"
                underline="none"
                sx={{
                  fontSize: "13px",
                  color: "#122333",
                  fontWeight: 700,
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
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

"use client";
import React from "react";
import { Poppins } from "@/utils/font";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Link,
  InputAdornment,
} from "@mui/material";
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "@/utils/validation";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { ForgotPasswordFormValues } from "@/utils/types";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Forgot password submitted:", values);
      router.push("/verify-otp");
    },
  });

  const emailError = formik.touched.email && Boolean(formik.errors.email);

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
            lineHeight: LineHeights.NORMAL,
            letterSpacing: "-0.04em",
            color: Colors.DARK,
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
          flexDirection: "column",
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
            Forgot Password?
          </Typography>
          <Typography
            sx={{
              fontSize: FontSizes.DESCRIPTION,
              mb: 4,
              color: Colors.GREY,
              fontWeight: FontWeights.MEDIUM,
              lineHeight: LineHeights.NORMAL,
            }}
          >
            Enter your email to receive an OTP
          </Typography>

          {/* Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* Email */}
            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={emailError}
              helperText={formik.touched.email && formik.errors.email}
              sx={inputSx(emailError as boolean)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: Colors.GREY, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => formik.handleSubmit()}
              sx={{
                bgcolor: Colors.PRIMARY_BLACK,
                color: Colors.WHITE,
                height: "48px",
                mt: 2,
                borderRadius: "100px",
                fontWeight: FontWeights.BOLD,
                fontSize: FontSizes.BUTTON,
                textTransform: "none",
                "&:hover": { bgcolor: Colors.PRIMARY_BLACK, opacity: 0.9 },
              }}
            >
              Send OTP
            </Button>

            <Link
              href="/"
              underline="none"
              sx={{
                mt: 2,
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
              <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Log in
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

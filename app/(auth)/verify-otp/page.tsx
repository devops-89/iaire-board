"use client";
import React, { useRef, useState } from "react";
import { Poppins } from "@/utils/font";
import {
  Box,
  Typography,
  Button,
  Container,
  Link,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { verifyOtpValidationSchema } from "@/utils/validation";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { VerifyOtpFormValues } from "@/utils/types";

import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formik = useFormik<VerifyOtpFormValues>({
    initialValues: {
      otp: "",
    },
    validationSchema: verifyOtpValidationSchema,
    onSubmit: (values) => {
      console.log("OTP submitted:", values.otp);
      router.push("/reset-password");
    },
  });

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
            Enter the 6-digit code sent to your email
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
            Verify OTP
          </Button>

          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ fontSize: FontSizes.SMALL, color: Colors.GREY }}>
              Didn't receive the code?{" "}
              <Link
                href="#"
                underline="none"
                sx={{ color: Colors.DARK, fontWeight: FontWeights.BOLD }}
              >
                Resend OTP
              </Link>
            </Typography>

            <Link
              href="/forgot-password"
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
              <ArrowBackIcon sx={{ fontSize: 16 }} /> Back
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

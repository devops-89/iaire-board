"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dynamic from "next/dynamic";
import { Poppins } from "@/utils/font";
import { useRouter } from "next/navigation";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { Colors } from "@/utils/enum";

const RegistrationForm = dynamic(
  () => import("../AuthForms/RegistrationForm").then((mod) => mod.RegistrationForm),
  { ssr: false }
);

export default function SignupPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8fafc",
        position: "relative",
        overflowY: "auto",
        fontFamily: Poppins.style.fontFamily,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-40%",
          left: "-10%",
          width: "80%",
          height: "70%",
          background:
            "linear-gradient(to top, rgba(192, 132, 252, 0.6) 0%, transparent 70%)",
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
          background:
            "linear-gradient(to bottom, rgba(254, 214, 170, 0.6) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header with Login Link */}
        <Box
          sx={{
            px: { xs: 3, md: 8 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Typography sx={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
            Already have an account?{" "}
            <Typography
              component="span"
              onClick={() => router.push("/")}
              sx={{
                color: Colors.PRIMARY_BLACK,
                fontWeight: FontWeights.BOLD,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Log in <ArrowForwardIcon sx={{ fontSize: 15 }} />
            </Typography>
          </Typography>
        </Box>

        {/* Main Registration Form */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pb: 4,
            zIndex: 10,
            position: "relative",
          }}
        >
          <RegistrationForm />
        </Box>
      </Box>
    </Box>
  );
}

"use client";
import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dynamic from "next/dynamic";
import { Poppins } from "@/utils/font";
import { useRouter } from "next/navigation";
import { FontSizes, FontWeights, LineHeights } from "@/utils/style";
import { Colors } from "@/utils/enum";

const RegistrationForm = dynamic(
  () =>
    import("../AuthForms/RegistrationForm").then((mod) => mod.RegistrationForm),
  { ssr: false },
);

export default function SignupPage() {
  const router = useRouter();

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
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8fafc",
        position: "relative",
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
            px: { xs: 3, sm: 5, md: 8 },
            py: 2.2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              Already have an account?
            </Typography>
            <Button
              component={Link}
              href="/"
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
              Log in
            </Button>
          </Box>
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

"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { MembershipMetrics } from "./MembershipMetrics";
import { MembershipHeader } from "./MembershipHeader";
import { MembershipFooter } from "./MembershipFooter";
import { Poppins } from "@/utils/font";

export const SchoolMembershipLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#FAF6F0",
        fontFamily: Poppins.style.fontFamily,
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto",
          px: 4,
          pb: 4,
        }}
      >
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <MembershipMetrics />
          <MembershipFooter />
        </Container>
      </Box>
    </Box>
  );
};

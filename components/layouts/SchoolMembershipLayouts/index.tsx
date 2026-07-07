"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { MembershipHeader } from "./MembershipHeader";
import { MembershipFooter } from "./MembershipFooter";
import { SchoolTable } from "./SchoolTable";
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
          px: 2,
          pb: 2,
        }}
      >
        <Navbar />
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <SchoolTable />
          </Box>
          <MembershipFooter />
        </Box>
      </Box>
    </Box>
  );
};

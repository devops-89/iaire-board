"use client";
import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { TeacherMetrics } from "./TeacherMetrics";
import { Poppins } from "@/utils/font";

export const TeacherCertificationLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#FAF7F0",
        fontFamily: Poppins.style.fontFamily,
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflowY: "auto", px: 4, pb: 4 }}
      >
        <Navbar />

        {/* Content Grid */}
        <TeacherMetrics />
      </Box>
    </Box>
  );
};

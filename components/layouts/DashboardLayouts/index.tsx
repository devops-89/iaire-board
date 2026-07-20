"use client";
import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { Poppins } from "@/utils/font";
import { TopMetricsBar } from "./TopMetricsBar";

export default function DashboardLayouts() {
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
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          px: 2,
          pb: 2,
          position: "relative",
          bgcolor: "#FAF7F0",
        }}
      >
        <Navbar />
        <TopMetricsBar />
      </Box>
    </Box>
  );
}

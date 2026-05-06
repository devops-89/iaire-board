"use client";
import React from "react";
import { Box, Grid } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { StartupHero } from "./StartupHero";
import { StartupMetrics } from "./StartupMetrics";
import { Poppins } from "@/utils/font";

export const StudentStartupLayout = () => {
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
          px: 4,
          pb: 4,
        }}
      >
        <Navbar />

        <Grid container spacing={4}>
          <StartupHero />
          <StartupMetrics />
        </Grid>
      </Box>
    </Box>
  );
};

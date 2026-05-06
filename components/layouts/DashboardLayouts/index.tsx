"use client";
import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { Poppins } from "@/utils/font";
import { TopMetricsBar } from "./TopMetricsBar";
import { SectionHeader } from "./SectionHeader";
import {
  MembershipOverview,
  TeacherCountOverview,
  IPResearchOverview,
  StartupOverview,
} from "./DashboardOverviewSections";
import { TeacherTrainingStatus } from "./TeacherTrainingStatus";
import { StudentSuccess } from "./StudentSuccess";

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
          px: 4,
          pb: 4,
          position: "relative",
          bgcolor: "#FAF7F0",
        }}
      >
        <Navbar />
        <TopMetricsBar />
        <MembershipOverview />
        <TeacherCountOverview />
        <IPResearchOverview />
        <StartupOverview />
        <Box sx={{ mb: 8 }}>
          <SectionHeader title="Teachers Training Overview" color="#122333" />
          <TeacherTrainingStatus />
        </Box>
        <Box sx={{ mb: 8 }}>
          <SectionHeader title="Student Engagement Overview" color="#D0021B" />
          <StudentSuccess />
        </Box>
      </Box>
    </Box>
  );
}

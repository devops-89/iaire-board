"use client";
import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { InnovationTable } from "./InnovationTable";
import { Poppins } from "@/utils/font";

export const InnovationLayout = () => {
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
          px: 2,
          pb: 2,
        }}
      >
        <Navbar />

        <Box sx={{ mt: 3 }}>
          <InnovationTable />
        </Box>
      </Box>
    </Box>
  );
};

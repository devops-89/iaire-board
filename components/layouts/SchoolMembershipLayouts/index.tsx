"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { MembershipFooter } from "./MembershipFooter";
import { SchoolTable } from "./SchoolTable";
import { Poppins } from "@/utils/font";

export const SchoolMembershipLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#FAF6F0",
        fontFamily: Poppins.style.fontFamily,
      }}
    >
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          px: { xs: 1.5, sm: 2, md: 3 },
          pb: 3,
          position: "relative",
          bgcolor: "#FAF6F0",
          width: { xs: "100%", lg: "calc(100% - 250px)" },
        }}
      >
        <Navbar onMenuClick={handleDrawerToggle} />
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

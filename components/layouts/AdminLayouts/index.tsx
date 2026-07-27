"use client";
import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { Poppins } from "@/utils/font";

import { useAuth } from "@/hooks/auth/useAuth";
import { AdminProfile } from "./AdminProfile";

export default function AdminLayout() {
  const { fetchUserDetails, user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }
  }, []);

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
          position: "relative",
        }}
      >
        <Navbar />

        <Box sx={{ mt: 3, width: "100%" }}>
          <AdminProfile />
        </Box>
      </Box>
    </Box>
  );
}

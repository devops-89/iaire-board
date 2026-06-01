"use client";
import React from "react";
import { IconButton } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useAuth } from "@/hooks/auth/useAuth";

export const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
  };

  return (
    <IconButton
      onClick={handleLogout}
      sx={{
        color: "rgba(255,255,255,0.6)",
        "&:hover": { color: "#ef4444", bgcolor: "rgba(255,255,255,0.1)" },
        p: 0.5,
        ml: 1,
      }}
    >
      <LogoutIcon sx={{ fontSize: 20 }} />
    </IconButton>
  );
};

"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  GetApp as ExportIcon,
  FiberManualRecord as LiveIcon,
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
  PersonOutlined as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { Colors } from "@/utils/enum";
import { useAuth } from "@/hooks/auth/useAuth";
import { Poppins } from "@/utils/font";

const PAGE_CONFIG: any = {
  "/admin": {
    title: "Board Admin Profile",
    description: "",
    showActions: false,
  },
  "/dashboard": {
    title: "Dashboard",
    description: "",
    showActions: false,
  },
  "/membership-overview": {
    title: "Registered Institutions",
    description: "",
    showActions: false,
  },
  "/teacher-certification": {
    title: "Registered Teachers",
    description: "",
    showActions: false,
  },
  "/innovation-research": {
    title: "Innovation & Research Status",
    description: "",
    showActions: false,
  },
  "/student-startup": {
    title: "Student Startup Details",
    description: "",
    showActions: false,
  },
  "/student-startups": {
    title: "Student Startup Status",
    description: "",
    showActions: false,
  },
  "/team": {
    title: "Team Overview",
    description: "",
    showActions: false,
  },
  "/school": {
    title: "School Profile",
    description: "",
    showActions: false,
  },
  "/teacher": {
    title: "Teacher Profile",
    description: "",
    showActions: false,
  },
};

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    handleCloseMenu();
    router.push("/admin");
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
  };

  const userName = user?.fullName || user?.name || "CISCE Admin";
  const userRole = user?.role || "SUPER_ADMIN";
  const userAvatar =
    user?.profileImageDownloadUrl ||
    user?.profile_image_download_url ||
    user?.profileImageDownloadPath ||
    user?.profile_image_download_path ||
    user?.avatar ||
    (typeof user?.profileImage === "string" ? user?.profileImage : "") ||
    "";

  const displayAvatar = userAvatar || "/images/default-avatar.svg";

  const getInitials = (name: string) => {
    if (!name) return "CA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatRoleName = (role: string) => {
    if (!role) return "Super Admin";
    return role
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const activeKey =
    Object.keys(PAGE_CONFIG).find((key) => pathname.includes(key)) ||
    "/dashboard";
  const config = PAGE_CONFIG[activeKey] || {
    title: "Dashboard",
    description: "",
    showActions: false,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: ["-webkit-sticky", "sticky"],
        top: 0,
        zIndex: 1100,
        bgcolor: Colors.APP_BACKGROUND,
        mx: { xs: -1.5, sm: -2 },
        px: { xs: 1.5, sm: 2 },
        height: { xs: "60px", sm: "72px" },
        mb: { xs: 2.5, sm: 3 },
        borderBottom: `1px solid rgba(212, 210, 205, 0.45)`,
      }}
    >
      {/* Left: Mobile Menu Toggle & Page Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {onMenuClick && (
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: { xs: "flex", lg: "none" },
              color: Colors.PRIMARY_DARK,
              p: 0.8,
              borderRadius: "10px",
              bgcolor: "rgba(16, 18, 22, 0.05)",
              "&:hover": { bgcolor: "rgba(16, 18, 22, 0.1)" },
            }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
        )}

        {config.title ? (
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "22px" },
                fontWeight: 700,
                color: "#122333",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                fontFamily: Poppins.style.fontFamily,
              }}
            >
              {config.title}
            </Typography>
            {config.description && (
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: 500,
                  color: "rgba(18, 35, 51, 0.6)",
                  mt: 0.5,
                  display: { xs: "none", sm: "block" },
                  fontFamily: Poppins.style.fontFamily,
                }}
              >
                {config.description}
              </Typography>
            )}
          </Box>
        ) : null}
      </Box>

      {/* Right: Actions & User Profile Menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
        {config.showActions && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Chip
              icon={
                <LiveIcon
                  sx={{
                    fontSize: "10px !important",
                    color: "#0D9488 !important",
                  }}
                />
              }
              label="Live Data"
              sx={{
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                fontWeight: 800,
                fontSize: "12px",
                border: "1px solid rgba(13, 148, 136, 0.25)",
                display: { xs: "none", sm: "inline-flex" },
                "& .MuiChip-label": { px: 1.5 },
              }}
            />
            <Button
              variant="contained"
              startIcon={<ExportIcon />}
              sx={{
                bgcolor: Colors.PRIMARY_DARK,
                color: Colors.ACCENT_MINT,
                textTransform: "none",
                borderRadius: "100px",
                px: { xs: 1.5, sm: 3 },
                py: 0.8,
                fontWeight: 700,
                fontSize: { xs: "12px", sm: "13px" },
                boxShadow: "0 2px 8px rgba(16, 18, 22, 0.12)",
                "&:hover": { bgcolor: Colors.PRIMARY_DARK, opacity: 0.9 },
              }}
            >
              Export
            </Button>
          </Box>
        )}

        {/* User Profile Pill in Top-Right */}
        <Box
          onClick={handleOpenMenu}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.4,
            p: 0.6,
            pr: { xs: 0.6, sm: 1.8 },
            borderRadius: "100px",
            bgcolor: "#FFFFFF",
            border: `1px solid ${Colors.BORDER_STONE}`,
            boxShadow: "0 2px 8px rgba(16, 18, 22, 0.04)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: Colors.PRIMARY_DARK,
              boxShadow: "0 4px 14px rgba(16, 18, 22, 0.08)",
            },
          }}
        >
          <Avatar
            src={displayAvatar}
            alt={userName}
            sx={{
              bgcolor: Colors.ACCENT_MINT,
              color: Colors.PRIMARY_DARK,
              fontWeight: 800,
              fontSize: "13px",
              width: 36,
              height: 36,
              border: "1px solid rgba(13, 148, 136, 0.25)",
              "& img": {
                objectFit: "cover",
              },
            }}
          >
            <PersonIcon sx={{ fontSize: 20, color: Colors.PRIMARY_DARK }} />
          </Avatar>

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              textAlign: "left",
              minWidth: 0,
            }}
          >
            <Typography
              noWrap
              sx={{
                fontSize: "13.5px",
                fontWeight: 700,
                color: Colors.PRIMARY_DARK,
                lineHeight: 1.2,
                fontFamily: Poppins.style.fontFamily,
              }}
            >
              {userName}
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: "11.5px",
                fontWeight: 500,
                color: "rgba(16, 18, 22, 0.55)",
                lineHeight: 1.2,
                mt: 0.2,
                fontFamily: Poppins.style.fontFamily,
              }}
            >
              {formatRoleName(userRole)}
            </Typography>
          </Box>

          <ArrowDownIcon
            sx={{
              fontSize: 20,
              color: "rgba(16, 18, 22, 0.5)",
              transition: "transform 0.2s ease",
              transform: openMenu ? "rotate(180deg)" : "rotate(0deg)",
              display: { xs: "none", sm: "block" },
            }}
          />
        </Box>

        {/* Dropdown Popover Menu */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 1.2,
                minWidth: 220,
                borderRadius: "16px",
                border: `1px solid ${Colors.BORDER_STONE}`,
                boxShadow: "0 10px 30px rgba(16, 18, 22, 0.1)",
                overflow: "hidden",
                p: 0.8,
              },
            },
          }}
        >
          {/* Header Info */}
          <Box
            sx={{
              px: 1.5,
              py: 1,
              mb: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              src={displayAvatar}
              alt={userName}
              sx={{
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                fontWeight: 800,
                fontSize: "13px",
                width: 36,
                height: 36,
                border: "1px solid rgba(13, 148, 136, 0.25)",
                "& img": {
                  objectFit: "cover",
                },
              }}
            >
              <PersonIcon sx={{ fontSize: 20, color: Colors.PRIMARY_DARK }} />
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                sx={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: Colors.PRIMARY_DARK,
                  fontFamily: Poppins.style.fontFamily,
                }}
              >
                {userName}
              </Typography>
              <Typography
                noWrap
                sx={{
                  fontSize: "11px",
                  color: "rgba(16, 18, 22, 0.5)",
                  fontFamily: Poppins.style.fontFamily,
                  mt: 0.2,
                }}
              >
                {user?.email || formatRoleName(userRole)}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 0.5, borderColor: "rgba(16, 18, 22, 0.08)" }} />

          {/* Option 1: View Details */}
          <MenuItem
            onClick={handleViewDetails}
            sx={{
              borderRadius: "10px",
              py: 1,
              px: 1.5,
              fontSize: "13px",
              fontWeight: 600,
              color: Colors.PRIMARY_DARK,
              fontFamily: Poppins.style.fontFamily,
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              transition: "all 0.15s ease",
              "&:hover": {
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
              },
            }}
          >
            <PersonIcon sx={{ fontSize: 18, color: Colors.PRIMARY_DARK }} />
            View Details
          </MenuItem>

          {/* Option 2: Logout */}
          <MenuItem
            onClick={handleLogout}
            sx={{
              borderRadius: "10px",
              py: 1,
              px: 1.5,
              fontSize: "13px",
              fontWeight: 600,
              color: "#DC2626",
              fontFamily: Poppins.style.fontFamily,
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              transition: "all 0.15s ease",
              "&:hover": {
                bgcolor: "rgba(220, 38, 38, 0.08)",
                color: "#DC2626",
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: 18, color: "#DC2626" }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

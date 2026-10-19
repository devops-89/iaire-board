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
  ChevronRight as ChevronRightIcon,
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
            gap: 1.2,
            p: "4px 12px 4px 5px",
            borderRadius: "100px",
            bgcolor: "#FFFFFF",
            border: openMenu
              ? "1.5px solid #00D1C1"
              : "1px solid rgba(18, 35, 51, 0.12)",
            boxShadow: openMenu
              ? "0 0 0 3px rgba(0, 209, 193, 0.14), 0 4px 12px rgba(18, 35, 51, 0.06)"
              : "0 2px 6px rgba(18, 35, 51, 0.03)",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              borderColor: openMenu ? "#00D1C1" : "rgba(18, 35, 51, 0.25)",
              boxShadow: "0 4px 14px rgba(18, 35, 51, 0.08)",
              transform: "translateY(-0.5px)",
            },
          }}
        >
          <Avatar
            src={displayAvatar}
            alt={userName}
            sx={{
              bgcolor: "rgba(0, 209, 193, 0.15)",
              color: "#008B80",
              fontWeight: 800,
              fontSize: "12.5px",
              width: 34,
              height: 34,
              border: "1px solid rgba(0, 209, 193, 0.3)",
              boxShadow: "0 1px 4px rgba(0, 209, 193, 0.15)",
              "& img": {
                objectFit: "cover",
              },
            }}
          >
            {getInitials(userName)}
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
                fontSize: "13px",
                fontWeight: 700,
                color: "#122333",
                lineHeight: 1.2,
                fontFamily: Poppins.style.fontFamily,
                maxWidth: 130,
              }}
            >
              {userName}
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(18, 35, 51, 0.5)",
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
              fontSize: 18,
              color: openMenu ? "#008B80" : "rgba(18, 35, 51, 0.45)",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: openMenu ? "rotate(180deg)" : "rotate(0deg)",
              display: { xs: "none", sm: "block" },
              ml: 0.2,
            }}
          />
        </Box>

        {/* Dropdown Popover Menu */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          autoFocus={false}
          disableAutoFocusItem
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 1.4,
                minWidth: 280,
                maxWidth: 320,
                borderRadius: "20px",
                border: "1px solid rgba(18, 35, 51, 0.08)",
                bgcolor: "#FFFFFF",
                boxShadow:
                  "0 20px 45px -10px rgba(18, 35, 51, 0.16), 0 0 1px 1px rgba(18, 35, 51, 0.05)",
                p: "8px",
                overflow: "hidden",
                "& .MuiList-root": {
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                },
              },
            },
          }}
        >
          {/* Header Identity Card - Seamless integrated profile info */}
          <Box
            sx={{
              px: 1.6,
              py: 1.4,
              mb: 0.3,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              src={displayAvatar}
              alt={userName}
              sx={{
                bgcolor: "#00D1C1",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "15px",
                width: 44,
                height: 44,
                boxShadow: "0 4px 14px rgba(0, 209, 193, 0.3)",
                border: "2px solid #FFFFFF",
                "& img": {
                  objectFit: "cover",
                },
              }}
            >
              {getInitials(userName)}
            </Avatar>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.2 }}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#122333",
                    fontFamily: Poppins.style.fontFamily,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {userName}
                </Typography>
                <Chip
                  size="small"
                  label={formatRoleName(userRole)}
                  sx={{
                    height: 18,
                    fontSize: "9.5px",
                    fontWeight: 700,
                    bgcolor: "rgba(0, 209, 193, 0.12)",
                    color: "#008B80",
                    borderRadius: "6px",
                    fontFamily: Poppins.style.fontFamily,
                    "& .MuiChip-label": { px: 0.8 },
                  }}
                />
              </Box>
              <Typography
                noWrap
                sx={{
                  fontSize: "11.5px",
                  color: "rgba(18, 35, 51, 0.55)",
                  fontFamily: Poppins.style.fontFamily,
                  lineHeight: 1.3,
                }}
              >
                {user?.email || "No email available"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 0.4, borderColor: "rgba(18, 35, 51, 0.06)", mx: 0.5 }} />

          {/* Option 1: View Details */}
          <MenuItem
            onClick={handleViewDetails}
            disableRipple
            sx={{
              borderRadius: "14px",
              py: 1.1,
              px: 1.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
              bgcolor: "transparent !important",
              border: "1px solid transparent",
              "&.Mui-focusVisible, &:focus, &.Mui-selected": {
                bgcolor: "transparent !important",
              },
              "&:hover": {
                bgcolor: "rgba(18, 35, 51, 0.035) !important",
                borderColor: "rgba(18, 35, 51, 0.05)",
                transform: "translateX(2px)",
                "& .menu-icon-box": {
                  bgcolor: "#00D1C1",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 10px rgba(0, 209, 193, 0.3)",
                },
                "& .chevron-arrow": {
                  color: "#122333",
                  transform: "translateX(3px)",
                },
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                className="menu-icon-box"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: "rgba(18, 35, 51, 0.05)",
                  color: "#122333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  flexShrink: 0,
                }}
              >
                <PersonIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#122333",
                    fontFamily: Poppins.style.fontFamily,
                    lineHeight: 1.2,
                  }}
                >
                  View Details
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(18, 35, 51, 0.45)",
                    fontFamily: Poppins.style.fontFamily,
                    lineHeight: 1.2,
                    mt: 0.3,
                  }}
                >
                  Profile & board settings
                </Typography>
              </Box>
            </Box>

            <ChevronRightIcon
              className="chevron-arrow"
              sx={{
                fontSize: 17,
                color: "rgba(18, 35, 51, 0.25)",
                transition: "all 0.2s ease",
              }}
            />
          </MenuItem>

          {/* Option 2: Logout */}
          <MenuItem
            onClick={handleLogout}
            disableRipple
            sx={{
              borderRadius: "14px",
              py: 1.1,
              px: 1.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
              bgcolor: "transparent !important",
              border: "1px solid transparent",
              "&.Mui-focusVisible, &:focus, &.Mui-selected": {
                bgcolor: "transparent !important",
              },
              "&:hover": {
                bgcolor: "#FEF2F2 !important",
                borderColor: "rgba(239, 68, 68, 0.1)",
                transform: "translateX(2px)",
                "& .logout-icon-box": {
                  bgcolor: "#EF4444",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 10px rgba(239, 68, 68, 0.3)",
                },
                "& .logout-label": {
                  color: "#DC2626",
                },
                "& .chevron-arrow-logout": {
                  color: "#DC2626",
                  transform: "translateX(3px)",
                },
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                className="logout-icon-box"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: "rgba(239, 68, 68, 0.08)",
                  color: "#EF4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  flexShrink: 0,
                }}
              >
                <LogoutIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography
                  className="logout-label"
                  sx={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#DC2626",
                    fontFamily: Poppins.style.fontFamily,
                    lineHeight: 1.2,
                    transition: "color 0.2s ease",
                  }}
                >
                  Logout
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "rgba(220, 38, 38, 0.6)",
                    fontFamily: Poppins.style.fontFamily,
                    lineHeight: 1.2,
                    mt: 0.3,
                  }}
                >
                  Sign out of this session
                </Typography>
              </Box>
            </Box>

            <ChevronRightIcon
              className="chevron-arrow-logout"
              sx={{
                fontSize: 17,
                color: "rgba(220, 38, 38, 0.35)",
                transition: "all 0.2s ease",
              }}
            />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

"use client";
import React from "react";
import {
  Box,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  GridView as DashboardIcon,
  Business as InstitutionIcon,
  PeopleAlt as PeopleIcon,
  Lightbulb as PatentIcon,
  RocketLaunch as StartupIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights } from "@/utils/style";
import { Poppins } from "@/utils/font";
import { useRouter, usePathname } from "next/navigation";
import { Logout } from "./Logout";
import { useAuth } from "@/hooks/auth/useAuth";

const drawerWidth = 250;

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" }],
  },
  {
    title: "ANALYTICS",
    items: [
      {
        text: "School Membership",
        icon: <InstitutionIcon />,
        path: "/membership-overview",
      },
      {
        text: "Teacher Certification",
        icon: <PeopleIcon />,
        path: "/teacher-certification",
      },
      {
        text: "Innovation & Research",
        icon: <PatentIcon />,
        path: "/innovation-research",
      },
      {
        text: "Student Startups",
        icon: <StartupIcon />,
        path: "/student-startups",
      },
    ],
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onMobileClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const userName = user?.fullName || user?.name || "CISCE Admin";
  const userRole = user?.role || "SUPER_ADMIN";
  const userAvatar = user?.profileImageDownloadUrl || user?.profileImage || user?.avatar || "";

  const getInitials = (name: string) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatRoleName = (role: string) => {
    if (!role) return "Administrator";
    return role
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: Colors.PRIMARY_DARK,
        color: Colors.WHITE,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: "72px",
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box
          component="img"
          src="/IAIRE_logo.png"
          alt="IAIRE Logo"
          sx={{
            height: 44,
            width: "auto",
            objectFit: "contain",
            maxWidth: "100%",
          }}
        />
        {onMobileClose && (
          <IconButton
            onClick={onMobileClose}
            sx={{
              color: "rgba(255,255,255,0.7)",
              display: { lg: "none" },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Menu Groups */}
      <Box sx={{ overflowY: "auto", px: 1.5, flex: 1 }}>
        {menuGroups.map((group) => (
          <Box key={group.title} sx={{ mb: 3 }}>
            <Typography
              sx={{
                px: 2,
                mb: 1,
                fontSize: FontSizes.SMALL,
                fontWeight: FontWeights.MEDIUM,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "1px",
              }}
            >
              {group.title}
            </Typography>
            <List disablePadding>
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => {
                        router.push(item.path);
                        if (onMobileClose) onMobileClose();
                      }}
                      sx={{
                        borderRadius: "8px",
                        bgcolor: isActive
                          ? "rgba(255,255,255,0.1)"
                          : "transparent",
                        borderLeft: isActive
                          ? `4px solid ${Colors.PRIMARY}`
                          : "4px solid transparent",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                        py: 1,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive ? Colors.PRIMARY : "rgba(255,255,255,0.6)",
                          minWidth: 38,
                          "& svg": { fontSize: 20 },
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: isActive ? 600 : 500,
                              color: isActive
                                ? "#fff"
                                : "rgba(255,255,255,0.7)",
                              fontFamily: Poppins.style.fontFamily,
                            }}
                          >
                            {item.text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* Footer Profile */}
      <Box
        onClick={() => {
          router.push("/admin");
          if (onMobileClose) onMobileClose();
        }}
        sx={{
          mt: "auto",
          p: 2,
          bgcolor: "rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1, minWidth: 0 }}>
            <Avatar
              src={userAvatar}
              sx={{
                bgcolor: Colors.PRIMARY,
                width: 32,
                height: 32,
                fontSize: "12px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {getInitials(userName)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                sx={{
                  fontSize: FontSizes.SMALL,
                  fontWeight: FontWeights.MEDIUM,
                  color: Colors.WHITE,
                }}
              >
                {userName}
              </Typography>
              <Typography
                noWrap
                sx={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}
              >
                {formatRoleName(userRole)}
              </Typography>
            </Box>
          </Box>
          <Logout />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Temporary Drawer (< lg) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            background: Colors.PRIMARY_DARK,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Permanent Drawer (>= lg) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            background: Colors.PRIMARY_DARK,
            color: Colors.WHITE,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

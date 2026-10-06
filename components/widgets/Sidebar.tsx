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

export const DRAWER_WIDTH = 270;
const drawerWidth = DRAWER_WIDTH;

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" }],
  },
  {
    title: "ANALYTICS",
    items: [
      {
        text: "School Management",
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

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onMobileClose,
}) => {
  const router = useRouter();
  const pathname = usePathname();

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
                const isActive =
                  pathname === item.path ||
                  pathname?.startsWith(`${item.path}/`);
                return (
                  <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => {
                        router.push(item.path);
                        if (onMobileClose) onMobileClose();
                      }}
                      sx={{
                        borderRadius: "10px",
                        bgcolor: isActive ? Colors.ACCENT_MINT : "transparent",
                        "&:hover": {
                          bgcolor: isActive
                            ? Colors.ACCENT_MINT
                            : "rgba(255,255,255,0.06)",
                        },
                        py: 1,
                        px: 1.5,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive
                            ? Colors.PRIMARY_DARK
                            : Colors.BORDER_STONE,
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
                              fontWeight: isActive ? 700 : 500,
                              color: isActive
                                ? Colors.PRIMARY_DARK
                                : Colors.BORDER_STONE,
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

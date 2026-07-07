"use client";
import React from "react";
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
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
  WorkspacePremium as MembershipIcon,
  PeopleAlt as PeopleIcon,
  AccountCircle as StudentIcon,
  Lightbulb as PatentIcon,
  Description as ResearchIcon,
  RocketLaunch as StartupIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";
import { FontSizes, FontWeights } from "@/utils/style";
import { Poppins } from "@/utils/font";
import { useRouter, usePathname } from "next/navigation";
import { Logout } from "./Logout";

const drawerWidth = "17%";

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" }],
  },
  {
    title: "ANALYTICS",
    items: [
      {
        text: "School Membership Overview",
        icon: <InstitutionIcon />,
        path: "/membership-overview",
      },
      {
        text: "Teacher Certification Distribution",
        icon: <PeopleIcon />,
        path: "/teacher-certification",
      },
      {
        text: "Innovation & Research Status",
        icon: <PatentIcon />,
        path: "/innovation-research",
      },
      {
        text: "Student Startup Status",
        icon: <StartupIcon />,
        path: "/student-startups",
      },
    ],
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
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
      {/* Logo Section */}
      <Box sx={{ p: 3, mb: 1 }}>
        <Box
          component="img"
          src="/IAIRE_logo.png"
          alt="IAIRE Logo"
          sx={{
            height: 50,
            width: "auto",
            objectFit: "contain",
            maxWidth: "100%",
          }}
        />
      </Box>

      <Box sx={{ overflowY: "auto", px: 1.5 }}>
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
                      onClick={() => router.push(item.path)}
                      sx={{
                        borderRadius: "8px",
                        bgcolor: isActive
                          ? "rgba(255,255,255,0.1)"
                          : "transparent",
                        borderLeft: isActive
                          ? "4px solid #00D1C1"
                          : "4px solid transparent",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                        py: 1,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive ? "#00D1C1" : "rgba(255,255,255,0.6)",
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
        onClick={() => router.push("/admin")}
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
              sx={{
                bgcolor: "#00D1C1",
                width: 32,
                height: 32,
                fontSize: "12px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              CI
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
                CISCE Admin
              </Typography>
              <Typography
                noWrap
                sx={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}
              >
                Super Administrator
              </Typography>
            </Box>
          </Box>
          <Logout />
        </Box>
      </Box>
    </Drawer>
  );
};

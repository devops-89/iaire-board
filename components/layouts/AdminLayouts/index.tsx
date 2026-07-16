"use client";
import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { Poppins } from "@/utils/font";

// Internal Sections
import { AdminProfile } from "./AdminProfile";
import { TeamTable } from "./TeamTable";

export default function AdminLayout() {
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

        <Box>
          <Grid container spacing={3}>
            {/* Left Section: Profile & Team */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Box sx={{ mb: 4 }}>
                <AdminProfile />
              </Box>
              <TeamTable />
            </Grid>

            {/* Right Section: Activity & Actions */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Box
                sx={{
                  position: "sticky",
                  top: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* Activity Feed Card */}
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: "24px",
                    bgcolor: "#fff",
                    border: "1px solid rgba(0,0,0,0.04)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                  }}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: 800, mb: 3 }}>
                    Recent Activity
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    {[
                      {
                        action: "Updated School Stats",
                        time: "10 mins ago",
                        color: "#4285F4",
                      },
                      {
                        action: "Approved 12 Patents",
                        time: "1 hour ago",
                        color: "#34A853",
                      },
                      {
                        action: "Added New Sub-Admin",
                        time: "3 hours ago",
                        color: "#FBBC05",
                      },
                      {
                        action: "Backup Successful",
                        time: "5 hours ago",
                        color: "#8E24AA",
                      },
                    ].map((log, index) => (
                      <Box key={index} sx={{ display: "flex", gap: 2 }}>
                        <Box
                          sx={{
                            width: "4px",
                            height: "32px",
                            bgcolor: log.color,
                            borderRadius: "4px",
                          }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#122333",
                            }}
                          >
                            {log.action}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "rgba(0,0,0,0.4)",
                              fontWeight: 500,
                            }}
                          >
                            {log.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    sx={{
                      mt: 3,
                      color: "#122333",
                      fontWeight: 700,
                      fontSize: "13px",
                      textTransform: "none",
                    }}
                  >
                    View All Logs
                  </Button>
                </Paper>

                <Button
                  variant="text"
                  sx={{
                    color: "#D0021B",
                    fontWeight: 700,
                    textTransform: "none",
                    alignSelf: "center",
                  }}
                >
                  Terminate All Sessions
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

"use client";
import React, { useState } from "react";
import { Box, Button, Typography, Paper, InputBase } from "@mui/material";
import { Sidebar } from "@/components/widgets/Sidebar";
import { Navbar } from "@/components/widgets/Navbar";
import { InnovationTable } from "@/components/layouts/InnovationLayouts/InnovationTable";
import { ResearchTable } from "@/components/layouts/ResearchLayouts/ResearchTable";
import { Poppins } from "@/utils/font";
import { Colors } from "@/utils/enum";
import {
  LightbulbOutlined as IdeaIcon,
  MenuBookOutlined as ResearchIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

export default function InnovationResearchPage() {
  const [activeTab, setActiveTab] = useState<"innovations" | "research">(
    "innovations",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (tab: "innovations" | "research") => {
    setActiveTab(tab);
    setSearchQuery("");
  };

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
          px: { xs: 1.5, sm: 2, md: 3 },
          pt: { xs: 2, sm: 3 },
          pb: 3,
        }}
      >
        <Navbar />

        {/* Page Heading */}
        <Box sx={{ mt: 0, mb: 3 }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              letterSpacing: "-0.5px",
            }}
          >
            Innovation & Research Status
          </Typography>
        </Box>

        {/* Flex Row with Segmented Tabs and Search Bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            mb: 2,
          }}
        >
          {/* Premium Segmented Tabs with Sliding Active Pill */}
          <Box
            sx={{
              display: "inline-flex",
              position: "relative",
              bgcolor: "rgba(18, 35, 51, 0.04)",
              borderRadius: "14px",
              p: "5px",
              border: "1px solid rgba(18, 35, 51, 0.06)",
              width: "320px",
            }}
          >
            {/* Sliding Background Indicator Pill */}
            <Box
              sx={{
                position: "absolute",
                top: "5px",
                left: "5px",
                width: "calc(50% - 5px)",
                height: "calc(100% - 10px)",
                bgcolor: Colors.PRIMARY_DARK,
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(18, 35, 51, 0.15)",
                transform:
                  activeTab === "innovations"
                    ? "translateX(0)"
                    : "translateX(100%)",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 1,
              }}
            />

            <Button
              onClick={() => handleTabChange("innovations")}
              startIcon={<IdeaIcon sx={{ fontSize: 18 }} />}
              sx={{
                flex: 1,
                color:
                  activeTab === "innovations"
                    ? "#fff"
                    : "rgba(18, 35, 51, 0.6)",
                bgcolor: "transparent",
                fontWeight: 700,
                borderRadius: "10px",
                py: 1,
                textTransform: "none",
                fontSize: "14px",
                transition: "color 0.3s ease",
                zIndex: 2,
                "&:hover": {
                  bgcolor: "transparent",
                  color:
                    activeTab === "innovations" ? "#fff" : Colors.PRIMARY_DARK,
                },
              }}
            >
              Innovations
            </Button>
            <Button
              onClick={() => handleTabChange("research")}
              startIcon={<ResearchIcon sx={{ fontSize: 18 }} />}
              sx={{
                flex: 1,
                color:
                  activeTab === "research" ? "#fff" : "rgba(18, 35, 51, 0.6)",
                bgcolor: "transparent",
                fontWeight: 700,
                borderRadius: "10px",
                py: 1,
                textTransform: "none",
                fontSize: "14px",
                transition: "color 0.3s ease",
                zIndex: 2,
                "&:hover": {
                  bgcolor: "transparent",
                  color:
                    activeTab === "research" ? "#fff" : Colors.PRIMARY_DARK,
                },
              }}
            >
              Research
            </Button>
          </Box>

          {/* Premium Search Box */}
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: "100px",
              border: "1px solid rgba(18,35,51,0.08)",
              bgcolor: "#fff",
              width: { xs: "100%", sm: "320px" },
              transition: "all 0.3s ease",
              "&:focus-within": {
                borderColor: Colors.PRIMARY_DARK,
                boxShadow: "0 4px 20px rgba(18, 35, 51, 0.08)",
              },
            }}
          >
            <SearchIcon
              sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: 20, mr: 1 }}
            />
            <InputBase
              placeholder={
                activeTab === "innovations"
                  ? "Search innovations..."
                  : "Search research papers..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: Colors.PRIMARY_DARK,
                width: "100%",
                "& input::placeholder": {
                  color: "rgba(18, 35, 51, 0.4)",
                  opacity: 1,
                },
              }}
            />
          </Paper>
        </Box>

        {/* Tab Content */}
        {activeTab === "innovations" ? (
          <InnovationTable searchQuery={searchQuery} />
        ) : (
          <ResearchTable searchQuery={searchQuery} />
        )}
      </Box>
    </Box>
  );
}

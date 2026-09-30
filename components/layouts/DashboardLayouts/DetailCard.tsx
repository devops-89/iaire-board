"use client";
import React from "react";
import { Box, Typography, Paper, alpha } from "@mui/material";
import { Colors } from "@/utils/enum";
import { 
  School as SchoolIcon, 
  WorkspacePremium as PremiumIcon, 
  Verified as VerifiedIcon,
  CheckCircle as SuccessIcon,
  HourglassEmpty as PendingIcon,
  EmojiEvents as AwardIcon,
  Groups as GroupsIcon
} from "@mui/icons-material";

// Local Icon Mapping for Detail Cards
const IconMap: any = {
  school: SchoolIcon,
  premium: PremiumIcon,
  verified: VerifiedIcon,
  success: SuccessIcon,
  pending: PendingIcon,
  award: AwardIcon,
  groups: GroupsIcon,
};

export const DetailCard = ({ title, value, subtext, iconKey, color }: any) => {
  const Icon = IconMap[iconKey] || SchoolIcon;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        bgcolor: "#fff",
        border: `1px solid ${Colors.BORDER_STONE}`,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(16, 18, 22, 0.06)",
          borderColor: Colors.PRIMARY_DARK,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: Colors.PRIMARY_DARK,
              lineHeight: 1.3,
              maxWidth: "75%",
            }}
          >
            {title}
          </Typography>
          
          {/* Top Right Icon Box */}
          <Box
            sx={{
              bgcolor: `${color}15`,
              color: color,
              p: 0.8,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: 18 }} />
          </Box>
        </Box>
        

      </Box>

      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(18, 35, 51, 0.5)",
          textTransform: "capitalize",
        }}
      >
        {subtext}
      </Typography>
    </Paper>
  );
};

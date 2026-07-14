"use client";
import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { Colors } from "@/utils/enum";

interface CreatorProfileHeaderProps {
  createdByUser: any;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const CreatorProfileHeader = ({
  createdByUser,
  capitalizeWord,
}: CreatorProfileHeaderProps) => {
  if (!createdByUser) return null;

  return (
    <>
      {/* Profile Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Avatar
          src={
            createdByUser.profileImageDownloadUrl ||
            createdByUser.profileImage ||
            undefined
          }
          sx={{
            width: 56,
            height: 56,
            border: `2px solid ${Colors.PRIMARY}`,
            boxShadow: "0 4px 12px rgba(32, 103, 106, 0.15)",
          }}
        >
          {createdByUser.fullName?.charAt(0) || "C"}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              color: Colors.PRIMARY_DARK,
            }}
          >
            {capitalizeWord(createdByUser.fullName)}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(18, 35, 51, 0.5)",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {createdByUser.role?.replaceAll("_", " ").toLowerCase() ||
              "Creator"}
          </Typography>
        </Box>
      </Box>

      {/* Bio Section */}
      {createdByUser.bio && (
        <Box
          sx={{
            p: 1.5,
            bgcolor: "rgba(32, 103, 106, 0.05)",
            borderLeft: `3px solid ${Colors.PRIMARY}`,
            borderRadius: "0 8px 8px 0",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              color: "rgba(18, 35, 51, 0.7)",
              fontStyle: "italic",
            }}
          >
            "{createdByUser.bio}"
          </Typography>
        </Box>
      )}
    </>
  );
};

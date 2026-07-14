"use client";
import React from "react";
import { Paper, Typography, Box, Avatar } from "@mui/material";
import {
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  WcOutlined as GenderIcon,
  WorkOutlineOutlined as ExpIcon,
  MenuBookOutlined as SubjectIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface MentorCardProps {
  mentor: any;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const MentorCard = ({ mentor, capitalizeWord }: MentorCardProps) => {
  if (!mentor) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "20px",
        bgcolor: "#fff",
        border: "1px solid rgba(18, 35, 51, 0.05)",
        boxShadow: "0 10px 30px rgba(18, 35, 51, 0.03)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: Colors.PRIMARY_DARK,
          mb: 2.5,
        }}
      >
        Mentor Details
      </Typography>
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
            mentor.profileImageDownloadUrl || mentor.profileImage || undefined
          }
          sx={{
            width: 56,
            height: 56,
            border: `2px solid ${Colors.PRIMARY}`,
            boxShadow: "0 4px 12px rgba(32, 103, 106, 0.15)",
          }}
        >
          {mentor.fullName?.charAt(0) || "M"}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              color: Colors.PRIMARY_DARK,
            }}
          >
            {capitalizeWord(mentor.fullName)}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(18, 35, 51, 0.5)",
              fontWeight: 500,
            }}
          >
            Lead Mentor
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <EmailIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
          <Typography
            sx={{
              fontSize: "13px",
              color: "rgba(18, 35, 51, 0.7)",
              fontWeight: 500,
            }}
          >
            {mentor.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PhoneIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
          <Typography
            sx={{
              fontSize: "13px",
              color: "rgba(18, 35, 51, 0.7)",
              fontWeight: 500,
            }}
          >
            {mentor.phone || "--"}
          </Typography>
        </Box>
        {mentor.gender && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <GenderIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
            <Typography
              sx={{
                fontSize: "13px",
                color: "rgba(18, 35, 51, 0.7)",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {mentor.gender}
            </Typography>
          </Box>
        )}
        {mentor.experienceYears && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <ExpIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
            <Typography
              sx={{
                fontSize: "13px",
                color: "rgba(18, 35, 51, 0.7)",
                fontWeight: 500,
              }}
            >
              {mentor.experienceYears} Years Experience
            </Typography>
          </Box>
        )}
        {mentor.primarySubjects && mentor.primarySubjects.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            <SubjectIcon
              sx={{
                color: Colors.PRIMARY,
                fontSize: 20,
                mt: 0.2,
              }}
            />
            <Typography
              sx={{
                fontSize: "13px",
                color: "rgba(18, 35, 51, 0.7)",
                fontWeight: 500,
              }}
            >
              Subjects: {mentor.primarySubjects.join(", ")}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

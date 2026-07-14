"use client";
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import {
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  WcOutlined as GenderIcon,
  CalendarTodayOutlined as CalendarIcon,
  LocationOnOutlined as LocationIcon,
  CorporateFareOutlined as BoardIcon,
  MenuBookOutlined as SubjectIcon,
  WorkOutlineOutlined as ExpIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface CreatorDetailsListProps {
  createdByUser: any;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const CreatorDetailsList = ({
  createdByUser,
  capitalizeWord,
}: CreatorDetailsListProps) => {
  if (!createdByUser) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Email */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <EmailIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
        <Typography
          sx={{
            fontSize: "13px",
            color: "rgba(18, 35, 51, 0.7)",
            fontWeight: 500,
          }}
        >
          {createdByUser.email}
        </Typography>
      </Box>

      {/* Phone */}
      {createdByUser.phone && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PhoneIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
          <Typography
            sx={{
              fontSize: "13px",
              color: "rgba(18, 35, 51, 0.7)",
              fontWeight: 500,
            }}
          >
            {createdByUser.phone}
          </Typography>
        </Box>
      )}

      {/* Gender & DOB */}
      {(createdByUser.gender || createdByUser.dob) && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {createdByUser.gender && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <GenderIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "rgba(18, 35, 51, 0.7)",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {createdByUser.gender.toLowerCase()}
              </Typography>
            </Box>
          )}
          {createdByUser.dob && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <CalendarIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "rgba(18, 35, 51, 0.7)",
                  fontWeight: 500,
                }}
              >
                DOB: {createdByUser.dob}
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* State & District */}
      {(createdByUser.state || createdByUser.isdCode) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {createdByUser.state && (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              <LocationIcon
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
                  textTransform: "capitalize",
                }}
              >
                State: {createdByUser.state.toLowerCase()}
              </Typography>
            </Box>
          )}
          {createdByUser.isdCode && (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              <BoardIcon
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
                ISD Code: {createdByUser.isdCode}
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Professional Section: Subjects & Experience */}
      {(createdByUser.primarySubjects?.length > 0 ||
        createdByUser.experienceYears ||
        createdByUser.experienceMonths) && (
        <Box
          sx={{
            pt: 2,
            borderTop: "1px solid rgba(18, 35, 51, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {createdByUser.primarySubjects?.length > 0 && (
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
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.8,
                }}
              >
                {createdByUser.primarySubjects.map((sub: string, i: number) => (
                  <Chip
                    key={i}
                    label={capitalizeWord(sub)}
                    size="small"
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      bgcolor: "rgba(32, 103, 106, 0.08)",
                      color: Colors.PRIMARY,
                      borderRadius: "6px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
          {(createdByUser.experienceYears ||
            createdByUser.experienceMonths) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <ExpIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "rgba(18, 35, 51, 0.7)",
                  fontWeight: 500,
                }}
              >
                Experience: {createdByUser.experienceYears || 0} yr{" "}
                {createdByUser.experienceMonths || 0} mo
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

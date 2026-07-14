"use client";
import React from "react";
import { Paper, Typography, Box, Avatar } from "@mui/material";
import {
  SchoolOutlined as SchoolIcon,
  HomeWorkOutlined as AddressIcon,
  LocationOnOutlined as LocationIcon,
  LanguageOutlined as WebsiteIcon,
  CorporateFareOutlined as BoardIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SchoolCardProps {
  school: any;
  board: any;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const SchoolCard = ({
  school,
  board,
  capitalizeWord,
}: SchoolCardProps) => {
  if (!school) return null;

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
        School & Affiliation
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
          src={school.schoolLogoDownloadUrl || school.logo || undefined}
          variant="rounded"
          sx={{
            width: 56,
            height: 56,
            bgcolor: "rgba(32, 103, 106, 0.05)",
            border: "1px solid rgba(18, 35, 51, 0.05)",
          }}
        >
          <SchoolIcon sx={{ color: Colors.PRIMARY }} />
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              color: Colors.PRIMARY_DARK,
            }}
          >
            {school.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(18, 35, 51, 0.5)",
              fontWeight: 500,
            }}
          >
            Code: {school.code || "--"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Address */}
        {(school.address || school.addressLine1 || school.addressLine2) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            <AddressIcon
              sx={{ color: Colors.PRIMARY, fontSize: 20, mt: 0.2 }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "rgba(18, 35, 51, 0.7)",
                  fontWeight: 500,
                }}
              >
                {[school.address, school.addressLine1, school.addressLine2]
                  .filter(Boolean)
                  .map((str: string) => capitalizeWord(str))
                  .join(", ")}
              </Typography>
            </Box>
          </Box>
        )}

        {/* City, State & Zip */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <LocationIcon sx={{ color: Colors.PRIMARY, fontSize: 20, mt: 0.2 }} />
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                color: "rgba(18, 35, 51, 0.7)",
                fontWeight: 500,
              }}
            >
              {capitalizeWord(school.city)},{" "}
              {capitalizeWord(school.state) || "India"}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "rgba(18, 35, 51, 0.4)",
                mt: 0.5,
              }}
            >
              Zip Code: {school.zipCode || "--"}
            </Typography>
          </Box>
        </Box>

        {/* Website */}
        {school.website && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <WebsiteIcon sx={{ color: Colors.PRIMARY, fontSize: 20 }} />
            <Typography
              component="a"
              href={school.website}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: "13px",
                color: Colors.PRIMARY,
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {school.website}
            </Typography>
          </Box>
        )}

        {board && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              mt: 1,
            }}
          >
            <BoardIcon sx={{ color: Colors.PRIMARY, fontSize: 20, mt: 0.2 }} />
            <Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "rgba(18, 35, 51, 0.7)",
                  fontWeight: 700,
                }}
              >
                {board.name} ({board.code})
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "rgba(18, 35, 51, 0.4)",
                  mt: 0.2,
                }}
              >
                {board.description}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

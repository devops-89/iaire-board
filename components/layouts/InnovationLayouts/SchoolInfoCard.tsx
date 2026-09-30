import React from "react";
import {
  Paper,
  Stack,
  Avatar,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import {
  Business as SchoolIcon,
  Language as WebIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SchoolInfoCardProps {
  school: any;
  countryName?: string;
}

export const SchoolInfoCard: React.FC<SchoolInfoCardProps> = ({
  school,
  countryName,
}) => {
  if (!school) return null;

  const schoolAddressParts = [
    school.addressLine1 || school.address,
    school.city,
    school.state,
    countryName || school.country?.name || "India",
  ].filter(Boolean);
  const schoolAddress = schoolAddressParts.join(", ") || "--";

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 4 },
        borderRadius: "20px",
        border: `1px solid ${Colors.BORDER_STONE}`,
        boxShadow: "0 4px 20px rgba(16, 18, 22, 0.04)",
        bgcolor: "#fff",
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ mb: 3, alignItems: "center" }}>
        <SchoolIcon sx={{ color: Colors.PRIMARY_DARK, fontSize: 24 }} />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 800,
            color: Colors.PRIMARY_DARK,
          }}
        >
          School Information
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2.5,
          alignItems: "center",
          mb: 3,
        }}
      >
        {school.schoolLogoDownloadUrl || school.logo ? (
          <Avatar
            src={school.schoolLogoDownloadUrl || school.logo}
            variant="rounded"
            sx={{
              width: 64,
              height: 64,
              border: `1px solid ${Colors.BORDER_STONE}`,
              bgcolor: "#fafafa",
              flexShrink: 0,
            }}
          />
        ) : (
          <Avatar
            variant="rounded"
            sx={{
              width: 64,
              height: 64,
              bgcolor: Colors.ACCENT_MINT,
              color: Colors.PRIMARY_DARK,
              border: `1px solid ${Colors.BORDER_STONE}`,
              flexShrink: 0,
            }}
          >
            <SchoolIcon sx={{ fontSize: 32 }} />
          </Avatar>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {school.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "rgba(16, 18, 22, 0.55)",
              fontWeight: 600,
              wordBreak: "break-word",
            }}
          >
            Code: {school.code || "--"} | Affiliation:{" "}
            {school.affiliationNumber || "--"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: `rgba(212, 210, 205, 0.45)` }} />

      <Stack spacing={2}>
        <Box>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(18, 35, 51, 0.4)",
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            School Address
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: Colors.PRIMARY_DARK,
            }}
          >
            {schoolAddress}
          </Typography>
        </Box>

        {school.board?.name && (
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Board Association
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {school.board.name}
            </Typography>
          </Box>
        )}

        {(countryName || school.country?.name) && (
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Country
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {countryName || school.country?.name}
            </Typography>
          </Box>
        )}

        {school.website && (
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Website
            </Typography>
            <Button
              href={school.website}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WebIcon sx={{ fontSize: 16 }} />}
              sx={{
                textTransform: "none",
                fontSize: "13px",
                fontWeight: 700,
                color: "#2196F3",
                p: 0,
                minWidth: 0,
                "&:hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Visit Website
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

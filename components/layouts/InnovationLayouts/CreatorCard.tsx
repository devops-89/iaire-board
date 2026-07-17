import React from "react";
import {
  Paper,
  Stack,
  Avatar,
  Box,
  Typography,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import { Colors } from "@/utils/enum";

const formatStatus = (status: string) => {
  if (!status) return "--";
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

interface CreatorCardProps {
  creator: any;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  if (!creator) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "24px",
        border: "1px solid rgba(18, 35, 51, 0.05)",
        boxShadow: "0 10px 40px rgba(18, 35, 51, 0.02)",
        bgcolor: "#fff",
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ mb: 3, alignItems: "center" }}>
        <PersonIcon sx={{ color: Colors.PRIMARY_DARK, fontSize: 24 }} />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 800,
            color: Colors.PRIMARY_DARK,
          }}
        >
          Submitted By
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: "center" }}>
        {creator.profileImageDownloadUrl || creator.profileImage ? (
          <Avatar
            src={creator.profileImageDownloadUrl || creator.profileImage}
            sx={{
              width: 56,
              height: 56,
              border: "2px solid #fff",
              boxShadow: "0 4px 10px rgba(18,35,51,0.08)",
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "rgba(18,35,51,0.05)",
              color: Colors.PRIMARY_DARK,
            }}
          >
            <PersonIcon />
          </Avatar>
        )}
        <Box>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
            }}
          >
            {creator.fullName ||
              `${creator.firstName || ""} ${creator.lastName || ""}`.trim() ||
              "--"}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(18, 35, 51, 0.4)",
              fontWeight: 600,
            }}
          >
            {creator.email}
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(18, 35, 51, 0.4)",
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Role
          </Typography>
          <Chip
            label={formatStatus(creator.role)}
            size="small"
            sx={{
              bgcolor:
                creator.role?.toUpperCase() === "STUDENT"
                  ? "rgba(33, 150, 243, 0.08)"
                  : "rgba(15, 157, 88, 0.08)",
              color:
                creator.role?.toUpperCase() === "STUDENT"
                  ? "#2196F3"
                  : "#0F9D58",
              fontWeight: 700,
              fontSize: "11px",
              borderRadius: "6px",
            }}
          />
        </Grid>

        {creator.phone && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Phone
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {creator.countryCode || ""} {creator.phone}
            </Typography>
          </Grid>
        )}

        {creator.gender && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Gender
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {formatStatus(creator.gender)}
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Parent Details inside Creator Card */}
      {(creator.fatherName || creator.motherName) && (
        <>
          <Divider sx={{ my: 3, borderColor: "rgba(18,35,51,0.06)" }} />

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              mb: 2.5,
            }}
          >
            Parent / Guardian Information
          </Typography>

          <Grid container spacing={4}>
            {/* Father Info */}
            {creator.fatherName && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: Colors.PRIMARY_DARK,
                    mb: 1.5,
                    borderBottom: "1px solid rgba(18,35,51,0.06)",
                    pb: 0.5,
                  }}
                >
                  Father's Details
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "rgba(18, 35, 51, 0.4)",
                        textTransform: "uppercase",
                        mb: 0.2,
                      }}
                    >
                      Name
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: Colors.PRIMARY_DARK,
                      }}
                    >
                      {creator.fatherName}
                    </Typography>
                  </Box>
                  {creator.fatherEmail && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 0.2,
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {creator.fatherEmail}
                      </Typography>
                    </Box>
                  )}
                  {creator.fatherPhone && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 0.2,
                        }}
                      >
                        Phone
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {creator.fatherPhone}
                      </Typography>
                    </Box>
                  )}
                  {creator.fatherProfession && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 0.2,
                        }}
                      >
                        Profession
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {creator.fatherProfession}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            )}

            {/* Mother Info */}
            {creator.motherName && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: Colors.PRIMARY_DARK,
                    mb: 1.5,
                    borderBottom: "1px solid rgba(18,35,51,0.06)",
                    pb: 0.5,
                  }}
                >
                  Mother's Details
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "rgba(18, 35, 51, 0.4)",
                        textTransform: "uppercase",
                        mb: 0.2,
                      }}
                    >
                      Name
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: Colors.PRIMARY_DARK,
                      }}
                    >
                      {creator.motherName}
                    </Typography>
                  </Box>
                  {creator.motherEmail && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 0.2,
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {creator.motherEmail}
                      </Typography>
                    </Box>
                  )}
                  {creator.motherPhone && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 0.2,
                        }}
                      >
                        Phone
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {creator.motherPhone}
                      </Typography>
                    </Box>
                  )}
                  {creator.motherProfession && (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "rgba(18, 35, 51, 0.4)",
                          textTransform: "uppercase",
                          mb: 0.2,
                        }}
                      >
                        Profession
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: Colors.PRIMARY_DARK,
                        }}
                      >
                        {creator.motherProfession}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Paper>
  );
};

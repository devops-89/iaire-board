"use client";
import React from "react";
import { Grid, Paper, Typography, Box, Avatar, Button } from "@mui/material";
import {
  LocationOnOutlined as LocationIcon,
  CorporateFareOutlined as BoardIcon,
  AssignmentTurnedInOutlined as CertificateIcon,
  DescriptionOutlined as DocIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SchoolProfileTabProps {
  school: any;
  fullAddress: string;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const SchoolProfileTab = ({
  school,
  fullAddress,
  capitalizeWord,
}: SchoolProfileTabProps) => {
  if (!school) return null;

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
      {/* General Info Card */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: "24px",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              mb: 3.5,
            }}
          >
            Contact & Address Details
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {/* Full Address */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  border: "1px solid rgba(18, 35, 51, 0.03)",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#fff",
                    boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                    borderColor: "rgba(18, 35, 51, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
                    color: "#F43F5E",
                    flexShrink: 0,
                  }}
                >
                  <LocationIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "rgba(18, 35, 51, 0.5)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Full Address
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: Colors.PRIMARY_DARK,
                      fontWeight: 700,
                      mt: 0.5,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {fullAddress || "No address details available."}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* City */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  border: "1px solid rgba(18, 35, 51, 0.03)",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#fff",
                    boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                    borderColor: "rgba(18, 35, 51, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: "rgba(59, 130, 246, 0.08)",
                    color: "#3B82F6",
                  }}
                >
                  <LocationIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "rgba(18, 35, 51, 0.5)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    City
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: Colors.PRIMARY_DARK,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {capitalizeWord(school.city) || "--"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* State */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  border: "1px solid rgba(18, 35, 51, 0.03)",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#fff",
                    boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                    borderColor: "rgba(18, 35, 51, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: "rgba(245, 158, 11, 0.08)",
                    color: "#F59E0B",
                  }}
                >
                  <LocationIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "rgba(18, 35, 51, 0.5)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    State
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: Colors.PRIMARY_DARK,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {capitalizeWord(school.state) || "--"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Zip Code */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  border: "1px solid rgba(18, 35, 51, 0.03)",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#fff",
                    boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                    borderColor: "rgba(18, 35, 51, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: "rgba(20, 184, 166, 0.08)",
                    color: "#14B8A6",
                  }}
                >
                  <LocationIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "rgba(18, 35, 51, 0.5)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Postal Zip Code
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: Colors.PRIMARY_DARK,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {school.zipCode || "--"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Affiliation Board */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  border: "1px solid rgba(18, 35, 51, 0.03)",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#fff",
                    boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                    borderColor: "rgba(18, 35, 51, 0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    bgcolor: "rgba(139, 92, 246, 0.08)",
                    color: "#8B5CF6",
                  }}
                >
                  <BoardIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "rgba(18, 35, 51, 0.5)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Affiliation Board
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: Colors.PRIMARY_DARK,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {school.boardId === 1
                      ? "CISCE Board"
                      : `Board ID: ${school.boardId}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Accreditation & Certificates */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: "24px",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            bgcolor: "#fff",
            boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              mb: 3.5,
            }}
          >
            Accreditation & Certificates
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "16px",
              bgcolor: "rgba(18, 35, 51, 0.015)",
              border: "1px dashed rgba(18, 35, 51, 0.1)",
              textAlign: "center",
              minHeight: "220px",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(0, 209, 193, 0.08)",
                color: "#00D1C1",
                width: 64,
                height: 64,
                mb: 2,
              }}
            >
              <CertificateIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 800,
                color: Colors.PRIMARY_DARK,
                mb: 0.5,
              }}
            >
              Affiliation Certificate
            </Typography>

            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(18, 35, 51, 0.4)",
                mb: 2.5,
              }}
            >
              {school.affiliationNumber
                ? `Affiliation No: ${school.affiliationNumber}`
                : "Official affiliation document"}
            </Typography>

            {school.affiliationCertificateDownloadUrl ||
            school.affiliationCertificate ? (
              <Button
                variant="contained"
                component="a"
                href={
                  school.affiliationCertificateDownloadUrl ||
                  school.affiliationCertificate ||
                  undefined
                }
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<DocIcon />}
                sx={{
                  bgcolor: Colors.PRIMARY_DARK,
                  color: "#fff",
                  "&:hover": { bgcolor: "#1A2B3B" },
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "13px",
                  borderRadius: "10px",
                  px: 3,
                  py: 1,
                  boxShadow: "none",
                }}
              >
                View Certificate
              </Button>
            ) : (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "rgba(18, 35, 51, 0.4)",
                  fontWeight: 700,
                }}
              >
                No certificate uploaded
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

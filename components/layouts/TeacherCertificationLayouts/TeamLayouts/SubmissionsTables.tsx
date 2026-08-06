"use client";
import React from "react";
import {
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import {
  RocketLaunchOutlined as StartupIcon,
  LocalOfferOutlined as SectorIcon,
  FlagOutlined as StageIcon,
  LightbulbOutlined as IdeaIcon,
  MenuBookOutlined as SubjectIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SubmissionsTablesProps {
  startups: any[];
  innovations: any[];
  researchSubmissions: any[];
  getStatusColor: (status: string) => { bg: string; text: string };
}

export const SubmissionsTables = ({
  startups,
  innovations,
  researchSubmissions,
  getStatusColor,
}: SubmissionsTablesProps) => {
  return (
    <>
      {/* Startups Table */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid rgba(18, 35, 51, 0.05)",
          boxShadow: "0 10px 30px rgba(18, 35, 51, 0.03)",
          mb: { xs: 2.5, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <StartupIcon sx={{ color: Colors.PRIMARY, fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: Colors.PRIMARY_DARK, fontSize: { xs: "16px", sm: "18px" } }}
          >
            Registered Startups ({startups?.length || 0})
          </Typography>
        </Box>

        {!startups || startups.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography
              sx={{
                color: "rgba(18, 35, 51, 0.4)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              No registered startups associated with this team.
            </Typography>
          </Box>
        ) : (
          <TableContainer
            sx={{
              border: "1px solid rgba(18, 35, 51, 0.08)",
              borderRadius: "12px",
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "rgba(18, 35, 51, 0.015)" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Startup Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Sector
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Stage
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Idea / Problem Statement
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {startups.map((startup: any) => {
                  const statusStyle = getStatusColor(startup.status);
                  return (
                    <TableRow
                      key={startup.id}
                      sx={{
                        "&:last-child td": { borderBottom: "none" },
                        "&:hover": { bgcolor: "rgba(18, 35, 51, 0.005)" },
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                            fontSize: "14px",
                          }}
                        >
                          {startup.startupName}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <SectorIcon
                            sx={{ fontSize: 16, color: Colors.PRIMARY }}
                          />
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "rgba(18, 35, 51, 0.7)",
                              fontWeight: 500,
                            }}
                          >
                            {startup.sector || "General"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <StageIcon
                            sx={{ fontSize: 16, color: Colors.PRIMARY }}
                          />
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "rgba(18, 35, 51, 0.7)",
                              fontWeight: 500,
                              textTransform: "uppercase",
                            }}
                          >
                            {startup.stage || "IDEA"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, maxWidth: 300 }}>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.7)",
                            fontWeight: 500,
                            lineHeight: 1.4,
                          }}
                        >
                          {startup.businessIdea || "--"}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "rgba(18, 35, 51, 0.4)",
                            mt: 0.5,
                            fontStyle: "italic",
                          }}
                        >
                          Problem: {startup.problemStatement || "--"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={startup.status || "PENDING"}
                          size="small"
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.text,
                            fontWeight: 700,
                            fontSize: "10px",
                            borderRadius: "6px",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Innovations Table */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid rgba(18, 35, 51, 0.05)",
          boxShadow: "0 10px 30px rgba(18, 35, 51, 0.03)",
          mb: { xs: 2.5, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <IdeaIcon sx={{ color: Colors.PRIMARY, fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: Colors.PRIMARY_DARK, fontSize: { xs: "16px", sm: "18px" } }}
          >
            Registered Innovations ({innovations?.length || 0})
          </Typography>
        </Box>

        {!innovations || innovations.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography
              sx={{
                color: "rgba(18, 35, 51, 0.4)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              No registered innovations associated with this team.
            </Typography>
          </Box>
        ) : (
          <TableContainer
            sx={{
              border: "1px solid rgba(18, 35, 51, 0.08)",
              borderRadius: "12px",
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "rgba(18, 35, 51, 0.015)" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Innovation Title
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Problem Statement
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Proposed Solution
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {innovations.map((innovation: any) => {
                  const statusStyle = getStatusColor(innovation.status);
                  return (
                    <TableRow
                      key={innovation.id}
                      sx={{
                        "&:last-child td": { borderBottom: "none" },
                        "&:hover": { bgcolor: "rgba(18, 35, 51, 0.005)" },
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                            fontSize: "14px",
                          }}
                        >
                          {innovation.title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, maxWidth: 300 }}>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.7)",
                            fontWeight: 500,
                            lineHeight: 1.4,
                          }}
                        >
                          {innovation.problemDescription || "--"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, maxWidth: 300 }}>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.7)",
                            fontWeight: 500,
                            lineHeight: 1.4,
                          }}
                        >
                          {innovation.solution || "--"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                            alignItems: "flex-start",
                          }}
                        >
                          <Chip
                            label={innovation.status || "PENDING"}
                            size="small"
                            sx={{
                              bgcolor: statusStyle.bg,
                              color: statusStyle.text,
                              fontWeight: 700,
                              fontSize: "10px",
                              borderRadius: "6px",
                            }}
                          />
                          {innovation.status === "REJECTED" &&
                            innovation.reviewComments && (
                              <Typography
                                sx={{
                                  fontSize: "11px",
                                  color: "#C5221F",
                                  fontWeight: 500,
                                  mt: 0.5,
                                  fontStyle: "italic",
                                }}
                              >
                                Reason: {innovation.reviewComments}
                              </Typography>
                            )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Research Submissions Table */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid rgba(18, 35, 51, 0.05)",
          boxShadow: "0 10px 30px rgba(18, 35, 51, 0.03)",
          mb: { xs: 2.5, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <SubjectIcon sx={{ color: Colors.PRIMARY, fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: Colors.PRIMARY_DARK, fontSize: { xs: "16px", sm: "18px" } }}
          >
            Research Submissions ({researchSubmissions?.length || 0})
          </Typography>
        </Box>

        {!researchSubmissions || researchSubmissions.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography
              sx={{
                color: "rgba(18, 35, 51, 0.4)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              No research submissions associated with this team.
            </Typography>
          </Box>
        ) : (
          <TableContainer
            sx={{
              border: "1px solid rgba(18, 35, 51, 0.08)",
              borderRadius: "12px",
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: "rgba(18, 35, 51, 0.015)" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Research Title
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Topic
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "rgba(18, 35, 51, 0.6)",
                      fontSize: "12px",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {researchSubmissions.map((submission: any) => {
                  const statusStyle = getStatusColor(submission.status);
                  return (
                    <TableRow
                      key={submission.id}
                      sx={{
                        "&:last-child td": { borderBottom: "none" },
                        "&:hover": { bgcolor: "rgba(18, 35, 51, 0.005)" },
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                            fontSize: "14px",
                          }}
                        >
                          {submission.title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.7)",
                            fontWeight: 500,
                          }}
                        >
                          {submission.topic || "General"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, maxWidth: 300 }}>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "rgba(18, 35, 51, 0.7)",
                            fontWeight: 500,
                            lineHeight: 1.4,
                          }}
                        >
                          {submission.description || "--"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={submission.status || "PENDING"}
                          size="small"
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.text,
                            fontWeight: 700,
                            fontSize: "10px",
                            borderRadius: "6px",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
};

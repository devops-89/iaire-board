"use client";
import React from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
} from "@mui/material";
import { DashboardData } from "@/assets/generic-data";

const StudentMetricCard = ({ label, value, subtext, color }: any) => (
  <Paper
    sx={{
      p: 2.5,
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.08)",
      borderTop: `4px solid ${color}`,
      bgcolor: "#fff",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 12px 30px ${color}15`,
        borderColor: `${color}40`,
      },
    }}
  >
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#122333",
          lineHeight: 1.3,
          mb: 2,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 800,
          color: color,
          letterSpacing: "-1px",
          lineHeight: 1,
          mb: 1,
        }}
      >
        {value}
      </Typography>
    </Box>
    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "rgba(0,0,0,0.6)" }}>
      {subtext}
    </Typography>
  </Paper>
);

const CoverageCard = ({ label, pct, color }: any) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: "16px",
      border: "1px solid rgba(0,0,0,0.05)",
      mb: 1.5,
      bgcolor: "#fff",
      boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#122333" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "13px", fontWeight: 800, color: color }}>
        {pct}%
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={pct}
      sx={{
        height: 6,
        borderRadius: 3,
        bgcolor: "#F5F1E8",
        "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 3 },
      }}
    />
  </Paper>
);

export const StudentSuccess = () => {
  const successData = DashboardData.studentSuccess;
  const topMetrics = successData?.topMetrics || [];
  const coverage = successData?.coverage || [];
  const portfolio = successData?.startupPortfolio || [];
  const ipSummary = successData?.ipSummary || [];

  return (
    <Box>
      {/* TOP CARDS ROW */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(5, 1fr)",
          },
          gap: 2,
          width: "100%",
          alignItems: "stretch",
          mb: 4,
        }}
      >
        {topMetrics.map((metric: any, index: number) => (
          <StudentMetricCard key={index} {...metric} />
        ))}
      </Box>

      <Grid container spacing={3}>
        {/* COVERAGE COLUMN */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "24px",
              border: "1px solid rgba(0,0,0,0.08)",
              bgcolor: "#fff",
              boxShadow: "0 5px 20px rgba(0,0,0,0.02)",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 800,
                mb: 3,
                color: "#122333",
              }}
            >
              Student Training Coverage by Category
            </Typography>
            {coverage.map((item: any, index: number) => (
              <CoverageCard key={index} {...item} />
            ))}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "24px",
              border: "1px solid rgba(0,0,0,0.08)",
              bgcolor: "#fff",
              boxShadow: "0 5px 20px rgba(0,0,0,0.02)",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 800,
                mb: 3,
                color: "#122333",
              }}
            >
              Student Startup Portfolio Summary
            </Typography>

            <TableContainer sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#122333",
                      }}
                    >
                      CATEGORY
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#122333",
                      }}
                    >
                      COUNT
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#122333",
                      }}
                    >
                      SHARE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#122333",
                      }}
                    >
                      STATUS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {portfolio.map((row: any) => (
                    <TableRow key={row.cat}>
                      <TableCell
                        sx={{ fontSize: "12px", fontWeight: 700, py: 1 }}
                      >
                        {row.cat}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "13px",
                          fontWeight: 800,
                          color: row.color,
                        }}
                      >
                        {row.count}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "12px", fontWeight: 600, color: "#122333" }}
                      >
                        {row.share}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            fontSize: "10px",
                            fontWeight: 700,
                            bgcolor: `${row.color}15`,
                            color: row.color,
                            height: 20,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontSize: "13px", fontWeight: 800, py: 1.5, color: "#122333" }}>
                      Total Startups
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "14px", fontWeight: 900, color: "#122333" }}>
                      842
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "13px", fontWeight: 800, color: "#122333" }}>
                      100%
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 3, opacity: 0.1 }} />

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#122333",
                    }}
                  >
                    IP CATEGORY
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#122333",
                    }}
                  >
                    SUBMITTED / PENDING
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#122333",
                    }}
                  >
                    PUBLISHED / GRANTED
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#122333",
                    }}
                  >
                    TOTAL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ipSummary.map((row: any) => (
                  <TableRow key={row.cat} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                      sx={{ fontSize: "12px", fontWeight: 700, py: 1.5 }}
                    >
                      {row.cat}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: row.pColor,
                      }}
                    >
                      {row.pending}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: row.color,
                      }}
                    >
                      {row.granted}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 900,
                        color: "#122333",
                      }}
                    >
                      {row.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

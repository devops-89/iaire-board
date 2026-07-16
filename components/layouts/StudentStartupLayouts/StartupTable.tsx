"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  IconButton,
  Button,
  InputBase,
  Avatar,
} from "@mui/material";
import {
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { startupControllers } from "@/api/startup";
import { Colors } from "@/utils/enum";
import { useRouter } from "next/navigation";

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase();
  if (s === "APPROVED" || s === "ACTIVE" || s === "FUNDED" || s === "PATENT_GRANTED") {
    return { bg: "rgba(15, 157, 88, 0.08)", text: "#0F9D58" };
  }
  if (s === "REJECTED" || s === "INACTIVE" || s === "CLOSED") {
    return { bg: "rgba(219, 68, 85, 0.08)", text: "#DB4437" };
  }
  return { bg: "rgba(244, 180, 0, 0.08)", text: "#F4B400" };
};

const formatText = (text: string) => {
  if (!text) return "--";
  return text
    .replace(/_/g, " ")
    .replace(/"/g, "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

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

export const StartupTable = () => {
  const router = useRouter();
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStartups, setTotalStartups] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const res = await startupControllers.getStartups(
          currentPage,
          itemsPerPage,
          searchQuery
        );
        if (res?.data && res.data.success) {
          const payload = res.data.data;
          const list = payload.data || payload;
          setStartups(Array.isArray(list) ? list : []);

          if (payload?.pagination) {
            setTotalStartups(payload.pagination.total || 0);
            setTotalPages(payload.pagination.totalPages || 1);
          } else {
            const size = list?.length || 0;
            setTotalStartups(size);
            setTotalPages(Math.ceil(size / itemsPerPage) || 1);
          }
        } else {
          setStartups([]);
          setTotalStartups(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch startups list:", error);
        setStartups([]);
        setTotalStartups(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchStartups();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const indexOfLast = indexOfFirst + startups.length;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Top Header & Search Bar Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 800,
            color: Colors.PRIMARY_DARK,
            letterSpacing: "-0.5px",
          }}
        >
          Student Startup Status
        </Typography>

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            borderRadius: "100px",
            border: "1px solid rgba(18,35,51,0.08)",
            bgcolor: "#fff",
            width: { xs: "100%", sm: "320px" },
            transition: "all 0.3s ease",
            "&:focus-within": {
              borderColor: Colors.PRIMARY_DARK,
              boxShadow: "0 4px 20px rgba(18, 35, 51, 0.08)",
            },
          }}
        >
          <SearchIcon
            sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: 20, mr: 1 }}
          />
          <InputBase
            placeholder="Search startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: Colors.PRIMARY_DARK,
              width: "100%",
              "& input::placeholder": {
                color: "rgba(18, 35, 51, 0.4)",
                opacity: 1,
              },
            }}
          />
        </Paper>
      </Box>

      {/* Main Table Container Card */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "24px",
          boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
          border: "1px solid rgba(18, 35, 51, 0.05)",
          overflow: "hidden",
          position: "relative",
          bgcolor: "#fff",
          minHeight: loading ? "240px" : "auto",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 12,
              width: "100%",
            }}
          >
            <CircularProgress sx={{ color: Colors.PRIMARY_DARK }} />
          </Box>
        ) : startups.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: "14px", fontWeight: 500 }}>
              No startups found
            </Typography>
          </Box>
        ) : (
          <>
            <Table>
              <TableHead
                sx={{
                  bgcolor: "rgba(18, 35, 51, 0.015)",
                  borderBottom: "1px solid rgba(18, 35, 51, 0.08)",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      py: 2,
                      px: 3,
                    }}
                  >
                    Startup Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      py: 2,
                      px: 3,
                    }}
                  >
                    Sector
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      py: 2,
                      px: 3,
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {startups.map((startup) => {
                  const statusStyle = getStatusColor(startup.status);
                  return (
                    <TableRow
                      key={startup.id}
                      onClick={() => router.push(`/student-startups/${startup.id}`)}
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderBottom: "1px solid rgba(18, 35, 51, 0.04)",
                        "&:last-child": { borderBottom: "none" },
                        "&:hover": {
                          bgcolor: "rgba(18, 35, 51, 0.015)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 4px 15px rgba(18, 35, 51, 0.03)",
                        },
                      }}
                    >
                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Typography sx={{ fontWeight: 700, color: Colors.PRIMARY_DARK, fontSize: "14px", lineHeight: 1.3 }}>
                          {formatText(startup.startupName)}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Typography sx={{ fontSize: "13px", color: "rgba(18, 35, 51, 0.7)", fontWeight: 500 }}>
                          {formatText(startup.sector) || "--"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Chip
                          label={formatStatus(startup.status || "PENDING")}
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

            {/* Pagination Row */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 2.5,
                borderTop: "1px solid rgba(18, 35, 51, 0.05)",
                bgcolor: "#FBF9F6",
              }}
            >
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "rgba(18, 35, 51, 0.5)" }}>
                Showing {totalStartups === 0 ? 0 : indexOfFirst + 1} to{" "}
                {Math.min(indexOfLast, totalStartups)} of {totalStartups} startups
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  sx={{
                    border: "1px solid rgba(18, 35, 51, 0.08)",
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    width: 36,
                    height: 36,
                  }}
                >
                  <PrevIcon sx={{ fontSize: 18 }} />
                </IconButton>

                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === currentPage;
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      sx={{
                        minWidth: 36,
                        height: 36,
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: isActive ? 800 : 600,
                        color: isActive ? "#fff" : Colors.PRIMARY_DARK,
                        bgcolor: isActive ? Colors.PRIMARY_DARK : "transparent",
                        p: 0,
                      }}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <IconButton
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  sx={{
                    border: "1px solid rgba(18, 35, 51, 0.08)",
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    width: 36,
                    height: 36,
                  }}
                >
                  <NextIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </TableContainer>
    </Box>
  );
};

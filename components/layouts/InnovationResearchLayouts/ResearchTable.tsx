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
} from "@mui/material";
import {
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
} from "@mui/icons-material";
import { researchControllers } from "@/api/research";
import { Colors } from "@/utils/enum";

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase();
  if (s === "APPROVED" || s === "ACTIVE" || s === "PUBLISHED" || s === "PATENT_GRANTED") {
    return { bg: "rgba(15, 157, 88, 0.08)", text: "#0F9D58" };
  }
  if (s === "REJECTED" || s === "INACTIVE") {
    return { bg: "rgba(219, 68, 85, 0.08)", text: "#DB4437" };
  }
  return { bg: "rgba(244, 180, 0, 0.08)", text: "#F4B400" };
};

const formatTitle = (title: string) => {
  if (!title) return "--";
  return title
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

interface ResearchTableProps {
  searchQuery: string;
}

export const ResearchTable: React.FC<ResearchTableProps> = ({ searchQuery }) => {
  const [researchList, setResearchList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResearch, setTotalResearch] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        setLoading(true);
        const res = await researchControllers.getResearchSubmissions(
          currentPage,
          itemsPerPage,
          searchQuery
        );
        if (res?.data && res.data.success) {
          const payload = res.data.data;
          const list = payload.data || payload;
          setResearchList(Array.isArray(list) ? list : []);

          if (payload?.pagination) {
            setTotalResearch(payload.pagination.total || 0);
            setTotalPages(payload.pagination.totalPages || 1);
          } else {
            const size = list?.length || 0;
            setTotalResearch(size);
            setTotalPages(Math.ceil(size / itemsPerPage) || 1);
          }
        } else {
          setResearchList([]);
          setTotalResearch(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch research submissions:", error);
        setResearchList([]);
        setTotalResearch(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResearch();
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
  const indexOfLast = indexOfFirst + researchList.length;

  return (
    <Box>
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
        ) : researchList.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: "14px", fontWeight: 500 }}>
              No research submissions found
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
                    Research Title
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
                    Topic
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
                    Description
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
                {researchList.map((submission) => {
                  const statusStyle = getStatusColor(submission.status);
                  return (
                    <TableRow
                      key={submission.id}
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
                          {formatTitle(submission.title)}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Typography sx={{ fontSize: "13px", color: "rgba(18, 35, 51, 0.7)", fontWeight: 500 }}>
                          {submission.topic || "--"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3, maxWidth: 300 }}>
                        <Typography sx={{ fontSize: "13px", color: "rgba(18, 35, 51, 0.7)", fontWeight: 500, lineHeight: 1.4 }}>
                          {submission.description || "--"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Chip
                          label={formatStatus(submission.status || "PENDING")}
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
                Showing {totalResearch === 0 ? 0 : indexOfFirst + 1} to{" "}
                {Math.min(indexOfLast, totalResearch)} of {totalResearch} research submissions
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

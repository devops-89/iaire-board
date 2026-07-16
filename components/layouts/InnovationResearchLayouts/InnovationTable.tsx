"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { innovationControllers } from "@/api/innovation";
import { Colors } from "@/utils/enum";

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase();
  if (s === "APPROVED" || s === "ACTIVE" || s === "PATENT_GRANTED") {
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

interface InnovationTableProps {
  searchQuery: string;
}

export const InnovationTable: React.FC<InnovationTableProps> = ({ searchQuery }) => {
  const router = useRouter();
  const [innovations, setInnovations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInnovations, setTotalInnovations] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchInnovations = async () => {
      try {
        setLoading(true);
        const res = await innovationControllers.getInnovations(
          currentPage,
          itemsPerPage,
          searchQuery
        );
        if (res?.data && res.data.success) {
          const payload = res.data.data;
          const list = payload.data || payload;
          setInnovations(Array.isArray(list) ? list : []);

          if (payload?.pagination) {
            setTotalInnovations(payload.pagination.total || 0);
            setTotalPages(payload.pagination.totalPages || 1);
          } else {
            const size = list?.length || 0;
            setTotalInnovations(size);
            setTotalPages(Math.ceil(size / itemsPerPage) || 1);
          }
        } else {
          setInnovations([]);
          setTotalInnovations(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch innovations:", error);
        setInnovations([]);
        setTotalInnovations(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchInnovations();
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
  const indexOfLast = indexOfFirst + innovations.length;

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
        ) : innovations.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: "14px", fontWeight: 500 }}>
              No innovations found
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
                    Innovation Title
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
                    Problem Statement
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
                    Proposed Solution
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
                {innovations.map((innovation) => {
                  const statusStyle = getStatusColor(innovation.status);
                  return (
                    <TableRow
                      key={innovation.id}
                      onClick={() => router.push(`/innovation-research/innovation/${innovation.id}`)}
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
                          {formatTitle(innovation.title)}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3, maxWidth: 300 }}>
                        <Typography sx={{ fontSize: "13px", color: "rgba(18, 35, 51, 0.7)", fontWeight: 500, lineHeight: 1.4 }}>
                          {innovation.problemDescription || "--"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3, maxWidth: 300 }}>
                        <Typography sx={{ fontSize: "13px", color: "rgba(18, 35, 51, 0.7)", fontWeight: 500, lineHeight: 1.4 }}>
                          {innovation.solutionDescription || innovation.solution || "--"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 3 }}>
                        <Chip
                          label={formatStatus(innovation.status || "PENDING")}
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
                Showing {totalInnovations === 0 ? 0 : indexOfFirst + 1} to{" "}
                {Math.min(indexOfLast, totalInnovations)} of {totalInnovations} innovations
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

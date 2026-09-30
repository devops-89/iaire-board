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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { innovationControllers } from "@/api/innovation";
import { Colors } from "@/utils/enum";

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase();
  if (s === "APPROVED" || s === "ACTIVE" || s === "PATENT_GRANTED") {
    return { bg: Colors.ACCENT_MINT, text: Colors.PRIMARY_DARK, isMint: true };
  }
  if (s === "REJECTED" || s === "INACTIVE") {
    return { bg: "rgba(219, 68, 85, 0.08)", text: "#DB4437", isMint: false };
  }
  return { bg: "#F4F2EE", text: "#735B29", isMint: false };
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
  searchQuery?: string;
}

export const InnovationTable: React.FC<InnovationTableProps> = ({
  searchQuery = "",
}) => {
  const router = useRouter();
  const [innovations, setInnovations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInnovations, setTotalInnovations] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInnovation, setSelectedInnovation] = useState<any>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    innovation: any,
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedInnovation(innovation);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedInnovation(null);
  };

  const handleViewDetails = () => {
    if (selectedInnovation) {
      router.push(`/innovation-research/innovation/${selectedInnovation.id}`);
    }
    handleCloseMenu();
  };

  useEffect(() => {
    const fetchInnovations = async () => {
      try {
        setLoading(true);
        const res = await innovationControllers.getInnovations(
          currentPage,
          itemsPerPage,
          searchQuery,
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
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(16, 18, 22, 0.04)",
          border: `1px solid ${Colors.BORDER_STONE}`,
          overflowX: "auto",
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
            <Typography
              sx={{
                color: "rgba(16, 18, 22, 0.4)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              No innovations found
            </Typography>
          </Box>
        ) : (
          <>
            <Table sx={{ minWidth: 650 }}>
              <TableHead
                sx={{
                  bgcolor: "#FAFBFD",
                  borderBottom: `1px solid ${Colors.BORDER_STONE}`,
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
                      px: { xs: 2, sm: 3 },
                      width: { xs: 200, sm: 280 },
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
                      px: { xs: 2, sm: 3 },
                      width: { xs: 200, sm: 280 },
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
                      px: { xs: 2, sm: 3 },
                      width: { xs: 200, sm: 280 },
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
                      px: { xs: 2, sm: 3 },
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      py: 2,
                      px: { xs: 2, sm: 3 },
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {innovations.map((innovation) => {
                  const statusStyle = getStatusColor(innovation.status);
                  return (
                    <TableRow
                      key={innovation.id}
                      onClick={() =>
                        router.push(
                          `/innovation-research/innovation/${innovation.id}`,
                        )
                      }
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderBottom: "1px solid rgba(212, 210, 205, 0.45)",
                        "&:last-child": { borderBottom: "none" },
                        "&:hover": {
                          bgcolor: "rgba(221, 255, 247, 0.14)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 4px 16px rgba(16, 18, 22, 0.03)",
                        },
                      }}
                    >
                      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 }, width: { xs: 200, sm: 280 } }}>
                        <Typography
                          noWrap
                          title={formatTitle(innovation.title)}
                          sx={{
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                            fontSize: "14px",
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: 260,
                          }}
                        >
                          {formatTitle(innovation.title)}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 }, width: { xs: 200, sm: 280 } }}>
                        <Typography
                          noWrap
                          title={innovation.problemDescription || ""}
                          sx={{
                            fontSize: "13px",
                            color: "rgba(16, 18, 22, 0.7)",
                            fontWeight: 500,
                            lineHeight: 1.4,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: 260,
                          }}
                        >
                          {innovation.problemDescription || "--"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 }, width: { xs: 200, sm: 280 } }}>
                        <Typography
                          noWrap
                          title={
                            innovation.solutionDescription ||
                            innovation.solution ||
                            ""
                          }
                          sx={{
                            fontSize: "13px",
                            color: "rgba(16, 18, 22, 0.7)",
                            fontWeight: 500,
                            lineHeight: 1.4,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: 260,
                          }}
                        >
                          {innovation.solutionDescription ||
                            innovation.solution ||
                            "--"}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
                        <Chip
                          icon={
                            statusStyle.isMint ? (
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  bgcolor: "#0D9488",
                                  mr: -0.5,
                                }}
                              />
                            ) : undefined
                          }
                          label={formatStatus(innovation.status || "PENDING")}
                          size="small"
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.text,
                            fontWeight: 800,
                            fontSize: "11px",
                            borderRadius: "8px",
                            border: `1px solid ${
                              statusStyle.isMint
                                ? "rgba(13, 148, 136, 0.25)"
                                : "transparent"
                            }`,
                            px: 0.5,
                            height: "26px",
                          }}
                        />
                      </TableCell>

                      <TableCell align="right" sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenMenu(e, innovation);
                          }}
                          sx={{
                            color: "rgba(16, 18, 22, 0.4)",
                            "&:hover": {
                              bgcolor: Colors.ACCENT_MINT,
                              color: Colors.PRIMARY_DARK,
                            },
                          }}
                        >
                          <MoreIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
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
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: { xs: 1.5, sm: 0 },
                px: { xs: 2, sm: 3 },
                py: 2.2,
                borderTop: `1px solid ${Colors.BORDER_STONE}`,
                bgcolor: "#FAFBFD",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(16, 18, 22, 0.55)",
                }}
              >
                Showing {totalInnovations === 0 ? 0 : indexOfFirst + 1} to{" "}
                {Math.min(indexOfLast, totalInnovations)} of {totalInnovations}{" "}
                innovations
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  sx={{
                    border: `1px solid ${Colors.BORDER_STONE}`,
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    width: 36,
                    height: 36,
                    color: Colors.PRIMARY_DARK,
                    "&:hover:not(:disabled)": {
                      bgcolor: Colors.ACCENT_MINT,
                      borderColor: Colors.BORDER_STONE,
                    },
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
                        color: isActive ? Colors.ACCENT_MINT : Colors.PRIMARY_DARK,
                        bgcolor: isActive ? Colors.PRIMARY_DARK : "transparent",
                        border: isActive
                          ? `1px solid ${Colors.PRIMARY_DARK}`
                          : `1px solid transparent`,
                        p: 0,
                        "&:hover": {
                          bgcolor: isActive
                            ? Colors.PRIMARY_DARK
                            : Colors.ACCENT_MINT,
                          color: isActive
                            ? Colors.ACCENT_MINT
                            : Colors.PRIMARY_DARK,
                        },
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
                    border: `1px solid ${Colors.BORDER_STONE}`,
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    width: 36,
                    height: 36,
                    color: Colors.PRIMARY_DARK,
                    "&:hover:not(:disabled)": {
                      bgcolor: Colors.ACCENT_MINT,
                      borderColor: Colors.BORDER_STONE,
                    },
                  }}
                >
                  <NextIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        elevation={0}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "14px",
              boxShadow: "0 10px 30px rgba(16, 18, 22, 0.08)",
              border: `1px solid ${Colors.BORDER_STONE}`,
              bgcolor: "#fff",
              minWidth: "140px",
              p: 0.5,
              mt: 0.5,
              "& .MuiMenuItem-root": {
                px: 1.5,
                py: 1,
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: Colors.PRIMARY_DARK,
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                transition: "all 0.15s ease",
                "&:hover": {
                  bgcolor: Colors.ACCENT_MINT,
                  color: Colors.PRIMARY_DARK,
                  "& .MuiListItemIcon-root": {
                    color: Colors.PRIMARY_DARK,
                  },
                },
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon
            sx={{
              color: Colors.PRIMARY_DARK,
              minWidth: "auto !important",
              transition: "color 0.15s ease",
            }}
          >
            <ViewIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: Colors.PRIMARY_DARK }}>
                View Details
              </Typography>
            }
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

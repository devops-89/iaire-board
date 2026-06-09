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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { VisibilityOutlined as ViewIcon } from "@mui/icons-material";
import { schoolControllers } from "@/api/school";
import { Colors } from "@/utils/enum";
import { School } from "@/utils/types";
import { SchoolTableHeader } from "./SchoolTableHeader";
import { SchoolTableRow } from "./SchoolTableRow";
import { SchoolTablePagination } from "./SchoolTablePagination";

import { useRouter } from "next/navigation";

export const SchoolTable = () => {
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSchools, setTotalSchools] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const schoolsPerPage = 10;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    school: School,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSchool(school);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSchool(null);
  };

  const handleViewDetails = () => {
    if (selectedSchool) {
      router.push(`/membership-overview/${selectedSchool.id}`);
    }
    handleCloseMenu();
  };

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const res = await schoolControllers.getSchools(
          1,
          currentPage,
          10,
          searchQuery,
        );
        if (res?.data && res.data.success) {
          const payload = res.data.data;
          if (payload && Array.isArray(payload.data)) {
            setSchools(payload.data);
          } else if (Array.isArray(payload)) {
            setSchools(payload);
          } else {
            setSchools([]);
          }

          if (payload?.pagination) {
            setTotalSchools(payload.pagination.total || 0);
            setTotalPages(payload.pagination.totalPages || 1);
          } else {
            const size = payload?.data?.length || payload?.length || 0;
            setTotalSchools(size);
            setTotalPages(Math.ceil(size / schoolsPerPage) || 1);
          }
        } else {
          setSchools([]);
          setTotalSchools(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch schools from API:", error);
        setSchools([]);
        setTotalSchools(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSchools();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery]);

  // Handle page resets on search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter logic
  const filteredSchools = schools.filter((school) => {
    const query = searchQuery.toLowerCase();
    return (
      school.name.toLowerCase().includes(query) ||
      (school.displayId?.toLowerCase() || "").includes(query) ||
      (school.membershipCode?.toLowerCase() || "").includes(query) ||
      String(school.registrationYear || "").includes(query) ||
      (school.address?.toLowerCase() || "").includes(query)
    );
  });

  const indexOfFirstSchool = (currentPage - 1) * schoolsPerPage;
  const indexOfLastSchool = indexOfFirstSchool + filteredSchools.length;
  const currentSchools = filteredSchools;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box>
      {/* Header bar with Search and Add Actions */}
      <SchoolTableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Table Container Card */}
      <TableContainer
        component={Paper}
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
        ) : (
          <>
            <Table>
              <TableHead
                sx={{
                  bgcolor: "rgba(18, 35, 51, 0.04)",
                  borderBottom: "2px solid rgba(18, 35, 51, 0.12)",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      py: 2.2,
                      px: 3,
                    }}
                  >
                    Display ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      py: 2.2,
                      px: 3,
                    }}
                  >
                    School Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      py: 2.2,
                      px: 3,
                    }}
                  >
                    Membership Code
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      py: 2.2,
                      px: 3,
                    }}
                  >
                    Registration Year
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      fontSize: "11px",
                      color: Colors.PRIMARY_DARK,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      py: 2.2,
                      px: 3,
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
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      py: 2.2,
                      px: 3,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentSchools.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography
                        sx={{
                          color: "rgba(18, 35, 51, 0.4)",
                          fontWeight: 600,
                          fontSize: "14px",
                        }}
                      >
                        No schools found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentSchools.map((school) => (
                    <SchoolTableRow
                      key={school.id}
                      school={school}
                      onOpenMenu={handleOpenMenu}
                      onRowClick={(school) => router.push(`/membership-overview/${school.id}`)}
                    />
                  ))
                )}
              </TableBody>
            </Table>

            {/* Premium Pagination Footer */}
            <SchoolTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalSchools={totalSchools}
              indexOfFirstSchool={indexOfFirstSchool}
              indexOfLastSchool={indexOfLastSchool}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onPageChange={setCurrentPage}
            />
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
              borderRadius: "10px",
              boxShadow: "0 6px 20px rgba(18, 35, 51, 0.06)",
              border: "1px solid rgba(18, 35, 51, 0.06)",
              bgcolor: "#fff",
              minWidth: "120px",
              py: 0.3,
              mt: 0.5,
              "& .MuiList-root": {
                py: 0,
              },
              "& .MuiMenuItem-root": {
                px: 1.5,
                py: 0.8,
                fontSize: "11px",
                fontWeight: 700,
                color: Colors.PRIMARY_DARK,
                display: "flex",
                alignItems: "center",
                gap: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "rgba(18, 35, 51, 0.04)",
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
              color: "#00D1C1",
              minWidth: "auto !important",
              transition: "color 0.2s ease",
            }}
          >
            <ViewIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                View Details
              </Typography>
            }
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

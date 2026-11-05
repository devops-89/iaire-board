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
} from "@mui/material";
import { schoolControllers } from "@/api/school";
import { Colors } from "@/utils/enum";
import { School } from "@/utils/types";
import { SchoolTableHeader } from "./SchoolTableHeader";
import { SchoolTableRow } from "./SchoolTableRow";
import { SchoolTablePagination } from "./SchoolTablePagination";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";

export const SchoolTable = () => {
  const router = useRouter();
  const { user, fetchUserDetails } = useAuth();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSchools, setTotalSchools] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const schoolsPerPage = 10;

  useEffect(() => {
    if (!user && fetchUserDetails) {
      fetchUserDetails();
    }
  }, []);

  const activeBoardId =
    user?.board?.id ||
    user?.boardId ||
    user?.board_id ||
    (user as any)?.board_admin?.boardId ||
    1;

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const res = await schoolControllers.getSchools(
          activeBoardId,
          currentPage,
          schoolsPerPage,
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
  }, [currentPage, searchQuery, activeBoardId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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

  const handleNavigate = (school: School) => {
    router.push(`/membership-overview/${school.id}`);
  };

  return (
    <Box>
      {/* Header bar with Capsule Search */}
      <SchoolTableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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
        ) : (
          <>
            <Table sx={{ minWidth: 700 }}>
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
                    }}
                  >
                    School ID
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
                    School Name
                  </TableCell>
                  <TableCell
                    align="center"
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
                    Teachers
                  </TableCell>
                  <TableCell
                    align="center"
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
                    Students
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
                {currentSchools.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                      <Typography
                        sx={{
                          color: "rgba(18, 35, 51, 0.4)",
                          fontWeight: 700,
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
                      onViewDetails={handleNavigate}
                      onRowClick={handleNavigate}
                    />
                  ))
                )}
              </TableBody>
            </Table>

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
    </Box>
  );
};

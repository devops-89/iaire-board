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
import { teacherControllers } from "@/api/teacher";
import { Colors } from "@/utils/enum";
import { Teacher } from "@/utils/types";
import { TeacherTableHeader } from "./TeacherTableHeader";
import { TeacherTableRow } from "./TeacherTableRow";
import { TeacherTablePagination } from "./TeacherTablePagination";
import { useRouter } from "next/navigation";

export const TeacherTable = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const teachersPerPage = 10;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    teacher: Teacher,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeacher(teacher);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTeacher(null);
  };

  const handleViewDetails = () => {
    if (selectedTeacher) {
      router.push(`/teacher-certification/${selectedTeacher.id}`);
    }
    handleCloseMenu();
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const res = await teacherControllers.getTeachers(
          currentPage,
          teachersPerPage,
          searchQuery,
        );

        if (res?.data && res.data.success) {
          const payload = res.data.data;

          let parsedTeachers: Teacher[] = [];
          if (payload && Array.isArray(payload.data)) {
            parsedTeachers = payload.data;
          } else if (Array.isArray(payload)) {
            parsedTeachers = payload;
          } else if (payload && typeof payload === "object") {
            // Some APIs structure it as res.data.data = [...]
            // or nested data object.
            parsedTeachers = [];
          }
          setTeachers(parsedTeachers);

          if (payload?.pagination) {
            setTotalTeachers(payload.pagination.total || parsedTeachers.length);
            setTotalPages(payload.pagination.totalPages || 1);
          } else {
            const size = payload?.total || parsedTeachers.length || 0;
            setTotalTeachers(size);
            setTotalPages(Math.ceil(size / teachersPerPage) || 1);
          }
        } else {
          setTeachers([]);
          setTotalTeachers(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch teachers from API:", error);
        setTeachers([]);
        setTotalTeachers(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchTeachers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery]);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Client-side filtering as a fallback/safety measure
  const filteredTeachers = teachers.filter((teacher) => {
    const query = searchQuery.toLowerCase();
    const name = (teacher.fullName || teacher.username || "").toLowerCase();
    const email = (teacher.email || "").toLowerCase();
    const displayId = (teacher.displayId || `#${teacher.id}`).toLowerCase();
    return (
      name.includes(query) || email.includes(query) || displayId.includes(query)
    );
  });

  const indexOfFirstTeacher = (currentPage - 1) * teachersPerPage;
  const indexOfLastTeacher = indexOfFirstTeacher + filteredTeachers.length;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box>
      <TeacherTableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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
                      px: 3,
                    }}
                  >
                    Teacher Name
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
                    Email Address
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
                  <TableCell
                    align="right"
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
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                      <Typography
                        sx={{
                          color: "rgba(18, 35, 51, 0.4)",
                          fontWeight: 600,
                          fontSize: "14px",
                        }}
                      >
                        No teachers found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <TeacherTableRow
                      key={teacher.id}
                      teacher={teacher}
                      onOpenMenu={handleOpenMenu}
                      onRowClick={(teacher) =>
                        router.push(`/teacher-certification/${teacher.id}`)
                      }
                    />
                  ))
                )}
              </TableBody>
            </Table>

            <TeacherTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalTeachers={totalTeachers}
              indexOfFirstTeacher={indexOfFirstTeacher}
              indexOfLastTeacher={indexOfLastTeacher}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </TableContainer>

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

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
  Avatar,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import {
  GroupOutlined as StudentIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherStudentsCardProps {
  students: any[];
  studentPage: number;
  setStudentPage: React.Dispatch<React.SetStateAction<number>>;
  studentsPerPage: number;
}

export const TeacherStudentsCard = ({
  students,
  studentPage,
  setStudentPage,
  studentsPerPage,
}: TeacherStudentsCardProps) => {
  const totalStudents = students?.length || 0;
  const totalStudentPages = Math.ceil(totalStudents / studentsPerPage) || 1;
  const indexOfFirstStudent = (studentPage - 1) * studentsPerPage;
  const indexOfLastStudent = indexOfFirstStudent + studentsPerPage;
  const currentStudents =
    students?.slice(indexOfFirstStudent, indexOfLastStudent) || [];

  return (
    <Paper
      elevation={0}
      sx={{
        pt: 4,
        px: 4,
        pb: 0,
        borderRadius: "24px",
        border: "1px solid rgba(18, 35, 51, 0.05)",
        bgcolor: "#fff",
        boxShadow: "0 10px 40px rgba(18, 35, 51, 0.03)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(37, 99, 235, 0.08)",
            color: "#2563EB",
          }}
        >
          <StudentIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 800, color: Colors.PRIMARY_DARK }}
        >
          Registered Students ({totalStudents})
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(18, 35, 51, 0.03)" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 800,
                  fontSize: "11px",
                  color: Colors.PRIMARY_DARK,
                  py: 1.5,
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 800,
                  fontSize: "11px",
                  color: Colors.PRIMARY_DARK,
                  py: 1.5,
                }}
              >
                Email Address
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 800,
                  fontSize: "11px",
                  color: Colors.PRIMARY_DARK,
                  py: 1.5,
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                  <Typography
                    sx={{
                      color: "rgba(18, 35, 51, 0.4)",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    No registered students
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentStudents.map((student: any) => {
                const studentName =
                  student.fullName ||
                  (student.firstName || student.lastName
                    ? `${student.firstName || ""} ${student.lastName || ""}`.trim()
                    : "") ||
                  student.username ||
                  "Student";
                return (
                  <TableRow
                    key={student.id}
                    sx={{ "&:hover": { bgcolor: "rgba(18, 35, 51, 0.01)" } }}
                  >
                    <TableCell sx={{ py: 1.5 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          src={student.profileImageDownloadUrl || undefined}
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {studentName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          {studentName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(18, 35, 51, 0.8)",
                        py: 1.5,
                      }}
                    >
                      {student.email}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip
                        label={student.status || "ACTIVE"}
                        size="small"
                        sx={{
                          bgcolor:
                            student.status === "ACTIVE" ||
                            student.status === "active"
                              ? "rgba(16, 185, 129, 0.08)"
                              : "rgba(107, 114, 128, 0.08)",
                          color:
                            student.status === "ACTIVE" ||
                            student.status === "active"
                              ? "#10B981"
                              : "#6B7280",
                          fontWeight: 800,
                          fontSize: "10px",
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalStudents > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2.5,
            borderTop: "1px solid rgba(18, 35, 51, 0.05)",
            bgcolor: "#FBF9F6",
            gap: 2,
            mt: 3,
            mx: -4,
            mb: 0,
            borderRadius: "0 0 24px 24px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(18, 35, 51, 0.5)",
            }}
          >
            Showing {indexOfFirstStudent + 1} to{" "}
            {Math.min(indexOfLastStudent, totalStudents)} of {totalStudents}{" "}
            students
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setStudentPage((prev) => Math.max(prev - 1, 1))}
              disabled={studentPage === 1}
              size="small"
              sx={{
                border: "1px solid rgba(18, 35, 51, 0.08)",
                borderRadius: "8px",
                bgcolor: "#fff",
                "&:hover": { bgcolor: "rgba(18, 35, 51, 0.04)" },
                width: 34,
                height: 34,
                "&.Mui-disabled": { opacity: 0.4 },
              }}
            >
              <PrevIcon sx={{ fontSize: 16 }} />
            </IconButton>

            {Array.from({ length: totalStudentPages }, (_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === studentPage;
              return (
                <Button
                  key={pageNum}
                  onClick={() => setStudentPage(pageNum)}
                  sx={{
                    minWidth: 34,
                    height: 34,
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? "#fff" : Colors.PRIMARY_DARK,
                    bgcolor: isActive ? Colors.PRIMARY_DARK : "transparent",
                    border: isActive ? "none" : "1px solid transparent",
                    "&:hover": {
                      bgcolor: isActive
                        ? Colors.PRIMARY_DARK
                        : "rgba(18, 35, 51, 0.04)",
                      opacity: isActive ? 0.9 : 1,
                      borderColor: isActive
                        ? "transparent"
                        : "rgba(18, 35, 51, 0.1)",
                    },
                    p: 0,
                  }}
                >
                  {pageNum}
                </Button>
              );
            })}

            <IconButton
              onClick={() =>
                setStudentPage((prev) => Math.min(prev + 1, totalStudentPages))
              }
              disabled={
                studentPage === totalStudentPages || totalStudentPages === 0
              }
              size="small"
              sx={{
                border: "1px solid rgba(18, 35, 51, 0.08)",
                borderRadius: "8px",
                bgcolor: "#fff",
                "&:hover": { bgcolor: "rgba(18, 35, 51, 0.04)" },
                width: 34,
                height: 34,
                "&.Mui-disabled": { opacity: 0.4 },
              }}
            >
              <NextIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

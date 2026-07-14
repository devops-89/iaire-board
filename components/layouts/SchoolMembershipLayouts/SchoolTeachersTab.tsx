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
  PeopleOutlined as PeopleIcon,
  EmailOutlined as EmailIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SchoolTeachersTabProps {
  teachers: any[];
  teacherPage: number;
  setTeacherPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}

export const SchoolTeachersTab = ({
  teachers,
  teacherPage,
  setTeacherPage,
  itemsPerPage,
}: SchoolTeachersTabProps) => {
  const totalTeachers = teachers?.length || 0;
  const totalTeacherPages = Math.ceil(totalTeachers / itemsPerPage) || 1;
  const currentTeachers =
    teachers?.slice(
      (teacherPage - 1) * itemsPerPage,
      teacherPage * itemsPerPage,
    ) || [];

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
            bgcolor: "rgba(59, 130, 246, 0.08)",
            color: "#3B82F6",
          }}
        >
          <PeopleIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 800,
            color: Colors.PRIMARY_DARK,
          }}
        >
          Registered Teachers ({totalTeachers})
        </Typography>
      </Box>

      {totalTeachers > 0 ? (
        <>
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
                    Designation / Subject
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTeachers.map((teacher: any) => {
                  const teacherName =
                    teacher.fullName || teacher.name || "Teacher";
                  return (
                    <TableRow
                      key={teacher.id}
                      sx={{
                        "&:hover": { bgcolor: "rgba(18, 35, 51, 0.01)" },
                      }}
                    >
                      <TableCell sx={{ py: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            src={teacher.avatar || undefined}
                            sx={{
                              width: 32,
                              height: 32,
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            {teacherName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: Colors.PRIMARY_DARK,
                            }}
                          >
                            {teacherName}
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
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <EmailIcon
                            sx={{
                              fontSize: 16,
                              color: "rgba(18, 35, 51, 0.35)",
                            }}
                          />
                          {teacher.email}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip
                          label={
                            teacher.designation || teacher.subject || "Teacher"
                          }
                          size="small"
                          sx={{
                            bgcolor: "rgba(0, 209, 193, 0.06)",
                            color: "#00D1C1",
                            fontWeight: 800,
                            fontSize: "11px",
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
              Showing {(teacherPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(teacherPage * itemsPerPage, totalTeachers)} of{" "}
              {totalTeachers} teachers
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => setTeacherPage((prev) => Math.max(prev - 1, 1))}
                disabled={teacherPage === 1}
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

              {Array.from({ length: totalTeacherPages }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === teacherPage;
                return (
                  <Button
                    key={pageNum}
                    onClick={() => setTeacherPage(pageNum)}
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
                  setTeacherPage((prev) =>
                    Math.min(prev + 1, totalTeacherPages),
                  )
                }
                disabled={teacherPage === totalTeacherPages}
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
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            px: 4,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(18, 35, 51, 0.03)",
              color: "rgba(18, 35, 51, 0.2)",
              width: 72,
              height: 72,
              mb: 2,
            }}
          >
            <PeopleIcon sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              mb: 0.5,
            }}
          >
            No Teachers Registered
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(18, 35, 51, 0.4)",
              mb: 4,
            }}
          >
            There are currently no teachers associated with this school.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

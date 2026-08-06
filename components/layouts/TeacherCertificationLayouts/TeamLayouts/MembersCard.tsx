"use client";
import React from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import { GroupOutlined as StudentIcon } from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface MembersCardProps {
  members: any[];
  capitalizeWord: (str: string | undefined | null) => string;
  getStatusColor: (status: string) => { bg: string; text: string };
}

export const MembersCard = ({
  members,
  capitalizeWord,
  getStatusColor,
}: MembersCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: { xs: "16px", sm: "20px" },
        bgcolor: "#fff",
        border: "1px solid rgba(18, 35, 51, 0.05)",
        boxShadow: "0 10px 30px rgba(18, 35, 51, 0.03)",
        maxHeight: { xs: "none", md: "calc(100vh - 160px)" },
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: Colors.PRIMARY_DARK,
          mb: 3,
          fontSize: { xs: "16px", sm: "18px" },
        }}
      >
        Team Members ({members?.length || 0})
      </Typography>

      {!members || members.length === 0 ? (
        <Box sx={{ py: 6, textAlign: "center", my: "auto" }}>
          <StudentIcon
            sx={{
              fontSize: 48,
              color: "rgba(18, 35, 51, 0.15)",
              mb: 1.5,
            }}
          />
          <Typography
            sx={{
              color: "rgba(18, 35, 51, 0.4)",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            No student members registered under this team.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            flexGrow: 1,
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(18, 35, 51, 0.1)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              bgcolor: "rgba(18, 35, 51, 0.2)",
            },
          }}
        >
          {members.map((member: any) => {
            const student = member.student;
            if (!student) return null;
            const isStudentActive =
              student.status === "ACTIVE" || student.isActive === true;
            const chipStyle = getStatusColor(
              student.status || (isStudentActive ? "ACTIVE" : "INACTIVE"),
            );

            return (
              <Box
                key={member.id}
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  border: "1px solid rgba(18, 35, 51, 0.03)",
                  bgcolor: "rgba(18, 35, 51, 0.01)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#fff",
                    boxShadow: "0 8px 24px rgba(18, 35, 51, 0.04)",
                    borderColor: "rgba(18, 35, 51, 0.08)",
                  },
                }}
              >
                {/* Student Details Header Row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: { xs: 1.5, sm: 2 },
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Avatar
                      src={
                        student.profileImageDownloadUrl ||
                        student.profileImage ||
                        undefined
                      }
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: "rgba(32, 103, 106, 0.08)",
                        color: Colors.PRIMARY,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {student.fullName?.charAt(0) ||
                        student.firstName?.charAt(0) ||
                        "S"}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "14px",
                          color: Colors.PRIMARY_DARK,
                          wordBreak: "break-word",
                        }}
                      >
                        {capitalizeWord(
                          student.fullName ||
                            `${student.firstName || ""} ${student.lastName || ""}`,
                        )}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "rgba(18, 35, 51, 0.4)",
                            fontWeight: 500,
                          }}
                        >
                          Grade: {student.grade || "--"}
                        </Typography>
                        {student.gender && (
                          <>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{ height: 12, my: "auto" }}
                            />
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "rgba(18, 35, 51, 0.4)",
                                fontWeight: 500,
                                textTransform: "capitalize",
                              }}
                            >
                              Gender: {student.gender.toLowerCase()}
                            </Typography>
                          </>
                        )}
                        {student.email && (
                          <>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{ height: 12, my: "auto" }}
                            />
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: "rgba(18, 35, 51, 0.4)",
                                fontWeight: 500,
                                wordBreak: "break-word",
                              }}
                            >
                              {student.email}
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "rgba(18, 35, 51, 0.5)",
                        fontWeight: 500,
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      {student.phone || "--"}
                    </Typography>
                    <Chip
                      label={
                        student.status ||
                        (isStudentActive ? "ACTIVE" : "INACTIVE")
                      }
                      size="small"
                      sx={{
                        bgcolor: chipStyle.bg,
                        color: chipStyle.text,
                        fontWeight: 700,
                        fontSize: "10px",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                </Box>

                {/* Parent Details and Tier Progress Section */}
                <Box
                  sx={{
                    pt: 1.5,
                    borderTop: "1px dashed rgba(18, 35, 51, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >

                  {/* Parents Grid */}
                  <Grid container spacing={1.5}>
                    {/* Father Info */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          p: 1.2,
                          borderRadius: "10px",
                          bgcolor: "rgba(18, 35, 51, 0.02)",
                          border: "1px solid rgba(18, 35, 51, 0.04)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                            mb: 0.5,
                            wordBreak: "break-word",
                          }}
                        >
                          Father:{" "}
                          {student.fatherName || member.fatherName || "--"}
                          {(student.fatherProfession ||
                            member.fatherProfession) &&
                            ` (${capitalizeWord(student.fatherProfession || member.fatherProfession)})`}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "rgba(18, 35, 51, 0.6)",
                              wordBreak: "break-word",
                            }}
                          >
                            Email:{" "}
                            {student.fatherEmail || member.fatherEmail || "--"}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "rgba(18, 35, 51, 0.6)",
                              wordBreak: "break-word",
                            }}
                          >
                            Phone:{" "}
                            {student.fatherPhone || member.fatherPhone || "--"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Mother Info */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          p: 1.2,
                          borderRadius: "10px",
                          bgcolor: "rgba(18, 35, 51, 0.02)",
                          border: "1px solid rgba(18, 35, 51, 0.04)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                            mb: 0.5,
                            wordBreak: "break-word",
                          }}
                        >
                          Mother:{" "}
                          {student.motherName || member.motherName || "--"}
                          {(student.motherProfession ||
                            member.motherProfession) &&
                            ` (${capitalizeWord(student.motherProfession || member.motherProfession)})`}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "rgba(18, 35, 51, 0.6)",
                              wordBreak: "break-word",
                            }}
                          >
                            Email:{" "}
                            {student.motherEmail || member.motherEmail || "--"}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "rgba(18, 35, 51, 0.6)",
                              wordBreak: "break-word",
                            }}
                          >
                            Phone:{" "}
                            {student.motherPhone || member.motherPhone || "--"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Paper>
  );
};

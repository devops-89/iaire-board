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
  GroupsOutlined as TeamIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherTeamsCardProps {
  teamsList: any[];
  teamPage: number;
  setTeamPage: React.Dispatch<React.SetStateAction<number>>;
  teamsPerPage: number;
  router: any;
}

export const TeacherTeamsCard = ({
  teamsList,
  teamPage,
  setTeamPage,
  teamsPerPage,
  router,
}: TeacherTeamsCardProps) => {
  const totalTeams = teamsList.length;
  const totalTeamsPages = Math.ceil(totalTeams / teamsPerPage) || 1;
  const indexOfFirstTeam = (teamPage - 1) * teamsPerPage;
  const indexOfLastTeam = indexOfFirstTeam + teamsPerPage;
  const currentTeams = teamsList.slice(indexOfFirstTeam, indexOfLastTeam);

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
            bgcolor: "rgba(139, 92, 246, 0.08)",
            color: "#8B5CF6",
          }}
        >
          <TeamIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 800, color: Colors.PRIMARY_DARK }}
        >
          Associated Teams & Innovations ({totalTeams})
        </Typography>
      </Box>

      <TableContainer>
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
                  py: 1.8,
                  px: 3,
                }}
              >
                Team Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 800,
                  fontSize: "11px",
                  color: Colors.PRIMARY_DARK,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  py: 1.8,
                  px: 3,
                }}
              >
                Innovations
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 800,
                  fontSize: "11px",
                  color: Colors.PRIMARY_DARK,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  py: 1.8,
                  px: 3,
                }}
              >
                Startups
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 800,
                  fontSize: "11px",
                  color: Colors.PRIMARY_DARK,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  py: 1.8,
                  px: 3,
                }}
              >
                Granted Patents
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 800,
                  fontSize: "11px",
                  color: Colors.PRIMARY_DARK,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  py: 1.8,
                  px: 3,
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography
                    sx={{
                      color: "rgba(18, 35, 51, 0.4)",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    No associated teams
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentTeams.map((team: any) => {
                const rawTeamName =
                  team.title || team.name || team.teamName || "Unnamed Team";
                const teamName = rawTeamName
                  .split(" ")
                  .filter(Boolean)
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() +
                      word.slice(1).toLowerCase(),
                  )
                  .join(" ");
                const innovationCountVal =
                  team.innovationCount ||
                  team.innovationsCount ||
                  team.projectCount ||
                  (team.projects && Array.isArray(team.projects)
                    ? team.projects.length
                    : 0) ||
                  0;
                const startupsCountVal = team.startupsCount || 0;
                const patentsCountVal =
                  team.grantedPatentsCount || team.patentsCount || 0;
                const teamStatus = team.status || "ACTIVE";
                const isTeamActive =
                  teamStatus === "ACTIVE" || teamStatus === "active";

                return (
                  <TableRow
                    key={team.id}
                    onClick={() => router.push(`/team/${team.id}`)}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      borderBottom: "1px solid rgba(18, 35, 51, 0.04)",
                      "&:last-child": { borderBottom: "none" },
                      "&:hover": {
                        bgcolor: "rgba(18, 35, 51, 0.015)",
                      },
                    }}
                  >
                    <TableCell sx={{ py: 1.8, px: 3 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: 12,
                            fontWeight: 800,
                            bgcolor: "rgba(139, 92, 246, 0.08)",
                            color: "#8B5CF6",
                            border: "1px solid rgba(139, 92, 246, 0.15)",
                          }}
                        >
                          {teamName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: Colors.PRIMARY_DARK,
                          }}
                        >
                          {teamName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.8, px: 3 }}>
                      <Box
                        sx={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#D97706",
                          bgcolor: "rgba(245, 158, 11, 0.08)",
                          px: 1.2,
                          py: 0.4,
                          borderRadius: "6px",
                          border: "1px solid rgba(245, 158, 11, 0.15)",
                          display: "inline-block",
                        }}
                      >
                        {innovationCountVal} Projects
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.8, px: 3 }}>
                      <Box
                        sx={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#008B81",
                          bgcolor: "rgba(0, 209, 193, 0.08)",
                          px: 1.2,
                          py: 0.4,
                          borderRadius: "6px",
                          border: "1px solid rgba(0, 209, 193, 0.15)",
                          display: "inline-block",
                        }}
                      >
                        {startupsCountVal} Startups
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.8, px: 3 }}>
                      <Box
                        sx={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#2563EB",
                          bgcolor: "rgba(59, 130, 246, 0.08)",
                          px: 1.2,
                          py: 0.4,
                          borderRadius: "6px",
                          border: "1px solid rgba(59, 130, 246, 0.15)",
                          display: "inline-block",
                        }}
                      >
                        {patentsCountVal} Patents
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.8, px: 3 }}>
                      <Chip
                        label={teamStatus}
                        size="small"
                        sx={{
                          bgcolor: isTeamActive
                            ? "rgba(16, 185, 129, 0.08)"
                            : "rgba(245, 158, 11, 0.08)",
                          color: isTeamActive ? "#10B981" : "#F59E0B",
                          fontWeight: 800,
                          fontSize: "10px",
                          borderRadius: "6px",
                          border: `1px solid ${
                            isTeamActive
                              ? "rgba(16, 185, 129, 0.15)"
                              : "rgba(245, 158, 11, 0.15)"
                          }`,
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

      {totalTeams > 0 && (
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
            Showing {indexOfFirstTeam + 1} to{" "}
            {Math.min(indexOfLastTeam, totalTeams)} of {totalTeams} teams
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setTeamPage((prev) => Math.max(prev - 1, 1))}
              disabled={teamPage === 1}
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

            {Array.from({ length: totalTeamsPages }, (_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === teamPage;
              return (
                <Button
                  key={pageNum}
                  onClick={() => setTeamPage(pageNum)}
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
                setTeamPage((prev) => Math.min(prev + 1, totalTeamsPages))
              }
              disabled={teamPage === totalTeamsPages || totalTeamsPages === 0}
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

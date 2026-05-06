"use client";
import React from "react";
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
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  MoreVert as MoreIcon,
  PersonAdd as AddIcon,
} from "@mui/icons-material";

const team = [
  {
    id: "ADM-001",
    name: "Kunal Sharma",
    role: "Super Admin",
    email: "kunal@cisce.gov.in",
    status: "Active",
    avatar: "K",
  },
  {
    id: "ADM-002",
    name: "Sarah Jones",
    role: "Moderator",
    email: "sarah@cisce.gov.in",
    status: "Active",
    avatar: "S",
  },
  {
    id: "ADM-003",
    name: "Michael Chen",
    role: "Editor",
    email: "michael@cisce.gov.in",
    status: "Inactive",
    avatar: "M",
  },
];

export const TeamTable = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: 800, color: "#122333" }}
        >
          Administrative Team
        </Typography>
        <IconButton
          sx={{
            bgcolor: "#122333",
            color: "#fff",
            "&:hover": { bgcolor: "#1A2B3B" },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          border: "1px solid rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#F8F9FA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#122333" }}>
                User
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#122333" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#122333" }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#122333" }}>
                Status
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: "#122333" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:hover": { bgcolor: "#FAF7F0" } }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#122333",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      {user.avatar}
                    </Avatar>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#122333",
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "14px", color: "rgba(18, 35, 51, 0.6)" }}
                  >
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                    {user.role}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      bgcolor: user.status === "Active" ? "#E6F9F8" : "#F1F2F4",
                      color: user.status === "Active" ? "#008B81" : "#122333",
                      fontWeight: 700,
                      fontSize: "11px",
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreIcon
                      sx={{ fontSize: "20px", color: "rgba(18, 35, 51, 0.4)" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

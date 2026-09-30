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

import { Colors } from "@/utils/enum";

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
          sx={{ fontSize: "18px", fontWeight: 800, color: Colors.PRIMARY_DARK }}
        >
          Administrative Team
        </Typography>
        <IconButton
          sx={{
            bgcolor: Colors.PRIMARY_DARK,
            color: Colors.ACCENT_MINT,
            "&:hover": { bgcolor: Colors.PRIMARY_DARK, opacity: 0.9 },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(16, 18, 22, 0.04)",
          border: `1px solid ${Colors.BORDER_STONE}`,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead
            sx={{
              bgcolor: "#FAFBFD",
              borderBottom: `1px solid ${Colors.BORDER_STONE}`,
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                User
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Status
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 800, fontSize: "11px", color: Colors.PRIMARY_DARK, textTransform: "uppercase", letterSpacing: "0.5px" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  borderBottom: `1px solid rgba(212, 210, 205, 0.45)`,
                  "&:last-child": { borderBottom: "none" },
                  "&:hover": {
                    bgcolor: "rgba(221, 255, 247, 0.14)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 16px rgba(16, 18, 22, 0.03)",
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: Colors.ACCENT_MINT,
                        color: Colors.PRIMARY_DARK,
                        fontSize: "14px",
                        fontWeight: 800,
                        borderRadius: "10px",
                        border: `1px solid ${Colors.BORDER_STONE}`,
                      }}
                    >
                      {user.avatar}
                    </Avatar>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: Colors.PRIMARY_DARK,
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "13px", color: "rgba(16, 18, 22, 0.65)" }}
                  >
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "13px", fontWeight: 600, color: Colors.PRIMARY_DARK }}>
                    {user.role}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={
                      user.status === "Active" ? (
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
                    label={user.status}
                    size="small"
                    sx={{
                      bgcolor: user.status === "Active" ? Colors.ACCENT_MINT : "#FAFBFD",
                      color: Colors.PRIMARY_DARK,
                      fontWeight: 800,
                      fontSize: "11px",
                      borderRadius: "8px",
                      border: `1px solid ${user.status === "Active" ? "rgba(13, 148, 136, 0.25)" : Colors.BORDER_STONE}`,
                      px: 0.5,
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

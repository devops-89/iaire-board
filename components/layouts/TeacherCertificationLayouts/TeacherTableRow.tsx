import React from "react";
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  Chip,
  IconButton,
  Avatar,
} from "@mui/material";
import { MoreVert as MoreIcon } from "@mui/icons-material";
import { Teacher } from "@/utils/types";
import { Colors } from "@/utils/enum";

interface TeacherTableRowProps {
  teacher: Teacher;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>, teacher: Teacher) => void;
  onRowClick?: (teacher: Teacher) => void;
}

export const TeacherTableRow: React.FC<TeacherTableRowProps> = ({
  teacher,
  onOpenMenu,
  onRowClick,
}) => {
  const rawDisplayName = teacher.fullName || teacher.username || "Teacher";
  const displayName = rawDisplayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const schoolIdVal =
    teacher.schoolId ||
    (teacher as any).school_id ||
    (teacher as any).school?.id;
  const displaySchoolId = schoolIdVal
    ? typeof schoolIdVal === "number"
      ? String(schoolIdVal).padStart(4, "0")
      : String(schoolIdVal)
    : "--";

  const isTeacherActive =
    teacher.isActive === true ||
    (teacher as any).isActive === "true" ||
    (teacher as any).active === true ||
    (teacher as any).active === "true" ||
    (teacher as any).is_active === true ||
    (teacher as any).is_active === 1 ||
    (teacher as any).status === "ACTIVE" ||
    (teacher as any).status === "active" ||
    (teacher as any).status === "Active" ||
    (teacher as any).status === true;

  return (
    <TableRow
      key={teacher.id}
      onClick={() => onRowClick?.(teacher)}
      sx={{
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        borderBottom: "1px solid rgba(18, 35, 51, 0.04)",
        "&:last-child": { borderBottom: "none" },
        "&:hover": {
          bgcolor: "rgba(18, 35, 51, 0.015)",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 15px rgba(18, 35, 51, 0.03)",
        },
      }}
    >
      {/* Monospace School ID */}
      <TableCell sx={{ py: 2, px: 3 }}>
        <Box
          component="span"
          sx={{
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: 700,
            fontSize: "12px",
            color: Colors.PRIMARY_DARK,
            bgcolor: "rgba(18, 35, 51, 0.05)",
            border: "1px solid rgba(18, 35, 51, 0.08)",
            px: 1.2,
            py: 0.6,
            borderRadius: "6px",
            display: "inline-block",
            letterSpacing: "0.2px",
          }}
        >
          {displaySchoolId}
        </Box>
      </TableCell>

      {/* Teacher Name & Avatar */}
      <TableCell sx={{ py: 2, px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(18, 35, 51, 0.05)",
              color: Colors.PRIMARY_DARK,
              fontSize: "14px",
              fontWeight: 800,
              width: 44,
              height: 44,
              borderRadius: "14px",
              border: "1px solid rgba(18, 35, 51, 0.06)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: Colors.PRIMARY_DARK,
                lineHeight: 1.3,
              }}
            >
              {displayName}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Email */}
      <TableCell sx={{ py: 2, px: 3 }}>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 600,
            color: Colors.PRIMARY_DARK,
          }}
        >
          {teacher.email}
        </Typography>
      </TableCell>

      {/* Glowing Status Chip */}
      <TableCell sx={{ py: 2, px: 3 }}>
        <Chip
          label={isTeacherActive ? "Active" : "Inactive"}
          size="small"
          icon={
            isTeacherActive ? (
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#10B981",
                  ml: 1,
                  boxShadow: "0 0 8px #10B981",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)",
                    },
                    "70%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 6px rgba(16, 185, 129, 0)",
                    },
                    "100%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)",
                    },
                  },
                }}
              />
            ) : undefined
          }
          sx={{
            bgcolor: isTeacherActive
              ? "rgba(16, 185, 129, 0.08)"
              : "rgba(107, 114, 128, 0.08)",
            color: isTeacherActive ? "#10B981" : "#6B7280",
            fontWeight: 800,
            fontSize: "11px",
            borderRadius: "8px",
            border: `1px solid ${
              isTeacherActive
                ? "rgba(16, 185, 129, 0.15)"
                : "rgba(107, 114, 128, 0.15)"
            }`,
            pl: isTeacherActive ? 0.5 : 0,
            "& .MuiChip-icon": {
              color: "inherit",
              margin: 0,
            },
            "& .MuiChip-label": {
              pl: 1,
            },
          }}
        />
      </TableCell>

      {/* More Actions Menu Button */}
      <TableCell align="right" sx={{ py: 2, px: 3 }}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu(e, teacher);
          }}
          sx={{
            color: "rgba(18, 35, 51, 0.4)",
            "&:hover": {
              bgcolor: "rgba(18, 35, 51, 0.06)",
              color: Colors.PRIMARY_DARK,
            },
          }}
        >
          <MoreIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

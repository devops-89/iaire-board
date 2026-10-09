import React from "react";
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  Chip,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { VisibilityOutlined as EyeIcon } from "@mui/icons-material";
import { School } from "@/utils/types";
import { Colors } from "@/utils/enum";
import { useRouter } from "next/navigation";

interface SchoolTableRowProps {
  school: School;
  onOpenMenu?: (event: React.MouseEvent<HTMLElement>, school: School) => void;
  onRowClick?: (school: School) => void;
  onViewDetails?: (school: School) => void;
}

export const SchoolTableRow: React.FC<SchoolTableRowProps> = ({
  school,
  onOpenMenu,
  onRowClick,
  onViewDetails,
}) => {
  const router = useRouter();
  return (
    <TableRow
      key={school.id}
      onClick={() => onRowClick?.(school)}
      sx={{
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        borderBottom: `1px solid rgba(212, 210, 205, 0.45)`,
        "&:last-child": { borderBottom: "none" },
        "&:hover": {
          bgcolor: "rgba(221, 255, 247, 0.14)",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 16px rgba(16, 18, 22, 0.03)",
        },
      }}
    >
      {/* Display ID badge */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <Box
          component="span"
          sx={{
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: 800,
            fontSize: "12px",
            color: Colors.PRIMARY_DARK,
            bgcolor: "#FAFBFD",
            border: `1px solid ${Colors.BORDER_STONE}`,
            px: 1.2,
            py: 0.5,
            borderRadius: "8px",
            display: "inline-block",
            letterSpacing: "0.3px",
          }}
        >
          {school.displayId || "--"}
        </Box>
      </TableCell>

      {/* School Name & Avatar */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
          <Avatar
            src={school.logoDownloadUrl || school.logo || undefined}
            sx={{
              bgcolor: Colors.ACCENT_MINT,
              color: Colors.PRIMARY_DARK,
              fontSize: "15px",
              fontWeight: 800,
              width: 42,
              height: 42,
              borderRadius: "12px",
              border: `1px solid rgba(16, 18, 22, 0.08)`,
              boxShadow: "0 2px 8px rgba(16, 18, 22, 0.04)",
            }}
          >
            {school.name ? school.name.charAt(0).toUpperCase() : ""}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: Colors.PRIMARY_DARK,
                lineHeight: 1.3,
                textTransform: "capitalize",
              }}
            >
              {school.name}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Teachers Count */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }} align="center">
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 700,
            color: Colors.PRIMARY_DARK,
          }}
        >
          {school.teacherCount ?? (school as any).teachersCount ?? 0}
        </Typography>
      </TableCell>

      {/* Students Count */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }} align="center">
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 700,
            color: Colors.PRIMARY_DARK,
          }}
        >
          {school.studentCount ?? (school as any).studentsCount ?? 0}
        </Typography>
      </TableCell>

      {/* Status Chips */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <Chip
          label={school.isActive ? "Active" : "Inactive"}
          size="small"
          icon={
            school.isActive ? (
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#0D9488",
                  ml: 1,
                  boxShadow: "0 0 6px rgba(13, 148, 136, 0.8)",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(13, 148, 136, 0.7)",
                    },
                    "70%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 5px rgba(13, 148, 136, 0)",
                    },
                    "100%": {
                      transform: "scale(0.95)",
                      boxShadow: "0 0 0 0 rgba(13, 148, 136, 0)",
                    },
                  },
                }}
              />
            ) : undefined
          }
          sx={{
            bgcolor: school.isActive
              ? Colors.ACCENT_MINT
              : "rgba(239, 68, 68, 0.08)",
            color: school.isActive ? Colors.PRIMARY_DARK : "#EF4444",
            fontWeight: 800,
            fontSize: "11px",
            borderRadius: "8px",
            border: `1px solid ${
              school.isActive
                ? "rgba(13, 148, 136, 0.25)"
                : "rgba(239, 68, 68, 0.2)"
            }`,
            pl: school.isActive ? 0.5 : 0,
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

      {/* View Details Action Button */}
      <TableCell align="right" sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <Tooltip title="View Details">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) {
                onViewDetails(school);
              } else if (onRowClick) {
                onRowClick(school);
              } else {
                router.push(`/membership-overview/${school.id}`);
              }
            }}
            sx={{
              color: Colors.PRIMARY_DARK,
              bgcolor: "rgba(18, 35, 51, 0.04)",
              borderRadius: "8px",
              p: 0.8,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: Colors.ACCENT_MINT,
                color: Colors.PRIMARY_DARK,
                transform: "scale(1.08)",
              },
            }}
          >
            <EyeIcon sx={{ fontSize: "19px" }} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

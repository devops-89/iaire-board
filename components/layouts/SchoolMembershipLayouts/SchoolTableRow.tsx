import React from "react";
import { Box, Typography, TableCell, TableRow, Chip, IconButton, Avatar } from "@mui/material";
import {
  MoreVert as MoreIcon,
  CalendarTodayOutlined as CalendarIcon,
} from "@mui/icons-material";
import { School } from "@/utils/types";
import { Colors } from "@/utils/enum";

interface SchoolTableRowProps {
  school: School;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>, school: School) => void;
  onRowClick?: (school: School) => void;
}

export const SchoolTableRow: React.FC<SchoolTableRowProps> = ({
  school,
  onOpenMenu,
  onRowClick,
}) => {
  return (
    <TableRow
      key={school.id}
      onClick={() => onRowClick?.(school)}
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
      {/* Display ID badge */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
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
          {school.displayId || "--"}
        </Box>
      </TableCell>

      {/* School Name & Avatar */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={school.logoDownloadUrl || school.logo || undefined}
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
            {!school.logoDownloadUrl && !school.logo
              ? school.name.charAt(0)
              : undefined}
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
              {school.name}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Membership Code Monospace Badge */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }} align="center">
        {school.membershipCode ? (
          <Box
            component="span"
            sx={{
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 700,
              fontSize: "12px",
              color: Colors.PRIMARY_DARK,
              bgcolor: "#FAF7F0",
              border: "1px solid rgba(18, 35, 51, 0.08)",
              px: 1.2,
              py: 0.6,
              borderRadius: "6px",
              display: "inline-block",
              letterSpacing: "0.2px",
            }}
          >
            {school.membershipCode}
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "13px",
              color: "rgba(18, 35, 51, 0.3)",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            --
          </Typography>
        )}
      </TableCell>

      {/* Registration Year with Calendar Icon */}
      <TableCell sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarIcon
            sx={{
              fontSize: 16,
              color: "rgba(18, 35, 51, 0.4)",
            }}
          />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: Colors.PRIMARY_DARK,
            }}
          >
            {school.registrationYear || "--"}
          </Typography>
        </Box>
      </TableCell>

      {/* Glowing Status Chips */}
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
            bgcolor: school.isActive
              ? "rgba(16, 185, 129, 0.08)"
              : "rgba(107, 114, 128, 0.08)",
            color: school.isActive ? "#10B981" : "#6B7280",
            fontWeight: 800,
            fontSize: "11px",
            borderRadius: "8px",
            border: `1px solid ${
              school.isActive
                ? "rgba(16, 185, 129, 0.15)"
                : "rgba(107, 114, 128, 0.15)"
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

      {/* More Action Button */}
      <TableCell align="right" sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu(e, school);
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

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
              fontWeight: 800,
              fontSize: "12px",
              color: Colors.PRIMARY_DARK,
              bgcolor: "#FAFBFD",
              border: `1px solid ${Colors.BORDER_STONE}`,
              px: 1.2,
              py: 0.5,
              borderRadius: "8px",
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
              color: "#94a3b8",
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
              color: Colors.PRIMARY_DARK,
              opacity: 0.5,
            }}
          />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 700,
              color: Colors.PRIMARY_DARK,
            }}
          >
            {school.registrationYear || "--"}
          </Typography>
        </Box>
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

      {/* More Action Button */}
      <TableCell align="right" sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMenu(e, school);
          }}
          sx={{
            color: Colors.PRIMARY_DARK,
            opacity: 0.6,
            borderRadius: "8px",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: Colors.ACCENT_MINT,
              opacity: 1,
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

import React from "react";
import { Box, Typography, Paper, InputBase, IconButton } from "@mui/material";
import {
  Search as SearchIcon,
  PersonAdd as AddIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherTableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
}

export const TeacherTableHeader: React.FC<TeacherTableHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
        {/* Premium Search Box */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.8,
            borderRadius: "100px",
            border: `1px solid ${Colors.BORDER_STONE}`,
            bgcolor: "#fff",
            width: { xs: "100%", sm: "320px" },
            transition: "all 0.25s ease-in-out",
            "&:focus-within": {
              borderColor: Colors.PRIMARY_DARK,
              boxShadow: "0 4px 20px rgba(16, 18, 22, 0.08)",
            },
          }}
        >
          <SearchIcon
            sx={{ color: Colors.PRIMARY_DARK, fontSize: 20, mr: 1.2, opacity: 0.7 }}
          />
          <InputBase
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: Colors.PRIMARY_DARK,
              width: "100%",
              "& input::placeholder": {
                color: "#94a3b8",
                opacity: 1,
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

import React from "react";
import { Box, Typography, Paper, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon, PersonAdd as AddIcon } from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SchoolTableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
}

export const SchoolTableHeader: React.FC<SchoolTableHeaderProps> = ({
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
            py: 0.5,
            borderRadius: "100px",
            border: "1px solid rgba(18,35,51,0.08)",
            bgcolor: "#fff",
            width: { xs: "100%", sm: "280px" },
            transition: "all 0.3s ease",
            "&:focus-within": {
              borderColor: Colors.PRIMARY_DARK,
              boxShadow: "0 4px 20px rgba(18, 35, 51, 0.08)",
            },
          }}
        >
          <SearchIcon
            sx={{ color: "rgba(18, 35, 51, 0.4)", fontSize: 20, mr: 1 }}
          />
          <InputBase
            placeholder="Search schools, codes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: Colors.PRIMARY_DARK,
              width: "100%",
              "& input::placeholder": {
                color: "rgba(18, 35, 51, 0.4)",
                opacity: 1,
              },
            }}
          />
        </Paper>

        <IconButton
          onClick={onAddClick}
          sx={{
            bgcolor: Colors.PRIMARY_DARK,
            color: "#fff",
            "&:hover": { bgcolor: "#1A2B3B" },
            width: 40,
            height: 40,
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import {
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeacherTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalTeachers: number;
  indexOfFirstTeacher: number;
  indexOfLastTeacher: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
}

export const TeacherTablePagination: React.FC<TeacherTablePaginationProps> = ({
  currentPage,
  totalPages,
  totalTeachers,
  indexOfFirstTeacher,
  indexOfLastTeacher,
  onPrevPage,
  onNextPage,
  onPageChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
        py: 2.2,
        borderTop: `1px solid ${Colors.BORDER_STONE}`,
        bgcolor: "#FAFBFD",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#64748b",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        Showing {totalTeachers === 0 ? 0 : indexOfFirstTeacher + 1} to{" "}
        {Math.min(indexOfLastTeacher, totalTeachers)} of {totalTeachers}{" "}
        teachers
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={onPrevPage}
          disabled={currentPage === 1}
          sx={{
            border: `1px solid ${Colors.BORDER_STONE}`,
            borderRadius: "10px",
            bgcolor: "#fff",
            color: Colors.PRIMARY_DARK,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: Colors.ACCENT_MINT,
              borderColor: Colors.PRIMARY_DARK,
            },
            width: 36,
            height: 36,
            "&.Mui-disabled": { opacity: 0.35 },
          }}
        >
          <PrevIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;
          return (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              sx={{
                minWidth: 36,
                height: 36,
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: isActive ? 800 : 700,
                color: isActive ? Colors.ACCENT_MINT : Colors.PRIMARY_DARK,
                bgcolor: isActive ? Colors.PRIMARY_DARK : "transparent",
                border: isActive ? "none" : "1px solid transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isActive
                    ? Colors.PRIMARY_DARK
                    : "rgba(221, 255, 247, 0.4)",
                  opacity: isActive ? 0.95 : 1,
                  borderColor: isActive
                    ? "transparent"
                    : Colors.BORDER_STONE,
                },
                p: 0,
              }}
            >
              {pageNum}
            </Button>
          );
        })}

        <IconButton
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          sx={{
            border: `1px solid ${Colors.BORDER_STONE}`,
            borderRadius: "10px",
            bgcolor: "#fff",
            color: Colors.PRIMARY_DARK,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: Colors.ACCENT_MINT,
              borderColor: Colors.PRIMARY_DARK,
            },
            width: 36,
            height: 36,
            "&.Mui-disabled": { opacity: 0.35 },
          }}
        >
          <NextIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

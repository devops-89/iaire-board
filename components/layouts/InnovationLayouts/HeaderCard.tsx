import React from "react";
import { Paper, Stack, Box, Typography, Chip } from "@mui/material";
import { Colors } from "@/utils/enum";

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase();
  if (
    s === "APPROVED" ||
    s === "ACTIVE" ||
    s === "PATENT_GRANTED" ||
    s === "PUBLISHED"
  ) {
    return { bg: "rgba(15, 157, 88, 0.08)", text: "#0F9D58" };
  }
  if (s === "REJECTED" || s === "INACTIVE" || s === "CLOSED") {
    return { bg: "rgba(219, 68, 85, 0.08)", text: "#DB4437" };
  }
  return { bg: "rgba(244, 180, 0, 0.08)", text: "#F4B400" };
};

const formatText = (text: string) => {
  if (!text) return "--";
  return text
    .replace(/_/g, " ")
    .replace(/"/g, "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

const formatStatus = (status: string) => {
  if (!status) return "--";
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

interface HeaderCardProps {
  title: string;
  createdAt: string;
  status: string;
}

export const HeaderCard: React.FC<HeaderCardProps> = ({
  title,
  createdAt,
  status,
}) => {
  const statusStyle = getStatusColor(status);
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "--";

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 4 },
        borderRadius: "24px",
        border: "1px solid rgba(18, 35, 51, 0.05)",
        boxShadow: "0 10px 40px rgba(18, 35, 51, 0.02)",
        bgcolor: "#fff",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "24px" },
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
              letterSpacing: "-0.5px",
              mb: 1,
            }}
          >
            {formatText(title)}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                color: "rgba(18, 35, 51, 0.4)",
                fontWeight: 600,
              }}
            >
              Submitted on: {formattedDate}
            </Typography>
          </Stack>
        </Box>
        <Chip
          label={formatStatus(status || "PENDING")}
          sx={{
            bgcolor: statusStyle.bg,
            color: statusStyle.text,
            fontWeight: 800,
            fontSize: "12px",
            px: 1,
            py: 2,
            borderRadius: "8px",
          }}
        />
      </Stack>
    </Paper>
  );
};

import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { Colors } from "@/utils/enum";
import {
  HelpOutlined as ProblemIcon,
  DoneAll as SolutionIcon,
} from "@mui/icons-material";

interface ProblemSolutionCardProps {
  problemDescription: string;
  solution: string;
}

export const ProblemSolutionCard: React.FC<ProblemSolutionCardProps> = ({
  problemDescription,
  solution,
}) => {
  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      {/* Problem Description Card */}
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
          spacing={1.5}
          sx={{ mb: 2, alignItems: "center" }}
        >
          <ProblemIcon sx={{ color: "#FF9800", fontSize: 24 }} />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
            }}
          >
            Problem Statement
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "14px",
            color: "rgba(18, 35, 51, 0.7)",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          {problemDescription || "No problem statement description provided."}
        </Typography>
      </Paper>

      {/* Proposed Solution Card */}
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
          spacing={1.5}
          sx={{ mb: 2, alignItems: "center" }}
        >
          <SolutionIcon sx={{ color: "#4CAF50", fontSize: 24 }} />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 800,
              color: Colors.PRIMARY_DARK,
            }}
          >
            Proposed Solution
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "14px",
            color: "rgba(18, 35, 51, 0.7)",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          {solution || "No solution description provided."}
        </Typography>
      </Paper>
    </Stack>
  );
};

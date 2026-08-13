import React from "react";
import { Paper, Stack, Typography, Box, Button } from "@mui/material";
import {
  InfoOutlined as InfoIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface SubmissionDetailsCardProps {
  team: any;
  teamId?: any;
  attorneyTemplateDownloadUrl?: string;
}

export const SubmissionDetailsCard: React.FC<SubmissionDetailsCardProps> = ({
  team,
  teamId,
  attorneyTemplateDownloadUrl,
}) => {
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
      <Stack direction="row" spacing={1.5} sx={{ mb: 3, alignItems: "center" }}>
        <InfoIcon sx={{ color: Colors.PRIMARY_DARK, fontSize: 24 }} />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 800,
            color: Colors.PRIMARY_DARK,
          }}
        >
          Submissions Details
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        <Box>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(18, 35, 51, 0.4)",
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Team Association
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 700,
              color: Colors.PRIMARY_DARK,
            }}
          >
            {team?.title ||
              team?.name ||
              (teamId ? `Team #${teamId}` : "No Team Assigned")}
          </Typography>
          {team?.teamCode && (
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(18, 35, 51, 0.5)",
                mt: 0.5,
              }}
            >
              Code: {team.teamCode}
            </Typography>
          )}
        </Box>

        {attorneyTemplateDownloadUrl && (
          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Template Attachments
            </Typography>
            <Button
              href={attorneyTemplateDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{
                textTransform: "none",
                fontSize: "12px",
                fontWeight: 700,
                bgcolor: Colors.PRIMARY_DARK,
                color: "#fff",
                borderRadius: "10px",
                py: 1,
                width: "100%",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "rgba(18,35,51,0.9)",
                  boxShadow: "none",
                },
              }}
            >
              Attorney Template
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

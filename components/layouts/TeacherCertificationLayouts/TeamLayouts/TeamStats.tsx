"use client";
import React from "react";
import { Grid, Paper, Avatar, Box, Typography } from "@mui/material";
import {
  LightbulbOutlined as IdeaIcon,
  RocketLaunchOutlined as StartupIcon,
  HourglassEmptyOutlined as PendingIcon,
  WorkspacePremiumOutlined as PatentIcon,
  BookOutlined as BookIcon,
} from "@mui/icons-material";
import { Colors } from "@/utils/enum";

interface TeamStatsProps {
  innovationCount: number;
  researchSubmissionsCount: number;
  startupsCount: number;
  pendingInnovationCount: number;
  patentGrantedInnovationCount: number;
}

export const TeamStats = ({
  innovationCount,
  researchSubmissionsCount,
  startupsCount,
  pendingInnovationCount,
  patentGrantedInnovationCount,
}: TeamStatsProps) => {
  return (
    <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ mb: { xs: 2.5, sm: 4 } }}>
      {/* Innovations Count Card */}
      <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: "16px",
            bgcolor: "#fff",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            boxShadow: "0 4px 20px rgba(18, 35, 51, 0.02)",
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(0, 209, 193, 0.1)",
              color: "#00D1C1",
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              flexShrink: 0,
            }}
          >
            <IdeaIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                wordBreak: "break-word",
              }}
            >
              Innovations
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "20px" },
                fontWeight: 800,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {innovationCount}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Research Submissions Card */}
      <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: "16px",
            bgcolor: "#fff",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            boxShadow: "0 4px 20px rgba(18, 35, 51, 0.02)",
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(33, 150, 243, 0.1)",
              color: "#2196F3",
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              flexShrink: 0,
            }}
          >
            <BookIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                wordBreak: "break-word",
              }}
            >
              Research
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "20px" },
                fontWeight: 800,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {researchSubmissionsCount}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Startups Card */}
      <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: "16px",
            bgcolor: "#fff",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            boxShadow: "0 4px 20px rgba(18, 35, 51, 0.02)",
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(156, 39, 176, 0.1)",
              color: "#9C27B0",
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              flexShrink: 0,
            }}
          >
            <StartupIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                wordBreak: "break-word",
              }}
            >
              Startups
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "20px" },
                fontWeight: 800,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {startupsCount}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Pending Innovations Card */}
      <Grid size={{ xs: 6, sm: 6, md: 2.4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: "16px",
            bgcolor: "#fff",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            boxShadow: "0 4px 20px rgba(18, 35, 51, 0.02)",
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(255, 152, 0, 0.1)",
              color: "#FF9800",
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              flexShrink: 0,
            }}
          >
            <PendingIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                wordBreak: "break-word",
              }}
            >
              Pending
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "20px" },
                fontWeight: 800,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {pendingInnovationCount}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Patents Granted Card */}
      <Grid size={{ xs: 6, sm: 6, md: 2.4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: "16px",
            bgcolor: "#fff",
            border: "1px solid rgba(18, 35, 51, 0.05)",
            boxShadow: "0 4px 20px rgba(18, 35, 51, 0.02)",
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(76, 175, 80, 0.1)",
              color: "#4CAF50",
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              flexShrink: 0,
            }}
          >
            <PatentIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(18, 35, 51, 0.4)",
                textTransform: "uppercase",
                wordBreak: "break-word",
              }}
            >
              Patents Granted
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "20px" },
                fontWeight: 800,
                color: Colors.PRIMARY_DARK,
              }}
            >
              {patentGrantedInnovationCount}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

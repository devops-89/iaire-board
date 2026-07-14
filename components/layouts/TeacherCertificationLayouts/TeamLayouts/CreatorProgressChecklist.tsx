"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Colors } from "@/utils/enum";

interface CreatorProgressChecklistProps {
  createdByUser: any;
}

export const CreatorProgressChecklist = ({
  createdByUser,
}: CreatorProgressChecklistProps) => {
  if (!createdByUser) return null;

  return (
    <Box
      sx={{
        pt: 2,
        borderTop: "1px solid rgba(18, 35, 51, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 700,
            color: "rgba(18, 35, 51, 0.5)",
            textTransform: "uppercase",
          }}
        >
          Creator Tier Progress:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "rgba(18, 35, 51, 0.06)",
              height: 6,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${createdByUser.tierProgress || 0}%`,
                bgcolor: Colors.PRIMARY,
                height: "100%",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: Colors.PRIMARY,
            }}
          >
            {createdByUser.tierProgress || 0}%
          </Typography>
        </Box>
      </Box>

      {/* Tier Progress Details (Checklist) */}
      {createdByUser.tierProgressDetails &&
        Object.keys(createdByUser.tierProgressDetails).length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 0.5,
            }}
          >
            {Object.entries(createdByUser.tierProgressDetails).map(
              ([roleKey, tiers]: any) =>
                tiers.map((tier: any, idx: number) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 1.2,
                      borderRadius: "8px",
                      bgcolor: "rgba(18, 35, 51, 0.015)",
                      border: "1px solid rgba(18, 35, 51, 0.03)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: Colors.PRIMARY_DARK,
                        mb: 0.5,
                        textTransform: "capitalize",
                      }}
                    >
                      Membership Tier:{" "}
                      {tier.membershipTier?.replaceAll("_", " ").toLowerCase()}
                    </Typography>
                    {tier.requirements?.map((req: any, rIdx: number) => {
                      const isCompleted = req.current >= req.required;
                      return (
                        <Box
                          key={rIdx}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 0.8,
                            mt: 0.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: isCompleted ? "#10B981" : "#F59E0B",
                              mt: 0.7,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "11px",
                              color: "rgba(18, 35, 51, 0.6)",
                              flex: 1,
                            }}
                          >
                            {req.description} ({req.current}/{req.required})
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )),
            )}
          </Box>
        )}
    </Box>
  );
};

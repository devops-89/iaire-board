"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Colors } from "@/utils/enum";

interface CreatorParentDetailsProps {
  createdByUser: any;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const CreatorParentDetails = ({
  createdByUser,
  capitalizeWord,
}: CreatorParentDetailsProps) => {
  if (!createdByUser) return null;
  if (!createdByUser.fatherName && !createdByUser.motherName) return null;

  return (
    <Box
      sx={{
        pt: 2,
        borderTop: "1px dashed rgba(18, 35, 51, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 700,
          color: "rgba(18, 35, 51, 0.5)",
          textTransform: "uppercase",
        }}
      >
        Parent details:
      </Typography>

      {/* Father Info */}
      {createdByUser.fatherName && (
        <Box
          sx={{
            p: 1.2,
            borderRadius: "10px",
            bgcolor: "rgba(18, 35, 51, 0.02)",
            border: "1px solid rgba(18, 35, 51, 0.04)",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: Colors.PRIMARY_DARK,
              mb: 0.5,
            }}
          >
            Father: {createdByUser.fatherName}
            {createdByUser.fatherProfession &&
              ` (${capitalizeWord(createdByUser.fatherProfession)})`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.2,
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(18, 35, 51, 0.6)",
              }}
            >
              Email: {createdByUser.fatherEmail || "--"}
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(18, 35, 51, 0.6)",
              }}
            >
              Phone: {createdByUser.fatherPhone || "--"}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Mother Info */}
      {createdByUser.motherName && (
        <Box
          sx={{
            p: 1.2,
            borderRadius: "10px",
            bgcolor: "rgba(18, 35, 51, 0.02)",
            border: "1px solid rgba(18, 35, 51, 0.04)",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: Colors.PRIMARY_DARK,
              mb: 0.5,
            }}
          >
            Mother: {createdByUser.motherName}
            {createdByUser.motherProfession &&
              ` (${capitalizeWord(createdByUser.motherProfession)})`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.2,
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(18, 35, 51, 0.6)",
              }}
            >
              Email: {createdByUser.motherEmail || "--"}
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(18, 35, 51, 0.6)",
              }}
            >
              Phone: {createdByUser.motherPhone || "--"}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

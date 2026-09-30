"use client";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { Colors } from "@/utils/enum";

import { CreatorProfileHeader } from "./CreatorProfileHeader";
import { CreatorDetailsList } from "./CreatorDetailsList";
import { CreatorProgressChecklist } from "./CreatorProgressChecklist";
import { CreatorParentDetails } from "./CreatorParentDetails";

interface CreatorCardProps {
  createdByUser: any;
  capitalizeWord: (str: string | undefined | null) => string;
}

export const CreatorCard = ({
  createdByUser,
  capitalizeWord,
}: CreatorCardProps) => {
  if (!createdByUser) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "20px",
        bgcolor: "#fff",
        border: `1px solid ${Colors.BORDER_STONE}`,
        boxShadow: "0 4px 20px rgba(16, 18, 22, 0.04)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: Colors.PRIMARY_DARK,
          mb: 2.5,
        }}
      >
        Creator Details
      </Typography>

      <CreatorProfileHeader
        createdByUser={createdByUser}
        capitalizeWord={capitalizeWord}
      />

      <CreatorDetailsList
        createdByUser={createdByUser}
        capitalizeWord={capitalizeWord}
      />

      <CreatorProgressChecklist createdByUser={createdByUser} />

      <CreatorParentDetails
        createdByUser={createdByUser}
        capitalizeWord={capitalizeWord}
      />
    </Paper>
  );
};

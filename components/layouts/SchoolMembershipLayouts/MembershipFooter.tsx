import React from "react";
import { Box, Typography } from "@mui/material";
import { Colors } from "@/utils/enum";

export const MembershipFooter = () => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 2.5,
        borderRadius: "16px",
        bgcolor: "#fff",
        border: `1px solid ${Colors.BORDER_STONE}`,
        boxShadow: "0 2px 12px rgba(16, 18, 22, 0.03)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#64748b",
        }}
      >
        <span style={{ color: Colors.PRIMARY_DARK, fontWeight: 700 }}>• Chartered:</span> Highest tier recognition
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#64748b",
        }}
      >
        <span style={{ color: Colors.PRIMARY_DARK, fontWeight: 700 }}>• Accredited:</span> Quality assured partners
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#64748b",
        }}
      >
        <span style={{ color: Colors.PRIMARY_DARK, fontWeight: 700 }}>• Fellow:</span> Honorary institutional status
      </Typography>
    </Box>
  );
};

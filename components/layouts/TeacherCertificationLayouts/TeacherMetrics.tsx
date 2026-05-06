"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import { IndividualDistributionCard } from "./IndividualDistributionCard";
import { DashboardData } from "@/assets/generic-data";

export const TeacherMetrics = () => {
  const distributionData = DashboardData.teacherTraining?.distribution || [];

  return (
    <Grid container spacing={2}>
      {distributionData.map((item: any, index: number) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
          <IndividualDistributionCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

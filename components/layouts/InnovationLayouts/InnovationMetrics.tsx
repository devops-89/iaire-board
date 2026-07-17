"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import {
  Lightbulb as PatentIcon,
  MenuBook as ResearchIcon,
} from "@mui/icons-material";
import { IndividualDistributionCard } from "@/components/layouts/TeacherCertificationLayouts/IndividualDistributionCard";
import { DashboardData } from "@/assets/generic-data";

const IconMap: any = {
  patent: PatentIcon,
  research: ResearchIcon,
};

export const InnovationMetrics = () => {
  const metrics = DashboardData.innovation?.metrics || [];

  return (
    <Grid container spacing={3}>
      {metrics.map((item: any, index: number) => {
        const IconComponent = IconMap[item.iconKey] || PatentIcon;

        return (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <IndividualDistributionCard
              label={item.label}
              value={item.value}
              schools={item.schools}
              color={item.color}
              icon={<IconComponent sx={{ fontSize: 22 }} />}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

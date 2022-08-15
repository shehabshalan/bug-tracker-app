import React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Typography, Paper, Box } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: "100%",
  height: 250,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: theme.palette.text.secondary,
}));

const Heading = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const StatChart = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

function StatsCard() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      spacing={2}
      justifyContent="space-between"
    >
      <Card>
        <Heading>Ticket by type</Heading>
        <StatChart>
          <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </StatChart>
      </Card>
      <Card>
        <Heading>Ticket by priority </Heading>
        <StatChart>
          <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </StatChart>
      </Card>
      <Card>
        <Heading>Ticket by status</Heading>
        <StatChart>
          <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </StatChart>
      </Card>
    </Stack>
  );
}

export default StatsCard;

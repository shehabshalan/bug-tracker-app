import React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Typography, Paper, Box } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axiosInstance from "../../services/axiosInstance";
import { Endpoints } from "../../services/endpoints";
import { useQuery } from "@tanstack/react-query";

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
  const getAccountStats = async () => {
    const res = await axiosInstance.get(`${Endpoints.accountStats}`);
    return res.data;
  };
  const { data }: { data: any } = useQuery(["stats"], getAccountStats, {
    keepPreviousData: true,
  });

  const backgroundColor = ["#FF6384", "#36A2EB", "#FFCE56"];
  const hoverBackgroundColor = ["#FF6384", "#36A2EB", "#FFCE56"];

  const ticketByTypeChart = {
    labels: ["Bug", "Feature", "Task"],
    datasets: [
      {
        label: "Type",
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        data: data?.result?.ticketByType,
      },
    ],
  };
  const ticketByPriorityChart = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Proirity",
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        data: data?.result?.ticketByPriority,
      },
    ],
  };
  const ticketByStatusChart = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Status",
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        data: data?.result?.ticketByStatus,
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
          <Doughnut
            data={ticketByTypeChart}
            options={{ maintainAspectRatio: false }}
          />
        </StatChart>
      </Card>
      <Card>
        <Heading>Ticket by priority </Heading>
        <StatChart>
          <Doughnut
            data={ticketByPriorityChart}
            options={{ maintainAspectRatio: false }}
          />
        </StatChart>
      </Card>
      <Card>
        <Heading>Ticket by status</Heading>
        <StatChart>
          <Doughnut
            data={ticketByStatusChart}
            options={{ maintainAspectRatio: false }}
          />
        </StatChart>
      </Card>
    </Stack>
  );
}

export default StatsCard;

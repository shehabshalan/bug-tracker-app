import { styled } from "@mui/material/styles";
import { Stack, Typography, Paper } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetAccountStats } from "../../hooks/useGetAccountStats";
import {
  BACKGROUND_COLOR,
  TICKET_PRIORITY_LABELS,
  TICKET_STATUS_LABELS,
  TICKET_TYPE_LABELS,
} from "../../utils/constants";

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
  const { data } = useGetAccountStats();

  const ticketByTypeChart = {
    labels: TICKET_TYPE_LABELS,
    datasets: [
      {
        label: "Type",
        backgroundColor: BACKGROUND_COLOR,
        hoverBackgroundColor: BACKGROUND_COLOR,
        data: data?.ticketByType,
      },
    ],
  };
  const ticketByPriorityChart = {
    labels: TICKET_PRIORITY_LABELS,
    datasets: [
      {
        label: "Proirity",
        backgroundColor: BACKGROUND_COLOR,
        hoverBackgroundColor: BACKGROUND_COLOR,
        data: data?.ticketByPriority,
      },
    ],
  };
  const ticketByStatusChart = {
    labels: TICKET_STATUS_LABELS,
    datasets: [
      {
        label: "Status",
        backgroundColor: BACKGROUND_COLOR,
        hoverBackgroundColor: BACKGROUND_COLOR,
        data: data?.ticketByStatus,
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

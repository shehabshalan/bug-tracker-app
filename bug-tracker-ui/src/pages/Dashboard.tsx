import { Column } from "@material-table/core";
import { Box, CssBaseline, Divider, Grid, Typography } from "@mui/material";
import { useQuery, QueryObserver } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import ContentDivider from "../components/ContentDivider";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";
import StatsCard from "../components/StatsCard";
import axiosInstance from "../services/axiosInstance";
import { Endpoints } from "../services/endpoints";
import dateConverter from "../utils/dateConverter";

export interface IProjects {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectMembers: string[];
  projectTickets: string[];
  createdAt: string;
}
export const projectColumns: Array<Column<IProjects>> = [
  {
    title: "Project Name",
    field: "projectName",
    render: (rowData) => (
      <Link to={`/project/${rowData._id}`} style={{ color: "black" }}>
        {rowData.projectName}
      </Link>
    ),
  },
  { title: "Description", field: "projectDescription" },
  {
    title: "Members",
    field: "projectTickets",
    render: (rowData: IProjects) => {
      return rowData.projectMembers.length;
    },
  },
  {
    title: "Tickets",
    field: "projectTickets",
    render: (rowData: IProjects) => {
      return rowData.projectTickets.length;
    },
  },
  {
    title: "Created",
    field: "createdAt",
    render: (rowData: IProjects) => {
      return dateConverter(rowData.createdAt);
    },
  },
];

function Dashboard() {
  const getTopProjects = async () => {
    const res = await axiosInstance.get(
      `${Endpoints.getTopFourProjectsWithMostMembers}`
    );
    return res.data;
  };

  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const { data, isLoading, error }: { data: any; isLoading: any; error: any } =
    useQuery(["topProjects", page], getTopProjects, {
      keepPreviousData: true,
      onSuccess: () => {
        setLoading(false);
      },
    });

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        Top Projects
      </Typography>
      <ContentTab
        title={"Projects"}
        buttonText={"New Project"}
        buttonAction={"openProject"}
      >
        <ContentTable
          data={data}
          columns={projectColumns}
          error={error}
          isLoading={isLoading}
          setPage={setPage}
        />
      </ContentTab>
      <ContentDivider />
      <Typography variant="h6" gutterBottom>
        Stats Overview
      </Typography>
      <StatsCard />
      <AddProject />
    </ContentPage>
  );
}

export default Dashboard;

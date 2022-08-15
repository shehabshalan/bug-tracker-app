import { Column } from "@material-table/core";
import { Box, CssBaseline, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import ContentDivider from "../components/ContentDivider";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";
import StatsCard from "../components/StatsCard";
import axiosInstance from "../services/axiosInstance";
import { Endpoints } from "../services/endpoints";

function Dashboard() {
  const fetchProjects = async ({ queryKey }: { queryKey: any }) => {
    const [_key, page] = queryKey;
    const res = await axiosInstance.get(
      `${Endpoints.getProjects}?page=${queryKey[1]}`
    );
    return res.data;
  };
  interface IProjects {
    _id: string;
    projectName: string;
    projectDescription: string;
    projectMembers: string[];
    createdAt: string;
  }

  const columns: Array<Column<IProjects>> = [
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
      field: "projectMembers",
      type: "numeric",
      render: (rowData: IProjects) => {
        return rowData.projectMembers.length;
      },
    },
    { title: "Created", field: "createdAt" },
  ];

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        Projects Overview
      </Typography>
      <ContentTab
        title={"Projects"}
        buttonText={"New Project"}
        buttonAction={"openProject"}
      >
        <ContentTable
          fetchData={fetchProjects}
          cacheKey={"projectsOverview"}
          columns={columns}
        />
      </ContentTab>
      <ContentDivider />
      <Typography variant="h6" gutterBottom>
        Stats Overview
      </Typography>
      <StatsCard />
      {/* <div style={{ marginBottom: "3rem" }}></div> */}
      <AddProject />
    </ContentPage>
  );
}

export default Dashboard;

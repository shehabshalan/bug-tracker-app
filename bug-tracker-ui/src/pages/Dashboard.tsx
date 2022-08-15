import { Column } from "@material-table/core";
import { Box, CssBaseline, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import AddProject from "../components/AddProject";
import ContentDivider from "../components/ContentDivider";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  interface IPerson {
    firstName: string;
    lastName: string;
    birthYear: number;
    availability: boolean;
  }

  // const lookup = { true: "Available", false: "Unavailable" };

  const columns: Array<Column<IPerson>> = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    // { title: "Availablity", field: "availability", lookup },
    { title: "Availablity", field: "availability" },
  ];

  const data: Array<IPerson> = [
    {
      firstName: "Tod",
      lastName: "Miles",
      birthYear: 1987,
      availability: true,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
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
        <ContentTable data={data} columns={columns} pageSize={3} />
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

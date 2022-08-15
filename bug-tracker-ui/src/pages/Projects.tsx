import { Column } from "@material-table/core";
import { Typography } from "@mui/material";
import React from "react";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";

function Projects() {
  interface IPerson {
    projectName: string;
    projectDescription: string;
    projectMembers: number;
    availability: string;
  }

  const columns: Array<Column<IPerson>> = [
    { title: "Project Name", field: "projectName" },
    { title: "Description", field: "projectDescription" },
    { title: "Members", field: "projectMembers", type: "numeric" },
    { title: "Created", field: "createdAt" },
  ];

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        All Projects
      </Typography>
      <ContentTab title={"Projects"} buttonText={"New Project"}>
        {/* <ContentTable columns={columns} pageSize={10} /> */}
      </ContentTab>
    </ContentPage>
  );
}

export default Projects;

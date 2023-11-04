import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AddProject from "./AddProject";
import ContentDivider from "../../components/ContentDivider";
import ContentPage from "../../components/ContentPage";
import ContentTab from "../../components/ContentTab";
import ContentTable from "../../components/ContentTable";
import StatsCard from "./StatsCard";
import { projectColumns } from "../../data/projectColumns";
import { useGetTopProjects } from "../../hooks/useGetTopProjects";

function Dashboard() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, error } = useGetTopProjects(page);

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        Recent Projects
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
        Tickets Overview
      </Typography>
      <StatsCard />
      <AddProject cacheKey={"topProjects"} />
    </ContentPage>
  );
}

export default Dashboard;

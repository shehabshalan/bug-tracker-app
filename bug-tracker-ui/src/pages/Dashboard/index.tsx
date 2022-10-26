import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import AddProject from "./AddProject";
import ContentDivider from "../../components/ContentDivider";
import ContentPage from "../../components/ContentPage";
import ContentTab from "../../components/ContentTab";
import ContentTable from "../../components/ContentTable";
import StatsCard from "./StatsCard";
import { projectColumns } from "../../data/projectColumns";
import { getTopProjects } from "../../api/api";

type Result = {
  _id: string;
  projectSlug: string;
  projectName: string;
  projectDescription: string;
  projectMembers: string[];
  projectTickets: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type TopProjects = {
  status: string;
  result: Result[];
};

function Dashboard() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const { data, isLoading, error } = useQuery(
    ["topProjects", page],
    getTopProjects,
    {
      keepPreviousData: true,
      onSuccess: () => {
        setLoading(false);
      },
    }
  );

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

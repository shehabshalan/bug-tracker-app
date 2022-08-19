import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AddProject from "../Dashboard/AddProject";
import ContentPage from "../../components/ContentPage";
import ContentTab from "../../components/ContentTab";
import ContentTable from "../../components/ContentTable";
import { projectColumns } from "../../data/projectColumns";
import axiosInstance from "../../services/axiosInstance";
import { Endpoints } from "../../services/endpoints";

function Projects() {
  const getProjects = async ({ queryKey }: { queryKey: any }) => {
    const [_key, page] = queryKey;
    const res = await axiosInstance.get(
      `${Endpoints.getProjects}?page=${page}`
    );
    return res.data;
  };
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const { data, isLoading, error } = useQuery(["projects", page], getProjects, {
    keepPreviousData: true,
    onSuccess: (data) => {
      setTotalPages(data.totalPages);
      setLoading(false);
    },
  });

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        All Projects
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
          totalPages={totalPages}
          page={page}
        />
      </ContentTab>
      <AddProject cacheKey={"projects"} />
    </ContentPage>
  );
}

export default Projects;

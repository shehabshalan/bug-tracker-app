import { Column } from "@material-table/core";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AddProject from "../components/AddProject";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";
import axiosInstance from "../services/axiosInstance";
import { Endpoints } from "../services/endpoints";
import { projectColumns } from "./Dashboard";

function Projects() {
  const getProjects = async ({ queryKey }: { queryKey: any }) => {
    const [_key, page] = queryKey;
    const res = await axiosInstance.get(
      `${Endpoints.getProjects}?page=${queryKey[1]}`
    );
    return res.data;
  };
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const {
    data,
    isLoading,
    error,
    status,
  }: { data: any; isLoading: any; error: any; status: any } = useQuery(
    ["projects", page],
    getProjects,
    {
      keepPreviousData: true,
    }
  );
  React.useEffect(() => {
    if (status === "success") {
      setTotalPages(data.totalPages);
      setLoading(false);
    }
  }, [status, data]);
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
      <AddProject />
    </ContentPage>
  );
}

export default Projects;

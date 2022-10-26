import React from "react";
import AddNewMember from "./AddNewMember";
import ContentTab from "../../components/ContentTab";
import ContentPage from "../../components/ContentPage";
import ContentTable from "../../components/ContentTable";
import { Typography } from "@mui/material";
import { membersColumns } from "../../data/membersColumns";
import { useQuery } from "@tanstack/react-query";
import AlertMessage from "../../components/AlertMessage";
import { getMembers } from "../../api/api";

function Members() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const { data, isLoading, error, refetch } = useQuery(
    ["get-all-members", page],
    getMembers,
    {
      keepPreviousData: true,
    }
  );
  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        All Members
      </Typography>

      <ContentTab
        title={"Members"}
        buttonText={"New Member"}
        buttonAction={"openUser"}
      >
        <ContentTable
          data={data}
          columns={membersColumns}
          error={error}
          isLoading={isLoading}
          setPage={setPage}
          totalPages={page}
          page={page}
        />
      </ContentTab>
      <AddNewMember refetch={refetch} />
      <AlertMessage />
    </ContentPage>
  );
}

export default Members;

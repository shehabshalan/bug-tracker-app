import { Column } from "@material-table/core";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import ContentPage from "../../components/ContentPage";
import ContentTab from "../../components/ContentTab";
import ContentTable from "../../components/ContentTable";
import { ticketColumns } from "../../data/ticketColumns";
import { getUserTickets } from "../../services/api";

function Tickets() {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const {
    data,
    isLoading,
    error,
    status,
  }: { data: any; isLoading: any; error: any; status: any } = useQuery(
    ["user-tickets", page],
    getUserTickets,
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
        setLoading(false);
      },
    }
  );

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        My Tickets
      </Typography>
      <ContentTab title={"Ticket"}>
        <ContentTable
          data={data}
          columns={ticketColumns}
          error={error}
          isLoading={isLoading}
          setPage={setPage}
          totalPages={totalPages}
          page={page}
        />
      </ContentTab>
    </ContentPage>
  );
}

export default Tickets;

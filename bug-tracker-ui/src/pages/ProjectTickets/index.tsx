import { Fab, Stack, Typography } from "@mui/material";
import ContentPage from "../../components/ContentPage";
import ContentTab from "../../components/ContentTab";
import ContentTable from "../../components/ContentTable";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddIcon from "@mui/icons-material/Add";
import ContentDivider from "../../components/ContentDivider";
import Content from "../../components/Content";
import AddTicket from "./AddTicket";
import { useAppContext } from "../../context/AppContext";
import AddMember from "./AddMember";
import AlertMessage from "../../components/AlertMessage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ticketColumns } from "../../data/ticketColumns";
import { useParams } from "react-router-dom";
import { getProjectTickets } from "../../services/api";

function ProjectDetails() {
  const { handleClickOpen } = useAppContext();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    data,
    isLoading,
    error,
  }: { data: any; isLoading: any; error: any; status: any } = useQuery(
    ["project-tickets", id, page],
    getProjectTickets,
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
        Project Tickets
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          my: 2,
        }}
      >
        <AvatarGroup total={5}>
          <Avatar alt="Remy Sharp" />
          <Avatar alt="Travis Howard" />
          <Avatar alt="Agnes Walker" />
          <Avatar alt="Trevor Henderson" />
        </AvatarGroup>
        <Fab size="small" color="secondary" aria-label="add">
          <AddIcon onClick={() => handleClickOpen("openMember")} />
        </Fab>
      </Stack>
      <ContentTab
        title={"Tickets"}
        buttonText={"New Ticket"}
        buttonAction={"openTicket"}
      >
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
      <ContentDivider />
      <ContentTab title={"Ticket Details"}>
        <Content />
      </ContentTab>
      <AddTicket />
      <AddMember />
      <AlertMessage />
    </ContentPage>
  );
}

export default ProjectDetails;

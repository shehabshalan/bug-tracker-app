import { Fab, Stack, Tooltip, Typography } from "@mui/material";
import ContentPage from "../../components/ContentPage";
import ContentTab from "../../components/ContentTab";
import ContentTable from "../../components/ContentTable";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentDivider from "../../components/ContentDivider";
import AddTicket from "./AddTicket";
import { useAppContext } from "../../context/AppContext";
import AddMember from "./AddMember";
import AlertMessage from "../../components/AlertMessage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ticketColumns } from "../../data/ticketColumns";
import { useParams } from "react-router-dom";
import { getProjectMembers, getProjectTickets } from "../../api/api";

function ProjectDetails() {
  const { handleClickOpen, setError, setMessage } = useAppContext();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const {
    data: tickets,
    isLoading,
    error,
    refetch: refetchTickets,
  } = useQuery(["tickets", id, page], getProjectTickets, {
    keepPreviousData: true,
    onSuccess: (tickets) => {
      setTotalPages(tickets.totalPages);
    },
    onError: () => {
      setError(true);
      setMessage("Error fetching tickets");
    },
  });

  const {
    data: projectDetails,
    refetch,
    isLoading: isLoadingDetails,
  } = useQuery(["project-details", id, page], getProjectMembers, {
    keepPreviousData: true,
    onError: () => {
      setError(true);
      setMessage("Error fetching members");
    },
  });

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        {projectDetails?.projectName} | Tickets
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          my: 2,
        }}
      >
        {!isLoadingDetails && (
          <>
            <AvatarGroup total={projectDetails?.projectMembers.length}>
              {projectDetails?.projectMembers.map((member: any) => (
                <Tooltip title={member.name}>
                  <Avatar alt={member.name} src={member.name} />
                </Tooltip>
              ))}
            </AvatarGroup>
          </>
        )}
        <Tooltip title="Add Member">
          <Fab size="small" color="secondary" aria-label="add">
            <AddIcon onClick={() => handleClickOpen("openMember")} />
          </Fab>
        </Tooltip>
        <Tooltip title="Remove Member">
          <Fab size="small" color="secondary" aria-label="add">
            <DeleteIcon onClick={() => handleClickOpen("openMember")} />
          </Fab>
        </Tooltip>
      </Stack>
      <ContentTab
        title={"Tickets"}
        buttonText={"New Ticket"}
        buttonAction={"openTicket"}
      >
        <ContentTable
          data={tickets}
          columns={ticketColumns}
          error={error}
          isLoading={isLoading}
          setPage={setPage}
          totalPages={totalPages}
          page={page}
        />
      </ContentTab>
      <ContentDivider />

      <AddTicket
        id={id}
        membersData={projectDetails}
        refetchTickets={refetchTickets}
      />
      <AddMember id={id} membersData={projectDetails} refetch={refetch} />
      <AlertMessage />
    </ContentPage>
  );
}

export default ProjectDetails;

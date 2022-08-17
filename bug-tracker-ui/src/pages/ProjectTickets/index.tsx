import { Fab, Stack, Tooltip, Typography } from "@mui/material";
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
import { getProjectMembers, getProjectTickets } from "../../services/api";
import { IUser } from "../../types/IUser";

function ProjectDetails() {
  const { handleClickOpen, setError, setMessage } = useAppContext();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    data: tickets,
    isLoading,
    error,
  }: { data: any; isLoading: any; error: any } = useQuery(
    ["tickets", id, page],
    getProjectTickets,
    {
      keepPreviousData: true,
      onSuccess: (tickets) => {
        setTotalPages(tickets.totalPages);
      },
      onError: () => {
        setError(true);
        setMessage("Error fetching tickets");
      },
    }
  );

  const { data: projectDetails }: { data: any; isLoading: any; error: any } =
    useQuery(["project-details", id, page], getProjectMembers, {
      keepPreviousData: true,
      onError: () => {
        setError(true);
        setMessage("Error fetching members");
      },
    });

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        Project {projectDetails?.projectName} - tickets
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          my: 2,
        }}
      >
        {!loading && (
          <>
            <AvatarGroup total={projectDetails?.projectMembers.length}>
              {projectDetails?.projectMembers.map((member: IUser) => (
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
      <ContentTab title={"Ticket Details"}>
        <Content />
      </ContentTab>

      <AddTicket id={id} membersData={projectDetails} />
      <AddMember id={id} membersData={projectDetails} />
      <AlertMessage />
    </ContentPage>
  );
}

export default ProjectDetails;

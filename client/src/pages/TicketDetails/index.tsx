import Ticket from "./Ticket";
import ContentTab from "../../components/ContentTab";
import { getProjectMembers, getTicketById } from "../../api/api";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import EditTicket from "./EditTicket";
import AlertMessage from "../../components/AlertMessage";
import { Breadcrumbs, Link, Typography } from "@mui/material";

function TicketDetails() {
  const { setError, setMessage } = useAppContext();
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery(
    ["ticket-details", id],
    getTicketById,
    {
      keepPreviousData: true,
      onError: () => {
        setError(true);
        setMessage("Error fetching tickets");
      },
    }
  );

  const { data: projectDetails } = useQuery(
    ["project-details2", data?.ticketProject?._id],
    getProjectMembers,
    {
      keepPreviousData: true,
      onError: () => {
        setError(true);
        setMessage("Error fetching members");
      },
    }
  );
  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1rem" }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/project/${data?.ticketProject?._id}`}
        >
          {projectDetails?.projectName}
        </Link>
        <Typography color="text.primary">{data?.ticketName}</Typography>
      </Breadcrumbs>
      <ContentTab
        title={"Ticket Details"}
        buttonText={"Update Ticket"}
        buttonAction={"openEditTicket"}
      >
        <Ticket ticket={data} />
      </ContentTab>
      <EditTicket
        projectId={data?.ticketProject?._id}
        membersData={projectDetails}
        ticket={data}
        refetch={refetch}
      />
      <AlertMessage />
    </div>
  );
}

export default TicketDetails;

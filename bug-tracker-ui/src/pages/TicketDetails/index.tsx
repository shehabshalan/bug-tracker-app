import React from "react";
import Ticket from "./Ticket";
import ContentTab from "../../components/ContentTab";
import { getProjectMembers, getTicketById } from "../../services/api";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import EditTicket from "./EditTicket";
import AlertMessage from "../../components/AlertMessage";

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

  const { data: projectDetails }: { data: any; isLoading: any; error: any } =
    useQuery(
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

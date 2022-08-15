import { Fab, Stack, Typography } from "@mui/material";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AddIcon from "@mui/icons-material/Add";
import { Column } from "@material-table/core";
import ContentDivider from "../components/ContentDivider";
import Content from "../components/Content";
import AddTicket from "../components/AddTicket";
import { useAppContext } from "../context/AppContext";
import AddMember from "../components/AddMember";
import AlertMessage from "../components/AlertMessage";

function ProjectDetails() {
  const { handleClickOpen } = useAppContext();

  interface IPerson {
    firstName: string;
    lastName: string;
    birthYear: number;
    availability: boolean;
  }

  const lookup = { true: "Available", false: "Unavailable" };

  const columns: Array<Column<IPerson>> = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    { title: "Availablity", field: "availability", lookup },
  ];

  const data: Array<IPerson> = [
    {
      firstName: "Tod",
      lastName: "Miles",
      birthYear: 1987,
      availability: true,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
  ];

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
        {/* <ContentTable data={data} columns={columns} pageSize={data.length} /> */}
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

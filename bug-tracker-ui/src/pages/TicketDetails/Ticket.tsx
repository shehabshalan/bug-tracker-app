import {
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { capitalize } from "lodash";
import { ITicket } from "../../interfaces/ITicket";
import dateConverter from "../../utils/dateConverter";

function Ticket({ ticket }: { ticket: ITicket }) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12} sm={3}>
          <ListItem>
            <ListItemText
              primary="Created"
              secondary={dateConverter(ticket?.createdAt)}
            />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <ListItemText
              primary="Author"
              secondary={ticket?.ticketAuthor?.name}
            />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <ListItemText
              primary="Assigned to"
              secondary={ticket?.ticketAssignedTo?.name}
            />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <ListItemText
              primary="Time estimate"
              secondary={`${ticket.ticketEstimateTimeInHours} hours`}
            />
          </ListItem>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12} sm={4}>
          <ListItem>
            <ListItemText
              primary="Ticket Type"
              secondary={
                <Chip
                  label={capitalize(ticket.ticketType)}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              }
            />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ListItem>
            <ListItemText
              primary="Ticket Priority"
              secondary={
                <Chip
                  label={capitalize(ticket.ticketPriority)}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              }
            />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ListItem>
            <ListItemText
              primary="Ticket Status"
              secondary={
                <Chip
                  label={capitalize(ticket.ticketStatus)}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              }
            />
          </ListItem>
        </Grid>
      </Grid>
      {/* ticket title and ticket details section */}
      <Divider sx={{ my: 3 }} />
      <List>
        <ListItem>
          <ListItemText primary="Ticket Title" secondary={ticket.ticketName} />
        </ListItem>

        <Divider flexItem />
        <ListItem>
          <ListItemText
            primary="Ticket Details"
            secondary={ticket.ticketDescription}
          />
        </ListItem>
      </List>
    </>
  );
}

export default Ticket;

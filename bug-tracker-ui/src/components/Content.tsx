import {
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ContentDivider from "./ContentDivider";
import React from "react";

function Content() {
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
            <ListItemText primary="Created" secondary={"12/12/2020"} />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <ListItemText primary="Author" secondary={"John Doe"} />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <ListItemText primary="Assigned to" secondary={"Sarah Doe"} />
            <Divider orientation="vertical" flexItem />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <ListItemText
              primary="Time estimate"
              secondary={`${Math.floor(Math.random() * 10)} hours`}
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
              primary="Ticket Status"
              secondary={
                <Chip
                  label={
                    ["Open", "In Progress", "Closed"][
                      Math.floor(Math.random() * 3)
                    ]
                  }
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
              primary="Ticket Type"
              secondary={
                <Chip
                  label={
                    ["Bug", "Feature", "Task"][Math.floor(Math.random() * 3)]
                  }
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
                  label={
                    ["Low", "Medium", "High"][Math.floor(Math.random() * 3)]
                  }
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
          <ListItemText primary="Ticket Title" secondary={"Ticket Title"} />
        </ListItem>

        <Divider flexItem />
        <ListItem>
          <ListItemText
            primary="Ticket Details"
            secondary={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus voluptates fugiat atque velit amet sit pariatur necessitatibus exercitationem numquam nulla dolorem ea officiis, et expedita facilis facere, magni, quis deserunt."
            }
          />
        </ListItem>
      </List>
    </>
  );
}

export default Content;

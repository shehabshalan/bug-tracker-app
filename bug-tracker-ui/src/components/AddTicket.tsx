import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import ContentSelect from "./ContentSelect";

function AddTicket() {
  const memberLabel = "Member";
  const memberMenuItems = ["Shehab", "Ali", "Ahmed", "Hassan"];
  const typeLable = "Type";
  const typeMenuItems = ["Bug", "Feature", "Task"];
  const priorityLabel = "Priority";
  const priorityMenuItems = ["Low", "Medium", "High"];
  const statusLabel = "Status";
  const statusMenuItems = ["Open", "In Progress", "Closed"];
  const { handleClose, openType } = useAppContext();
  return (
    <Dialog open={openType.openTicket} onClose={handleClose}>
      <DialogTitle>Create ticket</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              id="title"
              label="Title"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="title"
              label="Description"
              fullWidth
              variant="outlined"
              rows={4}
              multiline
            />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <ContentSelect label={memberLabel} menuItems={memberMenuItems} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                id="title"
                label="Time Estimate (hours)"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <ContentSelect label={typeLable} menuItems={typeMenuItems} />
            </Grid>
            <Grid item xs={4}>
              <ContentSelect
                label={priorityLabel}
                menuItems={priorityMenuItems}
              />
            </Grid>
            <Grid item xs={4}>
              <ContentSelect label={statusLabel} menuItems={statusMenuItems} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTicket;

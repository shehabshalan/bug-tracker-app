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
import ContentMultiSelect from "./ContentMultiSelect";
import ContentSelect from "./ContentSelect";

function AddProject() {
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
    <Dialog open={openType.openProject} onClose={handleClose}>
      <DialogTitle>Create project</DialogTitle>
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
          <Grid item xs={12}>
            <ContentMultiSelect />
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

export default AddProject;

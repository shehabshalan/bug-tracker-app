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

function AddNewMember() {
  const { handleClose, openType } = useAppContext();
  return (
    <Dialog open={openType.openUser} onClose={handleClose}>
      <DialogTitle>Create project</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              id="name"
              label="Name"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNewMember;

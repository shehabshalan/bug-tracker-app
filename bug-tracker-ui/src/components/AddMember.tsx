import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../context/AppContext";
import AlertMessage from "./AlertMessage";
import ContentSelect from "./ContentSelect";
function AddMember({}) {
  const memberLabel = "Member";
  const memberMenuItems = ["Shehab", "Ali", "Ahmed", "Hassan"];
  const {
    handleClose,
    openType,
    success,
    error,
    setSuccess,
    setError,
    setMessage,
  } = useAppContext();

  const addMemeber = () => {
    setSuccess(true);
    setMessage("Member added successfully");
    handleClose();
  };

  return (
    <Dialog open={openType.openMember} onClose={handleClose} fullWidth>
      <DialogTitle>Create ticket</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <ContentSelect label={memberLabel} menuItems={memberMenuItems} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addMemeber}>ADD</Button>
      </DialogActions>
      <AlertMessage />
    </Dialog>
  );
}

export default AddMember;

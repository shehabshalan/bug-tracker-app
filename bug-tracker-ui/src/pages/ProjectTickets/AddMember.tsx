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
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";
import AlertMessage from "../../components/AlertMessage";
import ContentSelect from "../../components/ContentSelect";
function AddMember({}) {
  const { members } = useAuthContext();
  console.log(members);
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
      <DialogTitle>Add member</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <ContentSelect label={memberLabel} menuItems={members} />
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

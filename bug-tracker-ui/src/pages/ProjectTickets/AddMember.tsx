import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";
import AlertMessage from "../../components/AlertMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../services/api";
import { useParams } from "react-router-dom";
function AddMember({
  id,
  membersData,
}: {
  id: string | undefined;
  membersData: any;
}) {
  const queryClient = useQueryClient();

  const { members } = useAuthContext();
  const [memberValue, setMemberValue] = useState("");
  const [memberId, setMemberId] = useState("");
  const { mutate } = useMutation(updateProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["project-members", id]);
      setSuccess(true);
      setMessage("member added successfully");
      handleClose();
    },
    onError: (error: any) => {
      setError(true);
      setMessage(error.response.data);
      handleClose();
    },
  });
  const { handleClose, openType, setSuccess, setError, setMessage } =
    useAppContext();

  const addMemeber = () => {
    mutate({
      payload: {
        projectSlug: membersData.projectSlug,
        projectName: membersData.projectName,
        projectDescription: membersData.projectDescription,
        projectMembers: [
          ...membersData.projectMembers.map((member: any) => member._id),
          memberId,
        ],
        projectTickets: [
          ...membersData.projectTickets.map((ticket: any) => ticket._id),
        ],
      },
      id: id,
    });
  };
  const handleMemberChange = (event: any) => {
    setMemberValue(event.target.value as string);
    const findMemberId: any = members.find(
      (member: any) => member.name === event.target.value
    );
    setMemberId(findMemberId._id as string);
  };
  return (
    <Dialog open={openType.openMember} onClose={handleClose} fullWidth>
      <DialogTitle>Add member</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              value={memberValue}
              onChange={handleMemberChange}
              select
              label={"Member"}
              fullWidth
            >
              {members.map((member: any) => (
                <MenuItem key={member._id} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
            </TextField>
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

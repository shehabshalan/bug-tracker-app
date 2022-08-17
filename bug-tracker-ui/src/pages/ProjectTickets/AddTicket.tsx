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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";
import { createTicket } from "../../services/api";

const TICKET_TYPE = ["Bug", "Feature", "Task"];
const TICKET_PRIORITY = ["Low", "Medium", "High"];
const TICKET_STATUS = ["Open", "In Progress", "Closed"];
const MIN = 1;
const MAX = 24;

function AddTicket({
  id,
  membersData,
}: {
  id: string | undefined;
  membersData: any;
}) {
  const queryClient = useQueryClient();

  const { handleClose, openType, setSuccess, setError, setMessage } =
    useAppContext();
  const { members } = useAuthContext();
  const [priorityValue, setPriorityValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [memberValue, setMemberValue] = useState("");
  const [memberId, setMemberId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(0);

  const { mutate } = useMutation(createTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(["project-tickets", id, 1]);
      setSuccess(true);
      setMessage("Ticket created successfully");
      handleClose();
    },
    onError: (error: any) => {
      setError(true);
      setMessage(error.response.data);
      handleClose();
    },
  });

  const handlePriorityChange = (event: any) => {
    setPriorityValue(event.target.value as string);
  };
  const handleStatusChange = (event: any) => {
    setStatusValue(event.target.value as string);
  };
  const handleTypeChange = (event: any) => {
    setTypeValue(event.target.value as string);
  };
  const handleMemberChange = (event: any) => {
    setMemberValue(event.target.value as string);
    const findMemberId: any = members.find(
      (member: any) => member.name === event.target.value
    );
    setMemberId(findMemberId._id as string);
  };
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value as string);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value as string);
  };
  const handleTimeChange = (event: any) => {
    const time = Math.max(MIN, Math.min(MAX, Number(event.target.value)));
    setTime(time);
  };

  const handleSubmit = () => {
    const payload = {
      ticketName: title,
      ticketDescription: description,
      ticketType: typeValue.toLowerCase(),
      ticketPriority: priorityValue.toLowerCase(),
      ticketStatus: statusValue.toLowerCase(),
      ticketEstimateTimeInHours: time,
      ticketAssignedTo: memberId ? memberId : null,
      ticketProject: id,
    };

    mutate(payload);
  };
  return (
    <Dialog open={openType.openTicket} onClose={handleClose}>
      <DialogTitle>Create ticket</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              value={title}
              autoFocus
              id="title"
              label="Title"
              fullWidth
              variant="outlined"
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={description}
              id="title"
              label="Description"
              fullWidth
              variant="outlined"
              rows={4}
              multiline
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <TextField
                value={memberValue}
                onChange={handleMemberChange}
                select
                label={"Member"}
                fullWidth
              >
                {membersData?.projectMembers.map((member: any) => (
                  <MenuItem key={member._id} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={time}
                id="time"
                label="Time Estimate (hours)"
                variant="outlined"
                type="number"
                fullWidth
                onChange={handleTimeChange}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <TextField
                value={typeValue}
                onChange={handleTypeChange}
                select
                label={"Type"}
                fullWidth
              >
                {TICKET_TYPE.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={priorityValue}
                onChange={handlePriorityChange}
                select
                label={"Priority"}
                fullWidth
              >
                {TICKET_PRIORITY.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={statusValue}
                onChange={handleStatusChange}
                select
                label={"Status"}
                fullWidth
              >
                {TICKET_STATUS.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTicket;

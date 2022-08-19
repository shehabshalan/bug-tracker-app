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
import _ from "lodash";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuthContext } from "../../context/AuthContext";
import { IProjects } from "../../interfaces/IProject";
import { ITicket } from "../../interfaces/ITicket";
import { createTicket, updateTicket } from "../../services/api";

const TICKET_TYPE = ["Bug", "Feature", "Task"];
const TICKET_PRIORITY = ["Low", "Medium", "High"];
const TICKET_STATUS = ["Open", "In Progress", "Closed"];
const MIN = 1;
const MAX = 24;

function EditTicket({
  projectId,
  membersData,
  ticket,
  refetch,
}: {
  projectId: string | undefined;
  membersData: IProjects;
  ticket: ITicket;
  refetch: () => void;
}) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleClose, openType, setSuccess, setError, setMessage } =
    useAppContext();
  const { members } = useAuthContext();
  const [priorityValue, setPriorityValue] = useState(
    _.capitalize(ticket.ticketPriority)
  );
  const [statusValue, setStatusValue] = useState(
    _.startCase(ticket.ticketStatus)
  );
  const [typeValue, setTypeValue] = useState(_.capitalize(ticket.ticketType));
  const [memberValue, setMemberValue] = useState(
    ticket?.ticketAssignedTo?.name || ""
  );
  const [memberId, setMemberId] = useState("");
  const [title, setTitle] = useState(ticket.ticketName);
  const [description, setDescription] = useState(ticket.ticketDescription);
  const [time, setTime] = useState(ticket.ticketEstimateTimeInHours);

  const { mutate } = useMutation(updateTicket, {
    onSuccess: (data) => {
      refetch();
      setSuccess(true);
      setMessage("Updated successfully");
      console.log("success");

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
      ticketAssignedTo: members.find(
        (member: any) => member.name === memberValue
      )._id,
      ticketProject: projectId,
    };

    mutate({
      payload,
      id,
    });
  };
  return (
    <Dialog open={openType.openEditTicket} onClose={handleClose}>
      <DialogTitle>Update ticket</DialogTitle>
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
              id="description"
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

export default EditTicket;

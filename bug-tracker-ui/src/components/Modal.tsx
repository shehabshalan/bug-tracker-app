import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useAppContext } from "../context/AppContext";

function Modal({ children }: { children: React.ReactNode }) {
  const { handleClose, openType } = useAppContext();
  return (
    <div>
      <Dialog
        open={
          openType.openMember ||
          openType.openTicket ||
          openType.openProject ||
          openType.openUser
        }
        onClose={handleClose}
      >
        <DialogTitle>Create ticket</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;

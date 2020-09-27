import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Search } from "@material-ui/icons";

export default function FormDialog() {
  const searchHere = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .catch((results) => {
        console.log(results);
      });
  };

  return (
    <div ref={searchHere}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Search />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={(e) => fetchUsers(e.target.value)}
            margin="dense"
            id="name"
            label="Search"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

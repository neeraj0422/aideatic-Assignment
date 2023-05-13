import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modaal from "./Modal";

const OptionMenu = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    props.setOpenDialog(true)
    props.setUserId(props.id)
  };

  const handleRemoveProfile = () => {
    // code to handle removing the profile
    console.log("Remove profile clicked");
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-controls="option-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="option-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  onClick={handleEditProfile}>Edit profile</MenuItem>
        <MenuItem  onClick={handleOpen}>Remove profile</MenuItem>
      </Menu>
      <Modaal open={open} setOpen={setOpen} id={props.id}/>
    </>
  );
};

export default OptionMenu;

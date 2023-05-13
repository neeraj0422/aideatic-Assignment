import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Modaal({open,setOpen,id}) {
  

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleDelete=()=>{
    let data = JSON.stringify({
      query: `mutation DeleteProfile($deleteProfileId: String!) {
      deleteProfile(id: $deleteProfileId)
    }`,
      variables: {"deleteProfileId":`${id}`}
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.poc.graphql.dev.vnplatform.com/graphql',
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IlNpbWFyIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2NzcyNzAxNTMsImV4cCI6MTY3NzYxNTc1M30.OERVKTr3kCq5cS_QzRWmiEfbPHemMPlW6GXep7IyvA0', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} style={{"margin-left":" 30%",
    width: "56%"}}>
        <DialogTitle>
        Remove profile
          <IconButton
            aria-label="close"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Removed profile will be deleted permenantly and won’t be available anymore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='btn-remove cancel' onClick={handleClose}  style={{padding:"8px 12px 8px 12px",backgroundColor:"#FFFFF"}}>
          Cancel
          </Button>
          <Button className='btn-remove save'  onClick={handleDelete}  style={{padding:"8px 12px 8px 12px",backgroundColor:"#CC1016"}}>
          Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Modaal;

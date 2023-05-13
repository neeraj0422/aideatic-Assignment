import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, TextField } from '@mui/material';
import axios from 'axios';





const CreateProfileDialog = ({ open, onClose, onCreate ,userId}) => {
  const [imageLink, setImageLink] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [verified, setVerified] = useState(false);
  
  
 useEffect(()=>{
if(userId){
getUserById(userId)
}
 },[userId])

 function getUserById(id){
    let data = JSON.stringify({
        query: `query GetProfileById($getProfileByIdId: String!) {
        getProfileById(id: $getProfileByIdId) {
          id
          first_name
          last_name
          email
          is_verified
          image_url
          description
        }
      }`,
        variables: {"getProfileByIdId":`${id}`}
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.poc.graphql.dev.vnplatform.com/graphql',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        const data = response.data.data.getProfileById
        setDescription(data.description)
        setEmail(data.email)
        setFirstName(data.first_name)
        setLastName(data.last_name);
        setImageLink(data.image_url)
        setVerified(data.is_verified)
      })
      .catch((error) => {
        console.log(error);
      });
 }

  const handleSubmit = (event) => {
    event.preventDefault();
    let config
    if(!userId){
    const body={
        updateProfileId: userId??null,
        imageUrl:imageLink,
        firstName:firstName,
        lastName:lastName,
        email:email,
        description:description,
        isVerified:verified
    }
     config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.poc.graphql.dev.vnplatform.com/graphql',
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6Im5lZXJhajEzMDMxOTk4QGdtYWlsLmNvbSIsImlzX2NhbmRpZGF0ZSI6dHJ1ZSwiaWF0IjoxNjgzNzI1NDM0LCJleHAiOjE2ODQyNDM4MzR9.MgZWkO6rd8seJz-SFHLejhdHsFwqohYvgiUONQiT8zQ', 
          'Content-Type': 'application/json'
        },
        data :  JSON.stringify({
            query: `mutation CreateProfile($firstName: String!, $lastName: String!, $email: String!, $isVerified: Boolean!, $imageUrl: String!, $description: String!) {
            createProfile(first_name: $firstName, last_name: $lastName, email: $email, is_verified: $isVerified, image_url: $imageUrl, description: $description) {
              id
              first_name
              last_name
              email
              is_verified
              image_url
              description
            }
          }`,
            variables: body
          })
      };
    }
    else{
        const body={
            updateProfileId: userId,
            imageUrl:imageLink,
            firstName:firstName,
            lastName:lastName,
            email:email,
            description:description,
            isVerified:verified
        }
        let data = JSON.stringify({
            query: `mutation UpdateProfile($updateProfileId: String!, $firstName: String!, $lastName: String!, $email: String!, $isVerified: Boolean!, $imageUrl: String!, $description: String!) {
            updateProfile(id: $updateProfileId, first_name: $firstName, last_name: $lastName, email: $email, is_verified: $isVerified, image_url: $imageUrl, description: $description) {
              id
              first_name
              last_name
              email
              is_verified
              image_url
              description
            }
          }`,
            variables: body
          });
          
           config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.poc.graphql.dev.vnplatform.com/graphql',
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IlNpbWFyIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2NzcyNzAxNTMsImV4cCI6MTY3NzYxNTc1M30.OERVKTr3kCq5cS_QzRWmiEfbPHemMPlW6GXep7IyvA0', 
              'Content-Type': 'application/json'
            },
            data : data
          };
    }
console.log(userId)
    axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  onClose()
})
.catch((error) => {
  console.log(error);
});
   
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{userId?'Edit Profile': 'Create Profile'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="image-link"
          label="Image link"
          type="text"
          value={imageLink}
          onChange={(event) => setImageLink(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="first-name"
          label="First name"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="last-name"
          label="Last name"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              id="verified"
              checked={verified}
              onChange={(event) => setVerified(event.target.checked)}
              color="primary"
            />
          }
          label="Talent is verified"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Create Profile</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProfileDialog;

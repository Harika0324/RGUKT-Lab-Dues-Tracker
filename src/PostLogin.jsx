
import { useState } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function PostLogin() {
  const [ID, setID] = React.useState("");
  const handleID = (event) => {
    setID(event.target.value);
  }
  const navigate=useNavigate();
  const [student,setStudent]=useState(null);
  const [remarks,setRemarks]=useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const handleRemarks = (event) => {
    setRemarks(event.target.value);
  }


  const handleSearch=async ()=>{
    setUpdateMessage("");
    try {
      const response = await fetch(`https://rgukt-lab-dues-tracker.onrender.com/search?ID=${ID}`);
      if (!response.ok) {
          throw new Error('Student not found');
      }
      const data = await response.json();
      setStudent(data.student);
      console.log(data.student);
      setErrorMessage('');
  } catch (error) {
      setStudent(null);
      setErrorMessage('Student not found');
  }
  }


  const handleSubmit=async ()=>{
    try {
      const response = await fetch(`https://rgukt-lab-dues-tracker.onrender.com/updateRemarks?ID=${ID}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ remarks })
      });
      if (!response.ok) {
          throw new Error('Failed to update remarks');
      }
      // Refresh student details after update
      setID('');
        setRemarks('');
        setStudent(null);
        setErrorMessage('');
        setUpdateMessage("Updated Successfully");
  } catch (error) {
      setErrorMessage('Failed to update remarks');
  }
  }


  return (
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter Student ID"
          inputProps={{ 'aria-label': 'Enter Student ID' }}
          value={ID}
          onChange={handleID}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      </Paper>
      <br />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      {errorMessage && <p>{errorMessage}</p>}
      {updateMessage && <p>{updateMessage}</p>}
            {student && (
                <div>
                    <p>Name: {student.Name}</p>
                    <p>Class: {student.Class}</p>
                    <p>Remarks:{student.Remarks}</p>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Remarks"
                      multiline
                      maxRows={4}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                    <br /><br />
                    <Button variant="contained" onClick={handleSubmit}>Update Remarks</Button>
                </div>
            )}
    </div>
  )
}
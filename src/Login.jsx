import * as React from 'react';
import "./Login.css";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
export default function Login(){
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate=useNavigate();

  const [ID, setID] = React.useState("");
  let handleChange1=(event)=>{
    setID(event.target.value);
  }
  const [Password, setPassword] = React.useState("");
  let handleChange2=(event)=>{
    setPassword(event.target.value);
  }
  let handleSubmit=(event)=>{
    fetch("https://rgukt-lab-dues-tracker.onrender.com/loginfaculty",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        ID,
        Password,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      if(data==="success"){
        console.log(ID);
        navigate("/postlogin");
      }
      else{
        alert("Login failed...Try again");
      }
    });
  }
    return(
        <div className='main'>
            <TextField
        id="input-with-icon-textfield"
        label="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        value={ID}
        onChange={handleChange1}
        variant="standard"
      />
      <br /><br />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            vlaue={Password}
            onChange={handleChange2}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <br />
    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
    );
}
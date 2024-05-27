import "./App.css";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import AdminPostLogin from "./AdminPostLogin.jsx";
import PostLogin from "./PostLogin.jsx";
import AdminLogin from "./AdminLogin.jsx";
import React, { useState, useEffect } from "react";
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


function App(){
  return(
    <Router>
      <div>
        <h1>Lab Dues Tracker</h1>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path='/adminpostlogin' element={<AdminPostLogin />}/>
          <Route exact path="/adminlogin" element={<AdminLogin />}/>
          <Route exact path="/postlogin" element={<PostLogin />}/>
        </Routes>
      </div>
    </Router>
    
  );
}
export default App;
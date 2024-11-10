import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home/Home";
import Jobs from "./Components/Job/Jobs";
import JobDetails from "./Components/Job/JobDetails";
import MyJobs from "./Components/Job/MyJobs";
import PostJob from "./Components/Job/PostJob";
import Application from "./Components/Apllication/Application";
import MyApplication from "./Components/Apllication/MyApplications";
import NotFound from "./Components/NotFound/NotFound";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const App = () => {

const {isAuthorised,setIsAuthorised,setUser}=useContext(Context)
 
useEffect(()=>{
 
const fetchUser=async()=>{
  try {
    const response=await axios.get("https://job-seeking-backend-deployment-3aa0.onrender.com/api/v1/user/getuser",{withCredentials:true})
    setUser(response.data.user)
    setIsAuthorised(true)
  } catch (error) {
    setIsAuthorised(false)
  }
}
fetchUser()
},[isAuthorised])

// if(isAuthorised)
//   {
//     return <Navigate to={"/"} />
//   }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/job/getall" element={<Jobs/>} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJob/>} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/me" element={<MyApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster/>
      </Router>
    </>
  );
};

export default App;

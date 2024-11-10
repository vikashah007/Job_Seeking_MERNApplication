import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How JobZee Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              First Resister Yourself To get access to all our features.Resister
              as Employer/Job Seeker
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job/Post a Job</p>
            <p>
              After Successfull loggedIn as Employer you can post job, view
              applicants application and many more features / as Job Seeker,You
              can apply for job's , get lastest job updates.
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Explore</p>
            <p>
              After Successfull logging in you get access to all features of our
              website. Our website will help Employer as well as Job Seekers for
              Fulfilling Demands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

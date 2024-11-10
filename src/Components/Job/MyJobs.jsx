/* eslint-disable react/no-unknown-property */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { Navigate, useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorised, user } = useContext(Context);
  const navigateTo = useNavigate();
  // Fetching all Jobs of a particular loggedIn Employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://job-seeking-backend-deployment-3aa0.onrender.com/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorised || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // Function for handling editing enable mode

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  const handleDisableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function for updating The job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`https://job-seeking-backend-deployment-3aa0.onrender.com/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  //Finction for deleteing the job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`https://job-seeking-backend-deployment-3aa0.onrender.com/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJob) => prevJob.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, feild, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [feild]: value } : job
      )
    );  
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>Your Posted Jobs</h3>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => {
                  return (
                    <>
                      <div className="card" key={element._id}>
                        <div className="content">
                          <div className="short_feilds">
                            <div>
                              <p>Title : </p>
                              <input
                                type="text"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.title}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "title",
                                    e.target.value
                                  )
                                }  
                              />
                            </div>
                            <div>
                              <p>Country : </p>
                              <input
                                type="text"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.country}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "country",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              <p>City : </p>
                              <input
                                type="text"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.city}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "city",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              <p>Category : </p>
                              <select
                                value={element.category}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "category",
                                    e.target.value
                                  )
                                }
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                              >
                                <option value="">Select Category</option>
                                <option value="Graphics & Design">
                                  Graphics & Design
                                </option>
                                <option value="Mobile App Development">
                                  Mobile App Development
                                </option>
                                <option value="Frontend Web Development">
                                  Frontend Web Development
                                </option>
                                <option value="MERN Stack Development">
                                  MERN STACK Development
                                </option>
                                <option value="Account & Finance">
                                  Account & Finance
                                </option>
                                <option value="Artificial Intelligence">
                                  Artificial Intelligence
                                </option>
                                <option value="Video Animation">
                                  Video Animation
                                </option>
                                <option value="MEAN Stack Development">
                                  MEAN STACK Development
                                </option>
                                <option value="MEVN Stack Development">
                                  MEVN STACK Development
                                </option>
                                <option value="Data Entry Operator">
                                  Data Entry Operator
                                </option>
                              </select>
                            </div>
                            <div>
                              <span>
                                Salary :{" "}
                                {element.fixedSalary ? (
                                  <input
                                    type="number"
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                    value={element.fixedSalary}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "fixedSalary",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <div>
                                    <input
                                      type="number"
                                      disabled={
                                        editingMode !== element._id
                                          ? true
                                          : false
                                      }
                                      value={element.salaryFrom}
                                      onChange={(e) =>
                                        handleInputChange(
                                          element._id,
                                          "salaryFrom",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="number"
                                      disabled={
                                        editingMode !== element._id
                                          ? true
                                          : false
                                      }
                                      value={element.salaryTo}
                                      onChange={(e) =>
                                        handleInputChange(
                                          element._id,
                                          "salaryTo",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </span>
                            </div>
                            <div>
                              <span>Expired : </span>
                              <select
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.expired}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "expired",
                                    e.target.value
                                  )
                                }
                              >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                            </div>
                          </div>
                          <div className="long_field">
                            <div>
                              <span>Descrption : </span>
                              <textarea
                                rows="5"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.description}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              <span>Location : </span>
                              <textarea
                                rows="5"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.location}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "location",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="button_wrapper">
                          <div className="edit_btn_wrapper">
                            {editingMode === element._id ? (
                              <>
                                <button
                                  className="check_btn"
                                  onClick={() => handleUpdateJob(element._id)}
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  className="cross_btn"
                                  onClick={() => handleDisableEdit()}
                                >
                                  <RxCross2 />
                                </button>
                              </>
                            ) : (
                              <button
                                className="edit_btn"
                                onClick={() => handleEnableEdit(element._id)}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          <button
                                className="delete_btn"
                                onClick={() => handleDeleteJob(element._id)}
                              >
                                Delete
                              </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <p>You have not posted any job </p>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default MyJobs;

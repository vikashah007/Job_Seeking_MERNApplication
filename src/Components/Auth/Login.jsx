import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorised, setIsAuthorised, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(
        "https://job-seeking-backend-deployment-3aa0.onrender.com/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setUser(data.user);
      setIsAuthorised(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthorised) {
      navigateTo("/");
    }
  }, [isAuthorised, navigateTo]);

  return (
    <div className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png" alt="logo" />
          <h3>Login To Your Account</h3>
        </div>
        <form>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </div>
  );
};

export default Login;

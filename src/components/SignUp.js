import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { addUser, setToken } from "../redux/userSlice";
import "./css/SignUp.css";

const SignUp = () => {
  const state = useSelector((state) => state);
  console.log(state);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (username.length < 4) {
      return alert("username must be alteast 4 character long");
    }
    if (password.length < 5) {
      return alert("username must be alteast 5 character long");
    }
    // console.log(username, password);
    // console.log(`${backendUrl}/user/register`);

    const res = await fetch(`${backendUrl}/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data && data.token) {
      dispatch(setToken(data.token));
      dispatch(addUser(data.user.username));
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      return alert("username already exist");
    }
  };
  return (
    <div className="register">
      <div className="register-container">
        {/* <h1>Welcome to Sports Club</h1> */}
        <h1>Create Account</h1>
        <form onSubmit={submitHandler}>
        <h3>User Name</h3>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='continue'>Sign Up</button>
          <div className="detail">
            <p>Already have an account ?</p>
            <Link to="/login" className="signin-link">
              <p>Sign In</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

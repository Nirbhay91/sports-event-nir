import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { addUser, setToken } from "../redux/userSlice";
import "./css/Login.css";
const Login = () => {
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
    try {
      const res = await fetch(`${backendUrl}/user/login`, {
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
      } else {return alert(data.msg)}
    } catch (error) {
      return alert(error.message);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <h3>Login</h3>
        <form onSubmit={submitHandler}>
          <h5>Username</h5>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-signIn">Log In</button>
        </form>
        <p>
          By continuing, you agree to Sports Club,s Conditions of Use and
          Privacy Notice.
        </p>
      </div>
      <p>New to Sport Club</p>
      <Link to="/signup">
        <button className="login-register">Create Your Sport Club Account</button>
      </Link>
    </div>
  );
};

export default Login;

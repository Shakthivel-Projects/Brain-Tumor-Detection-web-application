import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/home");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <Link to="/forgot">Forgot Password?</Link><br/>
      <Link to="/signup">Create an Account</Link>
    </div>
  );
}

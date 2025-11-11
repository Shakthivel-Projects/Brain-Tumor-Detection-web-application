import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const register = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);

    localStorage.setItem("user", JSON.stringify(form));

    navigate("/");
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={register}>
        <input placeholder="First Name" onChange={(e)=>setForm({...form, first:e.target.value})}/>
        <input placeholder="Last Name" onChange={(e)=>setForm({...form, last:e.target.value})}/>
        <input placeholder="Email" onChange={(e)=>setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, pass:e.target.value})}/>
        <input type="date" placeholder="DOB" onChange={(e)=>setForm({...form, dob:e.target.value})}/>
        <input placeholder="Phone" onChange={(e)=>setForm({...form, phone:e.target.value})}/>
        <button>Create</button>
      </form>
    </div>
  );
}

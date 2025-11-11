import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="profile-menu">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="profile"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="dropdown">
          <p onClick={() => navigate("/profile")}>Profile</p> 
          <p onClick={logout}>Logout</p>
        </div>
      )}
    </div>
  );
}

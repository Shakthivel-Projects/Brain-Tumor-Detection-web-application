
import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Brain Tumor Detector</h2>

      <div className="right-section">
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
        </div>

        <ProfileMenu />
      </div>
    </nav>
  );
}


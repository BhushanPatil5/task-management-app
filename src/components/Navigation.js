// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="topnav">
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/categories">Categories</Link>
    </div>
  );
};

export default Navigation;

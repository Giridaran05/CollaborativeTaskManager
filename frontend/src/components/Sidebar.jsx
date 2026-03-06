import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2>TeamCollab</h2>

      <Link to="/workspace">Workspaces</Link>

      <Link to="/projects">Projects</Link>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/notifications">Notifications</Link>

    </div>

  );

}

export default Sidebar;
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="content-area">

        <Topbar />

        <div className="main-content">

          {children}

        </div>

      </div>

    </div>

  );

}

export default Layout;
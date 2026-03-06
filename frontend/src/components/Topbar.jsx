import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="topbar">

      <div className="topbar-left">

        <h2>Team Collaboration Platform</h2>

      </div>

      <div className="topbar-right">

        <button onClick={() => navigate("/workspace")}>
          Workspaces
        </button>

        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/notifications")}>
          Notifications
        </button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Topbar;
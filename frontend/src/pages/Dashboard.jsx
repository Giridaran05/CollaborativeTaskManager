import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [tasksByStatus, setTasksByStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await API.get("/dashboard");

        if (res.data && res.data.tasksByStatus) {
          setTasksByStatus(res.data.tasksByStatus);
        } else {
          setTasksByStatus([]);
        }

      } catch (error) {

        console.error("Dashboard error:", error);
        setTasksByStatus([]);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard();

  }, []);

  if (loading) {
    return <h3>Loading dashboard...</h3>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h2>Project Analytics</h2>

      {tasksByStatus.length === 0 ? (
        <p>No task data available</p>
      ) : (

        tasksByStatus.map((task, index) => (

          <div key={index} style={{
            background: "#f3f3f3",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px"
          }}>

            <strong>{task.status}</strong> : {task.count}

          </div>

        ))

      )}

    </div>
  );
}

export default Dashboard;
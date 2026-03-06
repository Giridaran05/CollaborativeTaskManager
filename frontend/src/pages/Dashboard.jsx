import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [tasksByStatus, setTasksByStatus] = useState([]);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await API.get("/dashboard");

        // safe fallback
        setTasksByStatus(res.data.tasksByStatus || []);

      } catch (error) {

        console.error("Error fetching dashboard:", error);
        setTasksByStatus([]);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboard();

  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h2>Project Analytics</h2>

      {tasksByStatus.length === 0 ? (
        <p>No task data available</p>
      ) : (
        <div>

          {tasksByStatus.map((task, index) => (

            <div key={index} style={{
              marginBottom: "10px",
              padding: "10px",
              background: "#f3f3f3",
              borderRadius: "5px"
            }}>

              <strong>{task.status}</strong> : {task.count}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;
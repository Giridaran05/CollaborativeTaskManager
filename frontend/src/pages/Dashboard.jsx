import React, { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";

function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const res = await API.get("/dashboard");

      setStats(res.data);

    } catch (error) {

      console.error("Error fetching dashboard stats:", error);

    }
  };

  if (!stats) return <p style={{ padding: "30px" }}>Loading dashboard...</p>;

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  return (
    <div style={{ padding: "30px" }}>

      <h2>Project Analytics Dashboard</h2>

      <div style={{ display: "flex", gap: "40px", marginTop: "30px", flexWrap: "wrap" }}>

        {/* Pie Chart */}

        <div>

          <h3>Tasks by Status</h3>

          <PieChart width={350} height={300}>

            <Pie
              data={stats.tasksByStatus}
              dataKey="count"
              nameKey="_id"
              outerRadius={110}
              label
            >

              {stats.tasksByStatus.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </div>


        {/* Bar Chart */}

        <div>

          <h3>Task Overview</h3>

          <BarChart
            width={450}
            height={300}
            data={[
              { name: "Total", value: stats.totalTasks },
              { name: "Completed", value: stats.completedTasks },
              { name: "Overdue", value: stats.overdueTasks }
            ]}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#8884d8"
            />

          </BarChart>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
import React from "react";
import TaskCard from "./TaskCard";

function KanbanColumn({ title, tasks }) {

  return (
    <div
      style={{
        width: "250px",
        background: "#f4f5f7",
        padding: "10px",
        borderRadius: "8px"
      }}
    >

      <h3>{title}</h3>

      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}

    </div>
  );
}

export default KanbanColumn;
import React from "react";

function TaskCard({ task }) {

  return (
    <div
      style={{
        background: "white",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <h4>{task.title}</h4>

      <p>{task.description}</p>

      <small>Priority: {task.priority}</small>

    </div>
  );
}

export default TaskCard;
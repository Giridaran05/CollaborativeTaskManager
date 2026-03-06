import React, { useEffect, useState } from "react";
import API from "../services/api";

import KanbanColumn from "./KanbanColumn";

function KanbanBoard({ projectId }) {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    const res = await API.get(`/tasks/${projectId}`);

    setTasks(res.data);

  };

  const todo = tasks.filter((t) => t.status === "todo");

  const inprogress = tasks.filter((t) => t.status === "inprogress");

  const review = tasks.filter((t) => t.status === "review");

  const done = tasks.filter((t) => t.status === "done");


  return (
    <div
      style={{
        display: "flex",
        gap: "20px"
      }}
    >

      <KanbanColumn title="To Do" tasks={todo} />

      <KanbanColumn title="In Progress" tasks={inprogress} />

      <KanbanColumn title="Review" tasks={review} />

      <KanbanColumn title="Done" tasks={done} />

    </div>
  );
}

export default KanbanBoard;
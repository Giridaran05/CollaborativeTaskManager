import KanbanBoard from "../components/KanbanBoard";

function Project() {

  const projectId = "PROJECT_ID";

  return (
    <div>

      <h2>Project Board</h2>

      <KanbanBoard projectId={projectId} />

    </div>
  );
}

export default Project;
import { useState, useEffect } from "react";
import API from "../services/api";

function Workspaces() {

  const [name, setName] = useState("");
  const [workspaces, setWorkspaces] = useState([]);

  const fetchWorkspaces = async () => {

    const res = await API.get("/workspaces");

    setWorkspaces(res.data);

  };

  const createWorkspace = async () => {

    if (!name) return alert("Enter workspace name");

    try {

      await API.post("/workspaces", { name });

      setName("");

      fetchWorkspaces();

    } catch {

      alert("Failed to create workspace");

    }

  };

  useEffect(() => {

    fetchWorkspaces();

  }, []);

  return (

    <div className="workspace-container">

      <div className="workspace-header">

        <h2>Your Workspaces</h2>

        <div className="workspace-create">

          <input
            placeholder="Workspace name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={createWorkspace}>
            Create Workspace
          </button>

        </div>

      </div>

      <div className="workspace-grid">

        {workspaces.map(ws => (

          <div key={ws._id} className="workspace-card">

            <h3>{ws.name}</h3>

            <p>Created {new Date(ws.createdAt).toLocaleDateString()}</p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Workspaces;
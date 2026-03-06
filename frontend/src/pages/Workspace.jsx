import React from "react";
import { useState } from "react";
import API from "../services/api";

function Workspaces() {

  const [name, setName] = useState("");

  const createWorkspace = async () => {

    if (!name) return alert("Enter workspace name");

    try {

      await API.post("/workspaces", { name });

      alert("Workspace created");

      window.location.reload();

    } catch (error) {

      console.error(error);
      alert("Failed to create workspace");

    }

  };

  return (
    <div>

      <input
        placeholder="Workspace name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createWorkspace}>
        Create Workspace
      </button>

    </div>
  );
}

export default Workspaces;
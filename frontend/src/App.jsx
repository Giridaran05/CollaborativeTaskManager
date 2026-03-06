import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Workspace from "./pages/Workspace";
import Project from "./pages/Project";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <Layout>
                <Workspace />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/:workspaceId"
          element={
            <ProtectedRoute>
              <Layout>
                <Project />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/task/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TaskDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
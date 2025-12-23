import React, { useEffect, useState } from "react";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeNav, setActiveNav] = useState("tasks"); // tasks | completed | settings
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/tasks`);
      if (!res.ok) {
        throw new Error(`Failed to fetch tasks (status ${res.status})`);
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNavChange = (tab) => {
    setActiveNav(tab);
  };

  const handleAddTaskClick = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      setSaving(true);
      setError("");
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete task (status ${res.status})`);
      }
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message || "Error deleting task");
    } finally {
      setSaving(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");

      const isEdit = !!taskToEdit?._id;
      const url = isEdit
        ? `${API_URL}/tasks/${taskToEdit._id}`
        : `${API_URL}/tasks`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to ${isEdit ? "update" : "create"} task (status ${
            res.status
          })`
        );
      }

      await fetchTasks();
      setIsFormOpen(false);
      setTaskToEdit(null);
    } catch (err) {
      console.error("Error saving task:", err);
      setError(err.message || "Error saving task");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter((task) => {
    // navbar filter
    const matchNav =
      activeNav === "tasks"
        ? task.status !== "completed"
        : activeNav === "completed"
        ? task.status === "completed"
        : true;

    const matchPriority =
      priorityFilter === "all" ||
      task.priority?.toString() === priorityFilter.toString();

    const matchCategory =
      categoryFilter === "all" ||
      (task.category || "").toLowerCase() === categoryFilter.toLowerCase();

    return matchNav && matchPriority && matchCategory;
  });

  return (
    <MainLayout>
      <Header
        activeNav={activeNav}
        onNavChange={handleNavChange}
        onAddTask={handleAddTaskClick}
      />

      {activeNav !== "settings" ? (
        <>
          <Filters
            priority={priorityFilter}
            category={categoryFilter}
            onChangePriority={setPriorityFilter}
            onChangeCategory={setCategoryFilter}
          />

          <div className="status-bar">
            {loading && <span>Loading tasks...</span>}
            {saving && !loading && <span>Saving changes...</span>}
            {error && <span className="error-text">{error}</span>}
          </div>

          <TaskList
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </>
      ) : (
        <div className="settings-placeholder">
          <h2>Settings</h2>
          <p>Settings page coming soon...</p>
        </div>
      )}

      {isFormOpen && (
        <TaskForm
          initialData={taskToEdit}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
          saving={saving}
        />
      )}
    </MainLayout>
  );
}

export default App;

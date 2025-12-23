import React, { useState, useEffect } from "react";
import "./TaskForm.css";

const TaskForm = ({ initialData, onSubmit, onCancel, saving }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status || "pending");
  const [priority, setPriority] = useState(initialData?.priority || 1);
  const [category, setCategory] = useState(initialData?.category || "Work");
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "pending");
      setPriority(initialData.priority || 1);
      setCategory(initialData.category || "Work");
      setDueDate(
        initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
      );
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status,
      priority: Number(priority),
      category,
      dueDate: dueDate || null,
    });
  };

  return (
    <div className="task-form-backdrop">
      <div className="task-form-modal">
        <h2>{initialData ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <label>
              Priority
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Design">Design</option>
              </select>
            </label>

            <label>
              Due date
              <input
                type="date"
                value={dueDate || ""}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn cancel-btn"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
            <button type="submit" className="btn save-btn" disabled={saving}>
              {saving
                ? "Saving..."
                : initialData
                ? "Save Changes"
                : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

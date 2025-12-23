import React from "react";
import "./TaskCard.css";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityLabel =
    task.priority === 1
      ? "Low"
      : task.priority === 2
      ? "Medium"
      : "High";

  return (
    <article className="task-card">
      <div className="task-main">
        <h3>{task.title}</h3>
        <p className="task-desc">{task.description}</p>
        <p className="task-category">{task.category}</p>
      </div>

      <div className="task-meta">
        <p>
          <span className="meta-label">Due:</span> {formatDate(task.dueDate)}
        </p>
        <p>
          <span className="meta-label">Status:</span>{" "}
          {task.status.replace("-", " ").toUpperCase()}
        </p>
        <span className={`priority-badge p${task.priority}`}>
          {priorityLabel}
        </span>
        <div className="task-actions">
          <DeleteButton onClick={onDelete} />
          <EditButton onClick={onEdit} />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;

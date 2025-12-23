import React from "react";
import "./TaskList.css";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <section className="task-list-container">
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks to show.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task._id)}
          />
        ))
      )}
    </section>
  );
};

export default TaskList;

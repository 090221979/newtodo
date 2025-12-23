import React from "react";
import "./Buttons.css";

const AddTaskButton = ({ onClick }) => {
  return (
    <button className="btn add-task-btn" onClick={onClick}>
      + Add Task
    </button>
  );
};

export default AddTaskButton;

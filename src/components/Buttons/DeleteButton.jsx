import React from "react";
import "./Buttons.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="btn delete-btn" onClick={onClick}>
      Delete
    </button>
  );
};

export default DeleteButton;

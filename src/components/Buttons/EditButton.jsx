import React from "react";
import "./Buttons.css";

const EditButton = ({ onClick }) => {
  return (
    <button className="btn edit-btn" onClick={onClick}>
      Edit
    </button>
  );
};

export default EditButton;

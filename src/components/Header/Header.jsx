import React from "react";
import "./Header.css";
import NavBar from "../NavBar/NavBar";
import AddTaskButton from "../Buttons/AddTaskButton";

const Header = ({ activeNav, onNavChange, onAddTask }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Task Manager</h1>
        <NavBar activeNav={activeNav} onNavChange={onNavChange} />
      </div>
      <AddTaskButton onClick={onAddTask} />
    </header>
  );
};

export default Header;

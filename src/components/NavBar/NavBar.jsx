import React from "react";
import "./NavBar.css";

const NavBar = ({ activeNav, onNavChange }) => {
  const links = [
    { id: "tasks", label: "Tasks" },
    { id: "completed", label: "Completed" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <nav className="navbar">
      {links.map((link) => (
        <button
          key={link.id}
          className={`nav-link ${activeNav === link.id ? "active" : ""}`}
          onClick={() => onNavChange(link.id)}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
};

export default NavBar;

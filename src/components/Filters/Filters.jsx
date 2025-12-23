import React from "react";
import "./Filters.css";

const Filters = ({
  priority,
  category,
  onChangePriority,
  onChangeCategory,
}) => {
  return (
    <section className="filters">
      <div className="filter-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => onChangePriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onChangeCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Design">Design</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;

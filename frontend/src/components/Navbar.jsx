import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>📋 ProU Manager</h1>
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#employees">Employees</a></li>
          <li><a href="#tasks">Tasks</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
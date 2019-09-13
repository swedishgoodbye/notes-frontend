import React from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = props => {
  return (
    <div className="Sidebar">
      <h1 className="Sidebar-Title">Notes</h1>
      <Link to={'/'}>
        <button type="button" className="sidebar-button">
          View Your Notes
        </button>
      </Link>
      <Link to={'/new'}>
        <button type="button" className="sidebar-button">
          + Create New Note
        </button>
      </Link>
      <Link to={'/login'}>
        <button type="button">Login</button>
      </Link>
      <Link to={'/register'}>
        <button type="button">Register</button>
      </Link>
    </div>
  );
};

export default Sidebar;

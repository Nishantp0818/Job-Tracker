import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <a href="/dashboard" className="brand">JobTrackr</a>
        {user && (
          <div className="user-box">
            <span className="user-name">👤 {user.Username || user.email}</span>
            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

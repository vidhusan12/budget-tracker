import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userAPI } from '../../services/api';
import UserProfile from '../UserProfile/UserProfile';
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.profile-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userAPI.getProfile();
        setUser(res.data);
      } catch (error) {
        console.error('Not logged in')
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  // Function to toggle the menu
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <h2>Budget Tracker</h2>
        <div className="mobile-controls">
          {user && (
            <UserProfile
              user={user}
              onLogout={handleLogout}
              isOpen={isDropdownOpen}
              onToggle={toggleDropdown}
            />
          )}
          <button className='hamburger' onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      <div className="navbar-right">
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/"> DashBoard</Link></li>
          <li><Link to="/add-expense"> Add Transcation</Link></li>
          <li><Link to="/add-income">Add Income</Link></li>
          <li><Link to="/add-bills">Add Bills</Link></li>
          <li><Link to="/add-savings">Add Savings</Link></li>
          {user ? (
            <li className="desktop-profile">
              <UserProfile
                user={user}
                onLogout={handleLogout}
                isOpen={isDropdownOpen}
                onToggle={toggleDropdown}
              />
            </li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
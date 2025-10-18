import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <h2>Budget Tracker</h2>
        <button className='hamburger' onClick={toggleMenu}>
          {isMenuOpen ? 'x' : '☰'}
        </button>
      </div>
      <div className="navbar-right">
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/"> DashBoard</Link></li>
          <li><Link to="/add-expense"> Add Transcation</Link></li>
          <li><Link to="/add-income">Add Income</Link></li>
          <li><Link to="/add-bills">Add Bills</Link></li>
          <li><Link to="/add-savings">Add Savings</Link></li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
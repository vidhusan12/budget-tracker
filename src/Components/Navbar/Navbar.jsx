import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <h2>Budget Tracker</h2>
      </div>
      <div className="navbar-right">
        <ul className='nav-links'>
          <li><Link to="/"> DashBoard</Link></li>
          <li><Link to="/add-expense"> Add Transcation</Link></li>
          <li><Link to="/add-income">Add Income</Link></li>
          <li><Link to="/add-bills">Add Bills</Link></li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
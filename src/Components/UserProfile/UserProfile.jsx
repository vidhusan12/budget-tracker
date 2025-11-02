import React from 'react'
import './UserProfile.css'

const UserProfile = ({ user, onLogout, isOpen, onToggle }) => {
  return (
    <div className="profile-container">
      <div className="profile-icon" onClick={onToggle}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      {isOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            <p className="user-since">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="dropdown-divider"></div>
          <button onClick={onLogout} className="dropdown-item">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
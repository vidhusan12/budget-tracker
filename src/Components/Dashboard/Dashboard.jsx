import React from 'react'
import './Dashboard.css'

const Dashboard = ({ expenses, income, bills, savings }) => {
  // Calculate weekly spending limit
  // Income - Bills - Savings = Available to spend
  const weeklySpendingLimit = income - bills - savings;


  return (
    <div className="dashboard">
      <h1>Budget Overview</h1>

      <div className="spending-limit-card">
        <h2>${weeklySpendingLimit}</h2>
        <p>Weekly Spending Limit</p>
      </div>
      <hr />

      <div className="budget-grid">
        <div className="budget-item">
          <span className='label'>Income</span>
          <span className='amount income-amount'>${income}</span>
        </div>
        <div className="budget-item">
          <span className='label'>Bills</span>
          <span className='amount bills-amount'>${bills}</span>
        </div>
        <div className="budget-item">
          <span className='label'>Savings</span>
          <span className='amount savings-amount'>${savings}</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'

const Dashboard = ({expenses, income, bills, savings}) => {
  // Calculate weekly spending limit
  // Income - Bills - Savings = Available to spend
  const weeklySpendingLimit = income - bills - savings;


  return (
    <div className="dashboard">
      <h1>Budget Overview</h1>

      <div className="budget-card">
        <h2>${weeklySpendingLimit}</h2>
        <p>Weekly Spending Limit</p>
      </div>

      <div className="budget-details">
        <div className="budget-item">
          <span>Income</span>
          <span>${income}</span>
        </div>
                <div className="budget-item">
          <span>Bills</span>
          <span>${bills}</span>
        </div>
        <div className="budget-item">
          <span>Savings</span>
          <span>${savings}</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
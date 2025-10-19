import React from 'react'
import './Dashboard.css'

const Dashboard = ({ expenses, incomes, bills, savings }) => {
  // Calculate weekly spending limit
  function calculateWeeklyIncome() {
    let totalWeekly = 0;
    const today = new Date();

    incomes.forEach((income) => {
      if (!income.startDate) {
        return;
      }
      // Weekly income
      if (income.frequency === 'weekly') {
        totalWeekly += income.amount;
      } else if (income.frequency === 'one-time') {
        // one time income
        const incomeDate = new Date(income.startDate);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0)

        if (incomeDate >= startOfWeek) {
          totalWeekly += income.amount
        }

      } else if (income.frequency === 'fortnightly') {
        // fortnightly income
        const startDate = new Date(income.startDate);
        // Calculate milliseconds between today and startDate
        const milliseconds = today - startDate;
        // Convert milliseconds to days
        const convertToDays = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
        // Convert days to weeks
        const weeksPassed = Math.floor(convertToDays / 7);
        // Check if it's an even week (pay week)
        if (weeksPassed % 2 === 0) {
          totalWeekly += income.amount
        }
      } else if (income.frequency === 'monthly') {
        const startDate = new Date(income.startDate);
        const startDay = startDate.getDate(); // gets day of month (1-31)
        const todayDay = today.getDate();

        if (Math.abs(todayDay - startDay) < 7) {
          totalWeekly += income.amount;
        }
      }
    })

    return totalWeekly

  }

  function calculateWeeklyBills() {
    let totalWeekly = 0;
    bills.forEach((bill) => {
      totalWeekly += bill.amount / 4
    })
    return totalWeekly
  }

  function calculateWeeklyExpenses() {
    let totalExpenses = 0;
    const today = new Date();

    // calculating the start of the week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0) // resets the time to midnight;

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= startOfWeek) {
        totalExpenses += Number(expense.amount)
      }
    })

    return totalExpenses
  }

  function getMostRecentExpense() {
    if (expenses.length === 0) {
      return null; // No Expenses yet!
    };

    const sortedExpenses = [...expenses].sort((a, b) => {
      return new Date(b.date) - new Date(a.date); // gets the newest transaction
    });

    // Returns the latest transcation in the array
    return sortedExpenses[0];

  }

  const weeklyIncome = calculateWeeklyIncome();
  const weeklyBills = calculateWeeklyBills();
  const weeklyExpenses = calculateWeeklyExpenses();
  const recentExpense = getMostRecentExpense();
  // Income - Bills - Savings = Available to spend
  const weeklySpendingLimit = weeklyIncome - weeklyBills - savings;
  const remainingBudget = weeklySpendingLimit - weeklyExpenses;





  return (
    <div className="dashboard">
      <h1>Budget Overview</h1>

      <div className="spending-limit-card">
        <h2>${remainingBudget.toFixed(2)}</h2>
        <p>Remaining This Week</p>
      </div>
      <div className="budget-summary">
        <div className="summary-item">
          <span>Weekly Budget </span>
          <span>${weeklySpendingLimit.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Spent This Week </span>
          <span>${weeklyExpenses.toFixed(2)}</span>
        </div>
      </div>
      <hr />

      <div className="budget-grid">
        <div className="budget-item">
          <span className='label'>Income</span>
          <span className='amount income-amount'>${weeklyIncome.toFixed(2)}</span>
        </div>
        <div className="budget-item">
          <span className='label'>Bills</span>
          <span className='amount bills-amount'>${weeklyBills.toFixed(2)}</span>
        </div>
        <div className="budget-item">
          <span className='label'>Savings</span>
          <span className='amount savings-amount'>${savings}</span>
        </div>
        <div className="budget-item">
          <span className='label'>Recent Transaction</span>
          <span className='amount recent-transaction'>
            {recentExpense ? (
             <div style={{color: '#333'}}>
               ${recentExpense.amount} ({recentExpense.category})
             </div>
            ) : (
              'None'
            )}
          </span>
        </div>
      </div>
      <hr />

      <h2>Income & Bills</h2>
      <div className="income-list">
        {incomes.map((income) => (
          <div key={income.id} className='list-item'>
            <span className='item-name'>{income.description}</span>
            <span className='item-amount'>
              ${income.amount} ({income.frequency})
            </span>
          </div>
        ))}
      </div>
      <div className="bills-list">
        {bills.map((bill) => (
          <div key={bill.id} className='list-item'>
            <span className='item-name'>{bill.name}</span>
            <span className='item-amount'>${bill.amount} (Monthly)</span>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Dashboard
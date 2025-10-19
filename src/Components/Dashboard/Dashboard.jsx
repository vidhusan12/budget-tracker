import React, { useState } from 'react'
import './Dashboard.css'

const Dashboard = ({ expenses, incomes, bills, savings }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(today.getDate() + diff); // makes the week start on monday instead of sunday
    startOfWeek.setHours(0, 0, 0, 0) // resets the time to midnight;

    return startOfWeek
  })


  function goToPreviousWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate)
  }

  function goToNextWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate)
  }

  function getWeekDisplay() {
    const weekNumber = Math.ceil(currentWeekStart.getDate() / 7);
    const endOfWeek = new Date(currentWeekStart)
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    const startStr = currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = endOfWeek.toLocaleDateString('en-US', { day: 'numeric' });

    return `Week ${weekNumber} (${startStr}-${endStr})`;
  }

  function isCurrentWeek() {
    const today = new Date();
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(today.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);

    return startOfWeek.getTime() === currentWeekStart.getTime();
  }

  function isOldestWeek() {
    const today = new Date();
    const oldestAllowed = new Date(today);
    oldestAllowed.setDate(today.getDate() - (12 * 7)); // Go back 12 weeks

    // Align to Monday (start of week)
    const dayOfWeek = oldestAllowed.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    oldestAllowed.setDate(oldestAllowed.getDate() + diff);
    oldestAllowed.setHours(0, 0, 0, 0);

    return currentWeekStart.getTime() <= oldestAllowed.getTime();
  }

  function calculateWeeklyIncome() {
    let totalWeekly = 0;
    const today = currentWeekStart;

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
        const startOfWeek = currentWeekStart;

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
    const startOfWeek = currentWeekStart;

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
      <div className="week-navigation">
        <button onClick={goToPreviousWeek} disabled={isOldestWeek()}>← Previous Week</button>
        <h3>{getWeekDisplay()}</h3>
        <button onClick={goToNextWeek} disabled={isCurrentWeek()}>Next Week →</button>
      </div>

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
              <div style={{ color: '#333' }}>
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
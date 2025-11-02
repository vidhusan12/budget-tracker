import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { GiMoneyStack } from 'react-icons/gi';
import { BiTrendingDown } from 'react-icons/bi';
import { GiCash } from 'react-icons/gi';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { FaSackDollar } from 'react-icons/fa6';
import { expenseAPI, incomeAPI, billAPI, savingsAPI } from '../../services/api';

const Dashboard = ({ expenses, incomes, bills, savings, setExpenses, setIncomes, setBills, setSavings }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(today.getDate() + diff); // makes the week start on monday instead of sunday
    startOfWeek.setHours(0, 0, 0, 0) // resets the time to midnight;
    return startOfWeek
  })



  // Load all data from backend when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [expensesRes, incomesRes, billsRes, savingsRes] = await Promise.all([
          expenseAPI.getAll(),
          incomeAPI.getAll(),
          billAPI.getAll(),
          savingsAPI.get()
        ]);

        setExpenses(expensesRes.data);
        setIncomes(incomesRes.data);
        setBills(billsRes.data);
        setSavings(savingsRes.data.amount);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchAllData();
  }, [setExpenses, setIncomes, setBills, setSavings]);


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
    const endOfWeek = new Date(currentWeekStart)
    endOfWeek.setDate(endOfWeek.getDate() + 6);


    incomes.forEach((income) => {

      // Weekly income
      if (income.frequency === 'weekly') {
        totalWeekly += income.amount;
      } else if (income.frequency === 'one-time') {
        // one time income
        const incomeDate = new Date(income.startDate);
        const startOfWeek = currentWeekStart;

        if (incomeDate >= startOfWeek && incomeDate <= endOfWeek) {
          totalWeekly += income.amount
        }

      } else if (income.frequency === 'fortnightly') {
        if (!income.startDate) return;

        const startDate = new Date(income.startDate);
        startDate.setHours(0, 0, 0, 0);

        const todayMidnight = new Date(today);
        todayMidnight.setHours(0, 0, 0, 0);

        const milliseconds = todayMidnight - startDate;
        const convertToDays = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
        const weeksPassed = Math.floor(convertToDays / 7);


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
    const endOfWeek = new Date(currentWeekStart);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);

      if (expenseDate >= startOfWeek && expenseDate <= endOfWeek) {
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
        <button onClick={goToPreviousWeek} disabled={isOldestWeek()}>←</button>
        <h3>{getWeekDisplay()}</h3>
        <button onClick={goToNextWeek} disabled={isCurrentWeek()}>→</button>
      </div>

      <div className="spending-limit-card">
        <p>Remaining This Week</p>
        <h2>${remainingBudget.toFixed(2)}</h2>
      </div>
      <div className="budget-summary">
        <div className="summary-card">
          <div className="summary-content">
            <span className="summary-label">Weekly Budget</span>
            <span className="summary-amount">${weeklySpendingLimit.toFixed(2)}</span>
          </div>
          <div className="summary-icon">
            <GiMoneyStack size={40} color='#27ae60' />
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-content">
            <span className="summary-label">Spent This Week</span>
            <span className="summary-spent">${weeklyExpenses.toFixed(2)}</span>
          </div>
          <div className="summary-icon">
            < BiTrendingDown size={40} color='red' />
          </div>
        </div>
      </div>


      <div className="budget-grid">
        {/* Income */}
        <div className="budget-item">
          <div className="budget-header">
            <FaArrowTrendUp size={20} color='green' />
            <span className='budget-label'>Income</span>
          </div>
          <span className='budget-amount income-amount'>${weeklyIncome.toFixed(2)}</span>
        </div>

        {/* Bills */}
        <div className="budget-item">
          <div className="budget-header">
            <GiCash size={20} color='#e74c3c' />
            <span className='budget-label'>Bills</span>
          </div>
          <span className='budget-amount bills-amount'>${weeklyBills.toFixed(2)}</span>
        </div>

        {/* Savings */}
        <div className="budget-item">
          <div className="budget-header">
            <FaSackDollar size={20} color='blue' />
            <span className='budget-label'>Savings</span>
          </div>
          <span className='budget-amount savings-amount'>${savings}</span>
        </div>

        {/* Recent Transaction */}
        <div className="budget-item">
          <div className="budget-header">
            <span className='budget-label'>Recent Transaction</span>
          </div>
          <span className='budget-amount recent-transaction'>
            {recentExpense ? (
              <div>
                <p>{recentExpense.category}</p>
                <p style={{ color: 'red' }}>${recentExpense.amount}</p>
              </div>
            ) : (
              'None'
            )}
          </span>
        </div>
      </div>
      <div className='income-bill-container'>

        <div className="income-sources">
          <h3>Income Sources</h3>
          <div className="dashboard-income-list">
            {incomes.map((income) => (
              <div key={income._id} className='income-bill-item'>
                <span className='income-bill-name'>{income.description}</span>
                <div className="income-bill-details">
                  <span className='income-bill-frequency'>{income.frequency}</span>
                  <span className='income-bill-amount'>${income.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bills-sources">
          <h3>Bills</h3>
          <div className="dashboard-bills-list">
            {bills.map((bill) => (
              <div key={bill._id} className='income-bill-item'>
                <span className='income-bill-name'>{bill.name}</span>
                <div className="income-bill-details">
                  <span className='income-bill-frequency'>Monthly</span>
                  <span className='income-bill-expense'>${bill.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard
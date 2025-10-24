import React, { useEffect, useState } from 'react'
import "./AddExpense.css"
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const AddExpense = ({ expenses, setExpenses }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);




  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayFormatted = today.toISOString().split('T')[0];
  const yesterdayFormatted = yesterday.toISOString().split('T')[0];

  const handleSave = () => {
    if (editingId !== null) {
      const updatedExpenses = expenses.map((expense) => {
        if (expense.id === editingId) {
          return { ...expense, amount: Number(amount), category: category, date: date, description: description }
        } else {
          return expense
        }

      });
      setExpenses(updatedExpenses);
    } else {
      const newExpense = {
        id: Date.now(),
        amount,
        category,
        date,
        description
      };
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    }
    // Clear form after saving
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
    setEditingId(null);
  }

  function handleEdit(expense) {
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setDescription(expense.description);
    setEditingId(expense.id);
  }

  function handleDelete(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  const getExpensesByDate = () => {
    const groupedExpenses = {};

    expenses.forEach((expense) => {
      if (groupedExpenses[expense.date]) {
        groupedExpenses[expense.date].push(expense);
      } else {
        groupedExpenses[expense.date] = [expense]
      }
    });
    return groupedExpenses;
  }

  const expensesByDate = getExpensesByDate();

  // Sort dates in descending order (most recent first)
  const sortedDates = Object.keys(expensesByDate).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="container">
      <div className="left-box">
        <div className="amount">
          <h3>Amount</h3>
          <input
            type="number"
            required
            placeholder='Enter the amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="category">
          <h3>Category</h3>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="gas">Gas</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="date">
          <h3>Date</h3>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="description">
          <h3>Description</h3>
          <input
            type="text"
            required
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button onClick={handleSave}>{editingId ? "Update Expense" : "Save Expense"}</button>
      </div>

      <div className="right-box">
        <div className="expenses-list">
          {sortedDates.map((dateKey) => {
            const expensesForDate = expensesByDate[dateKey];

            let header;
            if (dateKey === todayFormatted) {
              header = "Today";
            } else if (dateKey === yesterdayFormatted) {
              header = "Yesterday";
            } else {
              header = dateKey;
            }

            return (
              <div key={dateKey}>
                <p className="date-header">{header}</p>
                {expensesForDate.map((expense, index) => (
                  <div key={expense.id} className="expense-item"> {/* ← Add className */}
                    <div className="expense-info">
                      <span className="expense-category">{expense.category}</span>
                      <span className="expense-amount">${expense.amount}</span>
                    </div>
                    <div className="expense-actions">
                      <button className="edit-btn" onClick={() => handleEdit(expense)}>
                        <BsPencil size={14} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(expense.id)}>
                        <MdOutlineDelete size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AddExpense
import React, { useEffect, useState } from 'react'
import "./AddExpense.css"
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { expenseAPI } from '../../services/api';

const AddExpense = ({ expenses, setExpenses }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load expenses from backend when component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await expenseAPI.getAll();
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, [setExpenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const expenseData = {
        amount: parseFloat(amount),
        category,
        description,
        date: new Date().toISOString()
      };

      if (editingId !== null) {
        // UPDATE existing expense
        const response = await expenseAPI.update(editingId, expenseData);
        setExpenses(expenses.map((expense) =>
          expense._id === editingId ? response.data : expense
        ));
        alert('Expense updated successfully!');
      } else {
        // CREATE new expense
        const response = await expenseAPI.create(expenseData);
        setExpenses([response.data, ...expenses]);
        alert('Expense added successfully!');
      }

      // Clear form
      setAmount('');
      setCategory('');
      setDescription('');
      setEditingId(null);

    } catch (error) {
      console.error('Error saving expense:', error);
      alert('Failed to save expense. Please try again.');
    }
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setCategory(expense.category);
    setDescription(expense.description);
    setEditingId(expense._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseAPI.delete(id);
        setExpenses(expenses.filter((expense) => expense._id !== id));
        alert('Expense deleted successfully!');
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense. Please try again.');
      }
    }
  };

  const getExpensesByDate = () => {
    const groupedExpenses = {};

    expenses.forEach((expense) => {
      const dateKey = new Date(expense.date).toISOString().split('T')[0];
      if (groupedExpenses[dateKey]) {
        groupedExpenses[dateKey].push(expense);
      } else {
        groupedExpenses[dateKey] = [expense];
      }
    });
    return groupedExpenses;
  };

  const expensesByDate = getExpensesByDate();
  const sortedDates = Object.keys(expensesByDate).sort((a, b) => new Date(b) - new Date(a));

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  return (
    <div className="container">
      <div className="left-box">
        <form onSubmit={handleSubmit}>
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

          <div className="description">
            <h3>Description</h3>
            <input
              type="text"
              placeholder='Enter description (optional)'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit">
            {editingId ? 'Update Expense' : 'Save Expense'}
          </button>
        </form>
      </div>

      <div className="right-box">
        <div className="expenses-list">
          {sortedDates.map((dateKey) => {
            const expensesForDate = expensesByDate[dateKey];

            let header;
            if (dateKey === today) {
              header = "Today";
            } else if (dateKey === yesterday) {
              header = "Yesterday";
            } else {
              header = dateKey;
            }

            return (
              <div key={dateKey}>
                <p className="date-header">{header}</p>
                {expensesForDate.map((expense) => (
                  <div key={expense._id} className="expense-item">
                    <div className="expense-info">
                      <span className="expense-category">{expense.category}</span>
                      <span className="expense-amount">${expense.amount}</span>
                    </div>
                    <div className="expense-actions">
                      <button className="edit-btn" onClick={() => handleEdit(expense)}>
                        <BsPencil size={16} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(expense._id)}>
                        <MdOutlineDelete size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
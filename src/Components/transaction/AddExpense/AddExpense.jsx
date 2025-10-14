import React, { useState } from 'react'

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState([]);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayFormatted = today.toISOString().split('T')[0];
const yesterdayFormatted = yesterday.toISOString().split('T')[0];

  const handleSave = () => {
    const newExpense = {
      amount,
      category,
      date,
      description
    };

    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    console.log([...expenses, newExpense]);
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

  return (
    <div className="container">
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

      <button onClick={handleSave}>Save Expense</button>

      <div className="expenses-list">
        {Object.keys(expensesByDate).map((dateKey) => {
          const expensesForDate = expensesByDate[dateKey];

          let header;
          if(dateKey === todayFormatted) {
            header = "Today";
          } else if (dateKey === yesterdayFormatted) {
            header = "Yesterday";
          } else {
            header = dateKey;
          }

          return (
            <div key={dateKey}>
              <p>{header}</p>
              {expensesForDate.map((expense, index) => (
                <div key={index}>
                  <span>{expense.category}</span>
                  <span>${expense.amount}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default AddExpense
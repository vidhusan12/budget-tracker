import React, { useState } from 'react'
import './AddIncome.css'
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const AddIncome = ({ incomes, setIncomes }) => {

  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [startDate, setStartDate] = useState('');



  // Handle Function
  function handleSave() {
    if (editingId !== null) {
      // Editing existing income
      const updatedIncomes = incomes.map((income) => {
        if (income.id === editingId) {
          return { ...income, amount: Number(amount), frequency: frequency, description: description, startDate: startDate }
        } else {
          return income
        }
      });
      setIncomes(updatedIncomes)
    } else {
      const newIncome = {
        id: Date.now(),
        amount: Number(amount),
        frequency: frequency,
        description: description,
        startDate: startDate
      };
      setIncomes(preIncomes => [...preIncomes, newIncome]);
    }
    // Clear form
    setAmount('')
    setFrequency('')
    setDescription('')
    setStartDate('')
    setEditingId(null)

  }

  function handleEdit(income) {
    setAmount(income.amount)
    setFrequency(income.frequency)
    setDescription(income.description)
    setStartDate(income.startDate)
    setEditingId(income.id)
  }

  function handleDelete(id) {
    setIncomes(incomes.filter((income) => income.id !== id))
  }

  return (
    <div className="container">
      <div className="left-box">
        <div className="amount">
          <h3>Amount</h3>
          <input
            type="number"
            placeholder='Enter amount'
            value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="frequency">
          <h3>Frequency</h3>
          <select
            name=""
            id=""
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly">Monthly</option>
            <option value="one-time">One-Time</option>
          </select>
        </div>

        <div className="description">
          <h3>Description</h3>
          <input
            type="text"
            placeholder='e.g Main Job, Side Gig'
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="date">
          <h3>Start Date</h3>
          <input
            type="date"
            placeholder='When do you get paid'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>When did/will you receive your first payment?</p>
        </div>
        <button onClick={handleSave}>
          {editingId ? 'Update Income' : 'Save Income'}
        </button>
      </div>

      <div className="right-box">
        <div className="incomes-list">
          {incomes.map((income) => (
            <div key={income.id} className='income-item'>
              <div className="income-info">
                <span className="income-description">{income.description}</span>
                <span className="income-amount">${income.amount} • {income.frequency}</span>
              </div>
              <div className="income-actions">
                <button className="edit-btn" onClick={() => handleEdit(income)}>
                  <BsPencil size={16} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(income.id)}>
                  <MdOutlineDelete size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddIncome
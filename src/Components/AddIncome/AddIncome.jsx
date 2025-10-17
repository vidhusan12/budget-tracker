import React, { useState } from 'react'
import './AddIncome.css'

const AddIncome = ({ incomes, setIncomes }) => {

  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Handle Function
  function handleSave() {
    if (editingId !== null) {
      // Editing existing income
      const updatedIncomes = incomes.map((income) => {
        if (income.id === editingId) {
          return { ...income, amount: Number(amount), frequency: frequency, description: description }
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
        description: description
      };
      setIncomes(preIncomes => [...preIncomes, newIncome]);
    }
    // Clear form
    setAmount('')
    setFrequency('')
    setDescription('')
    setEditingId(null)

  }

  function handleEdit(income) {
    setAmount(income.amount)
    setFrequency(income.frequency)
    setDescription(income.description)
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
        <button onClick={handleSave}>
          {editingId ? 'Update Income' : 'Save Income'}
        </button>
      </div>

      <div className="right-box">
        <div className="incomes-list">
          {incomes.map((income) => (
            <div key={income.id} className='income-item'>
              <div className="income-info">
                <p><strong>{income.description}</strong></p>
                <p>${income.amount} ({income.frequency})</p>
              </div>
              <div className="income-actions">
                <button onClick={() => handleEdit(income)}>Edit</button>
                <button onClick={() => handleDelete(income.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddIncome
import React, { useState } from 'react'
import './AddIncome.css'

const AddIncome = ({ incomes, setIncomes }) => {

  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');

  // Handle Function
  function handleSave() {
    const newIncome = {
      amount: Number(amount),
      frequency: frequency,
      description: description
    }

    setIncomes(prevIncomes => [...prevIncomes, newIncome])
    setAmount('')
    setFrequency('')
    setDescription('')

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
        <button onClick={handleSave}>Save Income</button>
      </div>

      <div className="right-box">
        <div className="incomes-list">
          {incomes.map((income, index) => (
            <div key={index}>
              <p>{income.description}</p>
              <p>${income.amount} ({income.frequency})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddIncome
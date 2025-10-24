import React, { useState } from 'react'
import './AddSavings.css'
import { MdOutlineSavings } from 'react-icons/md';
const AddSavings = ({ savings, setSavings }) => {
  const [amount, setAmount] = useState('')

  function handleSave() {
    setSavings(Number(amount));
    setAmount('');
  }
  return (
    <div className="savings-container">
      <div className="savings-card">
        <div className="savings-header">
          <MdOutlineSavings size={40} color="#f39c12" />
          <div>
            <h1>Weekly Savings Goal</h1>
            <p>Set how much you want to save each week</p>
          </div>
        </div>

        <div className="savings-input">
          <label htmlFor="savings-amount">Weekly Savings Amount</label>
          <input
            id="savings-amount"
            type="number"
            placeholder="Enter weekly savings goal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleSave}>Set Savings Goal</button>
        </div>

        <div className="current-savings">
          <h3>Current Goal</h3>
          <div className="savings-display">
            <span className="savings-amount">${savings}</span>
            <span className="savings-frequency">per week</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSavings
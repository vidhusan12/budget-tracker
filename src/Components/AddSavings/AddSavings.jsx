import React, { useState } from 'react'
import './AddSavings.css'
const AddSavings = ({ savings, setSavings }) => {
  const [amount, setAmount] = useState('')

  function handleSave() {
    setSavings(Number(amount));
    setAmount('');
  }
  return (
    <div className="savings-container">
      <h1>Weekly Savings Goal</h1>
      <p>Set how much you want to save each week</p>
      <div className="savings-input">
        <label htmlFor="">Weekly Savings Amount</label>
        <input
          type="number"
          placeholder='Enter weekly savings goal'
          value={amount}
          onChange={(e) => setAmount(e.target.value)} />
          <button onClick={handleSave}>Set Savings Goal</button>
      </div>
      <div className="current-savings">
        <h3>Current Savings Goal</h3>
        <p>${savings}/week</p>
      </div>
    </div>
  )
}

export default AddSavings
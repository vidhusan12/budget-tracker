import React, { useState } from 'react'
import './AddBills.css'

const AddBills = ({ bills, setBills }) => {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [editingId, setEditingId] = useState(null)

  function handleSave() {
    if (editingId !== null) {
      const updatedBills = bills.map((bill) => {
        if (bill.id === editingId) {
          return { ...bill, name: name, amount: Number(amount) }
        } else {
          return bill
        }
      });
      setBills(updatedBills)
    } else {
      // Adding new bill
      const newBill = {
        id: Date.now(),
        name: name,
        amount: Number(amount)
      }

      setBills(prevBills => [...prevBills, newBill])
    }
    // Clear form
    setName('');
    setAmount('');
    setEditingId(null);
  }

  function handleEdit(bill) {
    setName(bill.name)
    setAmount(bill.amount)
    setEditingId(bill.id)
  }

  function handleDelete(id) {
    const filteredBills = bills.filter((bill) => bill.id !== id)
    setBills(filteredBills)
  }

  return (
    <div className="container">
      <div className="left-box">
        <div className="name">
          <h3>Bill Name</h3>
          <input
            type="text"
            placeholder='e.g., Rent, Interent'
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="amount">
          <h3>Monthly Amount</h3>
          <input
            type="number"
            placeholder='Enter monthly amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button onClick={handleSave}>{editingId ? 'Update Bill' : 'Add Bill'}</button>
      </div>

      <div className="right-box">
        <div className="bills-list">
          {bills.map((bill) => (
            <div key={bill.id}>
              <div className="bill-item">
                <div className="bill-info">
                  <h4>{bill.name}</h4>
                  <p>${bill.amount}/month (${(bill.amount / 4).toFixed(2)}/week)</p>
                </div>
                <div className="bill-actions">
                  <button onClick={() => handleEdit(bill)}>Edit</button>
                  <button onClick={() => handleDelete(bill.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddBills
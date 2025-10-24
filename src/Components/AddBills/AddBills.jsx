import React, { useState } from 'react'
import './AddBills.css'
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

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
            <div key={bill.id} className='bill-item'>
              <div className="bill-info">
                <span className="bill-name">{bill.name}</span>
                <span className="bill-amount">${bill.amount} • Monthly</span>
              </div>
              <div className="bill-actions">
                <button className="edit-btn" onClick={() => handleEdit(bill)}>
                  <BsPencil size={16} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(bill.id)}>
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

export default AddBills
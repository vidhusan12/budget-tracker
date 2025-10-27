import React, { useEffect, useState } from 'react'
import './AddBills.css'
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { billAPI } from '../../services/api';

const AddBills = ({ bills, setBills }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Load bills from backend when component mounts
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await billAPI.getAll();
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error)
      }
    };
    fetchBills();
  }, [setBills])

  async function handleSave() {
    if (!name || !amount) {
      alert('Please fill in all required fields');
      return
    }

    try {
      const billData = {
        name,
        amount: parseFloat(amount)
      };

      if (editingId !== null) {
        // Update existing bill
        const response = await billAPI.update(editingId, billData);
        setBills(bills.map((bill) =>
          bill._id === editingId ? response.data : bill
        ));
        alert('Bill updated successfully!!!')
      } else {
        // Create new bill
        const response = await billAPI.create(billData);
        setBills([response.data, ...bills]);
        alert('Bill added successfully');
      }

      // Clear form
      setName('');
      setAmount('');
      setEditingId(null);
    } catch (error) {
      console.error('Error saving bills:', error);
      alert('Failed to save bill, Please try again.')
    }

  }

  function handleEdit(bill) {
    setName(bill.name)
    setAmount(bill.amount)
    setEditingId(bill._id)
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        await billAPI.delete(id);
        setBills(bills.filter((bill) => bill._id !== id));
        alert('Bill deleted successfully!');
      } catch (error) {
        console.error('Error deleting bill:', error);
        alert('Failed to delete bill. Please try again.');
      }
    }
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
            <div key={bill._id} className='bill-item'>
              <div className="bill-info">
                <span className="bill-name">{bill.name}</span>
                <span className="bill-amount">${bill.amount} • Monthly</span>
              </div>
              <div className="bill-actions">
                <button className="edit-btn" onClick={() => handleEdit(bill)}>
                  <BsPencil size={16} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(bill._id)}>
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
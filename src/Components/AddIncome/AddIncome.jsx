import React, { useState } from 'react'
import './AddIncome.css'
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { incomeAPI } from '../../services/api';
import { useEffect } from 'react';

const AddIncome = ({ incomes, setIncomes }) => {

  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [startDate, setStartDate] = useState('');

  // Load incomes from backend when component mounts
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await incomeAPI.getAll();
        setIncomes(response.data);
      } catch (error) {
        console.error('Error fetching incomes:', error)
      }
    };
    fetchIncomes();
  }, [setIncomes]);



  // Handle Function
  async function handleSave() {
    if (!amount || !frequency || !description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const incomeData = {
        amount: parseFloat(amount),
        description,
        frequency,
        startDate
      };

      if (editingId !== null) {
        // Update existing income
        const response = await incomeAPI.update(editingId, incomeData)
        setIncomes(incomes.map((income) =>
          income._id === editingId ? response.data : income
        ));
        alert('Income updated successfully!!!');
      } else {
        // Create new income
        const response = await incomeAPI.create(incomeData);
        setIncomes([response.data, ...incomes]);
        alert('Income added successfully!!!');
      }

      // Clear form
      setAmount('');
      setFrequency('');
      setDescription('');
      setStartDate('');
      setEditingId(null);

    } catch (error) {
      console.error('Error saving income:', error);
      alert('Failed to save income. Please try again.')
    }
  }

  function handleEdit(income) {
    setAmount(income.amount)
    setFrequency(income.frequency)
    setDescription(income.description)
    setStartDate(income.startDate || '')
    setEditingId(income._id)
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this income?')) {
      try {
        await incomeAPI.delete(id);
        setIncomes(incomes.filter((income) => income._id !== id));
        alert('Income deleted successfully!');
      } catch (error) {
        console.error('Error deleting income:', error);
        alert('Failed to delete income. Please try again.');
      }
    }
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
            <div key={income._id} className='income-item'>
              <div className="income-info">
                <span className="income-description">{income.description}</span>
                <span className="income-amount">${income.amount} • {income.frequency}</span>
              </div>
              <div className="income-actions">
                <button className="edit-btn" onClick={() => handleEdit(income)}>
                  <BsPencil size={16} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(income._id)}>
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
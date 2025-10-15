import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AddExpense from './Components/AddExpense/AddExpense'
Route

function App() {

  // Load from localStorage when component first mounts
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem('expenses');
      if (savedExpenses && savedExpenses !== 'undefined') {
        return JSON.parse(savedExpenses);
      }
    } catch (error) {
      console.error('Error loading expenses from localStorage:', error);
    }
    return [];
  });

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]); // This runs every time expenses changes


  return (
    <>
      <AddExpense expenses={expenses} setExpenses={setExpenses}/>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AddExpense from './Components/AddExpense/AddExpense'
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';


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

  // state for income, bills, saving 
  const [income, setIncome] = useState(0);
  const [bills, setBills] = useState(0);
  const [savings, setSavings] = useState(0);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]); // This runs every time expenses changes


  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard expenses={expenses} income={income} bills={bills} savings={savings} />} />
        <Route path="/add-expense" element={<AddExpense expenses={expenses} setExpenses={setExpenses} />} />
      </Routes>
    </>
  )
}

export default App

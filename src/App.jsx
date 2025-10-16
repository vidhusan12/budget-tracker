import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AddExpense from './Components/AddExpense/AddExpense'
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import AddIncome from './Components/AddIncome/AddIncome';
import AddBills from './Components/AddBills/AddBills';
import AddSavings from './Components/AddSavings/AddSavings';


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


  // state for income, bills, saving 
  const [incomes, setIncomes] = useState(() => {
    try {
      const savedIncomes = localStorage.getItem('incomes');
      if (savedIncomes && savedIncomes !== 'undefined') {
        return JSON.parse(savedIncomes);
      }
    } catch (error) {
      console.error('Error loading incomes from localStorage: ', error)
    }
    return []
  });

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  const [bills, setBills] = useState(() => {
    try {
      const savedBills = localStorage.getItem('bills');
      if (savedBills && savedBills !== 'undefined') {
        return JSON.parse(savedBills)
      }
    } catch (error) {
      console.error('Error loading bills from localStorage', error)
    }
    return []
  });

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
  }, [bills])

  const [savings, setSavings] = useState(() => {
    try {
      const savedSavings = localStorage.getItem('savings');
      if(savedSavings && savedSavings !== 'undefined') {
        return JSON.parse(savedSavings);
      }
    } catch (error) {
      console.error('Error loading savings from localStorage', error);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('savings', JSON.stringify(savings));
  }, [savings])



  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard expenses={expenses} incomes={incomes} bills={bills} savings={savings} />} />
        <Route path="/add-expense" element={<AddExpense expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/add-income" element={<AddIncome incomes={incomes} setIncomes={setIncomes} />} />
        <Route path="/add-bills" element={<AddBills bills={bills} setBills={setBills} />} />
        <Route path='/add-savings' element={<AddSavings savings={savings} setSavings={setSavings}/>}/>
      </Routes>
    </>
  )
}

export default App

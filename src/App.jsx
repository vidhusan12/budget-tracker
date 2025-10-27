import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AddExpense from './Components/AddExpense/AddExpense'
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import AddIncome from './Components/AddIncome/AddIncome';
import AddBills from './Components/AddBills/AddBills';
import AddSavings from './Components/AddSavings/AddSavings';

function App() {
  // Simple state - no localStorage!
  // Each component will load from MongoDB
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [bills, setBills] = useState([]);
  const [savings, setSavings] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              expenses={expenses}
              incomes={incomes}
              bills={bills}
              savings={savings}
              setExpenses={setExpenses}
              setIncomes={setIncomes}
              setBills={setBills}
              setSavings={setSavings}
            />
          }
        />
        <Route
          path="/add-expense"
          element={<AddExpense expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route
          path="/add-income"
          element={<AddIncome incomes={incomes} setIncomes={setIncomes} />}
        />
        <Route
          path="/add-bills"
          element={<AddBills bills={bills} setBills={setBills} />}
        />
        <Route
          path='/add-savings'
          element={<AddSavings savings={savings} setSavings={setSavings} />}
        />
      </Routes>
    </>
  )
}

export default App

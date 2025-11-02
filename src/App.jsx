import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import AddExpense from './Components/AddExpense/AddExpense'
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import AddIncome from './Components/AddIncome/AddIncome';
import AddBills from './Components/AddBills/AddBills';
import AddSavings from './Components/AddSavings/AddSavings';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';

function App() {
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [bills, setBills] = useState([]);
  const [savings, setSavings] = useState(0);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  // Hide navbar on login/signup/home pages
  const hideNavbar = location.pathname === '/login'
    || location.pathname === '/signup'
    || location.pathname === '/home'
    || location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />

        {/* Protected routes - require login */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
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
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/add-expense"
          element={
            isLoggedIn ? (
              <AddExpense expenses={expenses} setExpenses={setExpenses} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/add-income"
          element={
            isLoggedIn ? (
              <AddIncome incomes={incomes} setIncomes={setIncomes} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/add-bills"
          element={
            isLoggedIn ? (
              <AddBills bills={bills} setBills={setBills} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path='/add-savings'
          element={
            isLoggedIn ? (
              <AddSavings savings={savings} setSavings={setSavings} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App

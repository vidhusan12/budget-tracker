import React, { useState, useEffect } from 'react'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  if (localStorage.getItem('token')) {
    window.location = '/';
  }
}, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('')

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });


    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location = '/dashboard';
    } else {
      setError(data.message || 'Signup failed');
    }
  }


  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter your name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input type="text"
          placeholder='Enter your email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}

export default Signup
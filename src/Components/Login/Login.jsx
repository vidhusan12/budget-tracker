import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { createValidationRules } from '../../utils/validationRules';
import Input from '../Input/Input';
import './Login.css';

const Login = () => {
  // Initial form values for login (no name or confirmPassword)
  const initialValues = {
    email: '',
    password: ''
  };

  // Get validation rules for login (false = not signup)
  const validationRules = createValidationRules(false);

  // Use our custom hook
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll
  } = useFormValidation(initialValues, validationRules);

  // State for form submission
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location = '/';
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Validate all fields before submitting
    if (!validateAll()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location = '/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {/* Email field */}
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          disabled={isLoading}
        />

        {/* Password field */}
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          showPasswordToggle={true}
          disabled={isLoading}
        />

        {/* Error message */}
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="login-footer">
        Don't have an account?{' '}
        <a href="/signup" className="login-link">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default Login;
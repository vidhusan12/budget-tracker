import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { createValidationRules } from '../../utils/validationRules';
import Input from '../Input/Input';
import PasswordStrength from '../PasswordStrength/PasswordStrength';
import './Signup.css';


const Signup = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationRules = createValidationRules(true);

  // Custom hooks
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur, 
    validateAll
  } = useFormValidation(initialValues, validationRules);

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

    if (!validateAll()) {
      return; // Stop if validation fails
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location = '/';
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        {/* Name field */}
        <Input
          name="name"
          type="text"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          disabled={isLoading}
        />

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

        {/* Password strength indicator */}
        <PasswordStrength
          password={values.password}
          show={touched.password}
        />

        {/* Confirm password field */}
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
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
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="signup-footer">
        Already have an account?{' '}
        <a href="/login" className="signup-link">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Signup;
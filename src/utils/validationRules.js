export const createValidationRules = (isSignup = false) => {
  // Email validators (same for login and signup)
  const emailValidators = [
    (value) => (!value ? 'Email is required' : ''),
    (value) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : '')
  ];

  // Password validators (same for login and signup)
  const passwordValidators = [
    (value) => (!value ? 'Password is required' : ''),
    (value) => (value.length < 8 ? 'Password must be at least 8 characters' : ''),
    (value) => (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)
      ? 'Password must contain uppercase, lowercase, and number'
      : '')
  ];

  // Start with basic rules
  const rules = {
    email: emailValidators,
    password: passwordValidators
  };

  // Add signup-specific rules
  if (isSignup) {
    rules.name = [
      (value) => (!value ? 'Name is required' : ''),
      (value) => (value.length < 2 ? 'Name must be at least 2 characters' : '')
    ];

    rules.confirmPassword = [
      (value) => (!value ? 'Please confirm your password' : ''),
      (value, allValues) => (value !== allValues?.password ? 'Passwords do not match' : '')
    ];
  }

  return rules;
};
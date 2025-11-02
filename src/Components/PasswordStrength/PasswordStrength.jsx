import React from 'react';

const PasswordStrength = ({ password, show }) => {
  if (!show || !password) return null;

  const checks = [
    { label: 'At least 8 characters', test: password.length >= 8 },
    { label: 'Contains uppercase letter', test: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', test: /[a-z]/.test(password) },
    { label: 'Contains number', test: /\d/.test(password) },
    { label: 'Contains special character', test: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  const strength = checks.filter((check) => check.test).length;

  const strengthColors = [
    '#ef4444', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#3b82f6', // Blue
    '#22c55e'  // Green
  ];

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div style={{ marginTop: '8px' }}>
      {/* Strength bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              height: '4px',
              flex: 1,
              borderRadius: '2px',
              backgroundColor: i < strength
                ? strengthColors[strength - 1]
                : '#e5e7eb',
              transition: 'background-color 0.2s'
            }}
          />
        ))}
      </div>

      {/* Strength label */}
      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
        Password strength:{' '}
        <span style={{ fontWeight: '600', color: strengthColors[strength - 1] || '#6b7280' }}>
          {strengthLabels[strength - 1] || 'Very Weak'}
        </span>
      </div>

      {/* Requirements checklist */}
      <div>
        {checks.map((check, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              marginBottom: '4px',
              color: check.test ? '#22c55e' : '#9ca3af'
            }}
          >
            <span style={{ marginRight: '8px' }}>
              {check.test ? '✅' : '○'}
            </span>
            <span>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
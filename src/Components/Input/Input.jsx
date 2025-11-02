import React, { useState } from 'react';

const Input = ({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  showPasswordToggle = false,
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle
    ? (showPassword ? 'text' : 'password')
    : type;

  const handleInputChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleInputBlur = () => {
    onBlur(name);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ position: 'relative' }}>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '12px',
            paddingRight: showPasswordToggle ? '40px' : '12px',
            border: error && touched ? '2px solid #ef4444' : '2px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: error && touched ? '#fef2f2' : '#ffffff',
            outline: 'none',
            transition: 'all 0.2s',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'text'
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }
          }}
          onBlur={(e) => {
            handleInputBlur();
            e.target.style.borderColor = error && touched ? '#ef4444' : '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '20px',
              opacity: disabled ? 0.5 : 1
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>

      {error && touched && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px',
            color: '#ef4444',
            fontSize: '14px'
          }}
        >
          <span style={{ marginRight: '4px' }}>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
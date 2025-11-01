import { useState, useCallback } from 'react';

export const useFormValidation = (initialState, validationRules) => {
  // State 1: Form values (what user types)
  const [values, setValues] = useState(initialState);

  // State 2: Errors (validation messages for each field)
  const [errors, setErrors] = useState({});

  // State 3: Touched (which fields user has interacted with)
  const [touched, setTouched] = useState({});

  // Validate a single field
  const validate = useCallback(
    (fieldName, value) => {
      const rule = validationRules[fieldName];
      if (!rule) return '';

      // Run all validators for this field
      for (const validator of rule) {
        const error = validator(value, values);
        if (error) return error; //Stop at first error
      }
      return '';
    },
    [validationRules, values]
  );

  // Handle input change
  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      if (touched[name]) {
        const error = validate(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validate, touched]
  );

  // Handle field blur - when user leaves field
  const handleBlur = useCallback(
    (name) => {
      // Mark field as touched
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate this field
      const error = validate(name, values[name] || '');
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validate, values]
  );

  // Validate all fields - used on submit
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    // Check each field
    Object.keys(validationRules).forEach((field) => {
      const error = validate(field, values[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Update errors
    setErrors(newErrors);

    // Mark all fields as touched
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return isValid;
  }, [validate, validationRules, values])


  // Return everything the form needs
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
    setErrors
  };

};
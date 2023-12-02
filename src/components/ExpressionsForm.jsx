import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const ExpressionForm = () => {
  const [inputValue, setInputValue] = useState('');

  const sanitizeInput = (input) => {
    // Allow Italian phrases, numbers, and remove non-alphanumeric characters
    return input.replace(/[^a-zA-Zàèéìíòóùú0-9\s]/g, '');
  };

  const handleSubmit = async () => {
    try {
      const sanitizedInput = sanitizeInput(inputValue);

      await axios.post('/api/expression', { expression: sanitizedInput });
      // Optionally handle success or update UI
    } catch (error) {
      // Handle error
      console.error('Error submitting expression:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Italian Phrase with Numbers"
        value={inputValue}
        onChange={(e) => setInputValue(sanitizeInput(e.target.value))}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ExpressionForm;

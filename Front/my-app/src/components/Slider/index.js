import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const marks = [
  {
    value: 100,
    label: '100g',
  },
  {
    value: 150,
    label: '150g',
  },
  {
    value: 200,
    label: '200g',
  },
  {
    value: 250,
    label: '250g',
  },
  {
    value: 300,
    label: '300g',
  },
  {
    value: 350,
    label: '350g',
  },
  {
    value: 400,
    label: '400g',
  },
];

function valuetext(value) {
  return `${value}g`;
}

export default function DiscreteSliderValues() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put('http://localhost:3002/putQuantidade', { quantidade: selectedValue || 0 });
      console.log(`Fed ${selectedValue || 0}:`, response.data);
    } catch (error) {
      console.error('Error feeding:', error);
    }
  }

  return (
    <Box sx={{ width: '90%', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <Slider
        aria-label="Weight values"
        defaultValue={100}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        min={100}
        max={400}
        onChange={handleChange}
      />
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={handleSubmit} disabled={selectedValue === null}>
          Alimentar
        </Button>
      </Box>
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
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
  const [isFeeding, setIsFeeding] = useState(false);

  useEffect(() => {
    // Função para verificar o estado no backend
    const checkEstado = async () => {
      try {
        const response = await axios.get('http://localhost:3002/getEstado');
        const estado = response.data;
        if (estado === true) {
          setIsFeeding(false); // Atualiza o botão para "Alimentar"
        }
      } catch (error) {
        console.error('Erro ao verificar o estado:', error);
      }
    };

    // Verifica o estado a cada 2 segundos
    const intervalId = setInterval(checkEstado, 2000);

    // Cleanup do intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      setIsFeeding(true); // Muda o botão para "Alimentando"
      const response = await axios.put('http://localhost:3002/putQuantidade', { quantidade: selectedValue || 0 });
      console.log(`Quantidade atualizada para ${selectedValue || 0}:`, response.data);

      await axios.put('http://localhost:3002/putEstado', { estado: false });
      console.log('Estado set to false');
    } catch (error) {
      console.error('Erro ao alimentar:', error);
      alert('Erro ao alimentar. Tente novamente.');
      setIsFeeding(false); // Volta o botão para "Alimentar" em caso de erro
    }
  };

  const handleStop = async () => {
    try {
      await axios.put('http://localhost:3002/putEstado', { estado: true });
      console.log('Estado set to true (Parar Alimentação)');
      setIsFeeding(false); // Reseta o estado do botão
    } catch (error) {
      console.error('Erro ao parar a alimentação:', error);
      alert('Erro ao parar a alimentação. Tente novamente.');
    }
  };

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
        disabled={isFeeding}
      />
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={selectedValue === null || isFeeding}
        >
          {isFeeding ? 'Alimentando...' : 'Alimentar'}
        </Button>
      </Box>
      {isFeeding && (
        <Box sx={{ marginTop: 2 }}>
          <Button variant="outlined" color="error" onClick={handleStop}>
            Parar Alimentação
          </Button>
        </Box>
      )}
    </Box>
  );
}
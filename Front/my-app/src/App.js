import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AccordionUsage from './components/Accordion';

function App() {
  useEffect(() => {
    const setInitialEstado = async () => {
      try {
        const response = await axios.put('http://localhost:3002/putEstado', { estado: false });
        console.log('Initial estado set to false:', response.data);
      } catch (error) {
        console.error('Error setting initial estado:', error);
      }
    };

    const handleBeforeUnload = async (event) => {
      try {
        await axios.put('http://localhost:3002/putEstado', { estado: true });
        console.log('Estado set to true before unload');
      } catch (error) {
        console.error('Error setting estado to true before unload:', error);
      }
    };

    setInitialEstado();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '80%', maxWidth: '600px' }}>
        <AccordionUsage />
      </div>
    </div>
  );
}

export default App;

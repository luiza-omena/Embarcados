import React from 'react';
import './App.css';
import AccordionUsage from './components/Accordion';

function App() {
  return (
    <div
      className="App"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <div style={{ width: '80%', maxWidth: '600px' }}>
        <AccordionUsage />
      </div>
    </div>
  );
}

export default App;

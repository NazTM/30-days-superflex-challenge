import React from 'react';
import RamadanTable from './components/RamadanTable';
import './App.css';

function App() {
  return (
    <div className="ramadan-calendar">
      <div className="background-image"></div>
      
      <h1 className="title">Ramadan Kareem!</h1>
      <h2 className="subtitle">Timings in Dhaka:</h2>
      
      <RamadanTable />
      
      <div className="footer">
        <p className="footer-text">Data sourced from Hamariweb. Made with Superflex.</p>
      </div>
    </div>
  );
}

export default App;

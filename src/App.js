// src/App.js
import React from 'react';
import BarcodeGenerator from './BarcodeGenerator';
import {Typography} from '@mui/material';

function App() {
  return (
    <div className="App">
      <Typography variant="h5" className="pagetitle-text">Barcode Generator</Typography>
      <BarcodeGenerator />
    </div>
  );
}

export default App;
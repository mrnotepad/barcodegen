// src/BarcodeGenerator.js
import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import './BarcodeGenerator.css'; // Import the CSS file for styling
import { Button, Box, TextField, Typography, Grid } from '@mui/material';

const BarcodeGenerator = () => {
  const [startSequence, setStartSequence] = useState(0);
  const [count, setCount] = useState(1);
  const [barcodes, setBarcodes] = useState([]);
  const [customText, setCustomText] = useState("PROVINCE OF NEGROS OCCIDENTAL");
  const [logo, setLogo] = useState(null);
  const barcodeRefs = useRef([]);

  const generateBarcodes = () => {
    const newBarcodes = [];
    for (let i = 0; i < count; i++) {
      const barcodeValue = `NEGOCC-${startSequence + i}`;
      newBarcodes.push(barcodeValue);
    }
    setBarcodes(newBarcodes);
  };

  const printBarcodes = () => {
    window.print();
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  // After the component updates, generate barcodes for the created refs
  useEffect(() => {
    barcodeRefs.current.forEach((ref, index) => {
      if (ref) {
        JsBarcode(ref, barcodes[index], {
          format: "CODE128",
          displayValue: true,
          fontSize: 18,
          width: 1.5,
          height: 30
        });
      }
    });
  }, [barcodes]);

  return (
    <div className="barcode-container">
      <Box sx={{ width: '600px', margin: '0 auto' }}>
        <Grid container spacing={1} className="print-hidden">
          <Grid item xs={12} md={6}>
            <TextField
              label="Enter starting sequence number"
              type="number"
              fullWidth
              value={startSequence}
              onChange={(e) => setStartSequence(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Number of codes to be generated"
              type="number"
              placeholder="Enter number of barcodes"
              fullWidth
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Custom Text"
              fullWidth
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Box>

      <br /><br />
      <Button variant="contained" color="primary" className="print-hidden" onClick={generateBarcodes}>
        Generate Barcodes
      </Button>

      <br /><br />
      <div id="barcodes">
        {barcodes.map((barcode, index) => (
          <div key={index} className="barcode-wrapper">
            <div className="barcode-header">
              {logo && <img src={logo} alt="Logo" className="barcode-logo" />}
              <div className="barcode-text pagetitle">{customText}</div>
            </div>
            <svg
              ref={(el) => barcodeRefs.current[index] = el}
              className="barcode-item"
            ></svg>
          </div>
        ))}
      </div>
      <br /><br />
      <Button variant="contained" color="primary" className="print-hidden" onClick={printBarcodes}>Print Barcodes</Button>
      <p className="footer-text">Barcode gen by: cesar@app-ictd.com</p>
    </div>
  );
};

export default BarcodeGenerator;
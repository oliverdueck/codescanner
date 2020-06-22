import React, { useEffect, useState } from 'react';
import './App.css';
import CSVParser from './util/CSVParser';

function App() {

  const [csvData, setCsvData] = useState([]);
  const weberUndOttEANs = RegExp('4030197.*|4034082.*|4037886.*|4042886.*|4043925.*|4044636.*|4045817.*|4046886.*|4048459.*|4049333.*|4052049.*|4052847.*|4056244.*|4062795.*|4062796.*');

  useEffect(() => {
    document.addEventListener('click', refocusScannerInput)
    fetchCSVData()
  }, [])

  async function fetchCSVData() {
    let csvParser = new CSVParser();
    let data = await csvParser.getDataFromCSV();
    console.log("The following data is used for processing:");
    console.log(data);
    setCsvData(data)
  }

  return (
    <div className="App">
      <p id='scanned_EAN'>Scan to Start</p>
      <form className='hide'>
        <input autoFocus={true} type='text' id='scanner_input' onInput={processEAN} />
      </form>
      <div id='result' />
    </div>
  );

  function processEAN(event) {
    let ean = event.target.value;
    console.log("Barcode detected and processed : [" + ean + "]");
    if (!isWeberUndOttEan(ean)) {
      warnUserOfWrongEAN(ean);
      return
    }
    showScannedEAN(ean);
    lookForEANinCSVData(ean);
    resetScannerInputField();
  }

  function isWeberUndOttEan(ean) {
    return weberUndOttEANs.test(ean) && ean.length === 13
  }

  function warnUserOfWrongEAN(ean) {
    document.getElementById('result').style.backgroundColor = '#ffc800';
    document.getElementById('scanned_EAN').innerHTML = 'EAN-Fehler: ' + ean;
    setTimeout(() => { document.getElementById('scanner_input').value = ''; }, 200);
  }


  function showScannedEAN(ean) {
    document.getElementById('scanned_EAN').innerHTML = formatEAN(ean);
  }

  function formatEAN(ean) {
    if (ean.length !== 13) {
      return
    }
    let asString = '' + ean
    return asString.substring(0, 1)
      + " " + asString.substring(1, 7)
      + " " + asString.substring(7)
  }

  function lookForEANinCSVData(ean) {
    let foundAtIndex = csvData.findIndex(e => e.EAN === ean);
    const wasFound = foundAtIndex !== -1;
    if (wasFound) {
      let entry = csvData[foundAtIndex];
      document.getElementById('result').style.backgroundColor = (entry.color === '' ? '#32a852' : entry.color);
    }
    else {
      document.getElementById('result').style.backgroundColor = 'red';
    }
  }


  function resetScannerInputField() {
    setTimeout(() => { document.getElementById('scanner_input').value = ''; }, 200);
  }

}

export default App;

function refocusScannerInput() {
  document.getElementById('scanner_input').setAttribute('readonly', 'readonly');
  setTimeout(() => {
    document.getElementById('scanner_input').focus();
    document.getElementById('scanner_input').removeAttribute('readonly');
  }, 50);
}
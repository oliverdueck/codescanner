import React from 'react';
import './App.css';
import { items } from './data';

function App() {
  return (
    <div className="App">
      <p id='number'> </p>
      <form className='hide'>
        <input autofocus="true" type='text' id='scanner_result' onInput={processBarcode} />
      </form>
      <div id='result'/>
    </div>
  );
}


const regex = RegExp('4030197.*|4034082.*|4037886.*|4042886.*|4043925.*|4044636.*|4045817.*|4046886.*|4048459.*|4049333.*|4052049.*|4052847.*|4056244.*|4062795.*|4062796.*');
function isInRange(ean) {
  return regex.test(ean)
}

function processBarcode(event) {

  let code = event.target.value;
  console.log("Barcode detected and processed : [" + code + "]");
  if (!isInRange(code)) {
    return
  }
  if (items.includes(code)) {
    console.log("SUCCESS");
    document.getElementById('result').style.backgroundColor = 'green'
    document.getElementById('number').innerHTML = code
  } else {
    console.log("FAILURE");
    document.getElementById('result').style.backgroundColor = 'red'
    document.getElementById('number').innerHTML = code
  }

  setTimeout(() => { document.getElementById('scanner_result').value = '' }, 200)

}

export default App;

import React, { useState } from 'react';
import './App.css';
import Quagga from 'quagga';
import { items } from './data';

function App() {

  const [running, setRunning] = useState(false);


  function toggleScanner(){
    if (running) {
      Quagga.stop();
      setRunning(false)
    } else {
      startScanner();
    }
  }

  const regex = RegExp('4030197.*|4034082.*|4037886.*|4042886.*|4043925.*|4044636.*|4045817.*|4046886.*|4048459.*|4049333.*|4052049.*|4052847.*|4056244.*|4062795.*|4062796.*');
  function isInRange(ean){
    return regex.test(ean)
  }

  function startScanner() {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
          width: 480,
          height: 320,
          facingMode: "environment"
        },
      },
      decoder: {
        readers: [
          // "code_128_reader",
          "ean_reader"
          // "ean_8_reader"
          // "code_39_reader",
          // "code_39_vin_reader",
          // "codabar_reader",
          // "upc_reader",
          // "upc_e_reader",
          // "i2of5_reader"
        ],
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true
          }
        }
      },
  
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
  
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      setRunning(true)
      document.getElementById('result').style.backgroundColor = 'white'
    });
  
    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
  
      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }
  
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }
  
        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });
  
  
    Quagga.onDetected(function (result) {
      console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);

      if(!isInRange(result.codeResult.code)){
        return
      }

      if (items.includes(result.codeResult.code)) {
        console.log("SUCCESS");
        document.getElementById('result').style.backgroundColor = 'green'
        document.getElementById('number').innerHTML = result.codeResult.code
      } else {
        console.log("FAILURE");
        document.getElementById('result').style.backgroundColor = 'red'
        document.getElementById('number').innerHTML = result.codeResult.code
      }

      setRunning(false)
      Quagga.stop();
    });
  }

  return (
    <div className="App">
      <div id="scanner-container"></div>
      <input type="button" id="btn" value={(running ? "Stop" : "Start") + " the scanner"} onClick={toggleScanner} />
      <p id='number'> </p>
      <from>

      <input type='text'/>
      </from>
      <div id='result'>
      
      </div>
    </div>
  );
}

export default App;

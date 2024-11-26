import logo from './logo.svg';
import './App.css';
import './styles.css';
import React, { useState } from 'react';

function App() { 
  const [propertyValue, setpropertyValue] = useState (null);
  const [loanAmount, setloanAmount] = useState (null);
  const [propertyValueResult, setpropertyValueResult] = useState (null);
  const [loanAmountResult, setloanAmountResult] = useState (null);
  const [LVRResult, setLVRResult] = useState (null);
  const changepropertyValue = (event) => {
    setpropertyValue(event.target.value);
  }
  const changeloanAmount = (event) => {
    setloanAmount(event.target.value);
  }
  const calculateLVR = (event) => {
    if ( (isNaN(propertyValue)) || (isNaN(loanAmount)) || (propertyValue <= 0) || (loanAmount <= 0))
    {
      window.alert("input must be number and greater than zero");
    }
    else{
      const url = 'https://localhost:7081/api/LVR';
      const data = {
        propertyValue: propertyValue,
        loanAmount: loanAmount,
      };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => setLVRResult(data + "%"))  // Store the response data in state
        .catch(error => console.log(error)); // Handle any error that occurs
        setpropertyValueResult ("$ " + propertyValue);
        setloanAmountResult ("$ " +loanAmount);
    }
  };

  return (

    <div className="form-container">
      <h2>LVR CALCULATOR</h2><br></br>
      <div id="form-container1">
        <h3>Fill in the details</h3>
        <label for="propertyValue">What is the value of the property:</label>
        <input type="text" id="input1" name={propertyValue} onChange={changepropertyValue} />

        <label for="loanAmount">How much you are planning to borrow:</label>
        <input type="text" id="input2" name={loanAmount} onChange={changeloanAmount} />

        <button onClick={calculateLVR}>Submit</button>
      </div>
      <div id="form-container2">
        <h3>Result</h3>
        <div id="txtpropertyValueResult">Property Value:</div>
        <div id="propertyValueResult">{propertyValueResult} </div>

        <label id="txtloanAmountResult">Loan Amount:</label>
        <div id="loanAmountResult">{loanAmountResult} </div>

        <div id="txtLVRResult">LVR</div>
        <div id="LVRResult">{LVRResult} </div>
      </div>


    </div>
  );
}

export default App;

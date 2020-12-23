// import { loadOptions } from "@babel/core";
import React, {useState, useEffect} from "react";
import './../styles/App.css';

const App = () => {

  const [workInput, setWorkInput] = useState(25);
  const [workTime, setWorkTime] = useState(1500);
  const [breakInput, setBreakInput] = useState(5);
  const [breakTime, setBreakTime] = useState(300);
  const [whatTime, setWhatTime] = useState('Work-Time');
  const [startFlag, setStartFlag] = useState(true);
  const [stopFlag, setStopFlag] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);

  const handleWorkInput = (e) => setWorkInput(Number(e.target.value));
  const handleBreakInput = (e) => setBreakInput(Number(e.target.value));
  const handleStart = () => {setStartFlag(false); setStopFlag(true); setResetFlag(true);}
  const handleStop = () => {setStartFlag(true); setStopFlag(false); setResetFlag(true);}
  const handleReset = () => {setStartFlag(true); setStopFlag(false); setResetFlag(false); setWorkTime(1500); setBreakTime(300); setWorkInput(25); setBreakInput(5); setWhatTime('Work-Time');}
  const handleSubmit = (e) => {e.preventDefault(); if(workInput===0 && breakInput===0) {handleReset(); return;} else {setResetFlag(false); setWhatTime('Work-Time'); setWorkTime(workInput * 60); setBreakTime(breakInput * 60);}}

  useEffect(() =>{
    if(!startFlag && whatTime === 'Work-Time'){
      if(workTime > 0) {const timer = setTimeout(() => setWorkTime(workTime - 1), 1000); return () => clearTimeout(timer);}
      else {alert('Work duration is over'); setWhatTime('Break-Time'); setWorkTime(workInput*60);}
    }
    if(!startFlag && whatTime === 'Break-Time'){
      if(breakTime > 0) {const timer = setTimeout(() => setBreakTime(breakTime - 1), 1000); return () => clearTimeout(timer);}
      else {alert('Break duration is over'); setWhatTime('Work-Time'); setBreakTime(breakInput*60);}
    }
  },[startFlag, whatTime, workTime, breakTime, workInput, breakInput]);


  function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

  return (
    <div id="main">
      <h1 id="currTime">{whatTime === 'Work-Time' ? fmtMSS(workTime) : fmtMSS(breakTime)}</h1>
      <h3 id="whatTime">{whatTime}</h3>
      <div className="block1">
        <button data-testid='start-button' onClick={handleStart} disabled={!startFlag}>Start</button>
        <button data-testid='stop-button'  onClick={handleStop}  disabled={!stopFlag}>Stop</button>
        <button data-testid='reset-button' onClick={handleReset} disabled={!resetFlag}>Reset</button><br></br>
      </div>
      <form onSubmit={handleSubmit}>
        <input  data-testid='work-duration'  type="number" onChange={handleWorkInput}  disabled={!startFlag} placeholder='work duration'  required value={workInput} min="0"></input>
        <input  data-testid='break-duration' type="number" onChange={handleBreakInput} disabled={!startFlag} placeholder='break duration' required value={breakInput} min="0"></input>
        <button data-testid='set-button'     type='submit' >Set</button>
      </form>
    </div>
  )
}


export default App;

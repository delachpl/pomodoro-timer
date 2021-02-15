import './App.css';
import Break from './components/break.js';
import Session from './components/session.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useRef } from 'react';

const redStyle = {
  color: 'red'
}

function App() {


  const audioPlay = document.getElementById('beep');
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [appStatus, setAppStatus] = useState('Session');
  const [status, setStatus] = useState("idle");
  const [timerState, setTimerState] = useState(sessionLength * 60);
  const [breakTimerState, setBreakTimer] = useState(breakLength * 60);
  

  // Gestion des valeurs modifiables


  const getValue = (value) => {
    if (value === '-' && sessionLength > 1) {
      setSessionLength(sessionLength => sessionLength - 1);
    } else if (value === '+' && sessionLength < 60) {
      setSessionLength(sessionLength => sessionLength + 1);
    }
  }

  const getBreakValue = (value) => {
    if (value === '-' && breakLength > 1) {
      setBreakLength(breakLength => breakLength - 1);
    } else if (value === '+' && breakLength < 60) {
      setBreakLength(breakLength => breakLength + 1);
    }
  }

  // Attribue la valeur à timerState et breakTimer

  useEffect(() => {
    setTimerState(sessionLength * 60);
    setBreakTimer(breakLength * 60);
  }, [sessionLength, breakLength]);


  // Gestion du chrono

  const useInterval = (callback, delay) => {
    const intervalId = useRef(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      const tick = () => savedCallback.current();

      if (typeof delay === "number") {
        intervalId.current = window.setInterval(tick, delay);

        return () => window.clearInterval(intervalId.current);
      } 
    }, [delay]);

    return intervalId.current;
  }
  
    useInterval(() => {
      // Logique de l'appli
      if (appStatus === 'Session') {
        if (timerState > 0) {
          setTimerState(timerState => timerState - 1);
          console.log(timerState);

        } else {

          manageAppStatus();
          setBreakTimer(breakLength * 60);
          audioPlay.play();
        }
      } else {
        if (breakTimerState > 0) {
          setBreakTimer(breakTimerState => breakTimerState - 1);
        } else {
          setTimerState(sessionLength * 60);

          manageAppStatus();
          audioPlay.play();
        }
      }
    }, status === "running" ? 1000 : null);

    const manageAppStatus = () => {
      setAppStatus(appStatus => appStatus === 'Session' ? 'Break' : 'Session');
      console.log(appStatus);
    }

    const toggle = () => { // Fonction qui pause ou lance le timer en appuyant sur pause
      setStatus(status => (status === 'running' ? 'idle' : 'running'));
    };

    const reset = () => {
      setAppStatus('Session');
      setStatus('idle');  
      setSessionLength(25);
      setBreakLength(5);
      setTimerState(sessionLength * 60);
      setBreakTimer(breakLength * 60);
      
      if (audioPlay) {
        audioPlay.pause();
        audioPlay.currentTime = 0;
      }
      
    }

    const timeConvert = (num) => {
      let minutes = Math.round(num / 60);
      let sec = num % 60;
      sec = sec < 10 ? '0' + sec : sec;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${minutes}:${sec}`;
    }

    return (
      <div className="main-div">
        <h1>Pomodoro App!</h1>
        <div className="app-child-div">
          <Break breakLength={breakLength} getBreakValue={getBreakValue}/>
          <Session sessionLength={sessionLength} getValue={getValue} />
        </div>
  
        <div>
          <h2 id="timer-label">{appStatus}</h2>
          <p id="time-left" style={timerState < 1 || breakTimerState < 1 ? redStyle : {color: "black"}}>{timeConvert(appStatus === 'Session' ? timerState : breakTimerState)}</p>
          <button id="start_stop" onClick={toggle} >{status === "running" ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} /> }</button>
          <button id="reset" onClick={reset}><FontAwesomeIcon icon={faUndo} /></button>
          <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
        </div>
      </div>
    );
// timeConvert(appStatus === 'Session' ? timerState : breakTimerState)
  }


export default App;

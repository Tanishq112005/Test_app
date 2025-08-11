

import { useState, useEffect } from 'react';
import Timer from './timer';
import './clock.css'

function Clock({ time_value , onTimerEnd } : any) {
  const [time, setTime] = useState('');

  useEffect(() => {
  
    const myTimer = new Timer(time_value);


    const handleTick = (minute : any, second : any) => {
      const formattedTime = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
      setTime(formattedTime);
    };

 
    const handleComplete = () => {
      setTime('00:00');
     
      if (onTimerEnd) {
        onTimerEnd();
      }
    };


    myTimer.start(handleTick, handleComplete);

    return () => {
      myTimer.stop();
    };
  }, [time_value, onTimerEnd]); 

  return (
     <div className="timer-wrapper">
      <p className="prompt-text">Your contest is starting in</p>
      <div className="timer-display">{time}</div>
    </div>
  )
}

export default Clock;
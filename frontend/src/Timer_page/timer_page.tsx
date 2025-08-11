import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Clock from '../component/clock';
import { timer_value_loader_to_test } from '../keys/timer_change';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux_state_manegemet/store';

function Timer_page() {
  const time_duration_in_minutes = timer_value_loader_to_test;
  const navigate = useNavigate();
  
  const full_screen = useSelector((s : RootState) => s.full_screen.value); 

  const handleTimerFinish = () => {
  
    navigate('/test_page');
  };
  

  function enterFullScreenMode () {
    const element = document.documentElement as any;
    if (element.requestFullscreen) {
        element.requestFullscreen().catch((err : any) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
  }

  
  useEffect(() => {

    if (full_screen && !document.fullscreenElement) {
      enterFullScreenMode();
    }
  }, [full_screen]); 

  return (
    <div className="page-container">
   
      <div className="timer-wrapper">
        <Clock
          time_value={time_duration_in_minutes}
          onTimerEnd={handleTimerFinish}
        />
      </div>
    </div>
  )
}

export default Timer_page;
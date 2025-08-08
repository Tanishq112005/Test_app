import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import Timer from "../component/timer";
import { useEffect, useState } from "react";
import { timer_complete_type } from "../redux_state_manegemet/timer_complete";

function Timer_component(){
   const total_duration = useSelector((s : RootState) => s.total_duration.value) ;
   const [time , setTime] = useState('') ;  
   const dispatch = useDispatch<AppDispatch>() ; 
   function timer_stop(){
       dispatch(timer_complete_type(true)) ; 
   }
   useEffect(() => {
   
        const myTimer = new Timer(total_duration);   
        myTimer.start((minute : any, second : any) => {
          const formattedTime = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
          setTime(formattedTime);
        } , (timer_stop));
    
    
        return () => {
          myTimer.stop();
        };
      
   } , [total_duration])
  
   return <div>
    <div className="timer">
        {time}
    </div>
   </div>

}

export default Timer_component ; 
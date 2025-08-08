

class Timer {
    public duration : any;
    public timerId : any; 
    constructor(durationInMinutes : any) {
      
      this.duration = durationInMinutes * 60;
      this.timerId = null;
    }
  
   
    start(onTick : any, onComplete : any ) {
 
      if (this.timerId) {
        this.stop();
      }
  
      let timer = this.duration;
  
      this.timerId = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
  
        onTick(minutes, seconds);
  
        if (--timer < 0) {
          this.stop(); 
          if (onComplete) {
            onComplete(); 
          }
        }
      }, 1000);
    }
  
    stop() {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
  
  export default Timer;
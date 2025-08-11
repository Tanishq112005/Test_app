

import { get_value } from "../component/changer_value";
import End_test_button from "../component/end_test_button";
import Timer_component from "./timer";
import { useEffect } from "react";

function Nav_bar() {
 


  useEffect(() => {
    if (get_value() === 1) {

    }
  }, [get_value()]);

  return (
    <div className="nav-bar">

      <div className="nav-left"></div>

      <div className="nav-center">
        <Timer_component />
      </div>



      <div className="nav-right">
        <End_test_button />
      </div>
    </div>
  );
}

export default Nav_bar;
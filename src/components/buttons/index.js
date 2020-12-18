import React, { useContext } from "react";
import { TimerContext } from "../context";

const Buttons = () => {
  const { startTimer, isTimerSet, resetTimer, isTimerActive } = useContext(
    TimerContext
  );

  return (
    <div className={"actions" + (isTimerSet() ? " active" : "")}>
      <button
        className={"start" + (isTimerActive ? " inactive" : " active")}
        onClick={() => startTimer()}
      >
        Start
      </button>
      <button className="reset" onClick={() => resetTimer()}>
        Reset
      </button>
    </div>
  );
};

export default Buttons;

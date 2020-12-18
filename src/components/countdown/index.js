import React, { useContext } from "react";
import { twoDigitFormat } from "../../helpers/numberFormat";
import { TimerContext } from "../context";

const Countdown = () => {
  const {
    MAX_TIME_NUM,
    MIN_TIME_NUM,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    isTimerSet,
  } = useContext(TimerContext);

  const setTime = (value) => {
    return value.match(/[0-9]/) ? parseInt(value) : MIN_TIME_NUM;
  };

  const changeMinutes = (value) => {
    const newTime = setTime(value);
    setMinutes(newTime > MAX_TIME_NUM ? minutes : newTime);
  };

  const changeSeconds = (value) => {
    const newTime = setTime(value);
    setSeconds(newTime > MAX_TIME_NUM ? seconds : newTime);
  };

  return (
    <div className={"countdown" + (isTimerSet() ? " active" : "")}>
      <input
        className="minutes"
        onChange={({ currentTarget: { value } }) => changeMinutes(value)}
        min="0"
        max="59"
        type="number"
        value={twoDigitFormat(minutes)}
      />
      <div className="colon">:</div>
      <input
        className="seconds"
        onChange={({ currentTarget: { value } }) => changeSeconds(value)}
        min="0"
        max="59"
        type="number"
        value={twoDigitFormat(seconds)}
      />
    </div>
  );
};

export default Countdown;

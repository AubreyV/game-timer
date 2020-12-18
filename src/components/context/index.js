import React, { createContext, useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import countdown from "../../assets/sounds/fastTick.mp3";
import timeUp from "../../assets/sounds/timeUp.mp3";

export const TimerContext = createContext();

const TimerContextProvider = (props) => {
  const MIN_TIME_NUM = 0;
  const MAX_TIME_NUM = 59;
  const [minutes, setMinutes] = useState(MIN_TIME_NUM);
  const [seconds, setSeconds] = useState(MIN_TIME_NUM);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const counter = useRef(null);
  const [playCountdown, { stop: stopCountdown }] = useSound(countdown);
  const [playTimeUp, { stop: stopTimeUp }] = useSound(timeUp);

  const isTimerSet = () => {
    return parseInt(minutes) > MIN_TIME_NUM || parseInt(seconds) > MIN_TIME_NUM;
  };

  const startTimer = () => {
    setIsTimerActive(true);

    counter.current = setInterval(countdownInterval(seconds, minutes), 1000);
  };

  const resetTimer = () => {
    setMinutes(MIN_TIME_NUM);
    setSeconds(MIN_TIME_NUM);
    setIsTimerActive(false);
  };

  const countdownInterval = (secs, mins) => () => {
    if (secs > MIN_TIME_NUM) {
      setSeconds(--secs);

      if (secs <= 10 && mins === MIN_TIME_NUM) {
        playCountdown();
      }
    }

    if (secs === MIN_TIME_NUM) {
      if (mins === MIN_TIME_NUM) {
        stopCountdown();
        playTimeUp();

        setTimeout(() => {
          stopTimeUp();
        }, 3300);

        resetTimer();
      } else {
        secs = MAX_TIME_NUM;
        setSeconds(secs);
        setMinutes(--mins);
      }
    }
  };

  useEffect(() => {
    if (!isTimerActive) {
      clearInterval(counter.current);
      counter.current = null;
    }
  }, [isTimerActive]);

  return (
    <TimerContext.Provider
      value={{
        MAX_TIME_NUM,
        MIN_TIME_NUM,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        isTimerSet,
        startTimer,
        resetTimer,
        isTimerActive,
      }}
    >
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;

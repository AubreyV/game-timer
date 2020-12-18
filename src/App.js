import React from "react";
import Countdown from "./components/countdown";
import Header from "./components/header";
import Buttons from "./components/buttons";
import TimerContextProvider from "./components/context";

import "./assets/App.scss";

function App() {
  return (
    <>
      <Header />
      <TimerContextProvider>
        <Countdown />
        <Buttons />
      </TimerContextProvider>
    </>
  );
}

export default App;

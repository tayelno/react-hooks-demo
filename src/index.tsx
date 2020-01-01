import React from "react";
import { render } from "react-dom";
import { getSecondsPercentage } from "./get-seconds-percentage";
import ProgressCircle from "./ProgressCircle";

import "./styles.css";

import { ClockComponent } from "./ClockClass";
import { ClockFC } from "./ClockFC";

const classComponentRootElement = document.getElementById("ClassComponentRoot");
const functionalComponentRootElement = document.getElementById(
  "FunctionalComponentRoot"
);
render(<ClockComponent />, classComponentRootElement);
render(<ClockFC />, functionalComponentRootElement);

import React from "react";
import { render } from "react-dom";
import { getSecondsPercentage } from "./get-seconds-percentage";
import ProgressCircle from "./ProgressCircle";

import "./styles.css";

interface CircleArc {
  radius: number;
  percentage: number;
}

interface ClockProps {}
interface ClockState {
  date: Date;
}

class Clock extends React.Component<ClockProps, ClockState> {
  timerID = 0;
  constructor(props: ClockProps) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  componentDidMount() {
    // initiate timer that would run the tick
    this.timerID = setInterval(() => this.tick(), 1000 / 60);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    // compute data from state
    const date = this.state.date;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    const {
      hourPercentage,
      minutePercentage,
      dayPercentage
    } = getSecondsPercentage(date);

    return (
      <div>
        <ProgressCircle radius={100} percentage={minutePercentage}>
          {seconds} s
        </ProgressCircle>
        <ProgressCircle radius={150} percentage={hourPercentage}>
          {minutes} m
        </ProgressCircle>
        <ProgressCircle radius={200} percentage={dayPercentage}>
          {hours} h
        </ProgressCircle>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<Clock />, rootElement);

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
  secondsCircle: CircleArc;
  minutesCircle: CircleArc;
  hoursCircle: CircleArc;
}

class Clock extends React.Component<ClockProps, ClockState> {
  timerID = 0;
  constructor(props: ClockProps) {
    super(props);
    this.state = {
      date: new Date(),
      secondsCircle: { radius: 100, percentage: 0 },
      minutesCircle: { radius: 150, percentage: 0 },
      hoursCircle: { radius: 200, percentage: 0 }
    };
  }

  tick() {
    const date = new Date();
    const {
      hourPercentage,
      minutePercentage,
      dayPercentage
    } = getSecondsPercentage(date);
    this.setState({
      date,
      hoursCircle: {
        ...this.state.hoursCircle,
        percentage: dayPercentage
      },
      minutesCircle: {
        ...this.state.minutesCircle,
        percentage: hourPercentage
      },
      secondsCircle: {
        ...this.state.secondsCircle,
        percentage: minutePercentage
      }
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
    const seconds = this.state.date.getSeconds();
    const minutes = this.state.date.getMinutes();
    const hours = this.state.date.getHours();

    return (
      <div>
        <ProgressCircle
          radius={this.state.secondsCircle.radius}
          percentage={this.state.secondsCircle.percentage}
        >
          {seconds} s
        </ProgressCircle>
        <ProgressCircle
          radius={this.state.minutesCircle.radius}
          percentage={this.state.minutesCircle.percentage}
        >
          {minutes} m
        </ProgressCircle>
        <ProgressCircle
          radius={this.state.hoursCircle.radius}
          percentage={this.state.hoursCircle.percentage}
        >
          {hours} h
        </ProgressCircle>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<Clock />, rootElement);

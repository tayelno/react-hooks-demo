import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

interface ClockProps {}
interface ClockState {
  date: Date;
  secondsCircle: CircleArc;
  minutesCircle: CircleArc;
  hoursCircle: CircleArc;
}
interface CircleArc {
  radius: number;
  percentage: number;
}
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

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
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    this.setState({
      ...this.state,
      date,
      secondsCircle: {
        ...this.state.secondsCircle,
        percentage: (seconds * 100) / SECONDS_IN_MINUTE
      },
      minutesCircle: {
        ...this.state.minutesCircle,
        percentage:
          (minutes * 100) / MINUTES_IN_HOUR +
          (seconds * 100) /
            SECONDS_IN_MINUTE /
            (SECONDS_IN_MINUTE * MINUTES_IN_HOUR)
      },
      hoursCircle: {
        ...this.state.hoursCircle,
        percentage:
          (hours * 100) / HOURS_IN_DAY +
          ((minutes * 100) / MINUTES_IN_HOUR +
            (seconds * 100) /
              SECONDS_IN_MINUTE /
              (SECONDS_IN_MINUTE * MINUTES_IN_HOUR)) /
            (MINUTES_IN_HOUR * HOURS_IN_DAY)
      }
    });
  }
  componentDidMount() {
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
        <svg
          viewBox="0 0 36 36"
          className="circular-chart orange"
          width={this.state.secondsCircle.radius}
        >
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            stroke-dasharray={`${this.state.secondsCircle.percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">
            {seconds} s
          </text>
        </svg>
        <svg
          viewBox="0 0 36 36"
          className="circular-chart orange"
          width={this.state.minutesCircle.radius}
        >
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            stroke-dasharray={`${this.state.minutesCircle.percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">
            {minutes} m
          </text>
        </svg>
        <svg
          viewBox="0 0 36 36"
          className="circular-chart orange"
          width={this.state.hoursCircle.radius}
        >
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            stroke-dasharray={`${this.state.hoursCircle.percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">
            {hours} h
          </text>
        </svg>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
render(<Clock />, rootElement);

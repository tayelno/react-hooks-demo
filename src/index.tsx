import React from "react";
import { render } from "react-dom";
import { getSecondsPercentage } from "./get-seconds-percentage";

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
        percentage: dayPercentage * 100
      },
      minutesCircle: {
        ...this.state.minutesCircle,
        percentage: hourPercentage * 100
      },
      secondsCircle: {
        ...this.state.secondsCircle,
        percentage: minutePercentage * 100
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
            strokeDasharray={`${this.state.secondsCircle.percentage}, 100`}
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
            strokeDasharray={`${this.state.minutesCircle.percentage}, 100`}
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
            strokeDasharray={`${this.state.hoursCircle.percentage}, 100`}
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

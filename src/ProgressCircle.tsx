import React, { FC } from "react";

export interface ProgressCircleProps {
  percentage: number;
  radius: number;
}

const ProgressCircle: FC<ProgressCircleProps> = props => (
  <svg
    viewBox="0 0 36 36"
    className="circular-chart orange"
    width={props.radius}
  >
    <path
      className="circle-bg"
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      className="circle"
      strokeDasharray={`${props.percentage * 100}, 100`}
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="20.35" className="percentage">
      {props.children}
    </text>
  </svg>
);

export { ProgressCircle, ProgressCircle as default };

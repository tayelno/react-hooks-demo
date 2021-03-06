import React, { FC, useState, useEffect } from "react";
import { render } from "react-dom";
import { getSecondsPercentage } from "./get-seconds-percentage";
import ProgressCircle from "./ProgressCircle";
import { useInterval } from "./useInterval";

interface ClockProps {}

const ClockFC: FC<ClockProps> = props => {
  const [date, setDate] = useState(new Date());

  const tick = () => setDate(new Date());

  useInterval(tick, 1000 / 60);

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
};

export { ClockFC };

function getSecondsPercentage(date: Date) {
  const currentMilliseconds = date.getMilliseconds();

  const currentSeconds = date.getSeconds() + currentMilliseconds / 1000;
  const currentMinutes = date.getMinutes() + currentSeconds / 60;
  const currentHours = date.getHours() + currentMinutes / 60;
  const currentDay = date.getDay() + currentHours / 24;

  const dayPercentage = currentHours / 24;
  const hourPercentage = currentHours % 1;
  const minutePercentage = currentMinutes % 1;
  const secondPercentage = currentSeconds % 1;
  return { hourPercentage, minutePercentage, dayPercentage };
}

export { getSecondsPercentage };

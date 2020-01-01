export function drawCircleCurve(
  value: number,
  total: number,
  radius: number
): string {
  var center;
  var alpha = (360 / total) * value,
    a = ((90 - alpha) * Math.PI) / 180,
    x = 300 + radius * Math.cos(a),
    y = 300 - radius * Math.sin(a),
    path;
  if (total === value) {
    path = `M 300  ${300 - radius} A ${radius} ${radius}, 0, 1, 1, 300, ${300 -
      radius}`;
  } else {
    if (alpha > 180) {
      center = 1;
    } else {
      center = 0;
    }
    path = `M 300 ${300 -
      radius}, A ${radius} ${radius},0,${center},1,${x},${y}`;
  }
  return path;
}

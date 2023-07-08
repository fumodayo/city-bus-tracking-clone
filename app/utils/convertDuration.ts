export function convertDurationTime(time: number) {
  if (time < 60) {
    return time.toFixed(1) + " s";
  } else {
    return (time / 60).toFixed(1) + " phút";
  }
}

export function convertDurationDistance(distance: number) {
  if (distance < 1000) {
    return distance.toFixed(1) + "m";
  } else {
    return (distance / 1000).toFixed(1) + "km";
  }
}

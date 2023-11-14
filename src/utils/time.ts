export function convertSecondsToHoursMinutesSeconds(secs: number) {
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor((secs % 3600) / 60);
  var seconds = Math.floor((secs % 3600) % 60);

  return { hours, minutes, seconds };
}

export function convertHoursMinutesSecondsToSeconds({ hours = 0, minutes = 0, seconds = 0 }: { hours: number; minutes: number; seconds: number }) {
  let totalSeconds = 0;

  totalSeconds += hours * 3600;
  totalSeconds += minutes * 60;
  totalSeconds += seconds;

  return totalSeconds;
}

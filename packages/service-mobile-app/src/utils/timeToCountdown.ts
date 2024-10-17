interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

function pad(num: number): string {
  return Math.max(num, 0).toString().padStart(2, '0');
}

const timeToCountdown = (time: number): Countdown => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor(time / 1000) % 60;
  const formatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return { hours, minutes, seconds, formatted };
};

export default timeToCountdown;

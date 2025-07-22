// utils.ts
export function calculateDuration(from: string, to: string): string {
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();
  const diff = toTime - fromTime;

  if (isNaN(diff) || diff < 0) return "0h";

  const hours = diff / (1000 * 60 * 60);
  return `${hours.toFixed(1)}h`;
}
export function calculateDeduction(duration: string, percent: "0%" | "50%" | "100%"): string {
  const durationHours = parseFloat(duration);
  const multiplier = {
    "0%": 0,
    "50%": 0.5,
    "100%": 1,
  }[percent];

  const totalMinutes = Math.floor(durationHours * multiplier * 60);

  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(days)}d ${pad(hours)}:${pad(minutes)}`;
}


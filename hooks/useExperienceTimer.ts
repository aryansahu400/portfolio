import { useEffect, useState } from "react";

export function useExperienceTimer() {
  const startDate = new Date("2023-06-01T00:00:00");

  const calculate = () => {
    const now = new Date();

    // --- Calendar part (Y / M / D) ---
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // --- Time part (H / M / S) ---
    const diffMs = now.getTime() - startDate.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);

    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${years}y ${months}m ${days}d | ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };





  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

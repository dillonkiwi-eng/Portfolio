"use client";

import { useEffect, useState } from "react";

const LONDON_TZ = "Europe/London";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: LONDON_TZ,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatLondonTime(date: Date) {
  return timeFormatter.format(date);
}

export function LondonTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatLondonTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      className="london-time tabular-nums"
      dateTime={time ?? undefined}
      suppressHydrationWarning
    >
      {time ?? "—:—"}
      <span className="london-time__label"> London</span>
    </time>
  );
}

"use client";

import { useEffect, useState } from "react";

const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
});

const DATE_FMT = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

export default function FooterClock() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    if (!now) {
        return <span className="font-mono tabular-nums text-muted">--:--:-- IST</span>;
    }

    const time = TIME_FMT.format(now);
    const date = DATE_FMT.format(now); // YYYY-MM-DD

    return (
        <div className="font-mono tabular-nums leading-relaxed">
            <div className="text-foreground">
                {time} <span className="text-muted">IST</span>
            </div>
            <div className="text-muted text-[11px] tracking-[0.3em] uppercase mt-1">
                {date}
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: 4, display: "004", label: "YRS CODING" },
    { value: 20, display: "020", label: "PRJCTS SHIPPED" },
    { value: 3, display: "003", label: "HACKATHON WINS" },
    { value: 46, display: "046", label: "CERTIFICATIONS" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const StatCounter = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 1500;
            const increment = stat.value / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= stat.value) {
                    setCount(stat.value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, stat.value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center p-8 lg:p-12 border-b border-r border-white/[0.06] last:border-r-0 md:[&:nth-child(4n)]:border-r-0 [&:nth-child(even)]:border-r-0 md:[&:nth-child(even)]:border-r hover:bg-white/[0.02] transition-colors duration-500"
        >
            <span className="block font-heading text-7xl md:text-8xl lg:text-[120px] text-white tabular-nums tracking-tighter leading-none">
                {String(count).padStart(3, '0')}
            </span>
            <span className="block mt-4 text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/20 text-center">
                {stat.label}
            </span>
        </motion.div>
    );
};

const CredibilityStats = () => {
    return (
        <section className="py-24 bg-black relative z-10 border-b border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left: Category Label */}
                    <div className="lg:col-span-3 flex flex-col pt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40">
                                STATS
                            </span>
                        </div>
                    </div>

                    {/* Right: Stats Grid */}
                    <div className="lg:col-span-9 lg:border-l border-white/[0.06] lg:pl-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/[0.06]">
                            {stats.map((stat, index) => (
                                <StatCounter key={stat.label} stat={stat} index={index} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CredibilityStats;

"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1] as const;

interface PreloaderProps {
    onComplete?: () => void;
}

const curtainVariant: Variants = {
    initial: { y: '0%' },
    animate: { y: '0%' },
    exit: { y: '-100%', transition: { duration: 1.1, ease: EASE } },
};

const curtainVariantBottom: Variants = {
    initial: { y: '0%' },
    animate: { y: '0%' },
    exit: { y: '100%', transition: { duration: 1.1, ease: EASE } },
};

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const duration = 1800; // 1.8s count
        const start = performance.now();
        let raf = 0;

        const tick = (t: number) => {
            const progress = Math.min((t - start) / duration, 1);
            // ease-out cubic for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * 100));
            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setTimeout(() => setDone(true), 350);
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <AnimatePresence onExitComplete={() => onComplete?.()}>
            {!done && (
                <div className="fixed inset-0 z-[9998] pointer-events-none">
                    {/* Top curtain */}
                    <motion.div
                        key="top-curtain"
                        variants={curtainVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-0 left-0 w-full h-1/2 bg-black flex flex-col justify-end items-center pb-6"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30"
                        >
                            SOUMYA — PORTFOLIO / 2026
                        </motion.div>
                    </motion.div>

                    {/* Bottom curtain with counter */}
                    <motion.div
                        key="bottom-curtain"
                        variants={curtainVariantBottom}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex flex-col justify-start items-center pt-6"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30"
                        >
                            CREATIVE DEVELOPER — KOLKATA
                        </motion.div>

                        {/* Massive counter — center bottom half */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <span className="text-[18vw] sm:text-[15vw] md:text-[12vw] font-heading text-white/95 tabular-nums tracking-tighter leading-none">
                                {String(count).padStart(3, '0')}
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Thin progress line at split point */}
                    <motion.div
                        className="absolute top-1/2 left-0 right-0 h-px bg-white/40 origin-center"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: count / 100 }}
                        style={{ y: '-50%' }}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;

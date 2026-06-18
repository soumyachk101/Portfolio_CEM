"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        restDelta: 0.001,
    });

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-white/20 z-[100] origin-left"
                aria-hidden
            />
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[101] origin-left shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                style={{ scaleX }}
                role="progressbar"
                aria-valuenow={0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Page scroll progress"
            />
        </>
    );
};

export default ScrollProgress;

"use client";

import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useScroll, useTransform, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Word-by-word reveal variant — staggered clip-path
const container: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const wordVariant: Variants = {
    hidden: { y: '110%', opacity: 0 },
    show: {
        y: '0%',
        opacity: 1,
        transition: { duration: 1.0, ease: EASE },
    },
};

const lineVariant: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

const Hero = () => {
    // Magnetic orb following cursor — warm white glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Scroll-driven parallax — hero drifts up & fades as you scroll
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);
    const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -120]);
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    useEffect(() => {
        if (window.matchMedia("(pointer: fine)").matches) {
            const handleMouseMove = (e: MouseEvent) => {
                mouseX.set(e.clientX - 300);
                mouseY.set(e.clientY - 300);
            };
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [mouseX, mouseY]);

    const headlineWords1 = ["SOUMYA"];
    const headlineWords2 = ["PORTFOLIO"];

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen w-full flex items-center overflow-hidden bg-black"
        >
            {/* Large magnetic spotlight — drifts with cursor */}
            <motion.div 
                className="hidden md:block absolute pointer-events-none z-0 w-[600px] h-[600px] rounded-full blur-[200px]"
                style={{
                    x: springX,
                    y: springY,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)',
                }}
            />

            {/* Subtle horizontal grid lines — architectural feel */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
            >
                <div className="h-px bg-white w-full absolute top-1/4" />
                <div className="h-px bg-white w-full absolute top-1/2" />
                <div className="h-px bg-white w-full absolute top-3/4" />
            </motion.div>

            <motion.div 
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            >
                {/* Left Column: Massive Typography */}
                <div className="lg:col-span-8 flex flex-col items-start text-left">
                    {/* Availability badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 1.6 }}
                        className="mb-10"
                    >
                        <span className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-white/40">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/80"></span>
                            </span>
                            Available for new opportunities
                        </span>
                    </motion.div>

                    {/* Headline — word-by-word reveal with clip mask */}
                    <motion.h1
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="text-[14vw] sm:text-[13vw] md:text-[11vw] lg:text-[10rem] xl:text-[11rem] font-heading font-bold mb-10 tracking-tighter text-white leading-[0.82] uppercase"
                    >
                        <span className="block overflow-hidden">
                            <motion.span variants={wordVariant} className="inline-block">
                                / {headlineWords1.join(' ')}
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span variants={wordVariant} className="inline-block">
                                {headlineWords2.join(' ')}
                            </motion.span>
                        </span>
                    </motion.h1>

                    {/* Subtitle — slides in */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, ease: EASE, delay: 2.2 }}
                        className="text-lg sm:text-xl md:text-2xl text-white/50 font-medium max-w-2xl font-sans leading-relaxed"
                    >
                        Full-Stack Developer building fast, reliable, and highly scalable web products.
                    </motion.p>
                </div>

                {/* Right Column: Scroll Hint — minimal vertical line */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.0, delay: 2.8 }}
                    className="lg:col-span-4 hidden lg:flex justify-end items-end pb-8"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-px h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent origin-top"
                        />
                        <span className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase rotate-90 mt-8 origin-center whitespace-nowrap">
                            Scroll
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom fade to black gradient — seamless section transition */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-[1]" />
        </section>
    );
};

export default Hero;

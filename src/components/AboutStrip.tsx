"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const wordVariant: Variants = {
    hidden: { y: '100%', opacity: 0 },
    show: { y: '0%', opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

const AboutStrip = () => {
    const line1 = "I bridge the gap between product".split(' ');
    const line2 = "thinking and technical execution.".split(' ');

    return (
        <section className="py-32 lg:py-40 bg-black relative z-10 border-b border-white/[0.06] overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left: Metadata Labels */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="lg:col-span-3 flex flex-col pt-2"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40">
                                INTRO
                            </span>
                        </div>
                        <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/20 mb-2">
                            [FULL-STACK]
                        </div>
                        <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/20 mb-2">
                            [CLOUD & DEVOPS]
                        </div>
                        <div className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/20">
                            [INDIA-BASED]
                        </div>
                    </motion.div>

                    {/* Right: Intro Paragraph — word-by-word reveal */}
                    <div className="lg:col-span-9 lg:border-l border-white/[0.06] lg:pl-16">
                        <motion.h2 
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-80px" }}
                            className="text-3xl md:text-5xl lg:text-[56px] font-sans font-medium text-white leading-[1.2] tracking-tight"
                        >
                            {/* Line 1 — white */}
                            <span className="block">
                                {line1.map((word, i) => (
                                    <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                                        <motion.span variants={wordVariant} className="inline-block">
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                            {/* Line 2 — white */}
                            <span className="block">
                                {line2.map((word, i) => (
                                    <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                                        <motion.span variants={wordVariant} className="inline-block">
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                            {/* Line 3 — muted, slides up after */}
                            <motion.span 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 1, ease: EASE, delay: 0.6 }}
                                className="block mt-6 text-white/30"
                            >
                                My focus is on writing clean, maintainable code while maintaining a pragmatic approach to shipping real products that solve actual problems.
                            </motion.span>
                        </motion.h2>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutStrip;

"use client";

import { useRef, useState } from 'react';
import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Magnetic link — content drifts toward cursor on hover
const MagneticLink = ({ href, label, handle, external }: { 
    href: string; 
    label: string; 
    handle: string;
    external?: boolean;
}) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
        setPos({ x, y });
    };

    const reset = () => setPos({ x: 0, y: 0 });

    return (
        <motion.a 
            ref={ref}
            variants={itemVariant}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="group relative flex flex-col md:flex-row md:items-center justify-between py-14 border-b border-white/[0.06] overflow-hidden"
        >
            {/* Glow trail on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Arrow that slides in on hover */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 opacity-0 group-hover:opacity-100 group-hover:-translate-x-12 transition-all duration-500">
                →
            </span>

            <span className="relative text-4xl md:text-6xl lg:text-8xl font-heading tracking-tighter text-white/90 group-hover:text-white transition-colors duration-500 pl-0 group-hover:pl-8 transition-all">
                [ {label} ]
            </span>
            <span className="relative text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/60 mt-4 md:mt-0 transition-colors duration-500">
                {handle}
            </span>
        </motion.a>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="py-32 lg:py-40 bg-black relative z-10 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left: Category Label */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="lg:col-span-3 flex flex-col pt-2"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40">
                                CONTACT
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Contact Links */}
                    <div className="lg:col-span-9 lg:border-l border-white/[0.06] lg:pl-16">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-80px" }}
                            className="flex flex-col border-t border-white/[0.06]"
                        >
                            <MagneticLink 
                                href="mailto:soumyachk1@gmail.com" 
                                label="EMAIL" 
                                handle="soumyachk1@gmail.com" 
                            />
                            <MagneticLink 
                                href="https://github.com/soumyachk101" 
                                label="GITHUB" 
                                handle="@soumyachk101" 
                                external
                            />
                            <MagneticLink 
                                href="https://linkedin.com/in/chksoumya" 
                                label="LINKEDIN" 
                                handle="chksoumya" 
                                external
                            />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col md:flex-row justify-between pt-12 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/15 gap-4"
                        >
                            <span>© 2026 — DESIGNED & BUILT IN INDIA</span>
                            <span>CHKSOUmya.IN</span>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;

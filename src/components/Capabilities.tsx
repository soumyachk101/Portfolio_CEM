"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const capabilities = [
    {
        id: "001",
        title: "FULL-STACK WEB APPS",
        desc: "End-to-end applications built with Next.js, React, and TypeScript. Focused on high-performance SSR/SSG and fluid client-side interactions.",
    },
    {
        id: "002",
        title: "BACKEND APIS & DATABASES",
        desc: "Robust REST and GraphQL APIs using Node.js and FastAPI. Architecting scalable database schemas with PostgreSQL, Neon, and Supabase.",
    },
    {
        id: "003",
        title: "CLOUD & DEVOPS",
        desc: "Deploying and managing infrastructure on Vercel, Railway, and Cloudflare. Implementing CI/CD pipelines and Docker containerization.",
    },
    {
        id: "004",
        title: "AUTH & SECURITY BASICS",
        desc: "Integrating secure authentication flows (OAuth, JWT) using Firebase and NextAuth. Implementing RBAC and secure data handling.",
    },
    {
        id: "005",
        title: "PERFORMANCE & DEBUGGING",
        desc: "Optimizing bundle sizes, reducing layout shifts, and diagnosing complex production issues across the full stack.",
    },
];

const rowVariant: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const cellVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const Capabilities = () => {
    return (
        <section id="capabilities" className="py-32 lg:py-40 bg-black relative z-10 border-b border-white/[0.06] overflow-hidden">
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
                                CAPABILITIES
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Blueprint Grid */}
                    <div className="lg:col-span-9 lg:border-l border-white/[0.06] lg:pl-16">
                        <div className="flex flex-col border-t border-white/[0.06]">
                            {capabilities.map((cap) => (
                                <motion.div
                                    key={cap.id}
                                    variants={rowVariant}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 py-10 border-b border-white/[0.06] group relative overflow-hidden"
                                >
                                    {/* Hover sweep glow */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Number — slides in from left */}
                                    <motion.div variants={cellVariant} className="md:col-span-2 relative">
                                        <span className="text-3xl font-heading text-white/40 group-hover:text-white transition-colors duration-500 inline-block">
                                            {cap.id}
                                        </span>
                                    </motion.div>
                                    
                                    {/* Title */}
                                    <motion.div variants={cellVariant} className="md:col-span-4 relative">
                                        <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-white mt-2">
                                            {cap.title}
                                        </h3>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.div variants={cellVariant} className="md:col-span-6 relative">
                                        <p className="text-white/40 group-hover:text-white/60 text-base leading-relaxed mt-1 transition-colors duration-500">
                                            {cap.desc}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Capabilities;

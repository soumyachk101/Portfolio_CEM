"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

interface HackathonItem {
    code: string;
    name: string;
    project: string;
    organizer: string;
    role: string;
    achievement: string;
    duration: string;
    desc: string;
    tags: string[];
    github?: string;
    live?: string;
}

const hackathons: HackathonItem[] = [
    {
        code: "001",
        name: "HACKTROPICA 2K26",
        project: "Phygital Trace",
        organizer: "AEC College",
        role: "Full Stack Dev",
        achievement: "Blockchain Nominee",
        duration: "36 HRS",
        desc: "Built a blockchain supply chain ledger bridging physical tags with digital assets for anti-counterfeiting.",
        tags: ["Next.js", "Solidity", "Base L2", "FastAPI", "IPFS"],
        github: "https://github.com/soumyachk101/Phygital-trace-done",
    },
    {
        code: "002",
        name: "CODE FOR CHANGE 2.0",
        project: "Neeti AI",
        organizer: "NSHM College",
        role: "Backend & Team Lead",
        achievement: "1st Place",
        duration: "24 HRS",
        desc: "Developed an AI hiring platform with real-time video feeds, collaborative IDE, and automated analysis reports.",
        tags: ["FastAPI", "React", "LiveKit", "Supabase", "Gemini AI"],
        github: "https://github.com/soumyachk101/Neeti-AI",
        live: "https://neetiai.vercel.app/",
    },
    {
        code: "003",
        name: "TEKATHON 2K26",
        project: "Multimodal RAG",
        organizer: "Techno College",
        role: "Full Stack Dev",
        achievement: "RAG Finalist",
        duration: "24 HRS",
        desc: "Built a retrieval-augmented generation engine capable of parsing text, tables, charts, and images for prompt synthesis.",
        tags: ["React", "Node.js", "RAG", "LLM", "Vector DB"],
        github: "https://github.com/soumyachk101/RUSK-Multimodal-RAG-Assistant",
        live: "https://rusk-web.vercel.app/",
    },
];

const HackathonCard = ({ hack, index }: { hack: HackathonItem; index: number }) => {
    const container = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const rotateX = useTransform(scrollYProgress, [0, 0.45, 0.5, 1], [45, 0, 0, -12]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8], [0, 1, 1, 0.2]);
    const scale = useTransform(scrollYProgress, [0, 0.45, 0.5, 1], [0.8, 1, 1, 0.85]);
    const blurValue = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8], [12, 0, 0, 8]);
    const filter = useMotionTemplate`blur(${blurValue}px)`;

    const topOffset = `calc(10vh + ${index * 30}px)`;

    return (
        <div ref={container} className="h-[120vh] flex items-start justify-center sticky top-0 pb-[10vh]">
            <motion.div
                style={{ 
                    scale,
                    opacity,
                    rotateX,
                    filter,
                    top: topOffset,
                    transformOrigin: "top center",
                }}
                className="relative w-full flex flex-col gap-4 p-8 lg:p-12 bg-[#0a0a0a] border border-white/[0.06] shadow-[0_0_80px_rgba(255,255,255,0.02)] will-change-transform sticky"
            >
                {/* Number & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline border-b border-white/[0.06] pb-6">
                    <div className="md:col-span-2">
                        <span className="text-xl font-heading text-white/40 block">
                            {hack.code}
                        </span>
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/20 block mt-1">
                            /{hack.duration}
                        </span>
                    </div>
                    
                    {/* Title */}
                    <div className="md:col-span-10">
                        <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-white uppercase">
                            / {hack.name}
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2">
                    <div className="md:col-start-3 md:col-span-10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                                    // PROJECT
                                </span>
                                <span className="text-sm font-sans font-medium text-white">
                                    {hack.project}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                                    // ROLE
                                </span>
                                <span className="text-sm font-sans font-medium text-white">
                                    {hack.role}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                                    // ACHIEVEMENT
                                </span>
                                <span className="text-sm font-sans font-medium text-white">
                                    {hack.achievement}
                                </span>
                            </div>
                        </div>

                        <p className="text-white/40 text-base leading-relaxed mt-8 max-w-2xl border-t border-white/[0.06] pt-6">
                            {hack.desc}
                        </p>
                    </div>
                </div>

                {/* Footer Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-auto border-t border-white/[0.06]">
                    <div className="flex gap-2 flex-wrap">
                        {hack.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono tracking-widest uppercase text-white/30">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-6">
                        {hack.live && (
                            <a href={hack.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white/60 hover:text-white interactive-button group/link transition-colors">
                                View Demo
                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        )}
                        {hack.github && (
                            <a href={hack.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors interactive-button">
                                <Github size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Hackathons = () => {
    return (
        <section id="hackathons" className="py-24 bg-black relative z-10 border-b border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left: Category Label */}
                    <div className="lg:col-span-3 flex flex-col pt-2 relative">
                        <div className="sticky top-[10vh] flex items-center gap-3 z-20">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40">
                                HACKATHONS
                            </span>
                        </div>
                    </div>

                    {/* Right: Hackathon Cards Stack */}
                    <div className="lg:col-span-9 relative" style={{ perspective: "1500px" }}>
                        <div className="relative mt-[-10vh]">
                            {hackathons.map((hack, index) => (
                                <HackathonCard 
                                    key={hack.code} 
                                    hack={hack} 
                                    index={index} 
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hackathons;

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ExperienceItem {
    company: string;
    role: string;
    type: string;
    desc: string;
    date: string;
    location: string;
    certificate?: string;
    stack: string[];
}

const experiences: ExperienceItem[] = [
    {
        company: "EduSkills Academy",
        role: "Python Full Stack Developer Intern",
        type: "Internship",
        desc: "Completed a 10-week program building scalable web applications with Python, Django, SQL, and frontend technologies.",
        date: "2026",
        location: "Remote",
        certificate: "/certificates/Soumya  Chakraborty_Certificate.pdf",
        stack: ["Python", "Django", "SQL", "REST APIs"],
    },
    {
        company: "Codec Technologies Pvt. Ltd.",
        role: "MERN Stack Developer Intern",
        type: "Internship",
        desc: "Worked on full stack web development using MongoDB, Express.js, React, and Node.js to build scalable applications.",
        date: "2026",
        location: "Remote",
        certificate: "/certificates/MERN Stack Developer Intern.pdf",
        stack: ["MongoDB", "Express.js", "React", "Node.js"],
    },
    {
        company: "AWS",
        role: "AWS Media & Entertainment Cloud Engineering",
        type: "Internship",
        desc: "Focused on cloud engineering solutions for media workflows, asset management, and CDN distribution structures.",
        date: "2025",
        location: "Remote",
        stack: ["AWS EC2", "AWS S3", "Cloud Computing"],
    },
    {
        company: "AICTE",
        role: "Data Analytics Process Automation",
        type: "Virtual Internship",
        desc: "Worked on real-world automation challenges using industry data modeling toolkits, scripting automations, and reporting pipelines.",
        date: "2025",
        location: "Remote",
        certificate: "/certificates/Data Analytics Process Automation Virtual Internship By AICTE.pdf",
        stack: ["Data Analytics", "Process Automation", "Python"],
    },
    {
        company: "IBM SkillsBuild",
        role: "Data Analytics & Business Intelligence",
        type: "Internship",
        desc: "Built solutions for data visualization and business insights. Modelled datasets and generated interactive analytical templates.",
        date: "2025",
        location: "Remote",
        certificate: "/certificates/Data Analytics & Business Intelligence Lab_ Explore, Analyze & Build Real-World Solutions By IBM Skill Build.pdf",
        stack: ["Business Intelligence", "Charts.js", "SQL"],
    },
];

const ExperienceCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => {
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
                {/* Header Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline border-b border-white/[0.06] pb-6">
                    <div className="md:col-span-2">
                        <span className="text-xl font-heading text-white/40 block">
                            {exp.date}
                        </span>
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/20 block mt-1">
                            /{exp.type}
                        </span>
                    </div>
                    
                    <div className="md:col-span-10">
                        <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-white uppercase">
                            / {exp.role}
                        </h3>
                        <span className="block text-sm font-sans font-medium text-white/30 mt-2 uppercase tracking-widest">
                            @ {exp.company}
                        </span>
                    </div>
                </div>

                {/* Body Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
                    <div className="md:col-start-3 md:col-span-10">
                        <p className="text-white/40 text-base leading-relaxed max-w-2xl">
                            {exp.desc}
                        </p>
                    </div>
                </div>

                {/* Footer Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-auto border-t border-white/[0.06]">
                    <div className="flex gap-2 flex-wrap">
                        {exp.stack.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono tracking-widest uppercase text-white/30">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-6">
                        {exp.certificate && (
                            <a 
                                href={exp.certificate} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white/60 hover:text-white interactive-button group/link transition-colors"
                            >
                                View Certificate
                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    return (
        <section id="experience" className="py-24 bg-black relative z-10 border-b border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left: Category Label */}
                    <div className="lg:col-span-3 flex flex-col pt-2 relative">
                        <div className="sticky top-[10vh] flex items-center gap-3 z-20">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40">
                                EXPERIENCE
                            </span>
                        </div>
                    </div>

                    {/* Right: Experience Cards Stack */}
                    <div className="lg:col-span-9 relative" style={{ perspective: "1500px" }}>
                        <div className="relative mt-[-10vh]">
                            {experiences.map((exp, index) => (
                                <ExperienceCard 
                                    key={exp.company + exp.role} 
                                    exp={exp} 
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

export default Experience;

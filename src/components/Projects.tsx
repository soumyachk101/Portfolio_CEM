"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    role: string;
    tagline: string;
    problem: string;
    approach: string;
    outcome: string;
    tags: string[];
    github: string;
    live: string;
}

const projects: Project[] = [
    {
        id: "001",
        title: "ShipOrDie",
        role: "Lead Architect",
        tagline: "Multi-agent SaaS platform orchestrating complex AI workflows.",
        problem: "Executing concurrent, reliable AI operations requires an orchestration layer that standard LLM APIs don't provide out of the box.",
        approach: "Architected a scalable Python/FastAPI microservice using LangGraph and CrewAI to manage stateful, multi-agent workflows.",
        outcome: "Achieved 99.9% uptime on batch processes, reduced latency by 40%, and deployed containerized services.",
        tags: ["Next.js", "FastAPI", "CrewAI", "Docker"],
        github: "https://github.com/soumyachk101/ShipOrDie",
        live: "#"
    },
    {
        id: "002",
        title: "Drishti AI",
        role: "Security Engineer",
        tagline: "AI network scanner visualizing attack paths and security remediation.",
        problem: "Security teams struggle to prioritize vulnerabilities among thousands of scattered alerts and false positives.",
        approach: "Built a risk intelligence engine using Groq LLaMA 3 to analyze network topologies and generate actionable playbooks.",
        outcome: "Synthesizes vulnerabilities into top 3 attack paths within seconds, drastically cutting down manual triage.",
        tags: ["React", "FastAPI", "Groq", "Spline"],
        github: "https://github.com/soumyachk101/Drishti-Security",
        live: "https://drishtisecurity.vercel.app/"
    },
    {
        id: "003",
        title: "Neeti AI",
        role: "Full Stack Engineer",
        tagline: "Collaborative recruitment platform with real-time IDE and AI evaluation.",
        problem: "Technical interviews often lack real-time synchronization and objective, automated evaluation metrics.",
        approach: "Developed a WebRTC-powered hiring environment using LiveKit for low-latency video and a synced IDE.",
        outcome: "Secured 1st Place at Code for Change 2.0. Enabled seamless real-time interviews with automated analytics.",
        tags: ["FastAPI", "React", "LiveKit"],
        github: "https://github.com/soumyachk101/Neeti-AI",
        live: "https://neetiai.vercel.app/"
    }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
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
                className="relative w-full flex flex-col gap-6 p-8 lg:p-12 bg-[#0a0a0a] border border-white/[0.06] shadow-[0_0_80px_rgba(255,255,255,0.02)] will-change-transform sticky"
            >
                {/* Header Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline border-b border-white/[0.06] pb-6">
                    <div className="md:col-span-2">
                        <span className="text-xl font-heading text-white/40">
                            {project.id}
                        </span>
                    </div>
                    <div className="md:col-span-6">
                        <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-white uppercase">
                            / {project.title}
                        </h3>
                    </div>
                    <div className="md:col-span-4 lg:text-right">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30">
                            [ {project.role} ]
                        </span>
                    </div>
                </div>

                {/* Body Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-2">
                    
                    {/* Left: Tagline & Problem */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <p className="text-xl font-sans text-white font-medium leading-relaxed">
                            {project.tagline}
                        </p>
                        <div>
                            <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                                // PROBLEM
                            </span>
                            <p className="text-white/50 leading-relaxed text-sm">
                                {project.problem}
                            </p>
                        </div>
                    </div>

                    {/* Right: Approach & Outcome */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <div>
                            <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                                // APPROACH
                            </span>
                            <p className="text-white/50 leading-relaxed text-sm">
                                {project.approach}
                            </p>
                        </div>
                        <div className="p-4 bg-white/[0.03] border border-white/[0.06]">
                            <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                                // OUTCOME
                            </span>
                            <p className="text-white font-medium text-sm">
                                {project.outcome}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-auto border-t border-white/[0.06]">
                    <div className="flex gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono tracking-widest uppercase text-white/30">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        {project.live !== "#" && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white/60 hover:text-white interactive-button group/link transition-colors">
                                View Case Study
                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        )}
                        {project.github !== "#" && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors interactive-button">
                                <Github size={18} />
                            </a>
                        )}
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-black relative z-10 border-b border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left: Category Label */}
                    <div className="lg:col-span-3 flex flex-col pt-2 relative">
                        <div className="sticky top-[10vh] flex items-center gap-3 z-20">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40">
                                PROJECTS
                            </span>
                        </div>
                    </div>

                    {/* Right: Project Cards Stack */}
                    <div className="lg:col-span-9 relative" style={{ perspective: "1500px" }}>
                        <div className="relative mt-[-10vh]">
                            {projects.map((project, index) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
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

export default Projects;

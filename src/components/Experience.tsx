"use client";

import { useRef, useState, useLayoutEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionTemplate,
    useMotionValueEvent,
    useReducedMotion,
    type MotionValue,
} from "framer-motion";
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

const SCROLL_HEIGHT = `${experiences.length * 140 + 80}vh`;

function padScene(n: number) {
    return String(n).padStart(2, "0");
}

function toTimecode(year: string, progress: number) {
    const y = parseInt(year, 10) || 2025;
    const frame = Math.floor(progress * 24);
    const sec = Math.floor((progress * 60) % 60);
    return `${y}:${String(sec).padStart(2, "0")}:${String(frame).padStart(2, "0")}`;
}

const FilmPerforations = () => (
    <div className="film-perforations absolute inset-y-0 left-0 w-3 flex flex-col justify-between py-4 pointer-events-none" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-full h-2 rounded-[1px] bg-black/80 border border-white/[0.08]" />
        ))}
    </div>
);

const SceneCardContent = ({
    exp,
    index,
    isActive,
    isHydrated,
    sceneTimecode,
}: {
    exp: ExperienceItem;
    index: number;
    isActive: boolean;
    isHydrated: boolean;
    sceneTimecode?: MotionValue<number>;
}) => (
    <div
        className={`relative w-full ${isHydrated && isActive ? "pointer-events-auto" : isHydrated ? "pointer-events-none" : index === 0 ? "pointer-events-auto" : "pointer-events-none"}`}
    >
        <div className="absolute -top-6 -left-2 md:-left-4 select-none pointer-events-none" aria-hidden>
            <span className="text-[clamp(4rem,12vw,8rem)] font-heading font-medium leading-none text-white/[0.03]">
                {padScene(index + 1)}
            </span>
        </div>

        <div className="relative film-frame p-6 md:p-10 lg:p-12">
            <FilmPerforations />
            <div className="absolute top-4 right-4 flex items-center gap-2" aria-hidden>
                <span className="rec-dot w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <span className="text-[9px] font-mono tracking-[0.25em] text-white/30 uppercase">
                    {isHydrated && sceneTimecode ? (
                        <TimecodeLabel progress={sceneTimecode} year={exp.date} />
                    ) : (
                        toTimecode(exp.date, 0)
                    )}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-white/[0.06] pb-6 pl-4 md:pl-6">
                <div className="md:col-span-3">
                    <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/25 block mb-2">
                        SCENE {padScene(index + 1)}
                    </span>
                    <span className="text-2xl font-heading text-white/50 block">{exp.date}</span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/20 block mt-1">
                        /{exp.type}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/15 block mt-3">
                        {exp.location}
                    </span>
                </div>

                <div className="md:col-span-9 md:pl-4">
                    <h3 className="text-2xl md:text-4xl font-heading font-medium tracking-tight text-white uppercase leading-tight">
                        {exp.role}
                    </h3>
                    <span className="block text-sm font-sans font-medium text-white/35 mt-3 uppercase tracking-[0.2em]">
                        @ {exp.company}
                    </span>
                </div>
            </div>

            <div className="mt-6 pl-4 md:pl-6">
                <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-2xl">
                    {exp.desc}
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-6 pl-4 md:pl-6 border-t border-white/[0.06]">
                <div className="flex gap-2 flex-wrap">
                    {exp.stack.map((tag) => (
                        <span
                            key={tag}
                            className={`px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono tracking-widest uppercase text-white/35 transition-opacity duration-300 ${
                                !isHydrated
                                    ? index === 0
                                        ? "opacity-100"
                                        : "opacity-60"
                                    : isActive
                                      ? "opacity-100"
                                      : "opacity-60"
                            }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {exp.certificate && (
                    <a
                        href={exp.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={!isHydrated ? (index === 0 ? 0 : -1) : isActive ? 0 : -1}
                        className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white/55 hover:text-white interactive-button group/link"
                    >
                        View Certificate
                        <ArrowRight
                            size={14}
                            className="group-hover/link:translate-x-1 transition-transform duration-200"
                            style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                        />
                    </a>
                )}
            </div>
        </div>
    </div>
);

const TimelineRail = ({
    scrollYProgress,
    total,
    activeIndex,
    isHydrated,
}: {
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    total: number;
    activeIndex: number;
    isHydrated: boolean;
}) => {
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="hidden lg:flex flex-col items-center h-full min-h-[320px] relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/[0.08]" />
            {isHydrated && (
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-white origin-top"
                    style={{ height }}
                />
            )}
            <div className="relative flex flex-col justify-between h-full py-2">
                {experiences.map((exp, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    const dotClass = isActive
                        ? "bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                        : isPast
                          ? "bg-white/40 border-white/40"
                          : "bg-transparent border-white/20";

                    return (
                        <div key={exp.company + exp.role} className="relative flex items-center gap-4">
                            {isHydrated ? (
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1.4 : 1,
                                        opacity: isActive ? 1 : isPast ? 0.5 : 0.2,
                                    }}
                                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                                    className={`w-2.5 h-2.5 rounded-full border ${dotClass}`}
                                />
                            ) : (
                                <div
                                    className={`w-2.5 h-2.5 rounded-full border ${i === 0 ? "bg-white border-white" : dotClass}`}
                                />
                            )}
                            <span
                                className={`text-[10px] font-mono tracking-[0.2em] text-white/50 whitespace-nowrap transition-opacity duration-300 ${
                                    isHydrated ? (isActive ? "opacity-100" : "opacity-25") : i === 0 ? "opacity-100" : "opacity-25"
                                }`}
                            >
                                {exp.date}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/20 tracking-widest">
                {padScene((isHydrated ? activeIndex : 0) + 1)} / {padScene(total)}
            </div>
        </div>
    );
};

const SceneCard = ({
    exp,
    index,
    total,
    scrollYProgress,
    isActive,
    reducedMotion,
    isHydrated,
}: {
    exp: ExperienceItem;
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    isActive: boolean;
    reducedMotion: boolean;
    isHydrated: boolean;
}) => {
    const segment = 1 / total;
    const start = index * segment;
    const end = (index + 1) * segment;

    const sceneProgress = useTransform(scrollYProgress, (v) => {
        if (reducedMotion) return v >= start && v < end ? 1 : 0;
        const t = (v - start) / segment;
        if (index === 0 && v <= start) return 1;
        if (t <= 0 || t >= 1) return 0;
        if (t < 0.18) return t / 0.18;
        if (t > 0.82) return (1 - t) / 0.18;
        return 1;
    });

    const opacity = sceneProgress;

    const translateY = useTransform(sceneProgress, (p) => {
        if (reducedMotion || p <= 0) return 0;
        if (p < 1) return (1 - p) * 40;
        return 0;
    });

    const scale = useTransform(sceneProgress, (p) => {
        if (reducedMotion) return 1;
        return 0.96 + p * 0.04;
    });

    const rotateX = useTransform(sceneProgress, (p) => {
        if (reducedMotion) return 0;
        return (1 - p) * 14;
    });

    const blur = useTransform(sceneProgress, (p) => {
        if (reducedMotion) return 0;
        return (1 - p) * 8;
    });

    const transform = useMotionTemplate`translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
    const filter = useMotionTemplate`blur(${blur}px)`;
    const sceneTimecode = useTransform(scrollYProgress, [start, end], [0, 1]);

    if (!isHydrated) {
        return (
            <article
                className={`absolute inset-0 flex items-center ${index !== 0 ? "invisible" : ""}`}
                aria-hidden={index !== 0}
                style={{ zIndex: index === 0 ? 20 : index }}
            >
                <SceneCardContent exp={exp} index={index} isActive={index === 0} isHydrated={false} />
            </article>
        );
    }

    return (
        <motion.article
            style={{
                opacity,
                transform,
                filter,
                transformOrigin: "top center",
                zIndex: isActive ? 20 : index,
            }}
            className="absolute inset-0 flex items-center"
            aria-hidden={!isActive}
        >
            <SceneCardContent
                exp={exp}
                index={index}
                isActive={isActive}
                isHydrated
                sceneTimecode={sceneTimecode}
            />
        </motion.article>
    );
};

function TimecodeLabel({
    progress,
    year,
}: {
    progress: MotionValue<number>;
    year: string;
}) {
    const [label, setLabel] = useState(() => toTimecode(year, 0));

    useMotionValueEvent(progress, "change", (v) => {
        setLabel(toTimecode(year, v));
    });

    return <>{label}</>;
}

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const reducedMotion = useReducedMotion() ?? false;
    const total = experiences.length;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useLayoutEffect(() => {
        const v = scrollYProgress.get();
        setActiveIndex(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
        setIsHydrated(true);
    }, [scrollYProgress, total]);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (!isHydrated) return;
        const idx = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
        setActiveIndex(idx);
    });

    const vignetteOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.35, 0.25, 0.25, 0.35]);
    const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -8]);
    const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [0.5, 0]);

    const displayActiveIndex = isHydrated ? activeIndex : 0;

    return (
        <section
            id="experience"
            ref={sectionRef}
            style={{ height: SCROLL_HEIGHT }}
            className="relative bg-black z-10 border-b border-white/[0.06]"
        >
            <div className="experience-scanlines absolute inset-0 pointer-events-none z-0" aria-hidden />

            <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
                {isHydrated ? (
                    <motion.div
                        className="experience-vignette absolute inset-0 pointer-events-none z-[1]"
                        style={{ opacity: vignetteOpacity }}
                        aria-hidden
                    />
                ) : (
                    <div className="experience-vignette absolute inset-0 pointer-events-none z-[1] opacity-40" aria-hidden />
                )}

                <div className="relative z-20 px-4 sm:px-6 lg:px-10 pt-[calc(3vh+1.5rem)] max-w-[1600px] mx-auto w-full">
                    <div className="flex items-center justify-between gap-4 mb-3">
                        {isHydrated ? (
                            <motion.div style={{ y: headerY }} className="flex items-center gap-3">
                                <HeaderLabel />
                            </motion.div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <HeaderLabel />
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
                            <span className="hidden md:inline">Now playing</span>
                            <span className="text-white/60">Scene {padScene(displayActiveIndex + 1)}</span>
                        </div>
                    </div>
                    <div className="h-px w-full bg-white/[0.08] overflow-hidden">
                        {isHydrated ? (
                            <motion.div
                                className="h-full bg-white/50 origin-left"
                                style={{ scaleX: scrollYProgress, width: "100%" }}
                            />
                        ) : (
                            <div className="h-full bg-white/50 w-0" />
                        )}
                    </div>
                </div>

                <div className="flex-1 relative z-10 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-10 pb-[calc(3vh+2rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-center">
                        <div className="hidden lg:block lg:col-span-2 h-[min(420px,55vh)]">
                            <TimelineRail
                                scrollYProgress={scrollYProgress}
                                total={total}
                                activeIndex={displayActiveIndex}
                                isHydrated={isHydrated}
                            />
                        </div>

                        <div
                            className="lg:col-span-10 relative h-[min(560px,68vh)] w-full overflow-visible"
                            style={{ perspective: "1000px" }}
                        >
                            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                                <span className="absolute top-0 left-0 w-6 h-6 border-l border-t border-white/15" />
                                <span className="absolute top-0 right-0 w-6 h-6 border-r border-t border-white/15" />
                                <span className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-white/15" />
                                <span className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-white/15" />
                            </div>

                            {experiences.map((exp, index) => (
                                <SceneCard
                                    key={exp.company + exp.role}
                                    exp={exp}
                                    index={index}
                                    total={total}
                                    scrollYProgress={scrollYProgress}
                                    isActive={index === displayActiveIndex}
                                    reducedMotion={reducedMotion}
                                    isHydrated={isHydrated}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {isHydrated ? (
                    <motion.p
                        style={{ opacity: scrollHintOpacity }}
                        className="absolute bottom-[calc(3vh+1rem)] left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.35em] uppercase text-white/25 z-20"
                    >
                        Scroll to advance scenes
                    </motion.p>
                ) : (
                    <p className="absolute bottom-[calc(3vh+1rem)] left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.35em] uppercase text-white/25 z-20 opacity-50">
                        Scroll to advance scenes
                    </p>
                )}
            </div>
        </section>
    );
};

function HeaderLabel() {
    return (
        <>
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/40">
                EXPERIENCE
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-white/20 tracking-widest">
                — CAREER REEL
            </span>
        </>
    );
}

export default Experience;

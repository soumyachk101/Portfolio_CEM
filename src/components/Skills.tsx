"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Skill {
    name: string;
    category: 'languages' | 'frameworks' | 'tools';
    level: number;
    tagline: string;
    desc: string;
}

const categories = [
    { id: 'languages', title: 'Programming Languages' },
    { id: 'frameworks', title: 'Frameworks & Dev' },
    { id: 'tools', title: 'Tools & Platforms' },
] as const;

const skills: Skill[] = [
    { name: "Python", category: "languages", level: 95, tagline: "First-class scripting, automation & AI workflows", desc: "Speaks fluent indentation. Wrote my first script to automate homework and now leveraging it for machine learning and backend servers with Django & FastAPI." },
    { name: "JavaScript", category: "languages", level: 90, tagline: "The engine of web interactivity & logic", desc: "The chaotic good of the web. Fully mastered ES6+, closures, event loops, and asynchronous flows. Runs on coffee and console.log." },
    { name: "TypeScript", category: "languages", level: 85, tagline: "JavaScript with a safety harness", desc: "JavaScript's responsible older sibling. Saving my code from runtime crashes and 'undefined' daily with strict compile-time types." },
    { name: "SQL", category: "languages", level: 88, tagline: "Querying databases with precision", desc: "SELECT, JOIN, and GROUP BY are my close friends. Optimizing indexes and normalization structures to keep backend queries blazing fast." },
    { name: "C", category: "languages", level: 80, tagline: "Pointers, memory & foundational systems", desc: "My first programming love. Taught me memory allocation, pointer arithmetic, and the beauty of compile-time code before higher-level abstractions." },
    { name: "React.js", category: "frameworks", level: 92, tagline: "Building dynamic, state-driven UIs", desc: "Components, hooks, and virtual DOM. Can structure large-scale modular UIs in my sleep. Has a strong opinion on prop drilling." },
    { name: "Next.js", category: "frameworks", level: 85, tagline: "Server-side rendering & route optimization", desc: "Server components, file-system routing, and static generation. The engine driving this very website to run at warp speed." },
    { name: "Node.js", category: "frameworks", level: 88, tagline: "Fast, non-blocking backend runtimes", desc: "Scalable backend APIs and asynchronous scripts. Designing REST endpoints, middleware systems, and microservices on Node runtimes." },
    { name: "Tailwind CSS", category: "frameworks", level: 95, tagline: "Crafting custom designs at speed", desc: "Utility-first CSS styling. Can translate complex designs into gorgeous responsive frontends in record time without bloated stylesheets." },
    { name: "Framer Motion", category: "frameworks", level: 88, tagline: "Smooth animations & layout physics", desc: "Breathing life into standard web components. Creating elastic transitions, hover reactions, drag mechanics, and layout morphs." },
    { name: "Three.js (Basics)", category: "frameworks", level: 75, tagline: "Stepping into 3D rendering & WebGL scenes", desc: "Exploring lights, cameras, meshes, and textures. Creating engaging WebGL environments and bringing three-dimensional spaces to the browser." },
    { name: "Git & GitHub", category: "tools", level: 90, tagline: "The coder's time machine & sync manager", desc: "Branching, committing, pulling, pushing. Reverting accidents and resolving merge conflicts. Keeping code history clean and readable." },
    { name: "AWS (Cloud)", category: "tools", level: 80, tagline: "Deploying infrastructure in the sky", desc: "Configuring EC2 compute nodes, S3 buckets, cloud networks, and serverless functions. Running applications globally with AWS cloud modules." },
    { name: "VS Code", category: "tools", level: 95, tagline: "The software engineering command center", desc: "Highly optimized extension ecosystem, custom keybindings, themes, and shell configurations. Where ideas translate into lines of code." },
    { name: "Figma", category: "tools", level: 85, tagline: "Prototyping UX & designing systems", desc: "Sketching wireframes, mocking layout proportions, color spacing, and typographic scales before writing a single line of CSS." },
];

const labelFor = (n: number) => (n >= 90 ? 'Expert' : n >= 80 ? 'Proficient' : 'Competent');

const Skills = () => {
    const [active, setActive] = useState<Skill | null>(null);

    return (
        <section id="skills" className="py-20 md:py-28 bg-transparent relative z-10 border-t border-border">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mb-12 md:mb-16"
                >
                    <span className="block text-[11px] font-mono tracking-[0.3em] uppercase text-muted mb-4">
                        {"// Skills"}
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl text-foreground tracking-tight">
                        Stack & expertise.
                    </h2>
                </motion.div>

                {/* Categories grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {categories.map((cat, i) => {
                        const list = skills.filter((s) => s.category === cat.id);
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                            >
                                <h3 className="font-heading text-2xl md:text-3xl text-foreground tracking-tight mb-6">
                                    [ {cat.title} ]
                                </h3>
                                <ul className="flex flex-col">
                                    {list.map((s) => (
                                        <li key={s.name} className="border-t border-border">
                                            <button
                                                onClick={() => setActive(active?.name === s.name ? null : s)}
                                                className="interactive-button w-full text-left flex flex-col gap-1 py-4 hover:bg-surface transition-colors"
                                            >
                                                <div className="flex items-baseline justify-between gap-3">
                                                    <span className="font-heading text-lg text-foreground">
                                                        [ {s.name} ]
                                                    </span>
                                                    <span className="font-mono text-foreground tabular-nums text-sm">
                                                        {s.level}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">
                                                    // {labelFor(s.level)}
                                                </span>
                                                <div className="h-[2px] bg-border mt-2">
                                                    <div className="h-full bg-foreground" style={{ width: `${s.level}%` }} />
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Detail panel */}
                <AnimatePresence mode="wait">
                    {active && (
                        <motion.aside
                            key={active.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="border-t border-border pt-8"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted">
                                    {"// Inspecting"}
                                </span>
                                <h4 className="font-heading text-3xl md:text-5xl text-foreground tracking-tight">
                                    [ {active.name} ]
                                </h4>
                                <button
                                    onClick={() => setActive(null)}
                                    className="interactive-button text-[11px] font-mono tracking-[0.3em] uppercase text-muted hover:text-foreground md:ml-auto"
                                >
                                    // Close
                                </button>
                            </div>
                            <p className="text-sm md:text-base text-foreground font-mono tracking-[0.05em] lowercase mb-3">
                                {active.tagline.toLowerCase()}
                            </p>
                            <p className="text-base md:text-lg text-foreground max-w-2xl leading-relaxed lowercase">
                                {active.desc.toLowerCase()}
                            </p>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skills;

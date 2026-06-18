"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories, certificates } from '../data/certificates';
import { useCinematicCardScroll, CINEMATIC_CARD_SCROLL_CLASS } from '../lib/useCinematicCardScroll';

const CategoryCard = ({ cat, index }: { cat: any; index: number }) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const { containerRef, opacity, transform, filter } = useCinematicCardScroll();

    const topOffset = `calc(10vh + ${index * 30}px)`;

    const list = certificates.filter((c) => c.category === cat.id);
    if (list.length === 0) return null;

    return (
        <div ref={containerRef} className={`${CINEMATIC_CARD_SCROLL_CLASS} flex items-start justify-center sticky top-0 pb-[10vh]`}>
            <motion.div
                style={{ 
                    opacity,
                    transform,
                    filter,
                    top: topOffset,
                    transformOrigin: "top center",
                }}
                className="relative w-full flex flex-col p-8 lg:p-12 bg-white border border-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] will-change-transform sticky max-h-[80vh] overflow-y-auto custom-scrollbar"
            >
                {/* Header Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline border-b border-border pb-6 sticky top-0 bg-white z-10">
                    <div className="md:col-span-2">
                        <span className="text-xl font-heading text-foreground block">
                            {String(index + 1).padStart(3, '0')}
                        </span>
                    </div>
                    <div className="md:col-span-8">
                        <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-foreground uppercase">
                            / {cat.label}
                        </h3>
                    </div>
                    <div className="md:col-span-2 lg:text-right">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-muted">
                            [{list.length} ITEMS]
                        </span>
                    </div>
                </div>

                {/* Certificates List */}
                <ul className="flex flex-col mt-4">
                    {list.map((cert) => (
                        <li key={cert.id} className="border-t border-border first:border-t-0 pt-4 mt-4 first:pt-0 first:mt-0">
                            <button
                                onClick={() => setActiveId(activeId === cert.id ? null : cert.id)}
                                className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 group interactive-button"
                            >
                                <span className="text-sm font-sans font-medium text-foreground group-hover:text-accent transition-colors">
                                    {cert.title}
                                </span>
                                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-muted shrink-0">
                                    {cert.issuer} / {cert.date}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeId === cert.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 flex items-center gap-4">
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#055dff] interactive-button group/link"
                                            >
                                                View Credential
                                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </a>
                                            <a
                                                href={`/certificates/${cert.id}`}
                                                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-foreground interactive-button hover:text-accent transition-colors"
                                            >
                                                Details
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

const Certificates = () => {
    const validCategories = categories.filter((c) => c.id !== 'all' && certificates.some(cert => cert.category === c.id));

    return (
        <section id="certificates" className="py-24 bg-background relative z-10 border-b border-border">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Left: Category Label */}
                    <div className="lg:col-span-3 flex flex-col pt-2 relative">
                        <div className="sticky top-[10vh] flex flex-col gap-4 z-20">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-foreground">
                                    CERTIFICATES
                                </span>
                            </div>
                            <p className="text-xs font-mono font-bold tracking-widest uppercase text-muted pr-4">
                                [ {certificates.length} CREDENTIALS ]
                            </p>
                        </div>
                    </div>

                    {/* Right: Category Cards Stack */}
                    <div className="lg:col-span-9 relative" style={{ perspective: "1000px" }}>
                        <div className="relative mt-[-10vh]">
                            {validCategories.map((cat, index) => (
                                <CategoryCard 
                                    key={cat.id} 
                                    cat={cat} 
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

export default Certificates;

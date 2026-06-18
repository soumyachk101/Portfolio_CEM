"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Projects', href: '#projects' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = navLinks.map(link => link.href.substring(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 200) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-[3vh] left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center">
            {/* Desktop Navigation Pill */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30, delay: 2.2 }}
                className={`flex items-center gap-2 p-1.5 rounded-full pointer-events-auto transition-all duration-500 ${
                    scrolled 
                        ? 'bg-black/80 backdrop-blur-xl border border-white/[0.06] shadow-[0_0_30px_rgba(0,0,0,0.5)]' 
                        : 'bg-black/40 backdrop-blur-xl border border-white/[0.04]'
                }`}
            >
                {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`relative px-4 py-2 text-sm font-sans font-medium transition-colors duration-300 z-10 interactive-button rounded-full ${
                                isActive 
                                    ? 'text-black' 
                                    : 'text-white/40 hover:text-white/70'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute inset-0 rounded-full -z-10 bg-white"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            {link.name}
                        </a>
                    );
                })}
            </motion.div>
        </nav>
    );
};

export default Navbar;

"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import Cursor from '../components/Cursor';
import AmbientOrbs from '../components/AmbientOrbs';
import Preloader from '../components/Preloader';
import Hero from '../components/Hero';
import AboutStrip from '../components/AboutStrip';
import Capabilities from '../components/Capabilities';
import CredibilityStats from '../components/CredibilityStats';
import Projects from '../components/Projects';
import Hackathons from '../components/Hackathons';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    // Lock scroll during preloader
    useEffect(() => {
        document.body.style.overflow = loaded ? '' : 'hidden';
        if (!loaded) window.scrollTo(0, 0);
    }, [loaded]);

    return (
        <div className="bg-black min-h-screen font-sans text-foreground">
            {/* Cinematic preloader with curtain split */}
            {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

            {/* Letterbox bars — cinematic framing */}
            <div className="fixed top-0 left-0 right-0 h-[3vh] bg-black z-[60] pointer-events-none" />
            <div className="fixed bottom-0 left-0 right-0 h-[3vh] bg-black z-[60] pointer-events-none" />

            {/* Film grain overlay */}
            <div className="film-grain" />

            {/* Custom cursor (desktop only) */}
            <Cursor />

            {/* Ambient floating orbs for depth */}
            <AmbientOrbs />

            {/* Scroll progress indicator */}
            <ScrollProgress />

            <Navbar />
            <main id="main-content">
                <Hero />
                <AboutStrip />
                <Capabilities />
                <CredibilityStats />
                <Projects />
                <Hackathons />
                <Experience />
                <Contact />
            </main>
        </div>
    );
}

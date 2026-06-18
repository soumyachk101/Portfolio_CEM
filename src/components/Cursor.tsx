"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isDown, setIsDown] = useState(false);

    // Outer ring — lagging, larger
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 28, stiffness: 350, mass: 0.6 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    // Inner dot — instant
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);
    const dotSpring = { damping: 40, stiffness: 900, mass: 0.3 };
    const dotXS = useSpring(dotX, dotSpring);
    const dotYS = useSpring(dotY, dotSpring);

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        setIsVisible(true);

        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            dotX.set(e.clientX - 3);
            dotY.set(e.clientY - 3);

            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor]');
            setIsPointer(!!interactive);
        };

        const down = () => setIsDown(true);
        const up = () => setIsDown(false);
        const leave = () => setIsVisible(false);
        const enter = () => setIsVisible(true);

        window.addEventListener('mousemove', move);
        window.addEventListener('mousedown', down);
        window.addEventListener('mouseup', up);
        document.addEventListener('mouseleave', leave);
        document.addEventListener('mouseenter', enter);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mousedown', down);
            window.removeEventListener('mouseup', up);
            document.removeEventListener('mouseleave', leave);
            document.removeEventListener('mouseenter', enter);
        };
    }, [cursorX, cursorY, dotX, dotY]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Outer ring */}
            <motion.div
                style={{ x: ringX, y: ringY }}
                animate={{
                    scale: isPointer ? 1.8 : isDown ? 0.7 : 1,
                    opacity: isPointer ? 1 : 0.5,
                    borderColor: isPointer ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-8 h-8 rounded-full border mix-blend-difference"
            />
            {/* Inner dot */}
            <motion.div
                style={{ x: dotXS, y: dotYS }}
                animate={{ scale: isPointer ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
            />
        </div>
    );
};

export default Cursor;

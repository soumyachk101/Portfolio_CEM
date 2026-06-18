"use client";

import { motion } from 'framer-motion';

const AmbientOrbs = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
            {/* Large slow-drifting orb — top left */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)' }}
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 60, 0],
                    scale: [1, 1.15, 0.9, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full" style={{ top: '10%', left: '5%', position: 'absolute' }} />
            </motion.div>

            {/* Medium orb — bottom right */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)',
                    bottom: '10%',
                    right: '5%',
                }}
                animate={{
                    x: [0, -80, 40, 0],
                    y: [0, 60, -40, 0],
                    scale: [1, 0.85, 1.1, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Small fast orb — center */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.025), transparent 70%)',
                    top: '40%',
                    left: '45%',
                }}
                animate={{
                    x: [0, 60, -60, 0],
                    y: [0, -40, 40, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
};

export default AmbientOrbs;

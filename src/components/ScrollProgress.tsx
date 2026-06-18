"use client";

import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[1px] bg-white z-[100] origin-left"
            style={{ scaleX: scrollYProgress }}
        />
    );
};

export default ScrollProgress;

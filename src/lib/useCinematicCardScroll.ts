import { useRef } from "react";
import { useScroll, useTransform, useMotionTemplate } from "framer-motion";

/** Tall scroll runway so flip transitions feel slow and deliberate. */
export const CINEMATIC_CARD_SCROLL_CLASS = "h-[175vh]";

/**
 * Scroll-driven 3D card transforms tuned for a slow, cinematic flip.
 * Cards reach full visibility early and hold through most of the scroll range.
 */
export function useCinematicCardScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rotateX = useTransform(
        scrollYProgress,
        [0, 0.08, 0.18, 0.5, 0.68, 0.82, 1],
        [48, 32, 14, 0, 0, -6, -18]
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.28, 0.68, 0.84, 1],
        [0, 0.85, 1, 1, 0.5, 0]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.1, 0.5, 0.68, 0.84, 1],
        [0.82, 0.92, 1, 1, 0.95, 0.86]
    );

    const translateY = useTransform(
        scrollYProgress,
        [0, 0.28, 0.68, 1],
        [60, 0, 0, -80]
    );

    const blurValue = useTransform(
        scrollYProgress,
        [0, 0.18, 0.35, 0.68, 0.84, 1],
        [12, 4, 0, 0, 4, 10]
    );

    const filter = useMotionTemplate`blur(${blurValue}px)`;
    const transform = useMotionTemplate`translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;

    return {
        containerRef,
        opacity,
        transform,
        filter,
    };
}

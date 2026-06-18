export const GridBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-black">
            {/* Subtle cool white radial from center — cinematic depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_70%)]" />

            {/* Radial vignette — dark edges for cinematic framing */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.6)_100%)]" />

            {/* Film grain texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        </div>
    );
};

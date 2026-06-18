/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Cinematic — Apple Event Style (Pure B&W)
                background: "#000000",
                foreground: "#ffffff",
                muted: "#666666",
                subtle: "#333333",
                border: "rgba(255,255,255,0.08)",
                "border-strong": "rgba(255,255,255,0.15)",
                surface: "rgba(255,255,255,0.04)",
                "surface-hover": "rgba(255,255,255,0.08)",
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
                heading: ['var(--font-heading)', 'Share Tech Mono', 'monospace'],
                mono: ['var(--font-mono)', 'Space Mono', 'ui-monospace', 'monospace'],
            },
            transitionTimingFunction: {
                'out-emil': 'cubic-bezier(0.23, 1, 0.32, 1)',
                'in-out-emil': 'cubic-bezier(0.77, 0, 0.175, 1)',
            },
        },
    },
    plugins: [],
}

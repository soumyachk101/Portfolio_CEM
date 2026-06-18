"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Coffee, Eraser } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const About = () => {
    const [level, setLevel] = useState(20);
    const [focusStat, setFocusStat] = useState(94);
    const [speedStat, setSpeedStat] = useState(88);
    const [coffeeCups, setCoffeeCups] = useState(0);
    const [timeStr, setTimeStr] = useState('--:--:--');
    const [chatLogs, setChatLogs] = useState<{ sender: 'guest' | 'soumya'; text: string }[]>([
        { sender: 'soumya', text: "hey! tap a button below to send a quick message." },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Canvas state — kept as a thin scratch strip in the editorial style.
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updateKolkataTime = () => {
            const fmt = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Kolkata',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setTimeStr(fmt.format(new Date()));
        };
        updateKolkataTime();
        const id = setInterval(updateKolkataTime, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (chatLogs.length > 1 || isTyping) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatLogs, isTyping]);

    const triggerLevelUp = () => {
        setLevel((p) => p + 1);
        setFocusStat((p) => Math.min(100, p + 1));
        setSpeedStat((p) => Math.min(100, p + 1));
    };

    const drinkCoffee = () => {
        setCoffeeCups((p) => p + 1);
        setFocusStat((p) => Math.min(100, p + 3));
        setSpeedStat((p) => Math.min(100, p + 4));
    };

    const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
        const c = canvasRef.current;
        if (!c) return null;
        const r = c.getBoundingClientRect();
        const pt = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
        return { x: pt.clientX - r.left, y: pt.clientY - r.top };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const c = getCoords(e);
        if (!c) return;
        setIsDrawing(true);
        lastPos.current = c;
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const c = getCoords(e);
        if (!c) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
        lastPos.current = c;
    };

    const stopDrawing = () => setIsDrawing(false);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleChatAction = (action: 'hire' | 'stack' | 'highfive') => {
        let guestText = '';
        let botText = '';
        if (action === 'hire') {
            guestText = "let's collaborate";
            botText = "happy to chat. drop a mail at soumyachk1@gmail.com and we'll start the project sync.";
        } else if (action === 'stack') {
            guestText = "what's your stack?";
            botText = "next.js + react + typescript on the front, fastapi + node.js on the back, postgres + neon + firebase for data, and vercel + railway for infra.";
        } else {
            guestText = "high five";
            botText = "right back. synergy levels increased.";
        }
        setChatLogs((p) => [...p, { sender: 'guest', text: guestText }]);
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setChatLogs((p) => [...p, { sender: 'soumya', text: botText }]);
        }, 900);
    };

    return (
        <section id="about" className="py-20 md:py-28 bg-transparent relative z-10 border-t border-border">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mb-12"
                >
                    <span className="block text-[11px] font-mono tracking-[0.3em] uppercase text-muted mb-4">
                        {"// About"}
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl text-foreground tracking-tight small-caps">
                        Developer&apos;s console.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT: System telemetry */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="lg:col-span-5 flex flex-col gap-6"
                    >
                        <div className="relative border border-border p-6">
                            <CornerBracket pos="tl" /><CornerBracket pos="tr" />
                            <CornerBracket pos="bl" /><CornerBracket pos="br" />
                            <div className="flex justify-between items-baseline mb-6">
                                <span className="block text-[11px] font-mono tracking-[0.3em] uppercase text-muted">
                                    {"// Core level"}
                                </span>
                                <span className="font-mono text-foreground tabular-nums">Lvl {level}</span>
                            </div>
                            <div className="space-y-4">
                                <Stat label="Focus" value={focusStat} />
                                <Stat label="Execution speed" value={speedStat} />
                                <div className="pt-4 border-t border-border flex items-center justify-between">
                                    <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted">
                                        {"// Caffeine buffer"}
                                    </span>
                                    <span className="font-mono text-foreground tabular-nums">{coffeeCups} / ∞</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    onClick={triggerLevelUp}
                                    className="interactive-button inline-flex items-center justify-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-foreground border border-foreground py-2 hover:bg-foreground hover:text-background transition-colors"
                                >
                                    <Sparkles size={12} /> Level up
                                </button>
                                <button
                                    onClick={drinkCoffee}
                                    className="interactive-button inline-flex items-center justify-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-foreground border border-foreground py-2 hover:bg-foreground hover:text-background transition-colors"
                                >
                                    <Coffee size={12} /> Refill
                                </button>
                            </div>
                        </div>

                        <div className="border border-border p-6">
                            <span className="block text-[11px] font-mono tracking-[0.3em] uppercase text-muted mb-3">
                                {"// Local time"}
                            </span>
                            <span className="font-mono text-3xl md:text-4xl text-foreground tabular-nums">
                                {timeStr}
                            </span>
                            <span className="block text-[11px] font-mono tracking-[0.3em] uppercase text-muted mt-2">
                                Asia / Kolkata — IST
                            </span>
                        </div>
                    </motion.div>

                    {/* RIGHT: Scratch + chat */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                        className="lg:col-span-7 flex flex-col gap-6"
                    >
                        {/* Scratch strip */}
                        <div className="border border-border p-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted">
                                    {"// Scratch strip"}
                                </span>
                                <button
                                    onClick={clearCanvas}
                                    className="interactive-button inline-flex items-center gap-1 text-[11px] font-mono tracking-[0.3em] uppercase text-muted hover:text-foreground"
                                >
                                    <Eraser size={12} /> Clear
                                </button>
                            </div>
                            <div className="border border-border h-[140px] relative">
                                <canvas
                                    ref={(el) => {
                                        if (el) {
                                            canvasRef.current = el;
                                            const r = el.getBoundingClientRect();
                                            if (el.width !== r.width || el.height !== r.height) {
                                                el.width = r.width;
                                                el.height = r.height;
                                            }
                                        }
                                    }}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                    className="absolute inset-0 w-full h-full cursor-crosshair"
                                />
                            </div>
                        </div>

                        {/* Communications */}
                        <div className="border border-border p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted">
                                    {"// Communications"}
                                </span>
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted">
                                    sync — active
                                </span>
                            </div>
                            <div className="h-[180px] overflow-y-auto border border-border p-4 space-y-3 mb-4">
                                {chatLogs.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col ${m.sender === 'guest' ? 'items-end' : 'items-start'}`}
                                    >
                                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted mb-1">
                                            // {m.sender}
                                        </span>
                                        <p className={`text-sm max-w-[80%] ${m.sender === 'guest' ? 'text-foreground' : 'text-foreground'}`}>
                                            {m.text}
                                        </p>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted mb-1">
                                            // soumya
                                        </span>
                                        <span className="text-sm text-muted italic">typing…</span>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <ChatButton label="Collaborate" onClick={() => handleChatAction('hire')} />
                                <ChatButton label="Stack?" onClick={() => handleChatAction('stack')} />
                                <ChatButton label="High five" onClick={() => handleChatAction('highfive')} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ChatButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
        onClick={onClick}
        className="interactive-button text-[11px] font-mono tracking-[0.3em] uppercase text-foreground border border-foreground py-2 hover:bg-foreground hover:text-background transition-colors"
    >
        // {label}
    </button>
);

const Stat = ({ label, value }: { label: string; value: number }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted">
                // {label}
            </span>
            <span className="font-mono text-foreground tabular-nums text-sm">{value}%</span>
        </div>
        <div className="h-[2px] bg-border">
            <div className="h-full bg-foreground" style={{ width: `${value}%` }} />
        </div>
    </div>
);

const CornerBracket = ({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) => {
    const m = {
        tl: 'top-[-1px] left-[-1px] border-t border-l',
        tr: 'top-[-1px] right-[-1px] border-t border-r',
        bl: 'bottom-[-1px] left-[-1px] border-b border-l',
        br: 'bottom-[-1px] right-[-1px] border-b border-r',
    } as const;
    return <span className={`absolute w-3 h-3 border-foreground ${m[pos]}`} aria-hidden />;
};

export default About;

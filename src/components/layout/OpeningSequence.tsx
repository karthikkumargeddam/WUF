"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, ShieldCheck } from "lucide-react";

export default function OpeningSequence() {
    const [complete, setComplete] = useState(false);
    const [shouldPlay, setShouldPlay] = useState(false);

    useEffect(() => {
        // Check if we've already played the intro in this session
        const hasPlayed = sessionStorage.getItem("has_played_opening");
        if (!hasPlayed) {
            setShouldPlay(true);
            // Disable scrolling while playing
            document.body.style.overflow = "hidden";
        } else {
            setComplete(true);
        }
    }, []);

    const handleComplete = () => {
        setComplete(true);
        sessionStorage.setItem("has_played_opening", "true");
        document.body.style.overflow = "";
    };

    if (!shouldPlay || complete) return null;

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    key="opening-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center text-white cursor-none"
                    onAnimationComplete={(definition) => {
                        // This is a safety fallback, usually we trigger via the inner animation's onComplete
                        if (definition === "exit") {
                            handleComplete();
                        }
                    }}
                >
                    {/* Background Industrial Elements */}
                    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-zinc-500 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-zinc-500 rounded-full animate-spin [animation-duration:20s]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo Icon Construction */}
                        <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="mb-8 p-6 border-2 border-white/10 rounded-[2rem] bg-zinc-900/50 backdrop-blur-sm"
                        >
                            <Box size={48} className="text-white" />
                        </motion.div>

                        {/* Main Text Reveal */}
                        <div className="overflow-hidden mb-4">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                                className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                            >
                                Wearunifab
                            </motion.h1>
                        </div>

                        {/* Subtitle / Divider */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="h-0.5 bg-zinc-800 w-full max-w-[200px] mb-4"
                        />

                        {/* Tagline */}
                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                                className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-zinc-500"
                            >
                                Premium Industrial Gear
                            </motion.p>
                        </div>
                    </div>

                    {/* Loading Progress & System Check */}
                    <div className="absolute bottom-12 w-full max-w-sm px-8">
                        <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 mb-2 font-bold uppercase">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                System Initializing...
                            </motion.span>
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={10} />
                                <span>Secure</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                                className="h-full bg-white"
                                onAnimationComplete={() => {
                                    setTimeout(() => {
                                        handleComplete();
                                    }, 500); // Small pause at 100% before exit
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

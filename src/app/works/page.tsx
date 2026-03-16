"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Play, Calendar, Film, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import { useState, useEffect } from "react";

export default function WorksPage() {
    const { t, language } = useLanguage();
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // 簡単な認証ガード
        const auth = localStorage.getItem("temp_auth");
        if (auth !== "true") {
            window.location.href = "/creative-preview";
            return;
        }
        setAuthorized(true);

        async function loadWorks() {
            try {
                const res = await fetch('/api/works');
                if (res.ok) {
                    setWorks(await res.json());
                }
            } catch (e) {
                console.error("Failed to load works", e);
            } finally {
                setLoading(false);
            }
        }
        loadWorks();
    }, []);

    if (!authorized) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-black italic tracking-tighter">
                            <span className="text-accent underline decoration-accent/30 underline-offset-4 not-italic mr-1">A</span>CINEMA
                        </span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" />
                        {t.nav.hub}
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-40">
                <div className="max-w-7xl mx-auto px-4">
                    <header className="mb-24 relative overflow-visible">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 text-accent">
                                <Film className="w-10 h-10" />
                                <span className="text-xs font-black tracking-[0.5em] uppercase border-b border-accent/30 pb-1">
                                    Archive of Creations
                                </span>
                            </div>
                            {/* Vertical padding added to prevent cropping */}
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase mb-2">
                                WORKS
                            </h2>
                            <h3 className="text-xl md:text-2xl font-black text-accent tracking-[0.3em] uppercase">
                                COLLECTION
                            </h3>
                            <p className="text-xl md:text-3xl text-gray-400 font-bold max-w-4xl leading-relaxed italic">
                                ALL CINEMAが手掛けた、AIと人間が織りなす次世代の映像群。
                            </p>
                        </motion.div>
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -z-10" />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {works.map((work, idx) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative flex flex-col rounded-2xl overflow-hidden glass border border-white/5 transition-all hover:glow-md hover:border-accent/10"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={work.thumbnail}
                                        alt={language === 'ja' ? work.titleJa : work.titleEn}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-700">
                                            <Play className="w-8 h-8 fill-current translate-x-1" />
                                        </div>
                                    </div>
                                    {/* Optional category display if it existed in the work data */}
                                    {work.category && (
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 rounded-full glass border border-white/10 text-[10px] font-black tracking-widest uppercase">
                                                {work.category}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-black text-accent tracking-[0.2em] uppercase">No.{work.no}</span>
                                        <span className="flex items-center gap-2 text-[9px] text-gray-500 font-black uppercase tracking-widest">
                                            <Calendar className="w-3.5 h-3.5 text-accent/50" />
                                            {work.date}
                                        </span>
                                    </div>
                                    {/* Local padding and leading for work titles */}
                                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-accent transition-colors leading-[1.3] uppercase py-2 px-1">
                                        {language === 'ja' ? work.titleJa : work.titleEn}
                                    </h3>
                                    <p className="text-xs text-gray-400 mb-6 leading-relaxed font-medium line-clamp-2 italic">
                                        {language === 'ja' ? work.synopsisJa : work.synopsisEn}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-end">
                                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:scale-125 transition-all" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Twitter as X,
    Instagram,
    Globe,
    ChevronRight,
    ArrowLeft,
    Users,
    Briefcase,
    ExternalLink,
    MessageSquare,
    Sparkles,
    Send
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { handleSnsClick } from "@/lib/sns";
import { useState, useEffect } from "react";

const creators = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    name: `Creator ${String(i + 1).padStart(2, '0')}`,
    role: i % 3 === 0 ? "AI Director" : i % 3 === 1 ? "Visual Artist" : "Prompt Engineer",
    bio: "AIと映像の可能性を追求する、ALL CINEMA提携クリエイター。",
    bioEn: "ALL CINEMA partner creator exploring the possibilities of AI and film.",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 40}`,
    sns: { x: "allin_inc", ig: "allin_inc" },
    portfolio: "https://all-in.co.jp"
}));

const Nav = () => {
    const { t } = useLanguage();
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group relative">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            <span className="text-3xl font-black text-white leading-none tracking-tighter uppercase italic">
                                <span className="text-accent inline-block scale-125 origin-bottom relative top-[-1px] not-italic mr-1">A</span>LL CINEMA
                            </span>
                        </div>
                    </div>
                </Link>
                <Link href="/" className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" />
                    {t.creator.back}
                </Link>
            </div>
        </nav>
    );
};

export default function CreatorPage() {
    const { t, language } = useLanguage();
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowSticky(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <Nav />

            {/* Sticky Apply Button */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 100 }}
                        className="fixed bottom-12 right-12 z-[100]"
                    >
                        <Link
                            href="/contact"
                            className="w-24 h-24 rounded-full bg-accent text-white flex flex-col items-center justify-center font-black text-[10px] tracking-[0.2em] shadow-[0_0_50px_rgba(255,0,0,0.6)] hover:scale-110 transition-all uppercase text-center p-2 border-2 border-white/20"
                        >
                            <Send className="w-6 h-6 mb-1" />
                            JOIN<br />NOW
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-32 pb-40">
                <div className="max-w-7xl mx-auto px-4">
                    <header className="mb-24 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4 text-accent">
                                <Users className="w-10 h-10" />
                                <span className="text-xs font-black tracking-[0.5em] uppercase border-b border-accent/30 pb-1">
                                    {t.creator.showcase_title}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter uppercase italic leading-[1.2] py-6 px-1">
                                THE <span className="text-accent underline decoration-accent/30 underline-offset-8">PARTNERS</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-gray-400 font-bold max-w-4xl leading-relaxed italic">
                                {t.creator.showcase_desc}
                            </p>
                        </motion.div>
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {creators.map((creator, idx) => (
                            <motion.div
                                key={creator.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative flex flex-col p-8 rounded-[2.5rem] glass border border-white/5 hover:border-accent/30 transition-all hover:glow-sm overflow-hidden"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="relative w-24 h-24 rounded-3xl overflow-hidden glass border border-white/10 group-hover:border-accent/40 group-hover:scale-105 transition-all">
                                        <img
                                            src={creator.avatar}
                                            alt={creator.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20 tracking-widest uppercase">
                                            Partner
                                        </span>
                                        <span className="text-[9px] font-black text-gray-500 tracking-[0.2em] uppercase">
                                            ID: {String(creator.id).padStart(3, '0')}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <h3 className="text-2xl font-black italic tracking-tight group-hover:text-accent transition-colors py-4 px-1">
                                        {creator.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                                        <Sparkles className="w-3 h-3 text-accent" />
                                        {creator.role}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 italic">
                                        {language === 'ja' ? creator.bio : creator.bioEn}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleSnsClick('x', creator.sns.x)}
                                            className="text-gray-600 hover:text-accent transition-all hover:scale-125"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleSnsClick('instagram', creator.sns.ig)}
                                            className="text-gray-600 hover:text-accent transition-all hover:scale-125"
                                        >
                                            <Instagram className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <a
                                        href={creator.portfolio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white transition-colors tracking-widest uppercase"
                                    >
                                        {t.creator.portfolio} <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Join Us CTA */}
                    <section className="mt-40 grid md:grid-cols-2 gap-12 bg-neutral-950/40 rounded-[4rem] p-12 md:p-24 border border-white/5 relative overflow-hidden">
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase py-8">
                                READY TO <br /> <span className="text-accent underline decoration-accent/30">JOIN THE HUB?</span>
                            </h2>
                            <p className="text-xl text-gray-400 font-bold leading-relaxed italic">
                                {t.creator.desc}
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-accent text-white rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-accent/40 uppercase tracking-widest">
                                {t.creator.cta_button}
                                <ChevronRight className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="relative z-10 flex flex-col justify-center gap-8">
                            {t.creator.benefits.slice(0, 3).map((benefit: any, idx: number) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-accent">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg text-white mb-2 uppercase italic tracking-tighter">{benefit.title}</h4>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

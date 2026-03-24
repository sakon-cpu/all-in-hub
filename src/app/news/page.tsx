"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Bell, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import type { NewsItem } from "@/lib/types";

const Nav = () => {
    const { t } = useLanguage();
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group relative">
                    <span className="text-3xl font-black text-white leading-none tracking-tighter uppercase italic">
                        <span className="text-accent inline-block scale-125 origin-bottom relative top-[-1px] not-italic mr-1">A</span>LL CINEMA
                    </span>
                </Link>
                <Link href="/" className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" />
                    BACK TO HUB
                </Link>
            </div>
        </nav>
    );
};

export default function NewsPage() {
    const { t, language } = useLanguage();
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNews() {
            try {
                const res = await fetch('/api/news');
                if (res.ok) {
                    setNewsList(await res.json());
                }
            } catch (e) {
                console.error("Failed to load news", e);
            } finally {
                setLoading(false);
            }
        }
        loadNews();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Nav />
            
            <main className="pt-32 pb-40">
                <div className="max-w-4xl mx-auto px-4">
                    <header className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-3 text-accent">
                                <Bell className="w-6 h-6" />
                                <span className="text-xs font-black tracking-[0.4em] uppercase">News Archives</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic p-1">
                                {language === 'ja' ? 'お知らせ一覧' : 'NEWS'}
                            </h1>
                        </motion.div>
                    </header>

                    {loading ? (
                        <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest animate-pulse">
                            Loading Archives...
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {newsList.map((news, idx) => (
                                <motion.div
                                    key={news.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link 
                                        href={`/news/${news.id}`}
                                        className="group block p-8 rounded-3xl glass border border-white/5 hover:border-accent/30 transition-all hover:glow-sm relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight className="w-6 h-6 text-accent group-hover:translate-x-2 transition-transform" />
                                        </div>
                                        
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="flex flex-col gap-2 min-w-[140px]">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 font-mono">
                                                    <Calendar className="w-3 h-3 text-accent/50" />
                                                    {news.date}
                                                </div>
                                                <span className="w-fit px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black border border-accent/20 tracking-widest uppercase">
                                                    {news.type}
                                                </span>
                                            </div>
                                            
                                            <h2 className="text-xl md:text-2xl font-black group-hover:text-accent transition-colors leading-tight py-2 px-1">
                                                {language === 'ja' ? news.titleJa : news.titleEn}
                                            </h2>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}

                            {newsList.length === 0 && (
                                <div className="text-center py-20 glass border border-white/5 rounded-3xl text-gray-500 font-bold italic">
                                    No archive items found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

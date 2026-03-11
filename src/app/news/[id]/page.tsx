"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { NewsItem } from "@/lib/types";

export default function NewsDetailPage({ params }: { params: { id: string } }) {
    const { t, language } = useLanguage();
    const { id } = React.use(params as any) as any;
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNews() {
            try {
                const res = await fetch('/api/news');
                if (res.ok) {
                    const newsList = await res.json();
                    const found = newsList.find((n: NewsItem) => n.id === id);
                    setNewsItem(found || null);
                }
            } catch (e) {
                console.error("Failed to load news", e);
            } finally {
                setLoading(false);
            }
        }
        loadNews();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen pt-32 pb-20 flex justify-center text-white">Loading...</div>;
    }

    if (!newsItem) {
        return <div className="min-h-screen pt-32 pb-20 flex justify-center text-white">News not found.</div>;
    }

    const title = language === 'ja' ? newsItem.titleJa : newsItem.titleEn;
    const content = language === 'ja' ? newsItem.contentJa : newsItem.contentEn;

    return (
        <div className="min-h-screen pt-32 pb-20 bg-black text-white">
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

            <article className="max-w-3xl mx-auto px-4 mt-8">
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20 tracking-widest uppercase">
                            {newsItem.type}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                            <Clock className="w-3 h-3" />
                            {newsItem.date}
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                        {title}
                    </h1>

                    <div className="flex items-center justify-between py-6 border-y border-white/5">
                        <div className="text-sm font-bold text-gray-400">
                            ALL CINEMA PRESS
                        </div>
                        <button className="p-3 rounded-full glass hover:bg-white/5 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                <div className="prose prose-invert prose-lg max-w-none leading-[2.2] tracking-wide text-gray-300 font-light">
                    {content ? (
                        <ReactMarkdown>
                            {content}
                        </ReactMarkdown>
                    ) : (
                        <p className="italic text-gray-500">{(language === 'ja' ? '本文がありません。' : 'No content available.')}</p>
                    )}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
                    <Link href="/" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/20 text-sm font-bold hover:bg-white hover:text-black transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        BACK TO HUB
                    </Link>
                </div>
            </article>
        </div>
    );
}

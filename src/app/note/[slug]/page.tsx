"use client";

import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { Note } from "@/lib/types";

export default function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { t, language } = useLanguage();
    const { slug } = React.use(params);
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNote() {
            try {
                const res = await fetch('/api/notes');
                if (res.ok) {
                    const notes: Note[] = await res.json();
                    const found = notes.find((n) => n.slug === slug);
                    setNote(found || null);
                }
            } catch (e) {
                console.error("Failed to load note", e);
            } finally {
                setLoading(false);
            }
        }
        loadNote();
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen pt-32 pb-20 flex justify-center text-white">Loading...</div>;
    }

    if (!note) {
        return <div className="min-h-screen pt-32 pb-20 flex justify-center text-white">Note not found.</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-20">
            <article className="max-w-3xl mx-auto px-4">
                <Link href="/note" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    {t.note.back_list}
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">
                            {note.category.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                            <Clock className="w-3 h-3" />
                            5 {t.note.read_time}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                        {language === 'ja' ? note.titleJa : note.titleEn}
                    </h1>
                    <div className="flex items-center justify-between py-6 border-y border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{note.author}</div>
                                <div className="text-xs text-gray-500 font-mono">{t.note.published} {note.date}</div>
                            </div>
                        </div>
                        <button className="p-3 rounded-full glass hover:bg-white/5 transition-colors">
                            <Share2 className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </header>

                <div className="prose prose-invert max-w-none text-gray-300 font-light leading-[2.2] tracking-wide">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            p: ({ ...props }) => <p className="mb-8" {...props} />,
                            h1: ({ ...props }) => <h1 className="text-3xl md:text-5xl font-black text-white mt-16 mb-8 tracking-tighter uppercase" {...props} />,
                            h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-16 mb-6 tracking-tight border-b border-white/10 pb-4" {...props} />,
                            h3: ({ ...props }) => <h3 className="text-xl font-bold text-accent mt-10 mb-4 tracking-widest uppercase" {...props} />,
                            a: ({ ...props }) => <a className="text-accent hover:text-white underline decoration-accent/30 underline-offset-4 transition-colors font-medium" {...props} />,
                            blockquote: ({ ...props }) => (
                                <blockquote className="my-12 pl-6 md:pl-8 border-l-2 border-accent/50 bg-accent/5 py-4 pr-4 rounded-r-2xl italic text-gray-400 font-medium" {...props} />
                            ),
                            img: ({ ...props }) => (
                                <span className="block my-12 rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl relative aspect-video">
                                    <Image 
                                        src={(props.src as string) || ''} 
                                        alt={(props.alt as string) || ''} 
                                        fill 
                                        className="w-full h-auto object-cover" 
                                    />
                                </span>
                            ),
                        }}
                    >
                        {language === 'ja' ? note.contentJa : note.contentEn}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}

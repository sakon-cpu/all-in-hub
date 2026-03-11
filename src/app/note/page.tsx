"use client";

import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Send, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const mockNotesJa = [
    {
        slug: "nexus-protocol-behind-the-scenes",
        title: "Behind the Scenes: The Nexus Protocol",
        excerpt: "私たちの最新のAI映画プロジェクト『The Nexus Protocol』の制作プロセスを。ワークフローの統合について解説します。",
        date: "2026.03.10",
        author: "ALL-IN AI チーム",
        category: "workflow"
    },
    {
        slug: "generative-sound-design",
        title: "ジェネレーティブ・サウンドデザインの未来",
        excerpt: "ニューラルネットワークを使用して、どのように明日のサウンドスケープを作成したか。",
        date: "2026.03.05",
        author: "音響ユニット",
        category: "tech"
    }
];

const mockNotesEn = [
    {
        slug: "nexus-protocol-behind-the-scenes",
        title: "Behind the Scenes: The Nexus Protocol",
        excerpt: "Exploring the workflow of our latest AI-driven cinematic project.",
        date: "2026.03.10",
        author: "ALL-IN AI Team",
        category: "workflow"
    },
    {
        slug: "generative-sound-design",
        title: "Future of Generative Sound Design",
        excerpt: "How we used neural networks to create the soundscapes of tomorrow.",
        date: "2026.03.05",
        author: "Sound Unit",
        category: "tech"
    }
];

export default function NotePage() {
    const { language, t } = useLanguage();
    const notes = language === 'ja' ? mockNotesJa : mockNotesEn;

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    {t.note.back}
                </Link>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                    {t.note.title} <span className="text-accent text-glow">{t.note.subtitle}</span>
                </h1>
                <p className="text-gray-400 text-lg">{t.note.desc}</p>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <Link key={note.slug} href={`/note/${note.slug}`}>
                            <div className="group relative flex flex-col h-full rounded-3xl glass p-8 transition-all duration-300 hover:glow-sm hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">
                                        {note.category.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono">{note.date}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                                    {note.title}
                                </h2>
                                <p className="text-gray-400 text-sm mb-8 flex-1 leading-relaxed">
                                    {note.excerpt}
                                </p>
                                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-400">{note.author}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

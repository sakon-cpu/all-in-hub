"use client";

import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-w-2xl mx-auto px-4">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    {t.contact.back}
                </Link>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                    {t.contact.title} <span className="text-accent text-glow">{t.contact.subtitle}</span>
                </h1>
                <p className="text-gray-400 text-lg mb-12">{t.contact.desc}</p>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.contact.labels.name}</label>
                            <input
                                type="text"
                                placeholder={t.contact.labels.name}
                                className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-accent/50 focus:glow-sm transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.contact.labels.email}</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-accent/50 focus:glow-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.contact.labels.subject}</label>
                        <select className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-accent/50 transition-all appearance-none">
                            {t.contact.subjects.map((s, idx) => (
                                <option key={idx}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.contact.labels.message}</label>
                        <textarea
                            rows={6}
                            placeholder={t.contact.labels.message}
                            className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-accent/50 focus:glow-sm transition-all resize-none"
                        />
                    </div>

                    <button className="w-full py-5 bg-white text-black rounded-2xl font-black hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 group">
                        {t.contact.button}
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    );
}

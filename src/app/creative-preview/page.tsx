"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, Film, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PreviewPage() {
    const { /* t */ } = useLanguage();
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem("temp_auth");
        setTimeout(() => {
            if (auth === "true") {
                setIsAuthenticated(true);
            }
        }, 0);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // ここではプラン通り allhero2026 を使用します
        if (password === "allhero2026") {
            setIsAuthenticated(true);
            localStorage.setItem("temp_auth", "true");
            setError("");
        } else {
            setError("パスワードが正しくありません。");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full glass p-10 rounded-3xl border border-white/10"
                >
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 border border-accent/30">
                            <Lock className="w-8 h-8 text-accent" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">CREATIVE PREVIEW</h1>
                        <p className="text-gray-400 text-sm font-medium">関係者専用アクセス</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="パスワードを入力"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-mono"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        
                        {error && <p className="text-accent text-xs font-bold text-center">{error}</p>}

                        <button 
                            type="submit"
                            className="w-full bg-accent text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-accent/20 uppercase tracking-widest"
                        >
                            アクセス
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 flex items-center justify-center">
            <div className="max-w-6xl w-full">
                <header className="mb-12 md:mb-20 text-center md:text-left">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors text-xs font-black uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" />
                        サイトトップへ
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
                        SELECT <br /> <span className="text-accent underline decoration-accent/30 underline-offset-8">PORTAL</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-bold italic leading-relaxed max-w-2xl">
                        ALLIN CINEMA関係者専用ポータル。閲覧、または管理のいずれかを選択してください。
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {/* HUB ACCESS */}
                    <Link href="/" className="group relative overflow-hidden p-1 bg-white/5 hover:bg-white/10 rounded-[2.5rem] transition-all duration-500 border border-white/5 hover:border-accent/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative p-10 md:p-14 h-full flex flex-col min-h-[400px]">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                                <Film className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">ALLIN CINEMA <br /><span className="text-accent">HUB</span></h2>
                            <p className="text-gray-400 font-bold text-lg mb-12 flex-1 leading-relaxed">
                                一般公開されている本番サイトの全ページを確認します。最新のアニメーションやビジュアル体験をチェック。
                            </p>
                            <div className="flex items-center gap-3 text-white font-black text-sm tracking-[0.2em] uppercase group-hover:gap-5 transition-all">
                                サイトを閲覧する <ArrowRight className="w-5 h-5 text-accent" />
                            </div>
                        </div>
                    </Link>

                    {/* ADMIN ACCESS */}
                    <Link href="/admin" className="group relative overflow-hidden p-1 bg-white/5 hover:bg-white/10 rounded-[2.5rem] transition-all duration-500 border border-white/5 hover:border-accent/30">
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative p-10 md:p-14 h-full flex flex-col min-h-[400px]">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-500">
                                <Shield className="w-8 h-8 text-white group-hover:text-black" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">PLATFORM <br /><span className="text-gray-400">ADMIN</span></h2>
                            <p className="text-gray-400 font-bold text-lg mb-12 flex-1 leading-relaxed">
                                作品、ニュース、制作ノートの投稿・管理。プラットフォームの全コンテンツをコントロール。
                            </p>
                            <div className="flex items-center gap-3 text-white font-black text-sm tracking-[0.2em] uppercase group-hover:gap-5 transition-all">
                                管理画面を開く <ArrowRight className="w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                    </Link>
                </div>

                <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black text-gray-600 tracking-[0.5em] uppercase">
                        Confidential Access · Internal Use Only
                    </p>
                    <div className="flex gap-6">
                        <Link href="/works" className="text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Quick View: Works</Link>
                        <Link href="/note" className="text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest">Quick View: Notes</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}

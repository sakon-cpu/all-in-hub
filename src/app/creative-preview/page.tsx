"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, Film, Newspaper, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PreviewPage() {
    const { t } = useLanguage();
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem("temp_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
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
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto pt-20">
                <header className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors text-xs font-black uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" />
                        HUBトップへ
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
                        PREVIEW <br /> <span className="text-accent">DASHBOARD</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-bold italic leading-relaxed">
                        社員メンバー限定の先行公開ページです。制作中の作品一覧やブログ記事を確認できます。
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link href="/works" className="group p-10 glass rounded-3xl border border-white/5 hover:border-accent/30 transition-all flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all">
                            <Film className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black mb-4 uppercase">WORKS ARCHIVE</h2>
                        <p className="text-gray-400 font-medium mb-8 flex-1">
                            これまでに制作した全作品のアーカイブ、および詳細情報を確認できます。
                        </p>
                        <div className="flex items-center gap-2 text-accent font-black text-xs tracking-[0.3em] uppercase group-hover:translate-x-2 transition-transform">
                            VIEW WORKS <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>

                    <Link href="/note" className="group p-10 glass rounded-3xl border border-white/5 hover:border-accent/30 transition-all flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all">
                            <Newspaper className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black mb-4 uppercase">BLOG & NOTES</h2>
                        <p className="text-gray-400 font-medium mb-8 flex-1">
                            制作の裏側や、AI技術に関する考察を綴った記事一覧を確認できます。
                        </p>
                        <div className="flex items-center gap-2 text-accent font-black text-xs tracking-[0.3em] uppercase group-hover:translate-x-2 transition-transform">
                            VIEW NOTES <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>

                <div className="mt-20 p-8 rounded-3xl border border-white/5 bg-white/5">
                    <h3 className="text-xs font-black text-gray-500 tracking-[0.5em] uppercase mb-4">Sharing Info</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                        このページおよび各詳細ページは、URLを直接知っているメンバーのみが閲覧することを想定しています。<br />
                        共有する際は、このURL（`/creative-preview`）とパスワード（`allhero2026`）をセットで伝えてください。
                    </p>
                </div>
            </div>
        </div>
    );
}

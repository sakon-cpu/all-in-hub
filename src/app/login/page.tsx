"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage();
    const from = searchParams.get('from') || '/';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push(from);
                router.refresh();
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] animate-pulse transition-all duration-5000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass border-white/5 p-12 rounded-3xl shadow-2xl">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 mb-6 group transition-all duration-500 hover:glow-sm hover:border-accent">
                            <Shield className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-widest uppercase mb-4 italic">
                            {t.auth.title}
                        </h1>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed italic">
                            {t.auth.desc}
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t.auth.password_placeholder}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-bold"
                                required
                                autoFocus
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-accent text-xs font-black uppercase text-center tracking-widest"
                            >
                                {t.auth.error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-accent hover:bg-white hover:text-black text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,0,0,0.3)] disabled:opacity-50 group"
                        >
                            {loading ? "AUTHENTICATING..." : t.auth.login_button}
                            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="mt-10 text-[9px] text-gray-600 uppercase tracking-widest text-center italic">
                        {t.auth.hint}
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <span className="text-[10px] font-black text-gray-500 tracking-[0.5em] uppercase italic">
                        Powered by ALL CINEMA HUB
                    </span>
                </div>
            </motion.div>
        </div>
    );
}

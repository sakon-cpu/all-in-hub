"use client";

import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

export default function NoteDetailPage({ params }: { params: { slug: string } }) {
    const { t, language } = useLanguage();
    const { slug } = React.use(params as any) as any;

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
                            WORKFLOW
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                            <Clock className="w-3 h-3" />
                            5 {t.note.read_time}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                        Behind the Scenes: <br />The Nexus Protocol
                    </h1>
                    <div className="flex items-center justify-between py-6 border-y border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">ALL-IN AI Team</div>
                                <div className="text-xs text-gray-500 font-mono">{t.note.published} Mar 10, 2026</div>
                            </div>
                        </div>
                        <button className="p-3 rounded-full glass hover:bg-white/5 transition-colors">
                            <Share2 className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </header>

                <div className="prose prose-invert prose-lg max-w-none">
                    {language === 'ja' ? (
                        <>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                私たちの最新のAI映画プロジェクト『The Nexus Protocol』の制作プロセスを一部公開します。
                                今回のプロジェクトでは、従来の映画制作ワークフローに最新の生成AIをシームレスに統合することに挑戦しました。
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. AIによるコンセプトの可視化</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                脚本の初期段階から、Stable DiffusionやMidjourneyを使用して、監督が想起するビジュアルを即座に生成しました。
                                これにより、スタッフ間のイメージ共有がかつてないほどスムーズになりました。
                            </p>

                            <div className="my-12 p-8 rounded-3xl glass border-accent/20 bg-accent/5">
                                <h3 className="text-xl font-bold text-accent mb-4">💡 AI テクノロジーのヒント</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    プロンプトエンジニアリングだけでなく、ControlNetを活用することで、構図の意図を正確にAIに伝えることが、シネマティックな出力を得る鍵となります。
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                We are excited to share a glimpse into the production process of our latest AI film project, "The Nexus Protocol."
                                In this project, we challenged ourselves to seamlessly integrate the latest generative AI into traditional filmmaking workflows.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Concept Visualization via AI</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                From the early stages of scriptwriting, we used Stable Diffusion and Midjourney to instantly generate visuals conceived by the director.
                                This facilitated unprecedented smootheness in image sharing among the staff.
                            </p>

                            <div className="my-12 p-8 rounded-3xl glass border-accent/20 bg-accent/5">
                                <h3 className="text-xl font-bold text-accent mb-4">💡 AI Tech Tip</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Beyond just prompt engineering, leveraging ControlNet to accurately convey compositional intent to the AI is the key to achieving cinematic output.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </article>
        </div>
    );
}

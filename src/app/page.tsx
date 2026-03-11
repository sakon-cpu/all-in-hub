"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import {
  Twitter as X,
  Instagram,
  Send,
  Newspaper,
  Info,
  Play,
  ArrowUpRight,
  ChevronRight,
  Globe,
  Youtube,
  Calendar,
  Bell,
  ExternalLink,
  Sparkles,
  Users
} from "lucide-react";
import Link from "next/link";
import { handleSnsClick } from "@/lib/sns";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState, useEffect } from "react";

const mockAiNews = [
  {
    title: "OpenAI's Sora 2 Powers Bing Video Creator (Mar 5, 2026)",
    url: "https://www.neowin.net"
  },
  {
    title: "Netflix Acquires InterPositive AI Filmmaking Tech (Mar 8, 2026)",
    url: "https://www.weareiowa.com"
  },
  {
    title: "Higgsfield Cinema Studio 2.0 Launches (Mar 2026)",
    url: "https://www.youtube.com"
  },
  {
    title: "Academy Awards Maintains Neutral Stance on Generative AI",
    url: "https://www.enca.com"
  }
];

const mockSiteNewsJa = [
  { id: 1, date: "2026.03.11", title: "新作「ネオ歌舞伎町2126」を公開。30名のパートナークリエイターが参画しました。", type: "info" },
  { id: 2, date: "2026.03.05", title: "制作ノート#11：サウンドデザインの自動化について更新。", type: "update" },
  { id: 3, date: "2026.02.28", title: "ALL CINEMAクリエイター募集要項を改訂しました。", type: "recruit" }
];

const mockSiteNewsEn = [
  { id: 1, date: "2026.03.11", title: "New release: 'NEO KABUKICHO 2126'. 30 partner creators joined.", type: "info" },
  { id: 2, date: "2026.03.05", title: "Production Note #11: Automation in Sound Design.", type: "update" },
  { id: 3, date: "2026.02.28", title: "Updated guidelines for ALL CINEMA Creator applications.", type: "recruit" }
];

const mockWorksJa = [
  {
    id: 1,
    no: "01",
    title: "ネオ歌舞伎町2126",
    synopsis: "AIと人間が共創する未来の物語。記憶の境界線を探る実験的短編。",
    date: "2026.03.10",
    thumbnail: "/nexus_protocol_thumb.png",
    youtubeId: "placeholder"
  },
  {
    id: 3,
    no: "03",
    title: "電脳の境界線：フロンティア",
    synopsis: "大手テック企業とのコラボレーション。マインドアップロードの法理を問う。",
    date: "2026.03.15",
    thumbnail: "/corporate_work_1.png",
    youtubeId: "placeholder"
  },
  {
    id: 4,
    no: "04",
    title: "起源のサイバネティクス",
    synopsis: "金融都市シブヤを舞台に、意思を持つアルゴリズムが均衡を破る。",
    date: "2026.04.01",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 5,
    no: "05",
    title: "Neon Pulse: 感情の残滓",
    synopsis: "次世代ファッションブランドとのタイアップ。感情を纏う服の物語。",
    date: "2026.04.20",
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 6,
    no: "06",
    title: "シリコン・ソウル：自律の旅",
    synopsis: "自動運転車が知覚した一瞬の愛。モビリティの未来を描く。",
    date: "2026.05.05",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 7,
    no: "07",
    title: "グローバル・ネクサス",
    synopsis: "AIが管理する物流ネットワークの先にあった、忘れられた村の物語。",
    date: "2026.05.25",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 8,
    no: "08",
    title: "再生の脈動：プラネット・コア",
    synopsis: "エネルギーソリューション企業提携。地球再生を誓うAIの視点。",
    date: "2026.06.10",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop",
    youtubeId: "placeholder"
  }
];

const mockWorksEn = [
  {
    id: 1,
    no: "01",
    title: "NEO KABUKICHO 2126",
    synopsis: "A story of a future co-created by AI and humans. An experimental short exploring memory boundaries.",
    date: "2026.03.10",
    thumbnail: "/nexus_protocol_thumb.png",
    youtubeId: "placeholder"
  },
  {
    id: 3,
    no: "03",
    title: "Digital Frontier",
    synopsis: "Collaboration with Tech Corp. Questioning the ethics of mind uploading.",
    date: "2026.03.15",
    thumbnail: "/corporate_work_1.png",
    youtubeId: "placeholder"
  },
  {
    id: 4,
    no: "04",
    title: "Cyber Genesis",
    synopsis: "An algorithm with a will breaks the balance in the financial city of Shibuya.",
    date: "2026.04.01",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 5,
    no: "05",
    title: "Neon Pulse",
    synopsis: "Tie-up with a next-gen fashion brand. A story of clothing that wears emotions.",
    date: "2026.04.20",
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 6,
    no: "06",
    title: "Silicon Soul",
    synopsis: "A fleeting moment of love perceived by an autonomous vehicle. Mapping the future of mobility.",
    date: "2026.05.05",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 7,
    no: "07",
    title: "Global Nexus",
    synopsis: "Beyond the AI-managed logistics network, a story of a forgotten village.",
    date: "2026.05.25",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: 8,
    no: "08",
    title: "Eco Pulse",
    synopsis: "Partnered with Energy Solutions. The perspective of an AI committed to planetary restoration.",
    date: "2026.06.10",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop",
    youtubeId: "placeholder"
  }
];

const Nav = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group relative">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-accent/80 tracking-[0.3em] uppercase leading-none mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {language === 'ja' ? 'オールシネマ' : 'ALL CINEMA'}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-3xl font-black text-white leading-none tracking-tighter uppercase">
                <span className="text-accent inline-block scale-125 origin-bottom relative top-[-1px] not-italic mr-1">A</span>LL CINEMA
              </span>
            </div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-xs font-black text-white transition-colors hover:text-accent uppercase tracking-widest">{t.nav.hub}</Link>
          <Link href="/works" className="text-xs font-black text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{t.nav.works}</Link>
          <Link href="/note" className="text-xs font-black text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{t.nav.note}</Link>
          <Link href="/creator" className="text-xs font-black text-white hover:text-accent transition-all px-5 py-2 rounded-full border border-accent/30 hover:border-accent bg-accent/5 uppercase tracking-widest">
            {t.nav.creator}
          </Link>

          <button
            onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
            className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-1.5 bg-white/5"
          >
            <Globe className="w-3 h-3" />
            {language === 'ja' ? 'EN' : 'JP'}
          </button>
        </div>
        <button
          onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
          className="md:hidden text-gray-400 hover:text-white border border-white/10 rounded-full p-2"
        >
          <Globe className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="w-full py-20 border-t border-white/5 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-black text-4xl tracking-tighter text-white uppercase">
            <span className="text-accent not-italic">A</span>LL CINEMA
          </span>
          <p className="text-sm text-gray-500 font-medium max-w-xs">{t.home.footer_copy}</p>
        </div>
        <div className="flex gap-10">
          <button onClick={() => handleSnsClick('x', 'allin_inc')} className="hover:text-accent transition-all scale-100 hover:scale-110 cursor-pointer text-gray-400"><X className="w-7 h-7" /></button>
          <button onClick={() => handleSnsClick('instagram', 'allin_inc')} className="hover:text-accent transition-all scale-100 hover:scale-110 cursor-pointer text-gray-400"><Instagram className="w-7 h-7" /></button>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const { t, language } = useLanguage();
  const works = language === 'ja' ? mockWorksJa : mockWorksEn;
  const siteNews = language === 'ja' ? mockSiteNewsJa : mockSiteNewsEn;

  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const videoFiles = [
    { src: "/hero-background.mp4", start: 0 },
    { src: "/drone-neokabukicho.mp4", start: 1 } // Skip first second as per user request
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden" ref={containerRef}>
      <Nav />

      {/* Dynamic Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Seamless Video Loop with Cross-fade */}
        <motion.div
          style={{ y: videoY }}
          className="absolute inset-0 z-0 bg-black"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={() => setActiveVideo((prev) => (prev + 1) % videoFiles.length)}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  if (activeVideo === 1) video.currentTime = 1;
                }}
                className="w-full h-full object-cover scale-110"
              >
                <source src={videoFiles[activeVideo].src} type="video/mp4" />
              </video>
            </motion.div>
          </AnimatePresence>

          {/* Lightened overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[0px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left w-full pt-20"
        >
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-accent text-xs font-black tracking-[0.5em] uppercase border-b border-accent/30 inline-block w-fit pb-1 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {language === 'ja' ? 'オールシネマ' : 'ALL CINEMA'}
            </span>
            <h1 className="text-5xl md:text-[10rem] font-black text-white tracking-tighter leading-[1.2] md:leading-[1.1] uppercase group drop-shadow-2xl py-8">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                {t.home.hero_title_1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-accent text-glow block md:inline"
              >
                {t.home.hero_title_2}
              </motion.span>
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white text-lg md:text-3xl max-w-3xl leading-relaxed font-bold mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            {t.home.hero_desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 justify-center md:justify-start mb-20"
          >
            <Link href="/works" className="px-12 py-6 bg-accent text-white rounded-full font-black text-xl hover:scale-105 hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(255,0,0,0.5)] uppercase tracking-widest inline-flex items-center justify-center min-h-[4rem]">
              {t.home.view_all_works}
            </Link>
            <button className="flex items-center gap-4 text-white font-black hover:text-accent transition-colors group uppercase tracking-widest text-lg">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                <Play className="w-6 h-6 fill-current" />
              </div>
              Showreel 2026
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_15px_#ff0000]" />
          </div>
        </motion.div>
      </section>

      <main className="relative z-20 pt-20 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <BentoGrid className="mb-32">
            {/* Main Featured Movie Card */}
            <BentoCard
              className="md:col-span-3 md:row-span-2 group/hero border-white/5"
              onClick={() => window.location.href = '/works'}
              noPadding
            >
              <div className="relative w-full h-full min-h-[500px] overflow-hidden">
                <img
                  src="/nexus_protocol_thumb.png"
                  alt="Featured Work"
                  className="absolute inset-0 w-full h-full object-cover group-hover/hero:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-12 w-full z-20">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_15px_#ff0000]" />
                    <span className="text-accent text-sm font-black tracking-[0.5em] uppercase drop-shadow-lg">
                      {t.home.featured}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter text-glow leading-[1.1] uppercase drop-shadow-2xl">
                    ネオ歌舞伎町 <br /> 2126
                  </h2>
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full font-black hover:bg-accent hover:text-white transition-all shadow-2xl hover:shadow-accent/40 group/btn uppercase tracking-widest text-xs">
                      <Play className="w-5 h-5 fill-current group-hover/btn:scale-110 transition-transform" />
                      {t.home.play_trailer}
                    </button>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Site News Board */}
            <BentoCard
              className="md:col-span-1 md:row-span-2 bg-neutral-950/40 p-8 flex flex-col border-white/5 overflow-hidden"
              title={t.home.site_news_title}
              icon={<Bell className="w-6 h-6 text-accent" />}
            >
              <div className="mt-6 flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                {siteNews.map((news) => (
                  <div key={news.id} className="group/news border-b border-white/5 pb-6 last:border-0 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{news.date}</span>
                      <span className="text-[8px] uppercase font-black text-accent border border-accent/20 px-2 py-0.5 rounded tracking-[0.2em]">{news.type}</span>
                    </div>
                    <p className="text-base font-bold text-gray-300 group-hover/news:text-white transition-colors leading-relaxed line-clamp-2">
                      {news.title}
                    </p>
                  </div>
                ))}
                <div className="mt-auto pt-4">
                  <Link href="#" className="text-[11px] font-black uppercase text-gray-500 hover:text-accent transition-colors flex items-center gap-2 tracking-[0.3em]">
                    View Archives <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </BentoCard>

            {/* Featured Creators Card */}
            <BentoCard
              className="md:col-span-2 md:row-span-1 border-white/5 bg-neutral-900/40 p-10 border border-white/10 group/creators"
              onClick={() => window.location.href = '/creator'}
              title={t.home.partners_title}
              icon={<Users className="w-6 h-6 text-accent" />}
            >
              <div className="mt-8 flex items-center justify-between">
                <div className="space-y-4">
                  <span className="text-4xl md:text-7xl font-black text-white tracking-tighter group-hover/creators:text-accent transition-colors block py-6 px-1">
                    {t.home.partners_count}
                  </span>
                  <p className="text-gray-400 font-bold">{t.home.partners_desc}</p>
                </div>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black glass overflow-hidden translate-y-4 group-hover/creators:translate-y-0 transition-transform">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            <Link href="/note" className="md:col-span-1 md:row-span-1">
              <BentoCard
                className="h-full flex flex-col justify-center border-white/5 group"
                title={t.home.note_title}
                description={t.home.note_desc}
                icon={<Newspaper className="w-6 h-6 text-white" />}
              >
                <div className="mt-8 flex items-center justify-end">
                  <div className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:bg-accent transition-all group-hover:border-accent group-hover:glow-sm text-white text-glow">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                </div>
              </BentoCard>
            </Link>

            <Link href="/creator" className="md:col-span-1 md:row-span-1">
              <BentoCard
                className="h-full flex flex-col justify-center border-white/5 group"
                title={t.home.creator_title}
                description={t.home.creator_desc}
                icon={<Users className="w-6 h-6 text-white" />}
              >
                <div className="mt-8 flex items-center justify-end">
                  <div className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:bg-accent transition-all group-hover:border-accent group-hover:glow-sm text-white text-glow">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                </div>
              </BentoCard>
            </Link>
          </BentoGrid>

          {/* WORKS COLLECTION Section */}
          <section className="mb-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-[6rem] font-black text-white tracking-tighter uppercase leading-[1.2] py-6 px-1">
                  {t.home.latest_works}
                </h2>
                <div className="h-2 w-32 bg-accent rounded-full shadow-[0_0_20px_rgba(255,0,0,0.8)]" />
              </div>
              <Link href="/works" className="group text-accent text-xl font-black flex items-center gap-3 hover:glow-sm transition-all uppercase tracking-[0.3em]">
                {t.home.view_all_works}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {works.map((work) => (
                <div key={work.id} className="group flex flex-col rounded-2xl overflow-hidden glass border-white/5 transition-all hover:glow-md hover:border-accent/10">
                  <Link href="/works" className="relative aspect-video overflow-hidden">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-[3px]">
                      <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-700">
                        <Play className="w-10 h-10 fill-current translate-x-1" />
                      </div>
                    </div>
                  </Link>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20 tracking-[0.2em] uppercase">
                        {work.no}
                      </span>
                      <span className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                        <Calendar className="w-4 h-4 text-accent/50" />
                        {work.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-accent transition-colors leading-[1.3] uppercase py-2 px-1">
                      {work.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed font-medium line-clamp-3">
                      {work.synopsis}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black italic">ALL CINEMA</span>
                      <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:scale-125 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Join Us CTA */}
          <section className="mt-40 grid md:grid-cols-2 gap-12 bg-neutral-950/40 rounded-3xl p-12 md:p-24 border border-white/5 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase py-8 px-1">
                READY TO <br /> <span className="text-accent underline decoration-accent/30">JOIN THE HUB?</span>
              </h2>
              <p className="text-xl text-gray-400 font-bold leading-relaxed">
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
                    <h4 className="font-black text-lg text-white mb-2 uppercase tracking-tighter">{benefit.title}</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

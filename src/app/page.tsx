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

  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [works, setWorks] = useState<any[]>([]);
  const [siteNews, setSiteNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [worksRes, newsRes] = await Promise.all([
          fetch('/api/works'),
          fetch('/api/news')
        ]);
        if (worksRes.ok && newsRes.ok) {
          setWorks(await worksRes.json());
          setSiteNews(await newsRes.json());
        }
      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
            <BentoCard
              className="row-span-2 md:col-span-3 md:row-span-2 group/hero border-white/5"
              onClick={() => window.location.href = '/works'}
              noPadding
            >
              <div className="relative w-full h-full min-h-[350px] flex flex-col justify-end overflow-hidden">
                <img
                  src="/nexus_protocol_thumb.png"
                  alt="Featured Work"
                  className="absolute inset-0 w-full h-full object-cover group-hover/hero:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                <div className="relative z-20 p-6 md:p-10 w-full mt-auto">
                  <div className="flex items-center gap-3 mb-3 md:mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_15px_#ff0000]" />
                    <span className="text-accent text-xs md:text-sm font-black tracking-[0.5em] uppercase drop-shadow-lg">
                      {t.home.featured}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-7xl font-black text-white mb-6 md:mb-10 tracking-tighter text-glow leading-[1.1] uppercase drop-shadow-2xl">
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
              className="md:col-span-1 md:row-span-3 bg-neutral-950/40 flex flex-col border-white/5 overflow-hidden"
              title={t.home.site_news_title}
              icon={<Bell className="w-6 h-6 text-accent" />}
              onClick={() => window.location.href = '/news'}
            >
              <div className="mt-6 flex-1 hidden md:flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                {siteNews.slice(0, 8).map((news) => (
                  <Link href={`/news/${news.id}`} key={news.id} className="group/news border-b border-white/5 pb-6 last:border-0 cursor-pointer block">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{news.date}</span>
                      <span className="text-[8px] uppercase font-black text-accent border border-accent/20 px-2 py-0.5 rounded tracking-[0.2em]">{news.type}</span>
                    </div>
                    <p className="text-base font-bold text-gray-300 group-hover/news:text-white transition-colors leading-relaxed line-clamp-2">
                      {language === 'ja' ? news.titleJa : news.titleEn}
                    </p>
                  </Link>
                ))}
                <div className="mt-auto pt-4">
                  <Link href="/news" className="text-[11px] font-black uppercase text-gray-500 hover:text-accent transition-colors flex items-center gap-2 tracking-[0.3em]">
                    View Archives <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </BentoCard>

            {/* Featured Creators Card */}
            <BentoCard
              className="md:col-span-2 md:row-span-1 border-white/5 bg-neutral-900/40 group/creators"
              onClick={() => window.location.href = '/creator'}
              title={t.home.partners_title}
              icon={<Users className="w-6 h-6 text-accent" />}
            />

            <Link href="/note" className="md:col-span-1 md:row-span-1">
              <BentoCard
                className="h-full flex flex-col justify-center border-white/5 group"
                title={t.home.note_title}
                description={t.home.note_desc}
                icon={<Newspaper className="w-6 h-6 text-white" />}
              />
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
              {works.slice(0, 4).map((work) => (
                <div 
                  key={work.id} 
                  className="group flex flex-col rounded-2xl overflow-hidden glass border-white/5 transition-all hover:glow-md hover:border-accent/10 cursor-pointer"
                  onClick={() => {
                    if (work.youtubeId) {
                      // Extract ID from full URL if needed
                      let id = work.youtubeId;
                      if (id.includes('v=')) id = id.split('v=')[1].split('&')[0];
                      else if (id.includes('youtu.be/')) id = id.split('youtu.be/')[1].split('?')[0];
                      setSelectedVideo(id);
                    } else {
                      window.location.href = '/works';
                    }
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={work.thumbnail}
                      alt={language === 'ja' ? work.titleJa : work.titleEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-[3px]">
                      <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-700">
                        <Play className="w-10 h-10 fill-current translate-x-1" />
                      </div>
                    </div>
                  </div>
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
                      {language === 'ja' ? work.titleJa : work.titleEn}
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed font-medium line-clamp-3">
                      {language === 'ja' ? work.synopsisJa : work.synopsisEn}
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

        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.3)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

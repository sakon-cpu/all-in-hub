import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';

// --- Types ---
interface Work {
    id: string;
    no: string;
    titleJa: string;
    titleEn: string;
    synopsisJa: string;
    synopsisEn: string;
    thumbnail: string;
    date: string;
    youtubeId?: string;
}

interface NewsItem {
    id: string;
    date: string;
    titleJa: string;
    titleEn: string;
    type: 'info' | 'update' | 'recruit';
}

interface Note {
    id: string;
    slug: string;
    titleJa: string;
    titleEn: string;
    excerptJa: string;
    excerptEn: string;
    contentJa: string;
    contentEn: string;
    author: string;
    category: string;
    date: string;
}

// --- Config ---
const url = "https://moved-octopus-67849.upstash.io";
const token = "gQAAAAAAAQkJAAIncDFhYTI2ODE0YWY2Zjg0ZDBmODI5M2RiMDgxYzhkMDEzNXAxNjc4NDk";
const redis = new Redis({ url, token });

// --- Data extracted from initial commit ---

const works: Work[] = [
  {
    id: nanoid(),
    no: "01",
    titleJa: "ネオ歌舞伎町2126",
    titleEn: "NEO KABUKICHO 2126",
    synopsisJa: "AIと人間が共創する未来の物語。記憶の境界線を探る実験的短編。",
    synopsisEn: "A story of a future co-created by AI and humans. An experimental short exploring memory boundaries.",
    date: "2026.03.10",
    thumbnail: "/nexus_protocol_thumb.png",
    youtubeId: "placeholder"
  },
  {
    id: nanoid(),
    no: "03",
    titleJa: "電脳の境界線：フロンティア",
    titleEn: "Digital Frontier",
    synopsisJa: "大手テック企業とのコラボレーション。マインドアップロードの法理を問う。",
    synopsisEn: "Collaboration with Tech Corp. Questioning the ethics of mind uploading.",
    date: "2026.03.15",
    thumbnail: "/corporate_work_1.png",
    youtubeId: "placeholder"
  },
  {
    id: nanoid(),
    no: "04",
    titleJa: "起源のサイバネティクス",
    titleEn: "Cyber Genesis",
    synopsisJa: "金融都市シブヤを舞台に、意思を持つアルゴリズムが均衡を破る。",
    synopsisEn: "An algorithm with a will breaks the balance in the financial city of Shibuya.",
    date: "2026.04.01",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: nanoid(),
    no: "05",
    titleJa: "Neon Pulse: 感情の残滓",
    titleEn: "Neon Pulse: Echoes",
    synopsisJa: "次世代ファッションブランドとのタイアップ。感情を纏う服の物語。",
    synopsisEn: "Tie-up with next-gen fashion brand. A story of clothes that wear emotions.",
    date: "2026.04.20",
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: nanoid(),
    no: "06",
    titleJa: "シリコン・ソウル：自律の旅",
    titleEn: "Silicon Soul",
    synopsisJa: "自動運転車が知覚した一瞬の愛。モビリティの未来を描く。",
    synopsisEn: "A moment of love perceived by an autonomous car. Drawing the future of mobility.",
    date: "2026.05.05",
    thumbnail: "https://images.unsplash.com/photo-1555624443-42284e3146d2?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: nanoid(),
    no: "07",
    titleJa: "ビットの深淵",
    titleEn: "Void in Bits",
    synopsisJa: "VR空間での葬送。遺されたデジタル遺産と意識の行方。",
    synopsisEn: "Funerals in VR space. Digital legacy and where consciousness goes.",
    date: "2026.05.25",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
    youtubeId: "placeholder"
  },
  {
    id: nanoid(),
    no: "08",
    titleJa: "Eco Pulse",
    titleEn: "Eco Pulse",
    synopsisJa: "エネルギーソリューション企業提携。地球再建に向けたAIの視点。",
    synopsisEn: "Partnered with Energy Solutions. The perspective of an AI committed to planetary restoration.",
    date: "2026.06.10",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop",
    youtubeId: "placeholder"
  }
];

const news: NewsItem[] = [
    { id: nanoid(), date: "2026.03.11", titleJa: "新作「ネオ歌舞伎町2126」を公開。30名のパートナークリエイターが参画しました。", titleEn: "New release: 'NEO KABUKICHO 2126'. 30 partner creators joined.", type: "info" },
    { id: nanoid(), date: "2026.03.05", titleJa: "制作ノート#11：サウンドデザインの自動化について更新。", titleEn: "Production Note #11: Automation in Sound Design.", type: "update" },
    { id: nanoid(), date: "2026.02.28", titleJa: "ALL CINEMAクリエイター募集要項を改訂しました。", titleEn: "Updated guidelines for ALL CINEMA Creator applications.", type: "recruit" }
];

const notes: Note[] = [
    {
        id: nanoid(),
        slug: "nexus-protocol-behind-the-scenes",
        titleJa: "制作の舞台裏：The Nexus Protocol",
        titleEn: "Behind the Scenes: The Nexus Protocol",
        excerptJa: "最新のAI駆動型シネマプロジェクトのワークフローを探ります。",
        excerptEn: "Exploring the workflow of our latest AI-driven cinematic project.",
        contentJa: "# 制作の舞台裏\n\nAIを活用した新しい映像制作のワークフローについて解説します。",
        contentEn: "# Behind the Scenes\n\nExplaining the new workflow of filmmaking with AI.",
        date: "2026.03.10",
        author: "ALL-IN AI Team",
        category: "workflow"
    },
    {
        id: nanoid(),
        slug: "generative-sound-design",
        titleJa: "生成サウンドデザインの未来",
        titleEn: "Future of Generative Sound Design",
        excerptJa: "ニューラルネットワークを使用して、どのように明日のサウンドスケープを作成したか。",
        excerptEn: "How we used neural networks to create the soundscapes of tomorrow.",
        contentJa: "# 生成サウンドデザイン\n\n音響制作におけるAIの活用事例を紹介します。",
        contentEn: "# Generative Sound Design\n\nIntroducing AI use cases in sound production.",
        date: "2026.03.05",
        author: "音響ユニット",
        category: "tech"
    }
];

async function sync() {
    console.log("🚀 Syncing data to Upstash Redis...");
    await redis.set('works', works);
    await redis.set('news', news);
    await redis.set('notes', notes);
    console.log("✅ Sync complete!");
}

sync().catch(console.error);

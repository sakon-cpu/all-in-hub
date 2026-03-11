import { NextResponse } from 'next/server';
import { setWorks, setNews, setNotes } from '@/lib/kv';
import { nanoid } from 'nanoid';

// Run once to seed the initial data into Redis
export async function POST() {
    try {
        await setWorks([
            { id: nanoid(), no: '01', titleJa: 'ネオ歌舞伎町2126', titleEn: 'NEO KABUKICHO 2126', synopsisJa: 'AIと人間が共創する未来の物語。記憶の境界線を探る実験的短編。', synopsisEn: 'A story co-created by AI and humans. An experimental short exploring memory boundaries.', thumbnail: '/nexus_protocol_thumb.png', date: '2026.03.10', youtubeId: 'placeholder' },
            { id: nanoid(), no: '03', titleJa: '電脳の境界線：フロンティア', titleEn: 'Digital Frontier', synopsisJa: '大手テック企業とのコラボレーション。マインドアップロードの法理を問う。', synopsisEn: 'Collaboration with Tech Corp. Questioning the ethics of mind uploading.', thumbnail: '/corporate_work_1.png', date: '2026.03.15', youtubeId: 'placeholder' },
            { id: nanoid(), no: '04', titleJa: '起源のサイバネティクス', titleEn: 'Cyber Genesis', synopsisJa: '金融都市シブヤを舞台に、意思を持つアルゴリズムが均衡を破る。', synopsisEn: 'An algorithm with a will breaks the balance in the financial city of Shibuya.', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', date: '2026.04.01', youtubeId: 'placeholder' },
            { id: nanoid(), no: '05', titleJa: 'Neon Pulse: 感情の残滓', titleEn: 'Neon Pulse', synopsisJa: '次世代ファッションブランドとのタイアップ。感情を纏う服の物語。', synopsisEn: 'Tie-up with a next-gen fashion brand. A story of clothing that wears emotions.', thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop', date: '2026.04.20', youtubeId: 'placeholder' },
        ]);

        await setNews([
            { id: nanoid(), date: '2026.03.11', titleJa: "新作「ネオ歌舞伎町2126」を公開。30名のパートナークリエイターが参画しました。", titleEn: "New release: 'NEO KABUKICHO 2126'. 30 partner creators joined.", type: 'info' },
            { id: nanoid(), date: '2026.03.05', titleJa: '制作ノート#11：サウンドデザインの自動化について更新。', titleEn: 'Production Note #11: Automation in Sound Design.', type: 'update' },
            { id: nanoid(), date: '2026.02.28', titleJa: 'ALL CINEMAクリエイター募集要項を改訂しました。', titleEn: 'Updated guidelines for ALL CINEMA Creator applications.', type: 'recruit' },
        ]);

        await setNotes([
            { id: nanoid(), slug: 'nexus-protocol-behind-the-scenes', titleJa: 'Behind the Scenes: The Nexus Protocol', titleEn: 'Behind the Scenes: The Nexus Protocol', excerptJa: '私たちの最新のAI映画プロジェクトの制作プロセスを解説します。', excerptEn: 'Exploring the workflow of our latest AI-driven cinematic project.', contentJa: '## 制作について\n\nここに本文が入ります。', contentEn: '## About Production\n\nContent goes here.', author: 'ALL-IN AI チーム', category: 'workflow', date: '2026.03.10' },
            { id: nanoid(), slug: 'generative-sound-design', titleJa: 'ジェネレーティブ・サウンドデザインの未来', titleEn: 'Future of Generative Sound Design', excerptJa: 'ニューラルネットワークを使用して、どのように明日のサウンドスケープを作成したか。', excerptEn: 'How we used neural networks to create the soundscapes of tomorrow.', contentJa: '## サウンドデザインについて\n\nここに本文が入ります。', contentEn: '## About Sound Design\n\nContent goes here.', author: '音響ユニット', category: 'tech', date: '2026.03.05' },
        ]);

        return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

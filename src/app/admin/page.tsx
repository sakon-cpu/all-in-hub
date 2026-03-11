"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Shield, LogOut, Film, Newspaper, BookOpen, X, Save, ChevronRight, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Work, NewsItem, Note } from '@/lib/types';

type Tab = 'works' | 'news' | 'notes';

// ---- Generic Modal ----
function Modal({ title, onClose, onSave, children }: { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl glass border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">{title}</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">{children}</div>
                <div className="flex gap-4 mt-8">
                    <button onClick={onSave} className="flex-1 py-4 bg-accent text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"><Save className="w-5 h-5" />保存</button>
                    <button onClick={onClose} className="px-8 py-4 border border-white/10 rounded-2xl font-black text-gray-400 hover:text-white transition-colors">キャンセル</button>
                </div>
            </motion.div>
        </div>
    );
}

function Field({ label, value, onChange, multiline = false, placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string }) {
    const handleInsert = (text: string) => {
        onChange(value + text);
    };

    return (
        <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{label}</label>
            {multiline && <MarkdownToolbar onInsert={handleInsert} />}
            {multiline
                ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={8} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-all font-medium text-sm resize-y" />
                : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-all font-medium text-sm" />}
        </div>
    );
}

function MarkdownToolbar({ onInsert }: { onInsert: (text: string) => void }) {
    const handleImage = () => {
        const url = prompt("Googleドライブの共有リンク（または画像のURL）を入力してください:");
        if (!url) return;

        let fileId = "";
        const matchFileD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

        if (matchFileD) {
            fileId = matchFileD[1];
        } else if (matchId) {
            fileId = matchId[1];
        }

        if (fileId) {
            const embedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            onInsert(`\n\n![Drive Image](${embedUrl})\n\n`);
        } else if (url.startsWith('http')) {
            onInsert(`\n\n![Image](${url})\n\n`);
        } else {
            alert("有効なURLが認識できませんでした。");
        }
    };

    const handleVideo = () => {
        const url = prompt("YouTubeのURLを入力してください:");
        if (!url) return;

        let embedUrl = url;
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        const iframe = `\n\n<div style="width: 100%; aspect-ratio: 16/9; margin: 2rem 0; border-radius: 1rem; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);"><iframe src="${embedUrl}" title="YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; preserve-pitch; picture-in-picture" allowfullscreen style="width: 100%; height: 100%;"></iframe></div>\n\n`;
        onInsert(iframe);
    };

    return (
        <div className="flex items-center gap-2 mb-2 p-1.5 bg-black/50 rounded-lg w-max border border-white/10 backdrop-blur-md">
            <button type="button" onClick={handleImage} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white" title="写真をアップロード">
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest">写真</span>
            </button>
            <div className="w-[1px] h-4 bg-white/10" />
            <button type="button" onClick={handleVideo} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white" title="YouTube動画を埋め込む">
                <Film className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest">動画</span>
            </button>
        </div>
    );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
    return (
        <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{label}</label>
            <select value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-all font-medium text-sm">
                {options.map(o => <option key={o.value} value={o.value} className="bg-neutral-900">{o.label}</option>)}
            </select>
        </div>
    );
}

// ---- Works Tab ----
function WorksTab() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Work | null>(null);
    const [isNew, setIsNew] = useState(false);

    const emptyWork: Omit<Work, 'id'> = { no: '', titleJa: '', titleEn: '', synopsisJa: '', synopsisEn: '', thumbnail: '', date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') };

    const load = useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/works');
        setWorks(await res.json());
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);

    const save = async () => {
        if (!editing) return;
        if (isNew) {
            await fetch('/api/works', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        } else {
            await fetch(`/api/works/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        }
        setEditing(null);
        load();
    };

    const del = async (id: string) => {
        if (!confirm('この作品を削除しますか？')) return;
        await fetch(`/api/works/${id}`, { method: 'DELETE' });
        load();
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={() => { setEditing({ id: '', ...emptyWork }); setIsNew(true); }} className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" />作品を追加
                </button>
            </div>
            {loading ? <div className="text-gray-500 text-center py-20">読み込み中...</div> : (
                <div className="space-y-3">
                    {works.map(w => (
                        <div key={w.id} className="flex items-center gap-4 glass border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                            <img src={w.thumbnail} alt={w.titleJa} className="w-16 h-10 object-cover rounded-xl flex-shrink-0 bg-neutral-800" onError={e => (e.currentTarget.style.display = 'none')} />
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-white truncate">{w.titleJa}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">#{w.no} · {w.date}</p>
                            </div>
                            <button onClick={() => { setEditing(w); setIsNew(false); }} className="p-2 rounded-xl border border-white/10 hover:border-accent transition-colors"><Pencil className="w-4 h-4 text-gray-400" /></button>
                            <button onClick={() => del(w.id)} className="p-2 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors"><Trash2 className="w-4 h-4 text-gray-400" /></button>
                        </div>
                    ))}
                </div>
            )}
            {editing && (
                <Modal title={isNew ? '新しい作品' : '作品を編集'} onClose={() => setEditing(null)} onSave={save}>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="番号 (例: 01)" value={editing.no} onChange={v => setEditing({ ...editing, no: v })} />
                        <Field label="公開日 (例: 2026.03.10)" value={editing.date} onChange={v => setEditing({ ...editing, date: v })} />
                    </div>
                    <Field label="タイトル（日本語）" value={editing.titleJa} onChange={v => setEditing({ ...editing, titleJa: v })} />
                    <Field label="タイトル（英語）" value={editing.titleEn} onChange={v => setEditing({ ...editing, titleEn: v })} />
                    <Field label="あらすじ（日本語）" value={editing.synopsisJa} onChange={v => setEditing({ ...editing, synopsisJa: v })} multiline />
                    <Field label="あらすじ（英語）" value={editing.synopsisEn} onChange={v => setEditing({ ...editing, synopsisEn: v })} multiline />
                    <Field label="サムネイルURL" value={editing.thumbnail} onChange={v => setEditing({ ...editing, thumbnail: v })} placeholder="https://example.com/image.jpg" />
                </Modal>
            )}
        </div>
    );
}

// ---- News Tab ----
function NewsTab() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<NewsItem | null>(null);
    const [isNew, setIsNew] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/news');
        setNews(await res.json());
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);

    const save = async () => {
        if (!editing) return;
        if (isNew) {
            await fetch('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        } else {
            await fetch(`/api/news/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        }
        setEditing(null);
        load();
    };

    const del = async (id: string) => {
        if (!confirm('このニュースを削除しますか？')) return;
        await fetch(`/api/news/${id}`, { method: 'DELETE' });
        load();
    };

    const typeColors: Record<string, string> = { info: 'text-blue-400 border-blue-400/20', update: 'text-green-400 border-green-400/20', recruit: 'text-accent border-accent/20' };
    const typeOptions = [{ value: 'info', label: '情報 (info)' }, { value: 'update', label: '更新 (update)' }, { value: 'recruit', label: '募集 (recruit)' }];

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={() => { setEditing({ id: '', date: '', titleJa: '', titleEn: '', type: 'info', contentJa: '', contentEn: '' }); setIsNew(true); }} className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" />ニュースを追加
                </button>
            </div>
            {loading ? <div className="text-gray-500 text-center py-20">読み込み中...</div> : (
                <div className="space-y-3">
                    {news.map(n => (
                        <div key={n.id} className="flex items-center gap-4 glass border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                            <span className={`text-[10px] font-black uppercase border px-2 py-1 rounded-full flex-shrink-0 ${typeColors[n.type] ?? 'text-gray-400 border-white/10'}`}>{n.type}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-sm truncate">{n.titleJa}</p>
                                <p className="text-xs text-gray-500">{n.date}</p>
                            </div>
                            <button onClick={() => { setEditing(n); setIsNew(false); }} className="p-2 rounded-xl border border-white/10 hover:border-accent transition-colors"><Pencil className="w-4 h-4 text-gray-400" /></button>
                            <button onClick={() => del(n.id)} className="p-2 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors"><Trash2 className="w-4 h-4 text-gray-400" /></button>
                        </div>
                    ))}
                </div>
            )}
            {editing && (
                <Modal title={isNew ? '新しいニュース' : 'ニュースを編集'} onClose={() => setEditing(null)} onSave={save}>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="日付 (例: 2026.03.10)" value={editing.date} onChange={v => setEditing({ ...editing, date: v })} />
                        <SelectField label="タイプ" value={editing.type} onChange={v => setEditing({ ...editing, type: v as NewsItem['type'] })} options={typeOptions} />
                    </div>
                    <Field label="タイトル（日本語）" value={editing.titleJa} onChange={v => setEditing({ ...editing, titleJa: v })} />
                    <Field label="タイトル（英語）" value={editing.titleEn} onChange={v => setEditing({ ...editing, titleEn: v })} />
                    <Field label="本文（日本語 / Markdown）" value={editing.contentJa || ''} onChange={v => setEditing({ ...editing, contentJa: v })} multiline placeholder="Markdown記法が使えます..." />
                    <Field label="本文（英語 / Markdown）" value={editing.contentEn || ''} onChange={v => setEditing({ ...editing, contentEn: v })} multiline placeholder="Markdown is supported..." />
                </Modal>
            )}
        </div>
    );
}

// ---- Notes Tab ----
function NotesTab() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Note | null>(null);
    const [isNew, setIsNew] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/notes');
        setNotes(await res.json());
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);

    const save = async () => {
        if (!editing) return;
        if (isNew) {
            await fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        } else {
            await fetch(`/api/notes/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
        }
        setEditing(null);
        load();
    };

    const del = async (id: string) => {
        if (!confirm('このノートを削除しますか？')) return;
        await fetch(`/api/notes/${id}`, { method: 'DELETE' });
        load();
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={() => { setEditing({ id: '', slug: '', titleJa: '', titleEn: '', excerptJa: '', excerptEn: '', contentJa: '', contentEn: '', author: '', category: '', date: '' }); setIsNew(true); }} className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" />ノートを追加
                </button>
            </div>
            {loading ? <div className="text-gray-500 text-center py-20">読み込み中...</div> : (
                <div className="space-y-3">
                    {notes.map(n => (
                        <div key={n.id} className="flex items-center gap-4 glass border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                            <span className="text-[10px] font-black uppercase border border-accent/20 text-accent px-2 py-1 rounded-full flex-shrink-0">{n.category}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-white text-sm truncate">{n.titleJa}</p>
                                <p className="text-xs text-gray-500">{n.date} · {n.author}</p>
                            </div>
                            <button onClick={() => { setEditing(n); setIsNew(false); }} className="p-2 rounded-xl border border-white/10 hover:border-accent transition-colors"><Pencil className="w-4 h-4 text-gray-400" /></button>
                            <button onClick={() => del(n.id)} className="p-2 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors"><Trash2 className="w-4 h-4 text-gray-400" /></button>
                        </div>
                    ))}
                </div>
            )}
            {editing && (
                <Modal title={isNew ? '新しいノート' : 'ノートを編集'} onClose={() => setEditing(null)} onSave={save}>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="スラッグ (例: my-article)" value={editing.slug} onChange={v => setEditing({ ...editing, slug: v })} placeholder="URL用の識別子" />
                        <Field label="日付 (例: 2026.03.10)" value={editing.date} onChange={v => setEditing({ ...editing, date: v })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="著者" value={editing.author} onChange={v => setEditing({ ...editing, author: v })} />
                        <Field label="カテゴリ (例: workflow)" value={editing.category} onChange={v => setEditing({ ...editing, category: v })} />
                    </div>
                    <Field label="タイトル（日本語）" value={editing.titleJa} onChange={v => setEditing({ ...editing, titleJa: v })} />
                    <Field label="タイトル（英語）" value={editing.titleEn} onChange={v => setEditing({ ...editing, titleEn: v })} />
                    <Field label="抜粋（日本語）" value={editing.excerptJa} onChange={v => setEditing({ ...editing, excerptJa: v })} multiline />
                    <Field label="抜粋（英語）" value={editing.excerptEn} onChange={v => setEditing({ ...editing, excerptEn: v })} multiline />
                    <Field label="本文（日本語）" value={editing.contentJa} onChange={v => setEditing({ ...editing, contentJa: v })} multiline placeholder="Markdown記法が使えます" />
                    <Field label="本文（英語）" value={editing.contentEn} onChange={v => setEditing({ ...editing, contentEn: v })} multiline placeholder="Markdown supported" />
                </Modal>
            )}
        </div>
    );
}

// ---- Main Admin Page ----
export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('works');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const adminPw = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
        // Client-side check against NEXT_PUBLIC_ADMIN_PASSWORD
        // For stronger security, use an API route instead
        const res = await fetch('/api/admin-auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        if (res.ok) {
            setAuthed(true);
        } else {
            setError(true);
        }
    };

    const tabs = [
        { id: 'works' as Tab, label: '作品', icon: Film },
        { id: 'news' as Tab, label: 'ニュース', icon: Newspaper },
        { id: 'notes' as Tab, label: '制作ノート', icon: BookOpen },
    ];

    if (!authed) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
                    <div className="glass border-white/5 p-12 rounded-3xl shadow-2xl">
                        <div className="flex flex-col items-center mb-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 mb-6">
                                <Shield className="w-10 h-10 text-accent" />
                            </div>
                            <h1 className="text-2xl font-black text-white tracking-widest uppercase mb-2">ADMIN</h1>
                            <p className="text-gray-500 text-sm">管理者パスワードを入力してください</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="管理者パスワード" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-all font-bold" autoFocus />
                            {error && <p className="text-accent text-xs font-black uppercase text-center tracking-widest">パスワードが正しくありません</p>}
                            <button type="submit" className="w-full py-4 bg-accent hover:bg-white hover:text-black text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all">ログイン</button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="fixed top-0 w-full z-40 glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30">
                            <Shield className="w-4 h-4 text-accent" />
                        </div>
                        <span className="font-black text-white uppercase tracking-widest text-sm">ALL CINEMA Admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest font-bold">
                            サイトを見る <ChevronRight className="w-3 h-3" />
                        </a>
                        <button onClick={() => { setAuthed(false); setPassword(''); }} className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2">
                            <LogOut className="w-3 h-3" /> ログアウト
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-20 max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">コンテンツ管理</h1>
                    <p className="text-gray-500 text-sm">サイトのコンテンツを編集・追加・削除できます。変更はリアルタイムでサイトに反映されます。</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 p-1.5 glass border border-white/5 rounded-2xl w-fit">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                            <tab.icon className="w-4 h-4" />{tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                        {activeTab === 'works' && <WorksTab />}
                        {activeTab === 'news' && <NewsTab />}
                        {activeTab === 'notes' && <NotesTab />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  BookOpen,
  Heart,
  Moon,
  Star,
  Send,
  Plus,
  Trash2,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Chapter5Page } from '../config/contentConfig';
import { audioManager } from '../utils/audio';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'ch5' | 'ch4' | 'ch6' | 'ch1' | 'ch2' | 'ch3';

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({ isOpen, onClose }) => {
  const { config, updateConfig, resetToDefaults, importJsonConfig, exportJsonConfig } = useContent();
  const [activeTab, setActiveTab] = useState<TabType>('ch5');
  const [copied, setCopied] = useState<boolean>(false);
  const [importText, setImportText] = useState<string>('');
  const [showImportBox, setShowImportBox] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyForAI = () => {
    audioManager.playChime();
    const json = exportJsonConfig();
    const formattedMessage = `Bhai maine ye notes aur content edit kiya hai, ise real project folder me permanently save kar do:\n\n\`\`\`json\n${json}\n\`\`\``;
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setCopiedNotification('Copied! Bas chat me paste kar dijiye, AI ise real files me permanently save kar dega ✨');
    setTimeout(() => {
      setCopied(false);
      setCopiedNotification(null);
    }, 4000);
  };

  const handleDownloadJson = () => {
    audioManager.playSparkle();
    const json = exportJsonConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aarshi_birthday_notes_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = importJsonConfig(importText.trim());
    if (success) {
      audioManager.playSparkle();
      setShowImportBox(false);
      setImportText('');
      setImportError(null);
    } else {
      setImportError('Invalid JSON format. Please check the text.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Kya aap saare notes aur texts ko wapas original default par lana chahte hain?')) {
      audioManager.playSparkle();
      resetToDefaults();
    }
  };

  const handleUpdatePage = (index: number, field: keyof Chapter5Page, value: string) => {
    updateConfig((prev) => {
      const newPages = [...prev.chapter5Pages];
      newPages[index] = { ...newPages[index], [field]: value };
      return { ...prev, chapter5Pages: newPages };
    });
  };

  const handleAddPage = () => {
    updateConfig((prev) => {
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      const nextNum = romanNumerals[prev.chapter5Pages.length] || `${prev.chapter5Pages.length + 1}`;
      const newPage: Chapter5Page = {
        id: `page-${Date.now()}`,
        number: nextNum,
        title: 'New Note',
        body: 'Yahan Aarshi ke baare me koi nayi pyari baat ya note likhein...',
        accentColor: '#FFD166',
      };
      return { ...prev, chapter5Pages: [...prev.chapter5Pages, newPage] };
    });
    audioManager.playSparkle();
  };

  const handleDeletePage = (index: number) => {
    if (config.chapter5Pages.length <= 1) {
      alert('Kam se kam 1 page hona zaroori hai.');
      return;
    }
    updateConfig((prev) => ({
      ...prev,
      chapter5Pages: prev.chapter5Pages.filter((_, i) => i !== index),
    }));
    audioManager.playSparkle();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#120a22] border border-[#FFD166]/40 shadow-[0_0_50px_rgba(255,209,102,0.25)] text-[#FFF8F0] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-[#CDB4FF]/20 bg-[#1a0f30]/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FFD166]/20 border border-[#FFD166]/40 text-[#FFD166]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display-elegant text-lg sm:text-xl text-[#FFF8F0] flex items-center gap-2">
                <span>Notes & Content Editor</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/30 font-sans">
                  Live Preview
                </span>
              </h2>
              <p className="text-xs text-[#FFF8F0]/70 font-serif-dreamy">
                Yahan notes edit karein — changes turant live update honge aur AI ko bhejne ke liye 1-click copy karein!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleCopyForAI}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD166] to-[#FFC8DD] text-[#0b0816] font-display-elegant font-bold text-xs sm:text-sm shadow-[0_0_15px_#FFD166] hover:scale-105 transition-all cursor-pointer"
              title="Copy all changes to paste directly in AI chat"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied for AI!' : 'AI Ko Bhejne Ke Liye Copy Karein 📋'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF8F0]/80 hover:text-white transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copy Success Banner */}
        {copiedNotification && (
          <div className="px-4 py-2.5 bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300 text-xs sm:text-sm text-center flex items-center justify-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{copiedNotification}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#170d2b] border-b border-[#CDB4FF]/10 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#FFF8F0]/80 border border-white/10 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#FFD166]" />
              <span>Download JSON</span>
            </button>

            <button
              onClick={() => setShowImportBox(!showImportBox)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#FFF8F0]/80 border border-white/10 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#CDB4FF]" />
              <span>Import / Paste JSON</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-300 border border-red-500/30 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Import JSON Box */}
        {showImportBox && (
          <div className="p-4 bg-[#140b25] border-b border-[#CDB4FF]/20 flex flex-col gap-2">
            <span className="text-xs text-[#FFD166] font-medium">JSON Text Paste Karein:</span>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste JSON configuration here..."
              rows={4}
              className="w-full p-2 rounded-xl bg-black/50 border border-[#CDB4FF]/30 text-xs font-mono text-[#FFF8F0] focus:outline-none focus:border-[#FFD166]"
            />
            {importError && <p className="text-xs text-rose-400">{importError}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImportBox(false)}
                className="px-3 py-1 rounded-lg bg-white/10 text-xs text-[#FFF8F0]/70 hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                className="px-3 py-1 rounded-lg bg-[#FFD166] text-[#0b0816] text-xs font-semibold hover:scale-105"
              >
                Apply Imported JSON
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#CDB4FF]/20 bg-[#160d29] px-3 py-2 gap-1.5 text-xs no-scrollbar">
          {[
            { id: 'ch5', label: '📖 Ch 5: Kitab-e-Aarshi (Notes)', icon: BookOpen },
            { id: 'ch4', label: '✨ Ch 4: Birthday Shayari', icon: Star },
            { id: 'ch6', label: '💌 Ch 6: Birthday Letter', icon: Heart },
            { id: 'ch1', label: '🌸 Ch 1: Bachpan & Dialogues', icon: Sparkles },
            { id: 'ch2', label: '🌙 Ch 2: Moon Quote', icon: Moon },
            { id: 'ch3', label: '⭐ Ch 3: Birthday Powers', icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFD166] text-[#0b0816] shadow-[0_0_10px_#FFD166]'
                    : 'text-[#FFF8F0]/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 5: Kitab-e-Aarshi */}
          {activeTab === 'ch5' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display-elegant text-base sm:text-lg text-[#FFD166]">
                    Chapter V &bull; Kitab-e-Aarshi (Book Pages)
                  </h3>
                  <p className="text-xs text-[#FFF8F0]/70">
                    Aarshi ke baare me saari khoobiyan aur notes yahan edit karein:
                  </p>
                </div>
                <button
                  onClick={handleAddPage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/50 text-[#FFD166] hover:bg-[#FFD166]/30 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Naya Note Jodein</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.chapter5Pages.map((page, idx) => (
                  <div
                    key={page.id || idx}
                    className="p-3.5 rounded-2xl bg-black/40 border border-[#CDB4FF]/30 flex flex-col gap-2 relative group hover:border-[#FFD166]/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/40 flex items-center justify-center font-display-elegant text-xs text-[#FFD166]">
                          {page.number}
                        </span>
                        <input
                          type="text"
                          value={page.title}
                          onChange={(e) => handleUpdatePage(idx, 'title', e.target.value)}
                          placeholder="Page Title (e.g. Kind Heart)"
                          className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none w-44 sm:w-56"
                        />
                      </div>
                      <button
                        onClick={() => handleDeletePage(idx)}
                        className="p-1 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-900/20 cursor-pointer"
                        title="Delete page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#FFF8F0]/50 mb-1 font-serif-dreamy">
                        Note / Description:
                      </label>
                      <textarea
                        value={page.body}
                        onChange={(e) => handleUpdatePage(idx, 'body', e.target.value)}
                        placeholder="Dil ki baat ya Aarshi ki tareef..."
                        rows={3}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Birthday Shayari */}
          {activeTab === 'ch4' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <h3 className="font-display-elegant text-base sm:text-lg text-[#FFD166]">
                  Chapter IV &bull; Birthday Shayari & Message
                </h3>
                <p className="text-xs text-[#FFF8F0]/70">
                  Stars connect hone ke baad jo Shayari aati hai, usko yahan edit karein:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#FFD166]/30 space-y-3">
                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Line 1 (Pehli Line):
                  </label>
                  <input
                    type="text"
                    value={config.chapter4.shayariLine1}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter4: { ...p.chapter4, shayariLine1: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Line 2 (Doosri Line):
                  </label>
                  <input
                    type="text"
                    value={config.chapter4.shayariLine2}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter4: { ...p.chapter4, shayariLine2: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Line 3 (Teesri Line):
                  </label>
                  <input
                    type="text"
                    value={config.chapter4.shayariLine3}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter4: { ...p.chapter4, shayariLine3: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Line 4 (Chauthi Line):
                  </label>
                  <input
                    type="text"
                    value={config.chapter4.shayariLine4}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter4: { ...p.chapter4, shayariLine4: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Birthday Letter */}
          {activeTab === 'ch6' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <h3 className="font-display-elegant text-base sm:text-lg text-[#FFD166]">
                  Chapter VI &bull; Grand Finale Letter & Cake Wish
                </h3>
                <p className="text-xs text-[#FFF8F0]/70">
                  Last chapter me envelope ke andar ka dil se likha hua khat:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#FFC8DD]/30 space-y-3">
                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Top Quote (Typewriter Effect):
                  </label>
                  <input
                    type="text"
                    value={config.chapter6.typewriterQuote}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter6: { ...p.chapter6, typewriterQuote: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#FFC8DD] font-medium mb-1">
                    Heartfelt Birthday Letter (Pura Khat):
                  </label>
                  <textarea
                    value={config.chapter6.heartfeltLetter}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter6: { ...p.chapter6, heartfeltLetter: e.target.value },
                      }))
                    }
                    rows={8}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none leading-relaxed resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Cake & Candles Message:
                  </label>
                  <input
                    type="text"
                    value={config.chapter6.cakeMessage}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter6: { ...p.chapter6, cakeMessage: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: Chapter 1 Dialogues */}
          {activeTab === 'ch1' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <h3 className="font-display-elegant text-base sm:text-lg text-[#FFD166]">
                  Chapter I &bull; Little Aarshi Dialogues
                </h3>
                <p className="text-xs text-[#FFF8F0]/70">
                  Choti Aarshi aur Aaj ki Aarshi ke beech ki baatein:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#CDB4FF]/30 space-y-3">
                <div>
                  <label className="block text-xs text-[#FFC8DD] font-medium mb-1">
                    Dialogue 1 (Little Aarshi):
                  </label>
                  <input
                    type="text"
                    value={config.chapter1.dialogue1Text}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter1: { ...p.chapter1, dialogue1Text: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#CDB4FF] font-medium mb-1">
                    Dialogue 2 (Future Aarshi):
                  </label>
                  <input
                    type="text"
                    value={config.chapter1.dialogue2Text}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter1: { ...p.chapter1, dialogue2Text: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#FFC8DD] font-medium mb-1">
                    Dialogue 3 (Little Aarshi):
                  </label>
                  <input
                    type="text"
                    value={config.chapter1.dialogue3Text}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter1: { ...p.chapter1, dialogue3Text: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Dialogue 4 (Future Aarshi - Highlight):
                  </label>
                  <input
                    type="text"
                    value={config.chapter1.dialogue4Text}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter1: { ...p.chapter1, dialogue4Text: e.target.value },
                      }))
                    }
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Moon Quote */}
          {activeTab === 'ch2' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <h3 className="font-display-elegant text-base sm:text-lg text-[#FFD166]">
                  Chapter II &bull; Moon of Aarshi
                </h3>
                <p className="text-xs text-[#FFF8F0]/70">
                  Chaand ke theek neeche ka special note:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#FFD166]/30 space-y-3">
                <div>
                  <label className="block text-xs text-[#FFD166] font-medium mb-1">
                    Chaand Ke Neeche Ka Note:
                  </label>
                  <textarea
                    value={config.chapter2.centerMoonNote}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter2: { ...p.chapter2, centerMoonNote: e.target.value },
                      }))
                    }
                    rows={3}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-[#FFF8F0] focus:border-[#FFD166] focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Birthday Powers */}
          {activeTab === 'ch3' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <h3 className="font-display-elegant text-base sm:text-lg text-[#FFD166]">
                  Chapter III &bull; Birthday Powers (Cards Text)
                </h3>
                <p className="text-xs text-[#FFF8F0]/70">
                  Teeno cards ke titles aur details:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-[#CDB4FF]/30 space-y-3">
                <div className="border-b border-white/10 pb-2">
                  <span className="text-xs font-semibold text-[#FFD166]">Card 1:</span>
                  <input
                    type="text"
                    value={config.chapter3.card1Title}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter3: { ...p.chapter3, card1Title: e.target.value },
                      }))
                    }
                    className="w-full p-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FFF8F0] mt-1"
                  />
                  <input
                    type="text"
                    value={config.chapter3.card1Description}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter3: { ...p.chapter3, card1Description: e.target.value },
                      }))
                    }
                    className="w-full p-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FFF8F0]/80 mt-1"
                  />
                </div>

                <div className="border-b border-white/10 pb-2">
                  <span className="text-xs font-semibold text-[#FFC8DD]">Card 2:</span>
                  <input
                    type="text"
                    value={config.chapter3.card2Title}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter3: { ...p.chapter3, card2Title: e.target.value },
                      }))
                    }
                    className="w-full p-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FFF8F0] mt-1"
                  />
                  <input
                    type="text"
                    value={config.chapter3.card2Description}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter3: { ...p.chapter3, card2Description: e.target.value },
                      }))
                    }
                    className="w-full p-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FFF8F0]/80 mt-1"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#CDB4FF]">Card 3:</span>
                  <input
                    type="text"
                    value={config.chapter3.card3Title}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter3: { ...p.chapter3, card3Title: e.target.value },
                      }))
                    }
                    className="w-full p-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FFF8F0] mt-1"
                  />
                  <input
                    type="text"
                    value={config.chapter3.card3Description}
                    onChange={(e) =>
                      updateConfig((p) => ({
                        ...p,
                        chapter3: { ...p.chapter3, card3Description: e.target.value },
                      }))
                    }
                    className="w-full p-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FFF8F0]/80 mt-1"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-[#170d2b] border-t border-[#CDB4FF]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#FFF8F0]/70">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Saare changes live preview me turant apply ho rahe hain.</span>
          </div>

          <button
            onClick={handleCopyForAI}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#FFD166] text-[#0b0816] font-semibold hover:scale-105 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Chat Me Bhejne Ke Liye Copy Karein 📋</span>
          </button>
        </div>

      </div>
    </div>
  );
};

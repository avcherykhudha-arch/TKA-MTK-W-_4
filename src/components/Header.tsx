import React, { useState } from 'react';
import {
  Trophy,
  BookOpen,
  HelpCircle,
  BarChart3,
  ListOrdered,
  RotateCcw,
  User,
  CheckCircle2,
  Sparkles,
  Edit2,
  Check
} from 'lucide-react';
import { StudentProfile } from '../types/quiz';

interface HeaderProps {
  profile: StudentProfile;
  onUpdateProfile: (p: Partial<StudentProfile>) => void;
  answeredCount: number;
  totalCount: number;
  score: number;
  activeView: 'practice' | 'dashboard';
  onNavigateView: (view: 'practice' | 'dashboard') => void;
  onOpenInstructions: () => void;
  onOpenQuestionList: () => void;
  onOpenResetModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onUpdateProfile,
  answeredCount,
  totalCount,
  score,
  activeView,
  onNavigateView,
  onOpenInstructions,
  onOpenQuestionList,
  onOpenResetModal
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateProfile({ name: tempName.trim() });
    }
    setIsEditingName(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand & Teacher Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B1027] to-[#C8102E] flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-white ring-2 ring-red-100 shrink-0">
              MJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base sm:text-lg md:text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                  <span className="text-[#C8102E]">MISTER JO</span>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <span className="hidden sm:inline text-slate-700 font-extrabold text-sm sm:text-base">
                    TKA MATEMATIKA MASTERCLASS 2026
                  </span>
                </h1>
                <span className="text-[10px] font-bold bg-[#C8102E] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  SMA XII
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                "30 Tantangan Penalaran. Dari Pemula Menjadi Ahli Bersama Mister Jo!"
              </p>
            </div>
          </div>

          {/* Center / Right: Profile & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Student Name Chip */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-xs">
              <User className="w-3.5 h-3.5 text-slate-500" />
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-28 px-1.5 py-0.5 rounded bg-white border border-slate-300 text-xs text-slate-800"
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="text-emerald-600 hover:text-emerald-700">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-slate-700 max-w-[120px] truncate">
                    {profile.name}
                  </span>
                  <button
                    onClick={() => {
                      setTempName(profile.name);
                      setIsEditingName(true);
                    }}
                    className="text-slate-400 hover:text-slate-600"
                    title="Ubah nama panggilan"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Score Pill */}
            {answeredCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-[#C8102E]">
                <Trophy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Skor IRT:</span>
                <span>{score}</span>
              </div>
            )}

            {/* Progress Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {answeredCount}/{totalCount}
              </span>
            </div>

            {/* View Switchers */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => onNavigateView('practice')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'practice'
                    ? 'bg-white text-[#C8102E] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Lembar Latihan Soal"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Soal</span>
              </button>

              <button
                onClick={() => onNavigateView('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-white text-[#C8102E] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Dashboard Analitik Kemahiran"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            </div>

            {/* Question Matrix Drawer Toggle */}
            <button
              onClick={onOpenQuestionList}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Daftar 30 Soal"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            {/* Instructions */}
            <button
              onClick={onOpenInstructions}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Petunjuk Penggunaan"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Reset */}
            <button
              onClick={onOpenResetModal}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
              title="Reset Progres"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { ElementType, IrtScoreResult, Question, UserResponse } from '../types/quiz';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Volume2
} from 'lucide-react';
import { mathSpeech } from '../utils/mathSpeech';

interface DashboardViewProps {
  scoreReport: IrtScoreResult;
  questions: Question[];
  responses: Record<string, UserResponse>;
  onSelectQuestion: (questionNumber: number) => void;
  onResetProgress: () => void;
  onBackToPractice: () => void;
  audioRate: number;
  audioVolume: number;
  voiceURI: string | null;
  audioEnabled: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  scoreReport,
  questions,
  responses,
  onSelectQuestion,
  onResetProgress,
  onBackToPractice,
  audioRate,
  audioVolume,
  voiceURI,
  audioEnabled
}) => {
  const speakText = (text: string) => {
    mathSpeech.speak(text, {
      rate: audioRate,
      volume: audioEnabled ? audioVolume : 0,
      voiceURI
    });
  };

  const elementsList: ElementType[] = [
    'Bilangan',
    'Aljabar',
    'Geometri dan Pengukuran',
    'Trigonometri',
    'Data dan Peluang'
  ];

  const getElementColor = (el: ElementType) => {
    switch (el) {
      case 'Bilangan':
        return 'from-blue-600 to-indigo-600';
      case 'Aljabar':
        return 'from-purple-600 to-pink-600';
      case 'Geometri dan Pengukuran':
        return 'from-emerald-600 to-teal-600';
      case 'Trigonometri':
        return 'from-amber-500 to-orange-600';
      case 'Data dan Peluang':
        return 'from-red-600 to-rose-600';
      default:
        return 'from-slate-600 to-slate-800';
    }
  };

  const getGaugePercentage = () => {
    if (scoreReport.totalAnswered === 0) return 0;
    // Map 200 - 800 to 0 - 100%
    return Math.max(0, Math.min(100, ((scoreReport.score - 200) / 600) * 100));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#8B1027] via-[#C8102E] to-[#991B1B] text-white rounded-3xl p-6 sm:p-9 shadow-lg relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <Trophy className="w-72 h-72 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide uppercase mb-3 backdrop-blur-xs">
            <Award className="w-4 h-4 text-amber-300" />
            Laporan Analitik Kemahiran Belajar
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Dashboard Hasil Latihan TKA 2026
          </h2>
          <p className="text-sm sm:text-base text-red-100 mt-2 leading-relaxed">
            Evaluasi psikometrik berbasis model penalaran IRT 1PL / Rasch Model berskala 200–800 dengan diagnosis kekuatan dan rekomendasi materi penguatan.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() =>
                speakText(
                  `Halo pejuang TKA! Berdasarkan analisis jawabanmu, kamu telah menyelesaikan ${scoreReport.totalAnswered} dari 30 soal dengan skor kemahiran ${scoreReport.score}. ${scoreReport.scoreLabel}. Pertahankan semangat dan terus perkuat penalaranmu bersama Mister Jo!`
                )
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#C8102E] font-bold text-xs sm:text-sm shadow-md hover:bg-red-50 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Evaluasi Audio Mister Jo</span>
            </button>

            <button
              onClick={onBackToPractice}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-xs transition-colors border border-white/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>Kembali ke Lembar Soal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: IRT Score Gauge 200 - 800 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Model Psikometrik
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-[#C8102E]">
                Skala 200–800
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-2">
              SKOR KEMAHIRAN TKA
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Estimasi Kemahiran Latihan Model IRT</p>
          </div>

          <div className="py-6 flex flex-col items-center">
            {scoreReport.totalAnswered === 0 ? (
              <div className="text-center py-4">
                <span className="text-3xl font-extrabold text-slate-300">Belum Dinilai</span>
                <p className="text-xs text-slate-500 mt-1">Kirim minimal 1 jawaban latihan</p>
              </div>
            ) : (
              <>
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#f1f5f9"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#C8102E"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - getGaugePercentage() / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                      {scoreReport.score}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold mt-1">
                      Rentang 200 - 800
                    </span>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="font-bold text-sm text-[#C8102E]">
                    {scoreReport.scoreLabel}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500">
              Parameter $b_i$ berkisar antara $-2,2$ hingga $+2,2$
            </span>
          </div>
        </div>

        {/* Card 2: Progress Counters */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ringkasan Latihan
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                30 Tantangan
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-2">
              Status Pengerjaan Soal
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Pantauan progres latihan intensif</p>
          </div>

          <div className="py-4 space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs sm:text-sm font-medium text-slate-600">Total Soal Selesai</span>
              <strong className="text-base font-bold text-slate-900">
                {scoreReport.totalAnswered} / 30 Soal
              </strong>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-xs sm:text-sm font-medium text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Benar Sempurna
              </span>
              <strong className="text-base font-bold text-emerald-700">
                {scoreReport.totalFullyCorrect} Soal
              </strong>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-100">
              <span className="text-xs sm:text-sm font-medium text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Belum Selesai
              </span>
              <strong className="text-base font-bold text-amber-700">
                {30 - scoreReport.totalAnswered} Soal
              </strong>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-100">
              <span className="text-xs sm:text-sm font-medium text-blue-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Persentase Keberhasilan
              </span>
              <strong className="text-base font-bold text-blue-700">
                {scoreReport.averageScorePercentage}%
              </strong>
            </div>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C8102E] h-full transition-all duration-500 rounded-full"
              style={{ width: `${(scoreReport.totalAnswered / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Card 3: Diagnosis Strengths & Weaknesses */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Diagnosis Belajar
              </span>
              <Target className="w-4 h-4 text-[#C8102E]" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-2">
              Kekuatan & Evaluasi
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Analisis kebiasaan bernalar</p>
          </div>

          <div className="py-2 space-y-3 overflow-y-auto max-h-56 pr-1">
            {scoreReport.strengths.length > 0 && (
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Kekuatan Teridentifikasi:
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {scoreReport.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scoreReport.needsImprovement.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-1">
                  Materi yang Perlu Diperkuat:
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {scoreReport.needsImprovement.map((w, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 italic block">
              *Diagnosis diperbarui otomatis seiring bertambahnya butir soal yang diselesaikan.
            </span>
          </div>
        </div>
      </div>

      {/* Element Breakdown Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Penguasaan Lima Elemen TKA Matematika Wajib
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Distribusi 6 soal per elemen materi kurikulum TKA Kemendikdasmen
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Target Mahir: &ge; 70%
          </span>
        </div>

        <div className="space-y-5">
          {elementsList.map((el) => {
            const data = scoreReport.elementBreakdown[el];
            const colorClass = getElementColor(el);

            return (
              <div key={el} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-slate-900">{el}</span>
                    <span className="text-xs text-slate-500">
                      ({data.answered} dari 6 dikerjakan)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-600">
                      Benar: <strong>{data.fullyCorrect}</strong> | Kredit Skor:{' '}
                      <strong>{data.earnedScore.toFixed(1)}/6</strong>
                    </span>
                    <span className="text-sm font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                      {data.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-200/80 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-700`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations Box */}
      {scoreReport.recommendations.length > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-blue-50/70 border border-blue-200 shadow-sm">
          <h4 className="text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Rekomendasi Langkah Belajar dari Mister Jo
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {scoreReport.recommendations.map((rec, rIdx) => (
              <div
                key={rIdx}
                className="p-4 rounded-2xl bg-white border border-blue-100 shadow-2xs text-xs sm:text-sm text-slate-700 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs inline-flex items-center justify-center mr-2 mb-1">
                  {rIdx + 1}
                </span>
                {rec}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete 30 Questions Review Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Daftar Navigasi 30 Tantangan Soal
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Klik nomor soal mana pun untuk langsung membuka pembahasan dan soalnya
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Benar
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span> Parsial
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span> Salah
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span> Belum
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
          {questions.map((q) => {
            const resp = responses[q.id];
            let statusClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
            if (resp && resp.submitted) {
              if (resp.isCorrectFully) {
                statusClass = 'bg-emerald-500 text-white border-emerald-600 shadow-xs hover:bg-emerald-600';
              } else if (resp.partialScore > 0) {
                statusClass = 'bg-amber-500 text-white border-amber-600 shadow-xs hover:bg-amber-600';
              } else {
                statusClass = 'bg-rose-500 text-white border-rose-600 shadow-xs hover:bg-rose-600';
              }
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(q.number)}
                className={`h-11 rounded-xl font-bold text-sm border flex items-center justify-center transition-all active:scale-95 ${statusClass}`}
                title={`Soal #${q.number}: ${q.element} (${q.subtopic})`}
              >
                {q.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Danger Action: Reset Progress */}
      <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-slate-800">
            Ingin Mengulang Latihan dari Awal?
          </h4>
          <p className="text-xs text-slate-500">
            Reset akan menghapus seluruh rekaman jawaban dan skor latihan di perangkat ini.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs sm:text-sm border border-rose-200 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Seluruh Progres Latihan</span>
        </button>
      </div>
    </div>
  );
};

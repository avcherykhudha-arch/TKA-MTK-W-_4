import React, { useState } from 'react';
import { Question, UserResponse } from '../types/quiz';
import { MathRenderer } from './MathRenderer';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Volume2,
  Zap,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import { mathSpeech } from '../utils/mathSpeech';

interface DualSolutionViewProps {
  question: Question;
  userResponse: UserResponse;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  audioRate: number;
  audioVolume: number;
  voiceURI: string | null;
  audioEnabled: boolean;
}

export const DualSolutionView: React.FC<DualSolutionViewProps> = ({
  question,
  userResponse,
  onNextQuestion,
  isLastQuestion,
  audioRate,
  audioVolume,
  voiceURI,
  audioEnabled
}) => {
  const [activeTab, setActiveTab] = useState<'normal' | 'quick'>('normal');
  const [revealedStepsCount, setRevealedStepsCount] = useState<number>(1);
  const [showSimpler, setShowSimpler] = useState(false);

  const speakText = (text: string) => {
    mathSpeech.speak(text, {
      rate: audioRate,
      volume: audioEnabled ? audioVolume : 0,
      voiceURI
    });
  };

  const getFeedbackBanner = () => {
    if (userResponse.isCorrectFully) {
      return {
        bg: 'bg-emerald-50 border-emerald-200',
        text: 'text-emerald-900',
        icon: <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />,
        title: 'Luar Biasa, Jawabanmu Benar Sempurna!',
        desc: 'Penalaran analisismu sangat presisi. Pelajari kedua cara pembahasan di bawah untuk memperdalam intuisi matematis.'
      };
    }
    if (userResponse.partialScore > 0) {
      return {
        bg: 'bg-amber-50 border-amber-200',
        text: 'text-amber-900',
        icon: <AlertCircle className="w-7 h-7 text-amber-600 shrink-0" />,
        title: `Jawaban Parsial: Kredit ${Math.round(userResponse.partialScore * 100)}% Diperoleh`,
        desc: 'Sebagian penalaranmu sudah berada di jalur yang benar. Amati letak perbedaan analisis pada pembahasan berikut.'
      };
    }
    return {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-900',
      icon: <XCircle className="w-7 h-7 text-red-600 shrink-0" />,
      title: 'Jawabanmu Belum Tepat',
      desc: 'Jangan khawatir! Kegagalan dalam latihan adalah bahan bakar terbaik untuk mempertajam logika dan pemahaman konsep.'
    };
  };

  const banner = getFeedbackBanner();

  const handleNextStep = () => {
    const totalSteps =
      activeTab === 'normal'
        ? question.normalSolution.steps.length
        : question.quickSolution.steps.length;
    if (revealedStepsCount < totalSteps) {
      const nextCount = revealedStepsCount + 1;
      setRevealedStepsCount(nextCount);
      const step =
        activeTab === 'normal'
          ? question.normalSolution.steps[nextCount - 1]
          : question.quickSolution.steps[nextCount - 1];
      speakText(`${step.title}. ${step.explanation}`);
    }
  };

  const handleRevealAllSteps = () => {
    const totalSteps =
      activeTab === 'normal'
        ? question.normalSolution.steps.length
        : question.quickSolution.steps.length;
    setRevealedStepsCount(totalSteps);
  };

  const currentSteps =
    activeTab === 'normal'
      ? question.normalSolution.steps
      : question.quickSolution.steps;

  return (
    <div className="mt-8 pt-8 border-t-2 border-slate-200 space-y-6">
      {/* 1. Results Feedback Banner */}
      <div className={`p-5 sm:p-6 rounded-3xl border-2 ${banner.bg} flex items-start gap-4 shadow-sm`}>
        {banner.icon}
        <div className="flex-1">
          <h3 className={`text-lg sm:text-xl font-bold ${banner.text}`}>
            {banner.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-700 mt-1 leading-relaxed">
            {banner.desc}
          </p>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-700">
              Kredit Soal: {userResponse.partialScore * 100}%
            </span>
            <button
              onClick={() =>
                speakText(
                  userResponse.isCorrectFully
                    ? question.narration.correctFeedback
                    : question.narration.incorrectFeedback
                )
              }
              className="text-xs font-semibold text-[#C8102E] hover:underline flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Evaluasi Mister Jo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Dual Method Switcher Tabs (In same page flow) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#C8102E]" />
              Pembahasan Bersama Mister Jo
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Kuasai konsep fondasi dan taklukkan waktu ujian dengan strategi efisien
            </p>
          </div>

          {/* Toggle buttons between Normal and Quick methods */}
          <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab('normal');
                setRevealedStepsCount(question.normalSolution.steps.length);
                speakText(
                  `${question.narration.normalIntroduction}. ${question.normalSolution.steps[0].title}. ${question.normalSolution.steps[0].explanation}`
                );
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'normal'
                  ? 'bg-white text-[#C8102E] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Cara Normal (Konsep)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('quick');
                setRevealedStepsCount(question.quickSolution.steps.length);
                speakText(
                  `${question.narration.quickIntroduction}. ${question.quickSolution.steps[0].title}. ${question.quickSolution.steps[0].explanation}`
                );
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'quick'
                  ? 'bg-[#C8102E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Cara Cepat Mister Jo</span>
            </button>
          </div>
        </div>

        {/* Strategy Description Banner */}
        <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
            {activeTab === 'normal' ? (
              <>
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Pendekatan Sistematis: Struktur Penalaran Langkah Demi Langkah</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>
                  Strategi TKA: <strong>{question.quickSolution.strategyName}</strong>
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => {
              const textToSpeak =
                activeTab === 'normal'
                  ? `${question.narration.normalIntroduction}. ${question.normalSolution.steps.map(s => s.title + ': ' + s.explanation).join('. ')}. ${question.normalSolution.conclusion}`
                  : `${question.narration.quickIntroduction}. ${question.quickSolution.steps.map(s => s.title + ': ' + s.explanation).join('. ')}. ${question.quickSolution.conclusion}`;
              speakText(textToSpeak);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#C8102E] hover:underline shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Dengarkan Seluruh Pembahasan Ini</span>
          </button>
        </div>

        {/* Steps Scaffolding */}
        <div className="space-y-4 my-6">
          {currentSteps.slice(0, revealedStepsCount).map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all animate-fadeIn"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-red-100 text-[#C8102E]">
                  LANGKAH {idx + 1}
                </span>
                <button
                  onClick={() => speakText(`${step.title}. ${step.explanation}`)}
                  className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                  title="Dengarkan langkah ini"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dengarkan</span>
                </button>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                <MathRenderer content={step.title} />
              </h4>
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed">
                <MathRenderer content={step.explanation} />
              </div>
            </div>
          ))}
        </div>

        {/* Scaffolding Navigation Buttons */}
        {revealedStepsCount < currentSteps.length && (
          <div className="flex items-center gap-3 my-4">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span>Buka Langkah Berikutnya ({revealedStepsCount + 1}/{currentSteps.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleRevealAllSteps}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline"
            >
              Buka Semua Langkah Sekaligus
            </button>
          </div>
        )}

        {/* Conclusion Box */}
        {revealedStepsCount >= currentSteps.length && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 my-6">
            <h5 className="font-bold text-sm sm:text-base flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Kesimpulan Solusi
            </h5>
            <p className="text-sm sm:text-base leading-relaxed">
              <MathRenderer
                content={
                  activeTab === 'normal'
                    ? question.normalSolution.conclusion
                    : question.quickSolution.conclusion
                }
              />
            </p>
          </div>
        )}

        {/* "Jelaskan Lebih Sederhana" Accordion */}
        <div className="my-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              const nextState = !showSimpler;
              setShowSimpler(nextState);
              if (nextState) {
                speakText(question.narration.simplerExplanation);
              }
            }}
            className="flex items-center justify-between w-full p-4 rounded-2xl bg-amber-50 hover:bg-amber-100/70 border border-amber-200/80 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-sm sm:text-base text-amber-950">
                  Jelaskan Lebih Sederhana (Untuk Pemula)
                </span>
                <p className="text-xs text-amber-800">
                  Klik untuk membaca analogi santai Mister Jo jika konsep di atas terasa terlalu berat
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-white px-3 py-1 rounded-xl shadow-2xs">
              {showSimpler ? 'Tutup' : 'Lihat Analogi'}
            </span>
          </button>

          {showSimpler && (
            <div className="p-5 mt-2 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-sm sm:text-base text-amber-950 leading-relaxed animate-fadeIn">
              <MathRenderer content={question.narration.simplerExplanation} />
            </div>
          )}
        </div>

        {/* 3. Detailed Distractor / Statement Analysis */}
        <div className="my-6 pt-6 border-t border-slate-200">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-600" />
            Analisis Logika Distraktor & Pilihan
          </h4>
          <div className="grid gap-3">
            {question.optionExplanations.map((exp, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                  exp.isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                    exp.isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {exp.label}
                </span>
                <div className="flex-1">
                  <span className="font-bold mr-1">
                    {exp.isCorrect ? '[Pilihan Benar]' : '[Distraktor / Salah]'}:
                  </span>
                  <MathRenderer content={exp.explanation} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Common Misconceptions (Kesalahan Konsep) */}
        {question.misconceptions && question.misconceptions.length > 0 && (
          <div className="my-6 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
            <h5 className="font-bold text-sm sm:text-base flex items-center gap-2 mb-2 text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              Jebakan & Kesalahan Konsep yang Harus Dihindari
            </h5>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-rose-900 leading-relaxed">
              {question.misconceptions.map((misc, mIdx) => (
                <li key={mIdx}>
                  <MathRenderer content={misc} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. Key Takeaway */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-xs uppercase tracking-wider text-blue-700 font-bold mb-1">
              Prinsip Emas TKA Mister Jo
            </strong>
            <p className="text-sm sm:text-base leading-relaxed text-blue-900">
              <MathRenderer content={question.keyTakeaway} />
            </p>
          </div>
        </div>

        {/* 6. Next Question Navigation */}
        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onNextQuestion}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C8102E] to-[#8B1027] text-white font-bold text-base hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{isLastQuestion ? 'Lihat Laporan Skor & Analisis' : 'Lanjut ke Soal Berikutnya'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

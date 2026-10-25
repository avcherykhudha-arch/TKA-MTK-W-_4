import React from 'react';
import { Question, UserResponse } from '../types/quiz';
import { MathRenderer } from './MathRenderer';
import { VisualDiagram } from './VisualDiagram';
import { Volume2, CheckCircle2, Circle, CheckSquare, Square, Send, HelpCircle, Sparkles } from 'lucide-react';
import { mathSpeech } from '../utils/mathSpeech';

interface QuestionCardProps {
  question: Question;
  userResponse?: UserResponse;
  draftSingle: number | null;
  draftMultiple: number[];
  draftTrueFalse: (boolean | null)[];
  onSelectSingle: (idx: number) => void;
  onToggleMultiple: (idx: number) => void;
  onSelectTrueFalse: (rowIndex: number, val: boolean) => void;
  onSubmitAnswer: () => void;
  audioRate: number;
  audioVolume: number;
  voiceURI: string | null;
  audioEnabled: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userResponse,
  draftSingle,
  draftMultiple,
  draftTrueFalse,
  onSelectSingle,
  onToggleMultiple,
  onSelectTrueFalse,
  onSubmitAnswer,
  audioRate,
  audioVolume,
  voiceURI,
  audioEnabled
}) => {
  const isSubmitted = !!userResponse?.submitted;

  const speakText = (text: string) => {
    mathSpeech.speak(text, {
      rate: audioRate,
      volume: audioEnabled ? audioVolume : 0,
      voiceURI
    });
  };

  const isSubmitDisabled = () => {
    if (isSubmitted) return true;
    if (question.questionType === 'single_choice') {
      return draftSingle === null;
    }
    if (question.questionType === 'multiple_choice') {
      return draftMultiple.length === 0;
    }
    if (question.questionType === 'true_false_matrix') {
      return draftTrueFalse.some(v => v === null);
    }
    return true;
  };

  const getDifficultyBadge = () => {
    if (question.difficultyLabel === 'Penalaran Sangat Sulit') {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
    if (question.difficultyLabel === 'Penalaran Sulit') {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-7 md:p-9 transition-all">
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-bold bg-[#8B1027] text-white px-3.5 py-1 rounded-xl shadow-xs">
            SOAL #{question.number}
          </span>
          <span className="text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl border border-slate-200">
            {question.element}
          </span>
          <span className="text-xs font-semibold bg-red-50 text-[#C8102E] px-2.5 py-1 rounded-xl border border-red-100">
            {question.subtopic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] sm:text-xs font-bold px-3 py-1 rounded-xl border ${getDifficultyBadge()}`}>
            {question.difficultyLabel}
          </span>
          <span className="text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-xl border border-emerald-200">
            HOTS REASONING
          </span>
        </div>
      </div>

      {/* Reasoning Indicator Focus */}
      <div className="mt-4 mb-5 p-3 rounded-xl bg-slate-50 border-l-4 border-[#C8102E] flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
        <Sparkles className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-800 font-semibold">Tantangan Penalaran:</strong>{' '}
          {question.reasoningIndicator}
        </p>
      </div>

      {/* Stimulus Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Stimulus & Informasi Konteks
          </h3>
          <button
            onClick={() => speakText(question.narration.stimulus)}
            className="flex items-center gap-1.5 text-xs text-[#C8102E] font-semibold hover:text-[#8B1027] px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
            title="Dengarkan pembacaan stimulus oleh Mister Jo"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengarkan Stimulus</span>
          </button>
        </div>

        <div className="text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed font-normal whitespace-pre-line bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-100">
          <MathRenderer content={question.stimulus} />
        </div>

        {/* Visual Diagram / Table */}
        <VisualDiagram visualData={question.visualData} />
      </div>

      {/* Question Text */}
      <div className="my-6 p-4 sm:p-6 bg-red-50/40 border border-red-100/80 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Tugas Penalaran
          </span>
          <button
            onClick={() => speakText(question.narration.question)}
            className="flex items-center gap-1 text-xs text-[#C8102E] font-semibold hover:underline"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Bacakan Soal</span>
          </button>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-snug">
          <MathRenderer content={question.questionText} />
        </h2>
      </div>

      {/* Response Options Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {question.questionType === 'single_choice' && 'Pilihan Jawaban (Tepat Satu Opsi Benar)'}
            {question.questionType === 'multiple_choice' && 'Pilihan Ganda Kompleks (Pilih 2 atau 3 Opsi Benar)'}
            {question.questionType === 'true_false_matrix' && 'Evaluasi Matriks Pernyataan (Nilai Ketiga Pernyataan)'}
          </span>
          <button
            onClick={() => speakText(question.narration.options)}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Bacakan Opsi</span>
          </button>
        </div>

        {/* 1. SINGLE CHOICE */}
        {question.questionType === 'single_choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const label = String.fromCharCode(65 + idx);
              const isSelected = isSubmitted ? userResponse.selectedSingle === idx : draftSingle === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => onSelectSingle(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'border-[#C8102E] bg-red-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                  } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#C8102E] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {label}
                  </div>
                  <div className="flex-1 text-base sm:text-lg text-slate-800 font-medium pt-0.5">
                    <MathRenderer content={opt} />
                  </div>
                  <div className="pt-1 text-[#C8102E]">
                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6 fill-[#C8102E] text-white" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. MULTIPLE CHOICE */}
        {question.questionType === 'multiple_choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const label = String.fromCharCode(65 + idx);
              const isSelected = isSubmitted
                ? (userResponse.selectedMultiple || []).includes(idx)
                : draftMultiple.includes(idx);

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => onToggleMultiple(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'border-[#C8102E] bg-red-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                  } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#C8102E] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {label}
                  </div>
                  <div className="flex-1 text-base sm:text-lg text-slate-800 font-medium pt-0.5">
                    <MathRenderer content={opt} />
                  </div>
                  <div className="pt-1 text-[#C8102E]">
                    {isSelected ? (
                      <CheckSquare className="w-6 h-6 fill-[#C8102E] text-white" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. TRUE / FALSE MATRIX */}
        {question.questionType === 'true_false_matrix' && question.statements && (
          <div className="space-y-4">
            {question.statements.map((stmt, sIdx) => {
              const currentValue = isSubmitted
                ? userResponse.selectedTrueFalse?.[sIdx]
                : draftTrueFalse[sIdx];

              return (
                <div
                  key={stmt.id}
                  className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                      <MathRenderer content={stmt.statement} />
                    </p>
                  </div>

                  {/* True / False Toggle Controls */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => onSelectTrueFalse(sIdx, true)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                        currentValue === true
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                      } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>BENAR</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => onSelectTrueFalse(sIdx, false)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                        currentValue === false
                          ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700'
                      } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>SALAH</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Submit Action Bar */}
      {!isSubmitted && (
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 italic">
            *Jawaban akan dikunci dan dinilai secara otomatis dengan model IRT setelah dikirim.
          </div>

          <button
            type="button"
            disabled={isSubmitDisabled()}
            onClick={onSubmitAnswer}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-md ${
              isSubmitDisabled()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#C8102E] to-[#8B1027] text-white hover:opacity-95 hover:shadow-lg active:scale-98'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>Kirim Jawaban & Buka Pembahasan</span>
          </button>
        </div>
      )}
    </div>
  );
};

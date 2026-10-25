import React from 'react';
import { Question, UserResponse, ElementType } from '../types/quiz';
import { X, CheckCircle2, AlertTriangle, Circle, ArrowRight } from 'lucide-react';

interface QuestionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentQuestionNumber: number;
  responses: Record<string, UserResponse>;
  onSelectQuestion: (num: number) => void;
}

export const QuestionDrawer: React.FC<QuestionDrawerProps> = ({
  isOpen,
  onClose,
  questions,
  currentQuestionNumber,
  responses,
  onSelectQuestion
}) => {
  if (!isOpen) return null;

  const elementsList: ElementType[] = [
    'Bilangan',
    'Aljabar',
    'Geometri dan Pengukuran',
    'Trigonometri',
    'Data dan Peluang'
  ];

  const getStatusBadge = (qId: string) => {
    const resp = responses[qId];
    if (!resp || !resp.submitted) {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <Circle className="w-3 h-3 text-slate-300" />
          Belum Dikerjakan
        </span>
      );
    }
    if (resp.isCorrectFully) {
      return (
        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
          <CheckCircle2 className="w-3 h-3" />
          Benar Sempurna
        </span>
      );
    }
    if (resp.partialScore > 0) {
      return (
        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
          <AlertTriangle className="w-3 h-3" />
          Kredit {Math.round(resp.partialScore * 100)}%
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
        <X className="w-3 h-3" />
        Belum Tepat
      </span>
    );
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'single_choice':
        return 'PG Biasa';
      case 'multiple_choice':
        return 'PG Kompleks';
      case 'true_false_matrix':
        return 'Benar/Salah';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg h-full p-6 shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Daftar 30 Tantangan Soal</h3>
            <p className="text-xs text-slate-500">Pilih nomor soal untuk langsung berlatih</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Questions Grouped by Element */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
          {elementsList.map((el) => {
            const elQuestions = questions.filter((q) => q.element === el);

            return (
              <div key={el} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {el} (6 Soal)
                  </h4>
                </div>

                <div className="space-y-2">
                  {elQuestions.map((q) => {
                    const isCurrent = q.number === currentQuestionNumber;

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          onSelectQuestion(q.number);
                          onClose();
                        }}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'border-[#C8102E] bg-red-50/70 shadow-xs ring-1 ring-red-200'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                              isCurrent
                                ? 'bg-[#C8102E] text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {q.number}
                          </span>
                          <div>
                            <span className="font-semibold text-xs sm:text-sm text-slate-800 line-clamp-1">
                              {q.subtopic}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                                {getTypeLabel(q.questionType)}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {q.difficultyLabel}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0">{getStatusBadge(q.id)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            {Object.values(responses).filter((r) => r.submitted).length} dari 30 soal selesai
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

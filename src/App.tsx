import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  allQuestions,
  getQuestionByNumber,
  validateQuestionsIntegrity
} from './data/questions';
import {
  loadAppState,
  saveAppState,
  resetAppState,
  defaultAudioSettings,
  defaultProfile
} from './utils/storage';
import { calculateIrtReport, evaluateUserResponse } from './utils/irtScoring';
import { mathSpeech } from './utils/mathSpeech';
import { AppState, AudioSettings, StudentProfile, UserResponse } from './types/quiz';
import { Header } from './components/Header';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { QuestionCard } from './components/QuestionCard';
import { DualSolutionView } from './components/DualSolutionView';
import { DashboardView } from './components/DashboardView';
import { InstructionModal } from './components/InstructionModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { QuestionDrawer } from './components/QuestionDrawer';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Volume2,
  CheckCircle2,
  Trophy,
  Play
} from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => loadAppState());
  const [draftSingle, setDraftSingle] = useState<number | null>(null);
  const [draftMultiple, setDraftMultiple] = useState<number[]>([]);
  const [draftTrueFalse, setDraftTrueFalse] = useState<(boolean | null)[]>([null, null, null]);
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  // Run automated validation check on mount
  useEffect(() => {
    const val = validateQuestionsIntegrity();
    if (!val.isValid) {
      console.warn('Questions validation warnings:', val.errors);
    }
  }, []);

  // Save to offline localStorage whenever state changes
  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  // Current active question
  const currentQuestion =
    getQuestionByNumber(appState.currentQuestionNumber) || allQuestions[0];
  const currentResponse = appState.responses[currentQuestion.id];

  // Sync draft state with existing response when navigating questions
  useEffect(() => {
    if (currentResponse) {
      setDraftSingle(currentResponse.selectedSingle ?? null);
      setDraftMultiple(currentResponse.selectedMultiple ?? []);
      setDraftTrueFalse(currentResponse.selectedTrueFalse ?? [null, null, null]);
    } else {
      setDraftSingle(null);
      setDraftMultiple([]);
      setDraftTrueFalse([null, null, null]);
    }
  }, [currentQuestion.id, currentResponse]);

  // Calculate psychometric score report
  const scoreReport = calculateIrtReport(allQuestions, appState.responses);

  // Handlers for inputs
  const handleSelectSingle = (idx: number) => {
    setDraftSingle(idx);
  };

  const handleToggleMultiple = (idx: number) => {
    setDraftMultiple((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectTrueFalse = (rowIndex: number, val: boolean) => {
    setDraftTrueFalse((prev) => {
      const copy = [...prev];
      copy[rowIndex] = val;
      return copy;
    });
  };

  // Submit Answer Action
  const handleSubmitAnswer = () => {
    const evalResult = evaluateUserResponse(currentQuestion, {
      selectedSingle: draftSingle ?? undefined,
      selectedMultiple: draftMultiple,
      selectedTrueFalse: draftTrueFalse
    });

    const newResponse: UserResponse = {
      questionId: currentQuestion.id,
      submitted: true,
      selectedSingle: draftSingle ?? undefined,
      selectedMultiple: draftMultiple,
      selectedTrueFalse: draftTrueFalse,
      isCorrectFully: evalResult.isCorrectFully,
      partialScore: evalResult.partialScore,
      timeSpentSeconds: 0,
      submittedAt: new Date().toISOString()
    };

    setAppState((prev) => ({
      ...prev,
      responses: {
        ...prev.responses,
        [currentQuestion.id]: newResponse
      }
    }));

    // Trigger celebratory confetti if 100% correct
    if (evalResult.isCorrectFully) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }

    // Audio feedback from Mister Jo
    const feedbackNarration = evalResult.isCorrectFully
      ? currentQuestion.narration.correctFeedback
      : currentQuestion.narration.incorrectFeedback;

    mathSpeech.speak(feedbackNarration, {
      rate: appState.audioSettings.rate,
      volume: appState.audioSettings.enabled ? appState.audioSettings.volume : 0,
      voiceURI: appState.audioSettings.voiceURI
    });
  };

  // Navigation handlers
  const handleNavigateQuestion = (num: number) => {
    if (num < 1 || num > 30) return;
    mathSpeech.stop();
    setAppState((prev) => ({
      ...prev,
      currentQuestionNumber: num,
      activeView: 'practice'
    }));

    const targetQ = getQuestionByNumber(num);
    if (targetQ && appState.audioSettings.autoPlayOnNavigate) {
      mathSpeech.speak(targetQ.narration.introduction, {
        rate: appState.audioSettings.rate,
        volume: appState.audioSettings.enabled ? appState.audioSettings.volume : 0,
        voiceURI: appState.audioSettings.voiceURI
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion.number < 30) {
      handleNavigateQuestion(currentQuestion.number + 1);
    } else {
      // Finished all 30! Open Dashboard
      setAppState((prev) => ({ ...prev, activeView: 'dashboard' }));
      mathSpeech.speak(
        'Selamat! Kamu telah menyelesaikan seluruh 30 tantangan penalaran TKA Matematika Masterclass 2026 bersama Mister Jo! Mari kita pelajari laporan kemahiran belajarmu.',
        {
          rate: appState.audioSettings.rate,
          volume: appState.audioSettings.enabled ? appState.audioSettings.volume : 0,
          voiceURI: appState.audioSettings.voiceURI
        }
      );
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion.number > 1) {
      handleNavigateQuestion(currentQuestion.number - 1);
    }
  };

  const handleUpdateAudioSettings = (newSettings: Partial<AudioSettings>) => {
    setAppState((prev) => ({
      ...prev,
      audioSettings: {
        ...prev.audioSettings,
        ...newSettings
      }
    }));
  };

  const handleUpdateProfile = (p: Partial<StudentProfile>) => {
    setAppState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...p
      }
    }));
  };

  const handleResetProgress = () => {
    mathSpeech.stop();
    const reset = resetAppState();
    setAppState(reset);
    setDraftSingle(null);
    setDraftMultiple([]);
    setDraftTrueFalse([null, null, null]);
  };

  const handleActivateMisterJo = () => {
    setHasStartedAudio(true);
    const welcomeSpeech =
      'Halo, pejuang TKA Matematika! Selamat datang di Mister Jo TKA Matematika Masterclass 2026. Saya Mister Jo, dan di sini kita akan berlatih bukan sekadar menghitung, tetapi belajar berpikir tajam, memahami persoalan, dan menemukan strategi matematika yang benar-benar efektif. Ada tiga puluh tantangan penalaran yang sudah menanti. Siap mengubah soal sulit menjadi soal yang bisa kamu taklukkan? Yuk, kita mulai!';
    mathSpeech.speak(welcomeSpeech, {
      rate: appState.audioSettings.rate,
      volume: appState.audioSettings.enabled ? appState.audioSettings.volume : 0,
      voiceURI: appState.audioSettings.voiceURI
    });
  };

  return (
    <div className="min-h-screen math-bg-pattern flex flex-col justify-between text-[#22252B]">
      {/* Header */}
      <Header
        profile={appState.profile}
        onUpdateProfile={handleUpdateProfile}
        answeredCount={scoreReport.totalAnswered}
        totalCount={30}
        score={scoreReport.score}
        activeView={appState.activeView === 'dashboard' ? 'dashboard' : 'practice'}
        onNavigateView={(view) => setAppState((prev) => ({ ...prev, activeView: view }))}
        onOpenInstructions={() => setIsInstructionOpen(true)}
        onOpenQuestionList={() => setIsDrawerOpen(true)}
        onOpenResetModal={() => setIsResetOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Voice Onboarding Banner (if first turn or hasn't started) */}
        {!hasStartedAudio && scoreReport.totalAnswered === 0 && (
          <div className="mb-6 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#8B1027] to-[#C8102E] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5 animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#C8102E] flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                MJ
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  Selamat Datang di Masterclass Mister Jo!
                </h2>
                <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl leading-relaxed">
                  "30 Tantangan Penalaran. Dari Pemula Menjadi Ahli Bersama Mister Jo!" Klik tombol di samping untuk mengaktifkan suara guru pendamping virtual berbahasa Indonesia.
                </p>
              </div>
            </div>
            <button
              onClick={handleActivateMisterJo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-[#C8102E] font-bold text-sm sm:text-base hover:bg-red-50 transition-all shadow-md flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              <Volume2 className="w-5 h-5 fill-[#C8102E]" />
              <span>Masuk & Aktifkan Mister Jo</span>
            </button>
          </div>
        )}

        {/* Global Floating Audio Controller */}
        <AudioPlayerBar
          audioSettings={appState.audioSettings}
          onUpdateSettings={handleUpdateAudioSettings}
          currentNarrationText={
            currentResponse?.submitted
              ? currentQuestion.narration.normalIntroduction
              : currentQuestion.narration.introduction
          }
          onTriggerSpeak={() => {
            const text = currentResponse?.submitted
              ? `${currentQuestion.narration.normalIntroduction}. ${currentQuestion.normalSolution.conclusion}`
              : `${currentQuestion.narration.introduction}. ${currentQuestion.narration.stimulus}. ${currentQuestion.narration.question}`;
            mathSpeech.speak(text, {
              rate: appState.audioSettings.rate,
              volume: appState.audioSettings.enabled ? appState.audioSettings.volume : 0,
              voiceURI: appState.audioSettings.voiceURI
            });
          }}
        />

        {/* View 1: PRACTICE SHEET (LEMBAR SOAL) */}
        {appState.activeView === 'practice' && (
          <div>
            {/* Top Navigation Arrows & Quick Progress Bar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion.number === 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  currentQuestion.number === 1
                    ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Soal Sebelumnya</span>
              </button>

              <div className="text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
                Tantangan {currentQuestion.number} dari 30
              </div>

              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all"
              >
                <span>{currentQuestion.number === 30 ? 'Lihat Hasil' : 'Soal Berikutnya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Question Card Component */}
            <QuestionCard
              question={currentQuestion}
              userResponse={currentResponse}
              draftSingle={draftSingle}
              draftMultiple={draftMultiple}
              draftTrueFalse={draftTrueFalse}
              onSelectSingle={handleSelectSingle}
              onToggleMultiple={handleToggleMultiple}
              onSelectTrueFalse={handleSelectTrueFalse}
              onSubmitAnswer={handleSubmitAnswer}
              audioRate={appState.audioSettings.rate}
              audioVolume={appState.audioSettings.volume}
              voiceURI={appState.audioSettings.voiceURI}
              audioEnabled={appState.audioSettings.enabled}
            />

            {/* Dual Solution View (Appears on SAME page immediately after submit) */}
            {currentResponse && currentResponse.submitted && (
              <DualSolutionView
                question={currentQuestion}
                userResponse={currentResponse}
                onNextQuestion={handleNextQuestion}
                isLastQuestion={currentQuestion.number === 30}
                audioRate={appState.audioSettings.rate}
                audioVolume={appState.audioSettings.volume}
                voiceURI={appState.audioSettings.voiceURI}
                audioEnabled={appState.audioSettings.enabled}
              />
            )}
          </div>
        )}

        {/* View 2: DASHBOARD & ANALYTICS */}
        {appState.activeView === 'dashboard' && (
          <DashboardView
            scoreReport={scoreReport}
            questions={allQuestions}
            responses={appState.responses}
            onSelectQuestion={(num) => handleNavigateQuestion(num)}
            onResetProgress={() => setIsResetOpen(true)}
            onBackToPractice={() => setAppState((prev) => ({ ...prev, activeView: 'practice' }))}
            audioRate={appState.audioSettings.rate}
            audioVolume={appState.audioSettings.volume}
            voiceURI={appState.audioSettings.voiceURI}
            audioEnabled={appState.audioSettings.enabled}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]"></span>
            <span>Mister Jo — TKA Matematika Masterclass 2026</span>
          </div>
          <p className="text-slate-400">
            Aplikasi Web Pembelajaran TKA Matematika Wajib SMA/MA Kelas XII. Sesuai Standar Kurikulum & Asesmen Kemendikdasmen RI.
          </p>
          <p className="text-slate-400 text-[11px]">
            Skor Kemahiran Latihan Menggunakan Pemodelan IRT 1PL / Rasch Model Skala 200–800. Progres Disimpan Otomatis Secara Offline.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <InstructionModal
        isOpen={isInstructionOpen}
        onClose={() => setIsInstructionOpen(false)}
        audioRate={appState.audioSettings.rate}
        audioVolume={appState.audioSettings.volume}
        voiceURI={appState.audioSettings.voiceURI}
        audioEnabled={appState.audioSettings.enabled}
      />

      <ResetConfirmModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirmReset={handleResetProgress}
      />

      <QuestionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        questions={allQuestions}
        currentQuestionNumber={currentQuestion.number}
        responses={appState.responses}
        onSelectQuestion={(num) => handleNavigateQuestion(num)}
      />
    </div>
  );
}

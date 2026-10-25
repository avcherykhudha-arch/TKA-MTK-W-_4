import React from 'react';
import { X, CheckCircle2, BookOpen, Zap, Target, Award, Volume2 } from 'lucide-react';
import { mathSpeech } from '../utils/mathSpeech';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioRate: number;
  audioVolume: number;
  voiceURI: string | null;
  audioEnabled: boolean;
}

export const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  onClose,
  audioRate,
  audioVolume,
  voiceURI,
  audioEnabled
}) => {
  if (!isOpen) return null;

  const narrationScript =
    'Di aplikasi ini, kamu akan menghadapi tiga bentuk soal, yaitu pilihan ganda biasa, pilihan ganda kompleks, serta benar dan salah. Bacalah informasi dengan teliti, amati gambar, grafik, atau tabel, lalu tentukan jawabanmu. Setelah menjawab, kita akan membahasnya bersama lewat cara normal dan cara cepat. Kamu juga dapat mendengarkan penjelasan saya kembali kapan pun dibutuhkan. Progres belajarmu akan disimpan secara otomatis di perangkat ini.';

  const handleSpeak = () => {
    mathSpeech.speak(narrationScript, {
      rate: audioRate,
      volume: audioEnabled ? audioVolume : 0,
      voiceURI
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-sm">
              MJ
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Petunjuk Penggunaan & Standar TKA</h3>
              <p className="text-xs text-slate-500">Mister Jo — TKA Matematika Masterclass 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Narration Trigger */}
        <div className="my-4 p-3.5 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-red-900 font-medium">
            Dengarkan arahan langsung dari Mister Jo mengenai strategi menaklukkan soal TKA.
          </div>
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C8102E] text-white text-xs font-bold hover:bg-[#8B1027] transition-colors shrink-0"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>

        <div className="space-y-4 my-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              1. Tiga Bentuk Soal Resmi TKA Kemendikdasmen
            </h4>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>Pilihan Ganda Biasa (10 Soal):</strong> 5 opsi A sampai E dengan tepat SATU jawaban benar.
              </li>
              <li>
                <strong>Pilihan Ganda Kompleks (10 Soal):</strong> 5 opsi A sampai E dengan DUA atau TIGA pilihan benar. Peserta wajib memilih semua jawaban yang tepat.
              </li>
              <li>
                <strong>Benar / Salah (10 Soal):</strong> Tepat 3 pernyataan per soal. Setiap pernyataan dinilai secara mandiri BENAR atau SALAH.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              2. Pembahasan Ganda dalam Satu Halaman
            </h4>
            <p>
              Setelah mengirimkan jawaban, kamu akan langsung mendapatkan dua metode sekaligus:
              <strong> Cara Normal</strong> (pendekatan langkah bertahap berjenjang) dan{' '}
              <strong> Cara Cepat Mister Jo</strong> (strategi efisien, eliminasi, dan penalaran cerdas) serta tombol <em>Jelaskan Lebih Sederhana</em> untuk pemula.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              3. Skor Kemahiran TKA (Skala 200–800)
            </h4>
            <p>
              Penilaian menggunakan pendekatan psikometrik mirip <strong>Rasch / IRT 1PL</strong> dengan estimasi MAP (Maximum A Posteriori). Butir soal memiliki bobot kesulitan $b_i$, sehingga skor merefleksikan tingkat kemahiran berpikir logis yang sesungguhnya.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              4. Penyimpanan Progres Offline Otomatis
            </h4>
            <p>
              Seluruh jawaban, status benar/salah, dan waktu belajarmu tersimpan otomatis di perangkat ini. Kamu dapat me-refresh browser atau menutupnya kapan saja tanpa takut kehilangan progres belajar.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            Saya Siap, Mulai Latihan!
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Square, Mic, Gauge, ChevronDown } from 'lucide-react';
import { mathSpeech, VoiceOption } from '../utils/mathSpeech';
import { AudioSettings } from '../types/quiz';

interface AudioPlayerBarProps {
  audioSettings: AudioSettings;
  onUpdateSettings: (newSettings: Partial<AudioSettings>) => void;
  currentNarrationText?: string;
  onTriggerSpeak?: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  audioSettings,
  onUpdateSettings,
  currentNarrationText,
  onTriggerSpeak
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState('');

  useEffect(() => {
    const unsubscribe = mathSpeech.subscribe((speaking, paused, text) => {
      setIsSpeaking(speaking);
      setIsPaused(paused);
      setActiveSpeechText(text);
    });

    const loadVoices = () => {
      const voices = mathSpeech.getVoices();
      setAvailableVoices(voices);
      if (!audioSettings.voiceURI && voices.length > 0) {
        const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang === 'in_ID');
        if (idVoice) {
          onUpdateSettings({ voiceURI: idVoice.voiceURI });
        }
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isSpeaking) {
      if (isPaused) {
        mathSpeech.resume();
      } else {
        mathSpeech.pause();
      }
    } else {
      if (onTriggerSpeak) {
        onTriggerSpeak();
      } else if (currentNarrationText) {
        mathSpeech.speak(currentNarrationText, {
          rate: audioSettings.rate,
          volume: audioSettings.enabled ? audioSettings.volume : 0,
          voiceURI: audioSettings.voiceURI
        });
      }
    }
  };

  const handleStop = () => {
    mathSpeech.stop();
  };

  const handleReplay = () => {
    mathSpeech.replay({
      rate: audioSettings.rate,
      volume: audioSettings.enabled ? audioSettings.volume : 0,
      voiceURI: audioSettings.voiceURI
    });
  };

  const handleSpeedChange = (speed: number) => {
    onUpdateSettings({ rate: speed });
    if (isSpeaking) {
      mathSpeech.replay({
        rate: speed,
        volume: audioSettings.enabled ? audioSettings.volume : 0,
        voiceURI: audioSettings.voiceURI
      });
    }
  };

  const handleToggleMute = () => {
    const nextMute = !audioSettings.enabled;
    onUpdateSettings({ enabled: nextMute });
    if (!nextMute) {
      mathSpeech.stop();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-md p-3 sm:p-4 my-4 flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Teacher Identity & Status */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8B1027] to-[#C8102E] flex items-center justify-center text-white font-bold text-lg shadow-sm border-2 border-white ring-2 ring-red-100">
            MJ
          </div>
          {isSpeaking && !isPaused && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-slate-800">Mister Jo Virtual</span>
            <span className="text-[11px] font-semibold bg-red-100 text-[#C8102E] px-2 py-0.5 rounded-full">
              Guru Pendamping TKA
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate max-w-[240px] sm:max-w-xs">
            {isSpeaking
              ? isPaused
                ? 'Narasi sedang dijeda...'
                : 'Mister Jo sedang berbicara...'
              : 'Siap membimbing penalaran dan pembahasanmu'}
          </p>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
        {/* Main Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
            isSpeaking && !isPaused
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-[#C8102E] text-white hover:bg-[#8B1027]'
          }`}
          title={isSpeaking && !isPaused ? 'Jeda Narasi' : 'Dengarkan Mister Jo'}
        >
          {isSpeaking && !isPaused ? (
            <>
              <Pause className="w-4 h-4" /> Jeda
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" /> Dengarkan
            </>
          )}
        </button>

        {/* Replay */}
        <button
          onClick={handleReplay}
          className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          title="Ulangi Narasi Terakhir"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Stop */}
        {isSpeaking && (
          <button
            onClick={handleStop}
            className="p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            title="Hentikan Suara"
          >
            <Square className="w-4 h-4 fill-red-600" />
          </button>
        )}

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 text-xs">
          <Gauge className="w-3.5 h-3.5 text-slate-500 ml-1.5 hidden sm:inline" />
          {[0.8, 0.95, 1.15].map((rate) => (
            <button
              key={rate}
              onClick={() => handleSpeedChange(rate)}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                audioSettings.rate === rate
                  ? 'bg-white text-[#C8102E] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {rate === 0.95 ? 'Normal' : `${rate}x`}
            </button>
          ))}
        </div>

        {/* Mute/Unmute */}
        <button
          onClick={handleToggleMute}
          className={`p-2 rounded-xl transition-colors ${
            audioSettings.enabled
              ? 'text-slate-700 bg-slate-100 hover:bg-slate-200'
              : 'text-red-600 bg-red-100'
          }`}
          title={audioSettings.enabled ? 'Bisukan Suara' : 'Aktifkan Suara'}
        >
          {audioSettings.enabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Voice Selector Dropdown */}
        {availableVoices.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowVoiceMenu(!showVoiceMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-medium transition-colors"
              title="Pilih Karakter Suara"
            >
              <Mic className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Suara</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showVoiceMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-56 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 text-xs">
                <p className="font-bold text-slate-700 px-2 py-1 border-b border-slate-100 mb-1">
                  Pilihan Suara Tersedia
                </p>
                {availableVoices.map((v) => (
                  <button
                    key={v.voiceURI}
                    onClick={() => {
                      onUpdateSettings({ voiceURI: v.voiceURI });
                      setShowVoiceMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg truncate flex items-center justify-between ${
                      audioSettings.voiceURI === v.voiceURI
                        ? 'bg-red-50 text-[#C8102E] font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{v.name}</span>
                    {v.lang.startsWith('id') && (
                      <span className="text-[10px] bg-red-100 text-red-700 px-1 rounded ml-1 font-semibold">
                        ID
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

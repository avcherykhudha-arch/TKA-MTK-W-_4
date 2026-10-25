/**
 * Mister Jo's Voice & Mathematical Speech Normalizer
 * Web Speech API wrapper with Indonesian phonetic math translation
 */

export function normalizeMathForSpeech(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // Remove LaTeX wrappers ($$, $, \(, \))
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, ' $1 ');
  text = text.replace(/\$([^\$]+)\$/g, ' $1 ');
  text = text.replace(/\\\((.*?)\\\)/g, ' $1 ');
  text = text.replace(/\\\[(.*?)\\\]/g, ' $1 ');

  // Common LaTeX commands cleanup
  text = text.replace(/\\text\{([^}]+)\}/g, ' $1 ');
  text = text.replace(/\\mathrm\{([^}]+)\}/g, ' $1 ');
  text = text.replace(/\\mathbf\{([^}]+)\}/g, ' $1 ');
  text = text.replace(/\\mathbb\{([^}]+)\}/g, ' $1 ');

  // Fractions: \frac{a}{b} -> "a per b"
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, ' $1 per $2 ');

  // Square roots: \sqrt[n]{x} or \sqrt{x}
  text = text.replace(/\\sqrt\[(\d+)\]\{([^}]+)\}/g, ' akar pangkat $1 dari $2 ');
  text = text.replace(/\\sqrt\{([^}]+)\}/g, ' akar kuadrat dari $1 ');
  text = text.replace(/√(\d+|\w+)/g, ' akar kuadrat dari $1 ');

  // Powers and superscripts
  text = text.replace(/(\w+)\^\{(\d+)\}/g, '$1 pangkat $2');
  text = text.replace(/(\w+)\^(\d+)/g, '$1 pangkat $2');
  text = text.replace(/(\w+)²/g, '$1 kuadrat');
  text = text.replace(/(\w+)³/g, '$1 pangkat tiga');
  text = text.replace(/(\w+)⁴/g, '$1 pangkat empat');
  text = text.replace(/(\w+)⁻¹/g, '$1 pangkat minus satu');
  text = text.replace(/\^\{([^}]+)\}/g, ' pangkat $1 ');

  // Subscripts: x_1 -> x satu
  text = text.replace(/(\w+)_\{?(\d+)\}?/g, '$1 sub $2');

  // Trigonometry
  text = text.replace(/\\sin\b|sin\b/g, ' sinus ');
  text = text.replace(/\\cos\b|cos\b/g, ' kosinus ');
  text = text.replace(/\\tan\b|tan\b/g, ' tangen ');
  text = text.replace(/\\cot\b|cot\b/g, ' kotangen ');
  text = text.replace(/\\sec\b|sec\b/g, ' sekan ');
  text = text.replace(/\\csc\b|csc\b/g, ' kosekan ');

  // Greek letters
  text = text.replace(/\\theta\b|θ/g, ' teta ');
  text = text.replace(/\\alpha\b|α/g, ' alfa ');
  text = text.replace(/\\beta\b|β/g, ' beta ');
  text = text.replace(/\\gamma\b|γ/g, ' gama ');
  text = text.replace(/\\pi\b|π/g, ' pi ');
  text = text.replace(/\\Delta\b|Δ/g, ' delta ');
  text = text.replace(/\\lambda\b|λ/g, ' lamda ');

  // Operators & Relations
  text = text.replace(/\\ge\b|\\geq\b|≥/g, ' lebih dari atau sama dengan ');
  text = text.replace(/\\le\b|\\leq\b|≤/g, ' kurang dari atau sama dengan ');
  text = text.replace(/\\ne\b|\\neq\b|≠/g, ' tidak sama dengan ');
  text = text.replace(/\\approx\b|≈/g, ' mendekati ');
  text = text.replace(/\\pm\b|±/g, ' plus minus ');
  text = text.replace(/\\times\b|×/g, ' kali ');
  text = text.replace(/\\cdot\b|·/g, ' dikali ');
  text = text.replace(/\\div\b|÷/g, ' dibagi ');
  text = text.replace(/\\in\b|∈/g, ' elemen dari ');
  text = text.replace(/\\subset\b|⊂/g, ' himpunan bagian dari ');
  text = text.replace(/\\cap\b|∩/g, ' irisan ');
  text = text.replace(/\\cup\b|∪/g, ' gabungan ');
  text = text.replace(/\\sum\b|∑/g, ' jumlah ');
  text = text.replace(/\\infty\b|∞/g, ' tak terhingga ');
  text = text.replace(/\\degree\b|°/g, ' derajat ');
  text = text.replace(/\\%/g, ' persen ');
  text = text.replace(/%/g, ' persen ');

  // Function notation f(x) -> "fungsi f dari x"
  text = text.replace(/\bf\(x\)/g, ' fungsi f dari x ');
  text = text.replace(/\bg\(x\)/g, ' fungsi g dari x ');
  text = text.replace(/\bh\(x\)/g, ' fungsi h dari x ');

  // Common fraction formats e.g. 1/2 -> "satu per dua", 3/4 -> "tiga per empat"
  text = text.replace(/\b(\d+)\/(\d+)\b/g, '$1 per $2');

  // Strip remaining backslashes and LaTeX braces
  text = text.replace(/\\([a-zA-Z]+)/g, ' $1 ');
  text = text.replace(/[{}]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export interface VoiceOption {
  name: string;
  lang: string;
  voiceURI: string;
  isDefault: boolean;
}

class MathSpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private isPausedState: boolean = false;
  private listeners: Set<(speaking: boolean, paused: boolean, currentText: string) => void> = new Set();
  private lastSpokenText: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(callback: (speaking: boolean, paused: boolean, currentText: string) => void) {
    this.listeners.add(callback);
    callback(this.isSpeakingState, this.isPausedState, this.lastSpokenText);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isSpeakingState, this.isPausedState, this.lastSpokenText));
  }

  public getVoices(): VoiceOption[] {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    // Prioritize id-ID voices first
    const indonesian = voices.filter(v => v.lang.startsWith('id') || v.lang === 'in_ID' || v.lang === 'id');
    const others = voices.filter(v => !v.lang.startsWith('id') && v.lang !== 'in_ID' && v.lang !== 'id');

    const mapped = [...indonesian, ...others].map(v => ({
      name: v.name,
      lang: v.lang,
      voiceURI: v.voiceURI,
      isDefault: v.lang.startsWith('id') || v.default
    }));
    return mapped;
  }

  public speak(
    rawText: string,
    options: {
      rate?: number;
      volume?: number;
      voiceURI?: string | null;
      onEnd?: () => void;
    } = {}
  ) {
    if (!this.synth) {
      console.warn('SpeechSynthesis not supported on this browser.');
      return;
    }

    this.stop();

    const normalized = normalizeMathForSpeech(rawText);
    if (!normalized.trim()) return;

    this.lastSpokenText = rawText;
    const utterance = new SpeechSynthesisUtterance(normalized);
    utterance.rate = options.rate ?? 0.95;
    utterance.volume = options.volume ?? 1.0;
    utterance.lang = 'id-ID';

    // Find voice
    const voices = this.synth.getVoices();
    if (options.voiceURI) {
      const chosen = voices.find(v => v.voiceURI === options.voiceURI);
      if (chosen) utterance.voice = chosen;
    } else {
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang === 'in_ID' || v.lang === 'id');
      if (idVoice) utterance.voice = idVoice;
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      this.isPausedState = false;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.notify();
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      // Ignore user-initiated cancellation errors
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis error:', e);
      }
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isSpeakingState && !this.isPausedState) {
      this.synth.pause();
      this.isPausedState = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.isPausedState) {
      this.synth.resume();
      this.isPausedState = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.notify();
    }
  }

  public replay(options: { rate?: number; volume?: number; voiceURI?: string | null } = {}) {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, options);
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public isPaused(): boolean {
    return this.isPausedState;
  }
}

export const mathSpeech = new MathSpeechManager();

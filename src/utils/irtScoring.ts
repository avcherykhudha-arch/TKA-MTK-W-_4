/**
 * IRT 1PL (Rasch Model) Maximum A Posteriori (MAP) Scoring Engine
 * TKA Matematika Wajib 2026: Scale 200 - 800
 */

import { ElementType, IrtScoreResult, Question, UserResponse } from '../types/quiz';

/**
 * Calculates item response probability P_i(theta) = 1 / (1 + exp(-(theta - b_i)))
 */
export function raschProb(theta: number, b: number): number {
  const z = theta - b;
  if (z > 20) return 1;
  if (z < -20) return 0;
  return 1 / (1 + Math.exp(-z));
}

/**
 * Solves for theta using Newton-Raphson MAP with standard normal prior N(0, 1)
 * f(theta) = sum(x_i - P_i(theta)) - theta = 0
 * f'(theta) = -sum(P_i * (1 - P_i)) - 1 < 0
 */
export function estimateThetaMAP(
  items: { b: number; score: number }[],
  initialTheta: number = 0.0,
  maxIterations: number = 25,
  tolerance: number = 1e-4
): number {
  if (items.length === 0) return 0;

  let theta = initialTheta;

  for (let iter = 0; iter < maxIterations; iter++) {
    let f = -theta; // Prior derivative d/dtheta (-theta^2 / 2)
    let fPrime = -1.0; // Prior second derivative

    for (const item of items) {
      const p = raschProb(theta, item.b);
      f += (item.score - p);
      fPrime -= (p * (1 - p));
    }

    if (Math.abs(f) < tolerance) {
      break;
    }

    const step = f / fPrime;
    theta = theta - step;

    // Safety clamps during iteration
    if (theta > 3.5) theta = 3.5;
    if (theta < -3.5) theta = -3.5;

    if (Math.abs(step) < tolerance) {
      break;
    }
  }

  return Math.max(-3.0, Math.min(3.0, theta));
}

/**
 * Converts theta to standardized 200 - 800 score
 */
export function thetaToTkaScore(theta: number): number {
  const clamped = Math.max(-3.0, Math.min(3.0, theta));
  const rawScore = 200 + 600 * ((clamped + 3.0) / 6.0);
  return Math.round(Math.max(200, Math.min(800, rawScore)));
}

/**
 * Qualitative label based on TKA 200-800 score
 */
export function getScoreLabel(score: number): string {
  if (score >= 720) return 'Tingkat Mahir Unggul (Mastery Superior)';
  if (score >= 630) return 'Tingkat Cakap Penalaran (Competent)';
  if (score >= 520) return 'Tingkat Berkembang (Developing)';
  if (score >= 400) return 'Tingkat Dasar (Foundational)';
  return 'Perlu Penguatan Konsep Awal';
}

/**
 * Evaluates a user response against the question's correct answer
 */
export function evaluateUserResponse(
  question: Question,
  userResp: {
    selectedSingle?: number;
    selectedMultiple?: number[];
    selectedTrueFalse?: (boolean | null)[];
  }
): { isCorrectFully: boolean; partialScore: number } {
  if (question.questionType === 'single_choice') {
    const isCorrect = userResp.selectedSingle === question.correctAnswer;
    return {
      isCorrectFully: isCorrect,
      partialScore: isCorrect ? 1.0 : 0.0
    };
  }

  if (question.questionType === 'multiple_choice') {
    const correctArr = (question.correctAnswer as number[]).slice().sort();
    const userArr = (userResp.selectedMultiple || []).slice().sort();
    
    // Exact match required for full credit in TKA complex PG
    const isExact = 
      correctArr.length === userArr.length &&
      correctArr.every((val, idx) => val === userArr[idx]);
    
    return {
      isCorrectFully: isExact,
      partialScore: isExact ? 1.0 : 0.0
    };
  }

  if (question.questionType === 'true_false_matrix') {
    const correctBools = question.correctAnswer as boolean[];
    const userBools = userResp.selectedTrueFalse || [null, null, null];
    
    let correctCount = 0;
    for (let i = 0; i < 3; i++) {
      if (userBools[i] !== null && userBools[i] === correctBools[i]) {
        correctCount++;
      }
    }

    const partial = correctCount / 3.0;
    return {
      isCorrectFully: correctCount === 3,
      partialScore: partial
    };
  }

  return { isCorrectFully: false, partialScore: 0.0 };
}

/**
 * Computes comprehensive IRT scoring and diagnostic report
 */
export function calculateIrtReport(
  questions: Question[],
  responses: Record<string, UserResponse>
): IrtScoreResult {
  const elements: ElementType[] = [
    'Bilangan',
    'Aljabar',
    'Geometri dan Pengukuran',
    'Trigonometri',
    'Data dan Peluang'
  ];

  const breakdown = elements.reduce((acc, el) => {
    acc[el] = {
      total: 0,
      answered: 0,
      fullyCorrect: 0,
      earnedScore: 0,
      percentage: 0
    };
    return acc;
  }, {} as IrtScoreResult['elementBreakdown']);

  const answeredItems: { b: number; score: number }[] = [];
  let totalAnswered = 0;
  let totalFullyCorrect = 0;
  let totalEarnedScore = 0;

  for (const q of questions) {
    breakdown[q.element].total++;
    const resp = responses[q.id];

    if (resp && resp.submitted) {
      totalAnswered++;
      breakdown[q.element].answered++;
      breakdown[q.element].earnedScore += resp.partialScore;
      totalEarnedScore += resp.partialScore;

      if (resp.isCorrectFully) {
        totalFullyCorrect++;
        breakdown[q.element].fullyCorrect++;
      }

      answeredItems.push({
        b: q.difficultyParameter,
        score: resp.partialScore
      });
    }
  }

  // Calculate percentages per element
  for (const el of elements) {
    const elData = breakdown[el];
    elData.percentage = elData.answered > 0
      ? Math.round((elData.earnedScore / elData.answered) * 100)
      : 0;
  }

  if (totalAnswered === 0) {
    return {
      theta: 0,
      score: 0,
      scoreLabel: 'Belum Ada Latihan yang Dikirim',
      totalAnswered: 0,
      totalFullyCorrect: 0,
      averageScorePercentage: 0,
      elementBreakdown: breakdown,
      strengths: [],
      needsImprovement: [],
      recommendations: [
        'Pilih soal nomor 1 untuk memulai latihan bersama Mister Jo.',
        'Dengarkan narasi stimulus untuk memahami konteks sebelum menghitung.'
      ]
    };
  }

  // Compute theta
  const theta = estimateThetaMAP(answeredItems);
  const score = thetaToTkaScore(theta);
  const scoreLabel = getScoreLabel(score);
  const averageScorePercentage = Math.round((totalEarnedScore / totalAnswered) * 100);

  // Identify strengths & weaknesses
  const sortedByPercent = elements
    .filter(el => breakdown[el].answered > 0)
    .sort((a, b) => breakdown[b].percentage - breakdown[a].percentage);

  const strengths: string[] = [];
  const needsImprovement: string[] = [];
  const recommendations: string[] = [];

  for (const el of sortedByPercent) {
    if (breakdown[el].percentage >= 70) {
      strengths.push(`${el} (${breakdown[el].percentage}% keberhasilan) — Penguasaan model dan penalaran sangat baik.`);
    } else if (breakdown[el].percentage < 60) {
      needsImprovement.push(`${el} (${breakdown[el].percentage}% keberhasilan) — Perlu latihan strategi eliminasi dan pembacaan batasan.`);
    }
  }

  if (strengths.length === 0 && totalAnswered >= 3) {
    strengths.push('Ketekunan dalam menganalisis soal-soal bernalar tinggi.');
  }

  if (needsImprovement.length === 0 && totalAnswered >= 3) {
    needsImprovement.push('Pertahankan ketelitian pada soal bertingkat penalaran sangat sulit.');
  }

  // Recommendations
  if (score >= 700) {
    recommendations.push('Kemampuan analisismu luar biasa! Fokuskan pada efisiensi waktu dengan Cara Cepat Mister Jo.');
    recommendations.push('Tinjau kembali analisis distraktor untuk memahami jebakan logika paling halus.');
  } else if (score >= 550) {
    recommendations.push('Dasar analisismu sudah kuat. Latih kemampuan memilah informasi berlebih pada stimulus teks panjang.');
    recommendations.push('Bandingkan Cara Normal dan Cara Cepat di setiap pembahasan untuk memperluas variasi sudut pandang.');
  } else {
    recommendations.push('Gunakan tombol "Jelaskan Lebih Sederhana" pada setiap pembahasan untuk memperkuat konsep fondasi.');
    recommendations.push('Dengarkan pembacaan stimulus oleh Mister Jo dengan saksama agar tidak ada batasan soal yang terlewat.');
    recommendations.push('Pada soal Benar/Salah, uji masing-masing pernyataan dengan contoh batas ekstrem.');
  }

  return {
    theta,
    score,
    scoreLabel,
    totalAnswered,
    totalFullyCorrect,
    averageScorePercentage,
    elementBreakdown: breakdown,
    strengths,
    needsImprovement,
    recommendations
  };
}

import { Question } from '../types/quiz';
import { questionsBilangan } from './questions_bilangan';
import { questionsAljabar } from './questions_aljabar';
import { questionsGeometri } from './questions_geometri';
import { questionsTrigonometri } from './questions_trigonometri';
import { questionsDataPeluang } from './questions_datapeluang';

export const allQuestions: Question[] = [
  ...questionsBilangan,
  ...questionsAljabar,
  ...questionsGeometri,
  ...questionsTrigonometri,
  ...questionsDataPeluang
];

/**
 * Validates the strict distribution and integrity contract of the 30 questions
 */
export function validateQuestionsIntegrity(): {
  isValid: boolean;
  totalCount: number;
  elementCounts: Record<string, number>;
  typeCounts: Record<string, number>;
  errors: string[];
} {
  const errors: string[] = [];
  const elementCounts: Record<string, number> = {
    'Bilangan': 0,
    'Aljabar': 0,
    'Geometri dan Pengukuran': 0,
    'Trigonometri': 0,
    'Data dan Peluang': 0
  };

  const typeCounts: Record<string, number> = {
    'single_choice': 0,
    'multiple_choice': 0,
    'true_false_matrix': 0
  };

  const idSet = new Set<string>();

  allQuestions.forEach((q, idx) => {
    // Check ID uniqueness
    if (idSet.has(q.id)) {
      errors.push(`Duplicate question id: ${q.id}`);
    }
    idSet.add(q.id);

    // Check numbering sequence
    if (q.number !== idx + 1) {
      errors.push(`Question at index ${idx} has mismatched number ${q.number} (expected ${idx + 1})`);
    }

    // Check element
    if (elementCounts[q.element] !== undefined) {
      elementCounts[q.element]++;
    } else {
      errors.push(`Invalid element: ${q.element} in question #${q.number}`);
    }

    // Check question type
    if (typeCounts[q.questionType] !== undefined) {
      typeCounts[q.questionType]++;
    } else {
      errors.push(`Invalid questionType: ${q.questionType} in question #${q.number}`);
    }

    // Check cognitive level
    if (q.cognitiveLevel !== 'REASONING') {
      errors.push(`Question #${q.number} must have cognitiveLevel 'REASONING'`);
    }

    // Check options/statements structure
    if (q.questionType === 'single_choice' || q.questionType === 'multiple_choice') {
      if (!q.options || q.options.length !== 5) {
        errors.push(`Question #${q.number} must have exactly 5 options (found ${q.options?.length})`);
      }
    }

    if (q.questionType === 'single_choice') {
      if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 4) {
        errors.push(`Question #${q.number} must have single number correctAnswer between 0 and 4`);
      }
    }

    if (q.questionType === 'multiple_choice') {
      if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length < 2 || q.correctAnswer.length > 3) {
        errors.push(`Question #${q.number} multiple_choice must have 2 or 3 correct answers (found ${Array.isArray(q.correctAnswer) ? q.correctAnswer.length : 0})`);
      }
    }

    if (q.questionType === 'true_false_matrix') {
      if (!q.statements || q.statements.length !== 3) {
        errors.push(`Question #${q.number} must have exactly 3 statements (found ${q.statements?.length})`);
      }
      if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length !== 3) {
        errors.push(`Question #${q.number} true_false_matrix must have exactly 3 boolean correctAnswers`);
      }
    }

    // Check normal and quick solution presence
    if (!q.normalSolution || !q.normalSolution.steps || q.normalSolution.steps.length === 0) {
      errors.push(`Question #${q.number} missing normal solution steps`);
    }

    if (!q.quickSolution || !q.quickSolution.steps || q.quickSolution.steps.length === 0) {
      errors.push(`Question #${q.number} missing quick solution steps`);
    }

    // Check narration completeness
    if (!q.narration || !q.narration.stimulus || !q.narration.question) {
      errors.push(`Question #${q.number} missing vital narration fields`);
    }
  });

  if (allQuestions.length !== 30) {
    errors.push(`Total question count must be exactly 30 (current: ${allQuestions.length})`);
  }

  // Check 6 questions per element
  for (const [el, count] of Object.entries(elementCounts)) {
    if (count !== 6) {
      errors.push(`Element '${el}' must have exactly 6 questions (found ${count})`);
    }
  }

  // Check 10 of each type
  for (const [t, count] of Object.entries(typeCounts)) {
    if (count !== 10) {
      errors.push(`Question type '${t}' must have exactly 10 questions (found ${count})`);
    }
  }

  return {
    isValid: errors.length === 0,
    totalCount: allQuestions.length,
    elementCounts,
    typeCounts,
    errors
  };
}

export function getQuestionByNumber(num: number): Question | undefined {
  return allQuestions.find(q => q.number === num);
}

export function getQuestionsByElement(element: string): Question[] {
  return allQuestions.filter(q => q.element === element);
}

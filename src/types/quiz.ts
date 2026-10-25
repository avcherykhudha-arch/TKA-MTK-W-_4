/**
 * Types for MISTER JO — TKA MATEMATIKA MASTERCLASS 2026
 */

export type ElementType = 
  | 'Bilangan'
  | 'Aljabar'
  | 'Geometri dan Pengukuran'
  | 'Trigonometri'
  | 'Data dan Peluang';

export type CognitiveLevel = 'REASONING';

export type DifficultyLabel = 'Penalaran Menantang' | 'Penalaran Sulit' | 'Penalaran Sangat Sulit';

export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false_matrix';

export interface VisualData {
  type: 'svg' | 'table' | 'none';
  svgType?: 
    | 'financial_compound'
    | 'exponent_comparison'
    | 'percentage_chart'
    | 'geometric_pack'
    | 'rational_function'
    | 'linear_programming'
    | 'composite_flow'
    | 'quadratic_parabola'
    | 'similar_triangles'
    | 'park_plan'
    | 'truss_elevation'
    | 'spatial_prism'
    | 'cube_distance'
    | 'coordinate_transform'
    | 'elevation_angle'
    | 'trig_unit_circle'
    | 'right_triangle_ratios'
    | 'shadow_building'
    | 'roof_truss'
    | 'inaccessible_river'
    | 'box_plot_compare'
    | 'misleading_axis_chart'
    | 'seating_round_table'
    | 'probability_tree'
    | 'venn_probability';
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
  altText: string;
}

export interface StatementItem {
  id: string;
  statement: string;
  reason: string;
}

export interface SolutionStep {
  title: string;
  explanation: string;
  mathFormula?: string;
}

export interface NarrationData {
  introduction: string;
  stimulus: string;
  question: string;
  options: string;
  preAnswerGuidance: string;
  correctFeedback: string;
  incorrectFeedback: string;
  normalIntroduction: string;
  normalSteps: SolutionStep[];
  normalConclusion: string;
  quickIntroduction: string;
  quickSteps: SolutionStep[];
  quickConclusion: string;
  misconception: string;
  simplerExplanation: string;
  nextQuestion: string;
}

export interface Question {
  id: string;
  number: number;
  element: ElementType;
  subtopic: string;
  cognitiveLevel: CognitiveLevel;
  reasoningIndicator: string;
  difficultyLabel: DifficultyLabel;
  difficultyParameter: number; // IRT b_i (-2.2 to +2.2)
  questionType: QuestionType;
  stimulus: string;
  stimulusType: 'narrative_table' | 'narrative_graph' | 'narrative_diagram' | 'case_study';
  visualData: VisualData;
  questionText: string;
  options?: string[]; // 5 options for single_choice & multiple_choice
  statements?: StatementItem[]; // 3 statements for true_false_matrix
  // Correct answers:
  // single_choice: number (0-4)
  // multiple_choice: number[] (e.g. [0, 2])
  // true_false_matrix: boolean[] (3 booleans)
  correctAnswer: number | number[] | boolean[];
  normalSolution: {
    steps: SolutionStep[];
    conclusion: string;
  };
  quickSolution: {
    strategyName: string;
    steps: SolutionStep[];
    conclusion: string;
  };
  optionExplanations: {
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  misconceptions: string[];
  keyTakeaway: string;
  narration: NarrationData;
}

export interface UserResponse {
  questionId: string;
  submitted: boolean;
  selectedSingle?: number;
  selectedMultiple?: number[];
  selectedTrueFalse?: (boolean | null)[];
  isCorrectFully: boolean;
  partialScore: number; // 0 to 1
  timeSpentSeconds: number;
  submittedAt?: string;
}

export interface AudioSettings {
  enabled: boolean;
  rate: number; // 0.8 to 1.3
  volume: number; // 0 to 1
  voiceURI: string | null;
  autoPlayOnNavigate: boolean;
}

export interface StudentProfile {
  name: string;
  targetSchoolOrMajor: string;
}

export interface AppState {
  version: number;
  profile: StudentProfile;
  currentQuestionNumber: number;
  responses: Record<string, UserResponse>;
  audioSettings: AudioSettings;
  activeView: 'practice' | 'dashboard' | 'instructions' | 'review';
}

export interface IrtScoreResult {
  theta: number;
  score: number; // 200 - 800
  scoreLabel: string;
  totalAnswered: number;
  totalFullyCorrect: number;
  averageScorePercentage: number;
  elementBreakdown: Record<ElementType, {
    total: number;
    answered: number;
    fullyCorrect: number;
    earnedScore: number;
    percentage: number;
  }>;
  strengths: string[];
  needsImprovement: string[];
  recommendations: string[];
}

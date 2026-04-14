export type QuestionCategory = "behavioral" | "case" | "situational";
export type Difficulty = "easy" | "medium" | "hard";
export type InterviewStep = "setup" | "answering" | "feedback";
export type AnswerMode = "free-form" | "multiple-choice";
export type InterviewMode = "category" | "job-description";

export interface Question {
  id: string;
  text: string;
  type: QuestionCategory;
  difficulty: Difficulty;
  multipleChoiceOptions: string[];
  context?: string;
}

export interface STARComponent {
  score: number;
  feedback: string;
}

export interface STAREvaluation {
  situation: STARComponent;
  task: STARComponent;
  action: STARComponent;
  result: STARComponent;
}

export interface FeedbackResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  starEvaluation?: STAREvaluation;
  suggestedAnswer: string;
}

export interface GenerateQuestionsRequest {
  mode: InterviewMode;
  category?: QuestionCategory;
  difficulty?: Difficulty;
  jobDescription?: string;
  count?: number;
}

export interface EvaluateAnswerRequest {
  question: {
    text: string;
    type: QuestionCategory;
    difficulty: Difficulty;
  };
  answer: {
    mode: AnswerMode;
    text: string;
  };
  jobDescription?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface InterviewState {
  step: InterviewStep;
  mode: InterviewMode;
  category: QuestionCategory;
  difficulty: Difficulty;
  jobDescription: string;
  currentQuestion: Question | null;
  answerMode: AnswerMode;
  answerText: string;
  selectedOption: string;
  feedback: FeedbackResult | null;
  isGenerating: boolean;
  isEvaluating: boolean;
  error: string | null;
}

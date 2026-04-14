"use client";

import { useState, useCallback } from "react";
import {
  InterviewState,
  QuestionCategory,
  Difficulty,
  AnswerMode,
  InterviewMode,
  Question,
  FeedbackResult,
  ApiResponse,
} from "@/lib/types";

const initialState: InterviewState = {
  step: "setup",
  mode: "category",
  category: "behavioral",
  difficulty: "medium",
  jobDescription: "",
  currentQuestion: null,
  answerMode: "free-form",
  answerText: "",
  selectedOption: "",
  feedback: null,
  isGenerating: false,
  isEvaluating: false,
  error: null,
};

export function useInterview() {
  const [state, setState] = useState<InterviewState>(initialState);

  const setMode = useCallback((mode: InterviewMode) => {
    setState((s) => ({ ...s, mode, error: null }));
  }, []);

  const setCategory = useCallback((category: QuestionCategory) => {
    setState((s) => ({ ...s, category, error: null }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState((s) => ({ ...s, difficulty, error: null }));
  }, []);

  const setJobDescription = useCallback((jobDescription: string) => {
    setState((s) => ({ ...s, jobDescription, error: null }));
  }, []);

  const setAnswerMode = useCallback((answerMode: AnswerMode) => {
    setState((s) => ({ ...s, answerMode, answerText: "", selectedOption: "", error: null }));
  }, []);

  const setAnswerText = useCallback((answerText: string) => {
    setState((s) => ({ ...s, answerText }));
  }, []);

  const setSelectedOption = useCallback((selectedOption: string) => {
    setState((s) => ({ ...s, selectedOption }));
  }, []);

  const generateQuestion = useCallback(async () => {
    setState((s) => ({ ...s, isGenerating: true, error: null }));

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: state.mode,
          category: state.mode === "category" ? state.category : undefined,
          difficulty: state.mode === "category" ? state.difficulty : undefined,
          jobDescription: state.mode === "job-description" ? state.jobDescription : undefined,
          count: 1,
        }),
      });

      const data: ApiResponse<{ questions: Question[] }> = await res.json();

      if (!data.success || !data.data?.questions?.length) {
        throw new Error(data.error || "No questions generated");
      }

      setState((s) => ({
        ...s,
        currentQuestion: data.data!.questions[0],
        step: "answering",
        isGenerating: false,
        answerText: "",
        selectedOption: "",
        answerMode: "free-form",
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        isGenerating: false,
        error: error instanceof Error ? error.message : "Failed to generate question",
      }));
    }
  }, [state.mode, state.category, state.difficulty, state.jobDescription]);

  const submitAnswer = useCallback(async () => {
    if (!state.currentQuestion) return;

    const answerText =
      state.answerMode === "free-form" ? state.answerText : state.selectedOption;

    if (!answerText.trim()) return;

    setState((s) => ({ ...s, isEvaluating: true, error: null }));

    try {
      const res = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: {
            text: state.currentQuestion.text,
            type: state.currentQuestion.type,
            difficulty: state.currentQuestion.difficulty,
          },
          answer: {
            mode: state.answerMode,
            text: answerText,
          },
          jobDescription: state.mode === "job-description" ? state.jobDescription : undefined,
        }),
      });

      const data: ApiResponse<FeedbackResult> = await res.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || "Failed to evaluate answer");
      }

      setState((s) => ({
        ...s,
        feedback: data.data!,
        step: "feedback",
        isEvaluating: false,
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        isEvaluating: false,
        error: error instanceof Error ? error.message : "Failed to evaluate answer",
      }));
    }
  }, [
    state.currentQuestion,
    state.answerMode,
    state.answerText,
    state.selectedOption,
    state.mode,
    state.jobDescription,
  ]);

  const reset = useCallback(() => {
    setState((s) => ({
      ...initialState,
      mode: s.mode,
      category: s.category,
      difficulty: s.difficulty,
      jobDescription: s.jobDescription,
    }));
  }, []);

  return {
    state,
    setMode,
    setCategory,
    setDifficulty,
    setJobDescription,
    setAnswerMode,
    setAnswerText,
    setSelectedOption,
    generateQuestion,
    submitAnswer,
    reset,
  };
}

import { QuestionCategory, Difficulty } from "./types";

export const CATEGORIES: { value: QuestionCategory; label: string; description: string }[] = [
  {
    value: "behavioral",
    label: "Behavioral (STAR)",
    description: "Past experiences in deal evaluation, cross-functional collaboration, and strategic decision-making",
  },
  {
    value: "case",
    label: "Case Study",
    description: "Pharma M&A scenarios, licensing deals, pipeline valuation, and build-vs-buy analysis",
  },
  {
    value: "situational",
    label: "Situational Judgment",
    description: "Corporate development dilemmas involving competing bids, integration planning, and portfolio prioritization",
  },
];

export const DIFFICULTIES: { value: Difficulty; label: string; description: string }[] = [
  {
    value: "easy",
    label: "Easy",
    description: "General corporate development concepts and fundamentals",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Requires therapeutic area knowledge and industry context",
  },
  {
    value: "hard",
    label: "Hard",
    description: "Deep drug development economics and regulatory strategy",
  },
];

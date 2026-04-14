import { QuestionCategory, Difficulty, AnswerMode } from "./types";

const PERSONA_PREAMBLE = `You are an expert interview coach specializing in corporate development roles at biotech and pharmaceutical companies. You have deep expertise in life sciences M&A, licensing deals, pipeline valuations, FDA regulatory strategy, clinical trial economics, and IP/patent landscapes.

The candidate you are coaching has a technical background with experience building AI-powered healthcare applications (including OncoMatch, a cancer patient-oncologist matching platform). They are preparing for corporate development roles in the life sciences industry, focusing on M&A, licensing, and strategic partnerships. Tailor all questions and feedback to the biotech/pharma corp dev context.`;

export function buildQuestionPrompt(
  mode: "category" | "job-description",
  category?: QuestionCategory,
  difficulty?: Difficulty,
  jobDescription?: string,
  count: number = 1
): string {
  if (mode === "job-description" && jobDescription) {
    return `${PERSONA_PREAMBLE}

The candidate is preparing for this specific role:
---
${jobDescription}
---

Generate ${count} interview question(s) that are highly relevant to this specific role in the biotech/pharma industry. Vary between behavioral, case, and situational types. The question should test competencies directly mentioned or implied by the job description, with a focus on life sciences corporate development skills.

For each question, also generate 4 multiple-choice answer options where:
- 1 is clearly the strongest response (demonstrates deep industry knowledge and strategic thinking)
- 1 is reasonable but incomplete (missing key pharma/biotech considerations)
- 1 is mediocre (generic answer that doesn't show life sciences expertise)
- 1 is a common mistake or weak response
Shuffle the order randomly.

Include a brief "context" field explaining why this question is relevant to the specific role.

You MUST respond with valid JSON only, no markdown formatting or code blocks. Use this exact format:
{"questions": [{"text": "question text", "type": "behavioral|case|situational", "difficulty": "easy|medium|hard", "multipleChoiceOptions": ["option1", "option2", "option3", "option4"], "context": "why this is relevant"}]}`;
  }

  const categoryGuide: Record<QuestionCategory, string> = {
    behavioral: `Use the STAR framework. Ask about specific past experiences relevant to biotech/pharma corporate development.
Easy = common corp dev topics (teamwork on a deal, managing stakeholders, presenting to leadership).
Medium = life sciences-specific (evaluating a biotech target's pipeline, navigating FDA regulatory considerations in deal structuring, cross-functional collaboration with R&D teams).
Hard = complex scenarios (ethical dilemmas in pharma M&A, managing a hostile takeover bid for a biotech company, leading integration of a gene therapy platform post-acquisition).`,
    case: `Present a business scenario requiring structured analysis in the biotech/pharma context.
Easy = straightforward market sizing or basic valuation (size the US oncology market, value a single-product biotech).
Medium = multi-dimensional strategy (evaluate a licensing deal for a Phase 2 oncology asset, assess build-vs-buy for a cell therapy platform).
Hard = ambiguous multi-stakeholder problems (competing acquisition targets with different risk profiles across therapeutic areas, portfolio optimization with patent cliff considerations).`,
    situational: `Present hypothetical "what would you do" scenarios in a biotech/pharma corp dev context.
Easy = common workplace situations (prioritizing multiple deal opportunities, managing a tight diligence timeline).
Medium = competing priorities with tradeoffs (a promising target's Phase 3 data readout is imminent but your board wants a decision now, balancing deal speed with thorough scientific diligence).
Hard = novel situations with incomplete information (unexpected FDA Complete Response Letter during acquisition closing, key opinion leader raises safety concerns about a target's lead asset mid-diligence).`,
  };

  return `${PERSONA_PREAMBLE}

Generate ${count} ${difficulty}-level ${category} interview question(s) for a biotech/pharma corporate development role.

Guidelines for ${category} questions:
${categoryGuide[category!]}

For each question, also generate 4 multiple-choice answer options where:
- 1 is clearly the strongest response (demonstrates deep industry knowledge and strategic thinking)
- 1 is reasonable but incomplete (missing key pharma/biotech considerations)
- 1 is mediocre (generic answer that doesn't show life sciences expertise)
- 1 is a common mistake or weak response
Shuffle the order randomly.

You MUST respond with valid JSON only, no markdown formatting or code blocks. Use this exact format:
{"questions": [{"text": "question text", "type": "${category}", "difficulty": "${difficulty}", "multipleChoiceOptions": ["option1", "option2", "option3", "option4"]}]}`;
}

export function buildEvaluationPrompt(
  questionText: string,
  questionType: QuestionCategory,
  questionDifficulty: Difficulty,
  answerText: string,
  answerMode: AnswerMode,
  jobDescription?: string
): string {
  const starSection =
    questionType === "behavioral"
      ? `
"starEvaluation": Rate each STAR component 1-10 with specific feedback:
  - "situation": Did they set clear context about the biotech/pharma scenario? (provide {"score": number, "feedback": "text"})
  - "task": Did they define their specific responsibility in the deal or project? (provide {"score": number, "feedback": "text"})
  - "action": Did they describe concrete steps THEY took (not the team)? Did they demonstrate life sciences expertise? (provide {"score": number, "feedback": "text"})
  - "result": Did they quantify outcomes (deal value, timeline, strategic impact) and reflect on learning? (provide {"score": number, "feedback": "text"})`
      : "";

  const mcNote =
    answerMode === "multiple-choice"
      ? `\nThe candidate chose from multiple-choice options. Evaluate whether they chose the strongest option and briefly explain why each option ranks the way it does.`
      : "";

  return `${PERSONA_PREAMBLE}

The candidate was asked this ${questionType} question (${questionDifficulty} difficulty):
"${questionText}"

Their answer (${answerMode}):
"${answerText}"
${mcNote}
${jobDescription ? `\nThis was for the following role:\n${jobDescription}\n` : ""}

Evaluate this answer thoroughly from the perspective of a biotech/pharma corporate development interviewer. Consider whether the answer demonstrates:
- Understanding of life sciences industry dynamics (regulatory, clinical, commercial)
- Strategic thinking relevant to pharma M&A and partnerships
- Quantitative reasoning and deal evaluation skills
- Cross-functional awareness (R&D, Commercial, Regulatory, Legal)

Provide your evaluation with:
1. "overallScore": 1-10 (where 7+ would pass a real interview)
2. "summary": 2-3 sentence overall assessment
3. "strengths": Array of 3-5 bullet points of what they did well
4. "improvements": Array of 3-5 specific, actionable suggestions for improvement
${starSection}
5. "suggestedAnswer": Write a strong example answer (150-250 words) that demonstrates best practices for this question type in a biotech/pharma corp dev context

You MUST respond with valid JSON only, no markdown formatting or code blocks. Use this exact format:
{"overallScore": number, "summary": "text", "strengths": ["point1", "point2"], "improvements": ["point1", "point2"], ${questionType === "behavioral" ? '"starEvaluation": {"situation": {"score": number, "feedback": "text"}, "task": {"score": number, "feedback": "text"}, "action": {"score": number, "feedback": "text"}, "result": {"score": number, "feedback": "text"}}, ' : ""}"suggestedAnswer": "text"}`;
}

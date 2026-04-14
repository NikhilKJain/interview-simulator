import { NextRequest } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { buildEvaluationPrompt } from "@/lib/prompts";
import { EvaluateAnswerRequest, FeedbackResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: EvaluateAnswerRequest = await request.json();
    const { question, answer, jobDescription } = body;

    if (!question?.text || !answer?.text) {
      return Response.json(
        { success: false, error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const prompt = buildEvaluationPrompt(
      question.text,
      question.type,
      question.difficulty,
      answer.text,
      answer.mode,
      jobDescription
    );

    const client = getAnthropicClient();

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return Response.json(
        { success: false, error: "Unexpected response format from AI" },
        { status: 500 }
      );
    }

    const cleanedText = content.text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
    const feedback: FeedbackResult = JSON.parse(cleanedText);

    return Response.json({ success: true, data: feedback });
  } catch (error) {
    console.error("Evaluate answer error:", error);
    const message = error instanceof Error ? error.message : "Failed to evaluate answer";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}

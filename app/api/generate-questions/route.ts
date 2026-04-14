import { NextRequest } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { buildQuestionPrompt } from "@/lib/prompts";
import { GenerateQuestionsRequest, Question } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: GenerateQuestionsRequest = await request.json();
    const { mode, category, difficulty, jobDescription, count = 1 } = body;

    if (mode === "category" && (!category || !difficulty)) {
      return Response.json(
        { success: false, error: "Category and difficulty are required for category mode" },
        { status: 400 }
      );
    }

    if (mode === "job-description" && !jobDescription) {
      return Response.json(
        { success: false, error: "Job description is required for job-description mode" },
        { status: 400 }
      );
    }

    const prompt = buildQuestionPrompt(mode, category, difficulty, jobDescription, count);
    const client = getAnthropicClient();

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return Response.json(
        { success: false, error: "Unexpected response format from AI" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(content.text);
    const questions: Question[] = parsed.questions.map(
      (q: Omit<Question, "id">, i: number) => ({
        ...q,
        id: `q-${Date.now()}-${i}`,
      })
    );

    return Response.json({ success: true, data: { questions } });
  } catch (error) {
    console.error("Generate questions error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate questions";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}

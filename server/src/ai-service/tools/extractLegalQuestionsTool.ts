// ai-service/tools/extractLegalQuestion.ts
import { z } from "zod";
import { DynamicStructuredTool } from "langchain/tools";
import prisma from "@lib/prisma";
import llm from "@ai/llm/openRouterLLM";

export const extractLegalQuestionTool = new DynamicStructuredTool({
  name: "extract_legal_question",
  description:
    "Extracts legal questions from a user's message and saves to the database.",
  schema: z.object({
    message: z.string().describe("The full message from the user"),
    userId: z.number().describe("The user's ID"),
    contractId: z.number().describe("The contract ID this question relates to"),
  }),
  func: async ({ message, userId, contractId }) => {
    const extractedQuestion = await llm.invoke([
      {
        role: "system",
        content:
          "Extract a legal question from the message. Return null if it isn't a legal question.",
      },
      {
        role: "user",
        content: message,
      },
    ]);

    const trimmed = extractedQuestion.content.toString().trim();
    if (!trimmed || trimmed.toLowerCase() === "null") {
      return "No legal question found in the message.";
    }

    const saved = await prisma.question.create({
      data: {
        question: trimmed,
        answer: "To be answered...",
        contractId,
        userId,
      },
    });

    return `Saved legal question: "${trimmed}" with ID ${saved.id}`;
  },
});

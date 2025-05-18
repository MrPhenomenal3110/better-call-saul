import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

export const intentParser = StructuredOutputParser.fromZodSchema(
  z.object({
    intents: z
      .array(
        z.enum([
          "basic",
          "clause-analysis",
          "checklist",
          "loophole-detector",
          "pdf-chat",
        ])
      )
      .describe("List of relevant user intents"),
  })
);

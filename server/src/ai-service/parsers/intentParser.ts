import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

export const intentParser = StructuredOutputParser.fromZodSchema(
  z.object({
    intents: z
      .array(
        z.enum(["general", "summary", "qa", "checklist", "loophole", "setName"])
      )
      .describe("List of relevant user intents"),
  })
);

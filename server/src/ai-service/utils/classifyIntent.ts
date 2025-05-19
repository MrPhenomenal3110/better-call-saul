import classifierLLM from "@ai/llm/classifierLLM";
import { intentParser } from "@ai/parsers/intentParser";
import { HumanMessage } from "@langchain/core/messages";
import { PromptStrategyType } from "@models/promptStrategy";

export const classifyIntents = async (
  input: string
): Promise<PromptStrategyType[]> => {
  const prompt = `
  You are a legal chatbot intent classifier.
  If user has provided their name for the first time in the conversation, then setName is one valid intent.
  
  Given this user input, identify all applicable intent categories from the following:
  
  - "general"
  - "summary"
  - "checklist"
  - "loophole"
  - "qa"
  - "setName"
  
  Respond strictly as a JSON object with this format:
  ${intentParser.getFormatInstructions()}
  
  Input:
  "${input}"
  `;

  const result = await classifierLLM.invoke([new HumanMessage(prompt)]);

  try {
    const parsed = await intentParser.parse(result.content.toString());
    console.log("parsed: ", parsed);
    return parsed.intents as PromptStrategyType[];
  } catch (err) {
    console.error("Intent parsing failed", err);
    return ["basic"];
  }
};

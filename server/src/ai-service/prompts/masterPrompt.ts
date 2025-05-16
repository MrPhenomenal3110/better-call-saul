import { ChatPromptTemplate } from "@langchain/core/prompts";

export const masterPrompt = ChatPromptTemplate.fromTemplate(
  `
    You are an AI assistant for contract analysis. When a user asks a question, decide what type of question it is and route it accordingly:
    - If the question is about legal clauses, call the 'answerLegalQuestions' tool.
    - If the user wants to generate a checklist, call the 'generateChecklist' tool.
    - If the user asks about contract loopholes, call the 'findLoopholes' tool.
    - For any other questions, provide a general answer.

    User question: {input}

    Respond with ONLY the tool name to call followed by JSON input for the tool, like this:

    Tool: answerLegalQuestions
    Input: {"question": "...", "contractId": 1, "userId": 42}

    OR if no tool should be called:

    Your answer here
`
);

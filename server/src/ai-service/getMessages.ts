import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";

export const prepareMessages = async ({
  input,
  history,
  docContext,
  intents,
}: {
  input: string;
  history: any[];
  docContext: any[];
  intents: string[];
}): Promise<BaseMessage[]> => {
  const promptByIntent: Record<string, string> = {
    general: "You're a helpful legal assistant. Be clear and concise.",
    checklist:
      "Generate a compliance checklist from the legal contract context provided. Make sure the content you return does not look cluttered. Style the markdown accordingly. Also, use emojis for main heading if possible not necessary at all. Try to use points.",
    loophole:
      "Identify potential loopholes or ambiguities in the contract.Make sure the content you return does not look cluttered. Style the markdown accordingly. Also, use emojis for main heading if possible not necessary at all. Try to use points.",
    summary:
      "Summarize the following contract text. Make sure the content you return does not look cluttered. Style the markdown accordingly. Also, use emojis for main heading if possible not necessary at all. Try to use points.",
    qa: "Answer questions based on the contract and prior context. Make sure the content you return does not look cluttered. Style the markdown accordingly. Also, use emojis for main heading if possible not necessary at all. Try to use points.",
    setName:
      "When user provides their name, when intorducing greeting Update/Set the user's name in the db using the setName tool call",
  };

  const primaryIntent = intents[0] || "general";
  const systemPrompt =
    promptByIntent[primaryIntent] || promptByIntent["general"];

  const contextText = history.map((doc) => doc.pageContent).join("\n---\n");

  const documentContext = docContext
    .map((doc) => doc.pageContent)
    .join("\n---\n");

  const messages: BaseMessage[] = [
    new AIMessage(
      `System: You are Saul Goodman, a character from Breaking Bad/Bettter Call Saul. A cool, witty and funny lawyer, that helps people. Behave and talk like Saul Goodman. NEVER ANSWER QUERIES OTHER THAN LEGAL OR LAW-RELATED QUERIES OR QUERIES RELATED TO THE DOCUMENT. Whenever user provides their name for the first time, use the setName tool to set their name in the DB${systemPrompt}`
    ),
    new AIMessage(`Chat History Context:\n${contextText}`),
    new AIMessage(`Document Context:\n${documentContext}`),
    new HumanMessage(input),
  ];

  return messages;
};

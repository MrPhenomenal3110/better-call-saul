import { createChatChain } from "./chains/basicChat";

export const invokeChat = async ({
  input,
  sessionId,
}: {
  input: string;
  sessionId: string;
}) => {
  const { chain, memory } = createChatChain(sessionId);

  const response = await chain.invoke({ input });

  await memory.saveContext({ input }, { output: response.content });

  return response;
};

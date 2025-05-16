import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import * as dotenv from "dotenv";
dotenv.config();

export const getMemory = (sessionId: string) => {
  const messageHistory = new UpstashRedisChatMessageHistory({
    sessionId,
    config: {
      url: "https://wealthy-mole-32097.upstash.io",
      token: "AX1hAAIjcDE0YjdiMDMwYWYwMmM0ZDcwYTZkMjJmODE3NzU5OGJhY3AxMA",
    },
  });

  return new BufferMemory({
    chatHistory: messageHistory,
    memoryKey: "history",
    returnMessages: true,
  });
};

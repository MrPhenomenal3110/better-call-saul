// ai-service/memory/redisMemory.ts
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { BufferMemory } from "langchain/memory";

/**
 * Creates a BufferMemory instance backed by Upstash Redis.
 * One key per sessionId → list of serialized messages.
 */
export const getRedisMemory = (sessionId: string) => {
  const history = new UpstashRedisChatMessageHistory({
    sessionId,
    config: {
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REST_TOKEN!,
    },
  });

  return new BufferMemory({
    chatHistory: history,
    memoryKey: "chat_history", // this is what loadMemoryVariables() returns
    returnMessages: true,
  });
};

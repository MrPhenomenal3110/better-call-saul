export interface ChatRequest {
  message: string;
  sessionId: number;
  userId: number;
  contractId: number;
}
export interface ConversationListRequest {
  userId: number;
}

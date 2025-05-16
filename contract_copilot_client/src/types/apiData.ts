export type AuthPayload = {
  email: string;
  password: string;
};

export type SendMessageData = {
  message: string;
  conversationId: number;
  contractId?: number;
};

// client/src/types/entities.ts

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Contract {
  id: number;
  userId: number;
  title: string;
  originalFilename: string;
  uploadPath: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: number;
  userId: number;
  contractId?: number;
  title?: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface Message {
  id: number;
  conversationId: number;
  sender: "USER" | "AI" | "TOOL" | "USER_FILE_UPLOAD";
  content: string;
  toolUsed?: string;
  createdAt: string;
}

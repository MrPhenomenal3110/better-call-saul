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

export interface ContractSection {
  id: number;
  contractId: number;
  heading: string;
  content: string;
  chunkIndex: number;
}

export interface ChecklistItem {
  id: number;
  contractId: number;
  item: string;
  status: "PENDING" | "COMPLETED" | "FLAGGED";
  addedBy: "USER" | "TOOL";
  createdAt: string;
}

export interface Loophole {
  id: number;
  contractId: number;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  flaggedBy: "USER" | "TOOL";
  createdAt: string;
}

export interface Question {
  id: number;
  contractId: number;
  userId: number;
  question: string;
  answer: string;
  createdAt: string;
  sources: Source[];
}

export interface Source {
  id: number;
  questionId: number;
  sourceType: "CASE_LAW" | "STATUTE" | "ARTICLE" | "OTHER";
  title: string;
  url?: string;
  summary: string;
}

export interface ToolExecution {
  id: number;
  contractId: number;
  userId: number;
  toolName: string;
  input: string;
  output: string;
  success: boolean;
  executedAt: string;
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
  sender: "USER" | "TOOL";
  content: string;
  toolUsed?: string;
  createdAt: string;
}

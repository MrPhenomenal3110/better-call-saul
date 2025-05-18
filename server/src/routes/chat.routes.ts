import { Router } from "express";
import {
  handleChatController,
  handleFetchConversationsController,
  handleMessagesController,
  handleCreateConversation,
} from "@controllers/chat.controller";
import { authenticate } from "@middlewares/auth.middleware";

const router = Router();

router.post("/chat", authenticate, handleChatController);
router.get("/chat/messages", authenticate, handleMessagesController);
router.get("/conversations", authenticate, handleFetchConversationsController);
router.get("/conversations/new", authenticate, handleCreateConversation);

export default router;

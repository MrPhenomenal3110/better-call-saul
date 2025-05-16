import { Router } from "express";
import {
  handleChatController,
  handleFetchConversationsController,
  handleMessagesController,
} from "@controllers/chat.controller";
import { authenticate } from "@middleware/auth.middleware";

const router = Router();

router.post("/chat", authenticate, handleChatController);
router.get("/chat/messages", authenticate, handleMessagesController);
router.get("/conversations", authenticate, handleFetchConversationsController);

export default router;

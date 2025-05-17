import type { RootState } from "@stores/index";

export const selectConversations = (state: RootState) =>
  state.conversation.conversations;
export const selectConversationLoading = (state: RootState) =>
  state.conversation.loading;
export const selectCurrentConversationId = (state: RootState) =>
  state.conversation.currentConversationId;

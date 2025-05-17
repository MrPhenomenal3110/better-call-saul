import type { RootState } from "@stores/index";

export const selectChat = (state: RootState) => state.chat;

// Then build all others on top of it
export const selectMessages = (state: RootState) => selectChat(state).messages;
export const selectChatLoading = (state: RootState) =>
  selectChat(state).loading;
export const selectChatError = (state: RootState) => selectChat(state).error;

// src/store/index.ts
import { combineReducers, type Action } from "redux";

// Import your reducers
import chatReducer from "./chat";
import conversationReducer from "./conversations";
import { configureStore, type ThunkDispatch } from "@reduxjs/toolkit";
import modalReducer from "./modal";

const rootReducer = combineReducers({
  chat: chatReducer,
  conversation: conversationReducer,
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

// src/store/index.ts
import { combineReducers, type Action } from "redux";

// Import your reducers
import chatReducer from "./chat";
import conversationReducer from "./conversations";
import { configureStore, type ThunkDispatch } from "@reduxjs/toolkit";
// import other reducers as needed
// import userReducer from './user';
// import checklistReducer from './checklist';

const rootReducer = combineReducers({
  chat: chatReducer,
  conversation: conversationReducer,
  // checklist: checklistReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Optional: export RootState type for use in useSelector
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

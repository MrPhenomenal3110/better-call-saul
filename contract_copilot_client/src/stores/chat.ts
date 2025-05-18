// src/store/chat.js
import type { Dispatch } from "redux";
import {
  createNewConversation,
  getMessages,
  sendMessage,
  uploadPdf,
} from "@api/chat";
import type { Action } from "@models/action";
import type { SendMessageData } from "@models/apiData";
import type { Message } from "@models/entities";
import type { SetURLSearchParams } from "react-router-dom";
import { fetchConversations } from "./conversations";
import type { AppDispatch } from ".";

// Action Types
const LOAD_MESSAGES = "my-app/chat/LOAD_MESSAGES";
const LOAD_MESSAGES_SUCCESS = "my-app/chat/LOAD_MESSAGES_SUCCESS";
const LOAD_MESSAGES_FAILURE = "my-app/chat/LOAD_MESSAGES_FAILURE";

const ADD_MESSAGE = "my-app/chat/ADD_MESSAGE";
const RESET_MESSAGE = "my-app/chat/RESET_MESSAGE";
const SEND_MESSAGE_SUCCESS = "my-app/chat/SEND_MESSAGE_SUCCESS";
const SEND_MESSAGE_FAILURE = "my-app/chat/SEND_MESSAGE_FAILURE";

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string;
}

// Initial State
const initialState: ChatState = {
  messages: [],
  loading: false,
  error: "",
};

// Reducer
export default function reducer(
  state: ChatState = initialState,
  action: Action
) {
  switch (action.type) {
    case LOAD_MESSAGES:
      return { ...state, loading: true, error: "" };
    case LOAD_MESSAGES_SUCCESS:
      return { ...state, loading: false, messages: action.payload };
    case LOAD_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.error };

    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    case RESET_MESSAGE:
      return { ...state, messages: [] };

    case SEND_MESSAGE_SUCCESS:
      return { ...state, messages: [...state.messages, action.payload] };

    case SEND_MESSAGE_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Action Creators
export const loadMessages = () => ({ type: LOAD_MESSAGES });
export const loadMessagesSuccess = (messages: Message[]) => ({
  type: LOAD_MESSAGES_SUCCESS,
  payload: messages,
});
export const loadMessagesFailure = (error: string) => ({
  type: LOAD_MESSAGES_FAILURE,
  error,
});

export const addMessage = (message: Message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const sendMessageSuccess = (message: Message) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: message,
});
export const sendMessageFailure = (error: string) => ({
  type: SEND_MESSAGE_FAILURE,
  error,
});
export const resetMessages = () => ({
  type: RESET_MESSAGE,
});

// Thunks (side effects)
export const fetchMessages =
  (conversationId: number) => async (dispatch: Dispatch<Action>) => {
    dispatch(loadMessages());
    try {
      const data = await getMessages(conversationId);
      dispatch(loadMessagesSuccess(data));
    } catch (e: any) {
      dispatch(loadMessagesFailure(e?.message || "Failed to load messages"));
    }
  };

export const sendHumanMessage =
  (data: SendMessageData) => async (dispatch: Dispatch<Action>) => {
    const tempMessage = {
      id: Date.now(),
      conversationId: data.conversationId,
      sender: "USER" as const,
      content: data.message,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(tempMessage));

    try {
      const aiResponse = await sendMessage(data);
      const assistantMessage = {
        id: aiResponse.kwargs.id,
        conversationId: data.conversationId,
        sender: "AI" as const,
        content: aiResponse.kwargs.content,
        createdAt: new Date().toISOString(),
      };
      dispatch(sendMessageSuccess(assistantMessage));
    } catch (e: any) {
      dispatch(sendMessageFailure(e?.message || "Failed to send message"));
    }
  };

export const uploadFile =
  (
    formData: FormData,
    toast: any,
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
  ) =>
  async (dispatch: AppDispatch) => {
    let sessionId = formData.get("sessionId");

    try {
      if (!sessionId) {
        const data = await createNewConversation();
        sessionId = data?.conversationId;
        if (sessionId) {
          searchParams.set("conversationId", sessionId.toString());
          formData.set("sessionId", sessionId.toString());
        }
      }

      const response = await uploadPdf(formData);

      if (response?.contractId && sessionId) {
        setSearchParams(searchParams);
        dispatch(fetchConversations());
      } else {
        toast.error("Error uploading PDF. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred while uploading.");
    }
  };

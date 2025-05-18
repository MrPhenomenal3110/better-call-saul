// src/store/conversation.ts
import { getConversations, createNewConversation } from "@api/chat";
import type { Dispatch } from "redux";
import type { Conversation } from "@models/entities";
import type { Action } from "@models/action";

// Action Types
const LOAD_CONVERSATIONS = "my-app/conversation/LOAD";
const LOAD_CONVERSATIONS_SUCCESS = "my-app/conversation/LOAD_SUCCESS";
const LOAD_CONVERSATIONS_FAILURE = "my-app/conversation/LOAD_FAILURE";

const CREATE_CONVERSATION_START = "my-app/conversation/CREATE_START";
const CREATE_CONVERSATION_SUCCESS = "my-app/conversation/CREATE_SUCCESS";
const CREATE_CONVERSATION_FAILURE = "my-app/conversation/CREATE_FAILURE";
const SET_CURRENT_CONVERSATION_ID =
  "my-app/conversation/SET_CURRENT_CONVERSATION_ID";

// State Type
interface ConversationState {
  conversations: Conversation[] | null;
  loading: boolean;
  error: string | null;
  currentConversationId: number | null;
}

// Initial State
const initialState: ConversationState = {
  conversations: null,
  loading: false,
  error: null,
  currentConversationId: null,
};

// Reducer
export default function reducer(
  state: ConversationState = initialState,
  action: Action
): ConversationState {
  switch (action.type) {
    case LOAD_CONVERSATIONS:
    case CREATE_CONVERSATION_START:
      return { ...state, loading: true, error: null };

    case SET_CURRENT_CONVERSATION_ID:
      return {
        ...state,
        currentConversationId: action.payload,
      };

    case LOAD_CONVERSATIONS_SUCCESS:
      return { ...state, loading: false, conversations: action.payload };

    case CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentConversationId: action.payload,
      };

    case LOAD_CONVERSATIONS_FAILURE:
    case CREATE_CONVERSATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

// Action Creators
export const loadConversations = () => ({ type: LOAD_CONVERSATIONS });
export const loadConversationsSuccess = (convs: Conversation[]) => ({
  type: LOAD_CONVERSATIONS_SUCCESS,
  payload: convs,
});
export const loadConversationsFailure = (error: string) => ({
  type: LOAD_CONVERSATIONS_FAILURE,
  payload: error,
});

export const createConversationStart = () => ({
  type: CREATE_CONVERSATION_START,
});
export const createConversationSuccess = (conversationId: number) => ({
  type: CREATE_CONVERSATION_SUCCESS,
  payload: conversationId,
});
export const createConversationFailure = (error: string) => ({
  type: CREATE_CONVERSATION_FAILURE,
  payload: error,
});
export const setcurrentConversationId = (id: number | null) => ({
  type: SET_CURRENT_CONVERSATION_ID,
  payload: id,
});

// Thunks
export const fetchConversations = () => async (dispatch: Dispatch<Action>) => {
  dispatch(loadConversations());
  try {
    const data = await getConversations();
    dispatch(loadConversationsSuccess(data));
  } catch (e: any) {
    dispatch(
      loadConversationsFailure(e?.message || "Failed to load conversations")
    );
  }
};

export const createNewConversationThunk = async (): Promise<number | null> => {
  try {
    const res = await createNewConversation();
    const newId = res.conversationId;

    return newId;
  } catch (e: any) {
    // optionally handle error
    return null;
  }
};

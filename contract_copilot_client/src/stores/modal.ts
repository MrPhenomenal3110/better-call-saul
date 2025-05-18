// src/store/chat.js
import type { Action } from "@models/action";

// Action Types
const TOGGLE_MODAL = "my-app/toggle/modal";
const UPDATE_MODALS = "my-app/toggle/modal";
const RESET_MODALS = "my-app/reset/modal";

type ModalState = Record<string, boolean>;

const initialState = {};

// Reducer
export default function modalReducer(
  state: ModalState = initialState,
  action: Action
): ModalState {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        [action.payload.id]: action.payload.value ?? !state[action.payload.id],
      };
    case UPDATE_MODALS:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_MODALS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

// Action Creators
export function toggleModal(id: string, value: boolean) {
  return {
    type: TOGGLE_MODAL,
    payload: { id, value },
  };
}

export function resetModal() {
  return {
    type: RESET_MODALS,
  };
}

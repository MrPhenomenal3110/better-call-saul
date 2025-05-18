import type { RootState } from "@stores/index";
import { MODAL_NAMES } from "@utils/constants";

export const isFileInputModalOpen = (state: RootState) =>
  state.modal[MODAL_NAMES.FILE_INPUT_MODAL];

import { CREATE_DIALOGUE, GET_ALL_DIALOGUES, DIALOGUE_ERROR, GET_DIALOGUES_BY_USER, GET_DIALOGUE_BY_ID } from "../actions/types";

const initialState = {
  dialogue: null,
  dialogues: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_DIALOGUE:
      return {
        ...state,
        dialogue: [payload, ...state.dialogue],
        loading: false
      };
    case DIALOGUE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_ALL_DIALOGUES:
      return {
        ...state,
        dialogues: payload,
        loading: false
      };
    case GET_DIALOGUES_BY_USER:
      return {
        ...state,
        dialogues:payload,
        loading:false
      }
    case GET_DIALOGUE_BY_ID:
      return {
        ...state,
        dialogue:payload,
        loading:false
      }
    default:
      return state;
  }
}

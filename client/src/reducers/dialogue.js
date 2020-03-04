import { CREATE_DIALOGUE } from "../actions/types";

const initialState = {
  dialogue: null,
  dialogues: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_DIALOGUE:
      return {
        ...state,
        profile: [payload, ...state.dialogues],
        loading: false
      };
    default:
      return state;
  }
}

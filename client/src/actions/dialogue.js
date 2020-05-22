import axios from "axios";
import { setAlert } from "./alert";
import { CREATE_DIALOGUE, DIALOGUE_ERROR, GET_ALL_DIALOGUES,GET_DIALOGUES_BY_USER } from "./types";

// create or update dialogue
export const createDialogue = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/dialogues", formData, config);
    dispatch({
      type: CREATE_DIALOGUE,
      payload: res.data
    });
    dispatch(setAlert(edit ? "Dialogue Updated" : "Dialogue Created"));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "warning black")));
    }
    dispatch({
      type: DIALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getDialoguesByUser = user => async dispatch => {
  try {
    const res = await axios.get('/api/dialogues');
    let filteredDialogues = res.data.filter(dialogue => dialogue.user === user._id);
    dispatch({
      type: GET_DIALOGUES_BY_USER,
      payload: filteredDialogues
    });
  } catch (error) {
    dispatch({
      type: DIALOGUE_ERROR,
      payload: null
    });
  }
};




export const getAllDialogues = () => async dispatch => {
  try {
    const res = await axios.get("/api/dialogues");
    dispatch({
      type: GET_ALL_DIALOGUES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DIALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

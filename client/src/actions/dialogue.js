import axios from "axios";
import { setAlert } from "./alert";
import { CREATE_DIALOGUE, DIALOGUE_ERROR } from "./types";

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

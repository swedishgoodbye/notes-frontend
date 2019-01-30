import axios from "axios";

export const FINDINGNOTES = "FINDINGNOTES";
export const FOUNDNOTES = "FOUNDNOTES";
export const ADDINGNOTE = "ADDINGNOTE";
export const ADDEDNOTE = "ADDEDNOTE";
export const EDITINGNOTE = "EDITINGNOTE";
export const EDITEDNOTE = "EDITEDNOTE";
export const ERROR = "ERROR";

const URL = "http://localhost:27017/api";

export const getNotes = () => dispatch => {
  dispatch({
    type: FINDINGNOTES
  });

  axios
    .get(`${URL}/f/notes`)
    .then(res => {
      console.log("NOTES IN DB:", res.data.length);
      const all_notes = res.data;
      dispatch({ type: FOUNDNOTES, notes: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR, errorMessage: "Error Fetching Projects!" });
    });
};

export const addNote = note_data => dispatch => {
  dispatch({
    type: ADDINGNOTE
  });
  axios
    .post(`${URL}/c/note`, {
      title: note_data.title,
      content: note_data.content
    })
    .then(res => {
      console.log("Note added:", res.data);
      dispatch({ type: ADDEDNOTE, notes: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR, errorMessage: "Error creating note..." });
    });
};

export const editNote = (note_data, noteid) => dispatch => {
  dispatch({
    type: EDITINGNOTE
  });
  axios
    .put(`${URL}/u/${noteid + ""}`, {
      title: note_data.title,
      content: note_data.content
    })
    .then(res => {
      dispatch({
        type: EDITEDNOTE,
        note_data: res.data
      });
    });
};

import axios from "axios";

import jwt_decode from "jwt-decode";

export const FINDINGNOTES = "FINDINGNOTES";
export const FOUNDNOTES = "FOUNDNOTES";
export const ADDINGNOTE = "ADDINGNOTE";
export const ADDEDNOTE = "ADDEDNOTE";
export const EDITINGNOTE = "EDITINGNOTE";
export const EDITEDNOTE = "EDITEDNOTE";
export const LOGGINGIN = "LOGGINGIN";
export const LOGGEDIN = "LOGGEDIN";
export const LOGGINGOUT = "LOGGINGOUT";
export const LOGGEDOUT = "LOGGEDOUT";
export const DELETINGNOTE = "DELETINGNOTE";
export const DELETEDNOTE = "DELETEDNOTE";
export const ERROR = "ERROR";

const URL = "http://localhost:5000/api";

export const logIn = (user, history) => dispatch => {
  localStorage.clear();
  axios
    .post(`${URL}/l`, {
      username: user.username,
      password: user.password
    })
    .then(res => {
      console.log("RES", res);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      const decoded_token = jwt_decode(token);
      dispatch({ type: LOGGEDIN, payload: decoded_token });

      window.location.reload(true);
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err });
    });
};

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
      dispatch({ type: ERROR, errorMessage: "Error Fetching Notes!" });
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
    .put(`${URL}/u/${noteid}`, {
      title: note_data.title,
      content: note_data.content
    })
    .then(res => {
      dispatch({
        type: EDITEDNOTE,
        note_data: res.data
      });
    })
    .catch(err => {
      dispatch({ type: ERROR, errorMessage: "Error editing note..." });
    });
};

export const deleteNote = noteid => dispatch => {
  dispatch({
    type: DELETINGNOTE
  });
  axios.delete(`${URL}/d/${noteid}`).then(res => {
    console.log(noteid);
    dispatch({
      type: DELETEDNOTE,
      id: noteid
    });
  });
  // dispatch({
  //   type: FINDINGNOTES
  // });

  // axios
  //   .get(`${URL}/f/notes`)
  //   .then(res => {
  //     console.log("NOTES IN DB:", res.data.length);
  //     const all_notes = res.data;
  //     dispatch({ type: FOUNDNOTES, notes: res.data });
  //   })
  //   .catch(err => {
  //     dispatch({ type: ERROR, errorMessage: "Error Fetching Notes!" });
  //   });
};

import {
  FINDINGNOTES,
  FOUNDNOTES,
  ADDINGNOTE,
  ADDEDNOTE,
  EDITINGNOTE,
  EDITEDNOTE,
  LOGGINGIN,
  LOGGEDIN,
  LOGGINGOUT,
  LOGGEDOUT,
  DELETEDNOTE,
  DELETINGNOTE,
  ERROR
} from "../actions";

const initialState = {
  notes: [],
  authed: false,
  findingNotes: false,
  addingNote: false,
  editingNote: false,
  loggingIn: false,
  loggingOut: false,
  deletingNote: false
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FINDINGNOTES:
      return {
        ...state,
        findingNotes: true
      };
    case FOUNDNOTES:
      return {
        ...state,
        notes: action.notes,
        findingNotes: false
      };
    case ADDINGNOTE:
      return {
        ...state,
        addingNote: true
      };
    case ADDEDNOTE:
      return {
        ...state,
        addingNote: false
      };
    case EDITINGNOTE:
      return {
        ...state,
        editingNote: true
      };
    case EDITEDNOTE:
      return {
        ...state,
        editingNote: false
      };
    case DELETINGNOTE:
      return {
        ...state,
        deletingNote: true
      };
    case DELETEDNOTE:
      return {
        ...state,
        notes: action.notes,
        deletingNotes: false
      };
    case LOGGINGIN:
      return {
        ...state,
        logginIn: true
      };
    case LOGGEDIN:
      return {
        ...state,
        authed: true,
        user: action.payload
      };
    case LOGGINGOUT:
      return { ...state, loggingOut: true };
    case LOGGEDOUT:
      return {
        ...state,
        authed: false,
        loggingOut: false
      };
    case Error:
      return { ...state, error: action.errorMessage };
    default:
      return state;
  }
};

export default Reducer;

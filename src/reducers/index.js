import {
  FINDINGNOTES,
  FOUNDNOTES,
  ADDINGNOTE,
  ADDEDNOTE,
  EDITINGNOTE,
  EDITEDNOTE
} from "../actions";

const initialState = {
  notes: [],
  findingNotes: false,
  addingNote: false,
  editingNote: false
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
        findingNotes: false,
        notes: action.notes
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
    case Error:
      return { ...state, error: action.errorMessage };
    default:
      return state;
  }
};

export default Reducer;

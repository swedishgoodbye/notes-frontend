import { FINDINGNOTES, FOUNDNOTES, ADDINGNOTE, ADDEDNOTE } from "../actions";

const initialState = {
  notes: [],
  findingNotes: false,
  addingNote: false
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
    case Error:
      return { ...state, error: action.errorMessage };
    default:
      return state;
  }
};

export default Reducer;

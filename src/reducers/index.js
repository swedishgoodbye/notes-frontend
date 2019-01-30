import { FINDINGNOTES, FOUNDNOTES } from "../actions";

const initialState = {
  notes: [],
  findingNotes: false
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
    case Error:
      return { ...state, error: action.errorMessage };
    default:
      return state;
  }
};

export default Reducer;

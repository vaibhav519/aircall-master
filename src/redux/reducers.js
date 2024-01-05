import { combineReducers } from "redux";
import { ActionTypes } from "./constants";

const initialState = {
  calls: [],
  selectedCall: {},
  archivedCalls: []
}

const callReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_CALLS:
      return { ...state, calls: payload};
    case ActionTypes.SET_ARCHIVED_CALLS:
      return { ...state, archivedCalls: payload};
    case ActionTypes.ARCHIVE_ALL:
      return { ...state, calls: [], archivedCalls: state.archivedCalls.concat(payload)}
    case ActionTypes.ARCHIVE_CALL:
      let newCalls = [...state.calls];
      if (newCalls.length > 1) {
        const index = newCalls.indexOf(payload);
        if (index > -1) {
          newCalls.splice(index, 1);
        }
      } else {
        newCalls = [];
      }
      const arcCall = Object.assign({}, payload, {is_archived: true});
      return { ...state, calls: newCalls, archivedCalls: state.archivedCalls.concat(arcCall)}
    case ActionTypes.UN_ARCHIVE_CALL:
      let newArchivedCalls = [...state.archivedCalls];
      if (newArchivedCalls.length > 1) {
        const index = newArchivedCalls.indexOf(payload);
        if (index > -1) {
          newArchivedCalls.splice(index, 1);
        }
      } else {
        newArchivedCalls = [];
      }
      const unArcCall = Object.assign({}, payload, {is_archived: false});
      return { ...state, calls: state.calls.concat(unArcCall), archivedCalls: newArchivedCalls}
    case ActionTypes.SELECT_CALL:
      return { ...state, selectedCall: payload};
    case ActionTypes.REST_CALLS:
      return { ...state, calls: state.calls.concat(payload), archivedCalls: []}
    default:
      return state;
  }
}

const reducers = combineReducers({
    allCalls: callReducer
})

export default reducers;
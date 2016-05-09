import { GET_MARKERS } from '../actions/index';
const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_MARKERS:
    return action.payload.data
  default:
    return state;
  }
}

import { SORT_CHANGE } from '../actions/index';


const INITIAL_STATE = "featured";

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case SORT_CHANGE:
    return action.payload.sort;
  default:
    return state;
  }
}

import { SORT_CHANGE, ROUTE_SYNC } from '../actions/index';


const INITIAL_STATE = "featured";

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case SORT_CHANGE:
    return action.payload.sort;
  case ROUTE_SYNC:
    const sort = action.payload.query.sort || state
    return sort;
  default:
    return state;
  }
}

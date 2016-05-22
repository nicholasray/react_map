import { ROUTE_ENTER } from '../actions/index';


const INITIAL_STATE = {
  pathname: ""
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case ROUTE_ENTER:
    const pathname = action.payload.pathname
    return Object.assign({}, state, {pathname});
  default:
    return state;
  }
}

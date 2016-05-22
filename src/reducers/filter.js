import { CHANGE_RANGE, ROUTE_ENTER } from '../actions/index';

const INITIAL_STATE = {
  range: {min: 0, max: 14}
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case CHANGE_RANGE:
    return Object.assign({}, state, {range: getNewRange(state.range, action)})
  case ROUTE_ENTER:
    var min = parseInt(action.payload.query.min || state.range.min);
    var max = parseInt(action.payload.query.max || state.range.max);
    return Object.assign({}, state, {
      range: {min, max}
    });
  default:
    return state;
  }
}

function getNewRange(state = INITIAL_STATE.range, action) {
  switch (action.type) {
  case CHANGE_RANGE:
    return Object.assign({}, state, {min: action.payload.min, max: action.payload.max});
  default:
    return state;
  }
}

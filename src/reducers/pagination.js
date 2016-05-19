import { PAGE_CHANGE, SEARCH } from '../actions/index';

const INITIAL_STATE = {
  perPage: 17,
  totalCount: 0,
  offset: 0
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case PAGE_CHANGE:
    return Object.assign({}, state, {
    offset: action.payload.offset
  });
  case SEARCH:
    return Object.assign({}, state, {
    totalCount: action.payload.totalCount
  });
  default:
    return state;
  }
}

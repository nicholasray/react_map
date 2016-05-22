import { PAGE_CHANGE, SEARCH, SEARCH_LOAD, CHANGE_BOUNDS, ROUTE_SYNC} from '../actions/index';

const INITIAL_STATE = {
  perPage: 18,
  totalCount: 0,
  offset: 0,
  changing: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case PAGE_CHANGE:
    return Object.assign({}, state, {
      offset: action.payload.offset,
      changing: true
    });
  case SEARCH:
    return Object.assign({}, state, {
      totalCount: action.payload.totalCount
    });
  case ROUTE_SYNC:
    var offset = action.payload.query.offset || state.offset;
    return Object.assign({}, state, {
      offset: parseInt(offset),
      changing: true
    });
  default:
    return state;
  }
}

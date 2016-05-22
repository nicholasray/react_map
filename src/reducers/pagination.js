import { PAGE_CHANGE, SEARCH, SEARCH_LOAD, CHANGE_BOUNDS, ROUTE_ENTER} from '../actions/index';

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
  case SEARCH_LOAD:
    var offset = state.changing ? state.offset : 0;
    return Object.assign({}, state, {
      changing: false,
      offset: offset
    });
  case ROUTE_ENTER:
    var offset = action.payload.query.offset || state.offset;
    return Object.assign({}, state, {
      offset: offset,
      changing: true
    });
  case SEARCH:
    return Object.assign({}, state, {
      totalCount: action.payload.totalCount
    });
  default:
    return state;
  }
}

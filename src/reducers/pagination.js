import { PAGE_CHANGE, SEARCH, SEARCH_LOAD, CHANGE_BOUNDS, ROUTE_ENTER} from '../actions/index';

const INITIAL_STATE = {
  perPage: 18,
  totalCount: 0,
  page: 1,
  changing: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case PAGE_CHANGE:
    return Object.assign({}, state, {
      page: action.payload.page,
      changing: true
    });
  case SEARCH_LOAD:
    var page = state.changing ? state.page : 1;
    return Object.assign({}, state, {
      changing: false,
      page: page
    });
  case ROUTE_ENTER:
    var page = parseInt(action.payload.query.page || state.page);
    return Object.assign({}, state, {
      page: page,
      changing: true
    });
  case SEARCH:
    return Object.assign({}, state, {
      totalCount: parseInt(action.payload.totalCount)
    });
  default:
    return state;
  }
}

import { PAGE_CHANGE, SEARCH, CHANGE_BOUNDS} from '../actions/index';

const INITIAL_STATE = {
  perPage: 18,
  totalCount: 0,
  offset: 0
};

export default function(state = INITIAL_STATE, action) {
  console.log("from pagination", action.type);
  switch(action.type) {
  case PAGE_CHANGE:
    return Object.assign({}, state, {
    offset: action.payload.offset
  });
  case SEARCH:
    return Object.assign({}, state, {
    totalCount: action.payload.totalCount
  });
  case CHANGE_BOUNDS:
    const offset = action.payload.isPanning ? state.offset : 0;
    return Object.assign({}, state, {
    offset: offset
  });
  default:
    return state;
  }
}

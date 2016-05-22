import {ROUTE_CHANGE, ROUTE_SYNC, CHANGE_BOUNDS, SORT_CHANGE, PAGE_CHANGE} from '../actions/index';

const INITIAL_STATE = {
  path: "/",
  query: {},
  changing: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case ROUTE_CHANGE:
    return Object.assign({}, state, {
      path: action.payload.location.pathname,
      query: action.payload.location.query,
      changing: true
  });
  case CHANGE_BOUNDS:
    var currentQuery = state.query;

    var newQuery = Object.assign({}, currentQuery, {
      lat: action.payload.center.lat,
      lng: action.payload.center.lng,
      zoom: action.payload.zoom
    });

    if (!state.changing) {
      newQuery.offset = 0;
    }

    return Object.assign({}, state, {
      query: newQuery,
      changing: false
  });
  case SORT_CHANGE:
    var currentQuery = state.query;

    var newQuery = Object.assign({}, currentQuery, {
      sort: action.payload.sort,
    });

    return Object.assign({}, state, {
      query: newQuery
  });
  case PAGE_CHANGE:
    var newQuery = Object.assign({}, state.query, {
      offset: action.payload.offset,
    });

    return Object.assign({}, state, {
      query: newQuery
  });
  default:
    return state;
  }
}

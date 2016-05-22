import axios from 'axios';
import _ from 'lodash';
import merc from 'mercator-projection';

export const ROOT_URL = 'https://sandstone-api.herokuapp.com';
export const SEARCH = 'SEARCH';
export const CHANGE_BOUNDS = 'CHANGE_BOUNDS';
export const CHANGE_RANGE = 'CHANGE_RANGE';
export const MARKER_SELECT = 'MARKER_SELECT';
export const MAP_CLICK = 'MAP_CLICK';
export const ITEM_MOUSE_ENTER = 'ITEM_MOUSE_ENTER';
export const ITEM_MOUSE_LEAVE = 'ITEM_MOUSE_LEAVE';
export const SEARCH_LOAD = 'SEARCH_LOAD';
export const SEARCH_COMPLETE = 'SEARCH_COMPLETE';
export const PAGE_CHANGE = 'PAGE_CHANGE';
export const SORT_CHANGE = 'SORT_CHANGE';
export const ROUTE_ENTER = 'ROUTE_ENTER';

function shrinkBoundsToMarkers(se, nw, zoom) {
    const scale = 1 << zoom;
    const markerWidth = 36 / scale;
    const markerHeight = 36 / scale;
    const boundsNW = merc.fromLatLngToPoint({lat: nw.lat, lng: nw.lng});
    const boundsSE = merc.fromLatLngToPoint({lat: se.lat, lng: se.lng});

    const newNWPoint = {x: (boundsNW.x + (markerWidth / 2)), y: (boundsNW.y + (markerHeight))};
    const newSEPoint = {x: (boundsSE.x - (markerWidth / 2)), y: (boundsSE.y)};

    const newNWLatLng = merc.fromPointToLatLng(newNWPoint);
    const newSELatLng = merc.fromPointToLatLng(newSEPoint);

    return {nw: newNWLatLng, se: newSELatLng};
}

export function search(router) {
  return (dispatch, getState) => {
    const state = getState();
    if (_.isEmpty(state.map.bounds)) {
      console.log("trying to search but bounds empty");
      return;
    }
    dispatch(searchLoad());

    const shrunkBounds = shrinkBoundsToMarkers(state.map.bounds.se, state.map.bounds.nw, state.map.zoom);
    console.log("shrunk bounds", shrunkBounds);
    const se = shrunkBounds.se;
    const nw = shrunkBounds.nw;
    const min = state.filters.range.min;
    const max = state.filters.range.max;
    const offset = state.pagination.perPage * (state.pagination.page - 1);
    const limit = state.pagination.perPage;
    const sort = getSortParam(state.sort);
    const url = `${ROOT_URL}/climbs?limit=${limit}&bounds=${se.lat},${nw.lng},${nw.lat},${se.lng}&rating=gte:${min},lte:${max}&sort=${sort}&offset=${offset}&pagination=true`
    console.log(url);

    var climbPayload = {};
    var climbTotalCount = null;

    const request = axios.get(url)
    .then((data) => {
      climbPayload = data;
      var rockIds = [];
      const rockList = data.data.map((obj) => {
        return obj.rockId;
      }).join(",");
      const url = `${ROOT_URL}/rocks?id=${rockList}`;
      climbTotalCount = data.headers["x-total-count"];
      return axios.get(url);
    })
    .then((data) => {
      dispatch({
        type: SEARCH,
        payload: {totalCount: climbTotalCount, rocks: data.data, climbs: climbPayload.data}
      });

      pushRouterLocation(getState(), router);
      return data;
    });
  }
}


function getSortParam(value) {
  switch(value) {
  case "featured":
    return "id"
  default:
    return value
  }
}

function searchLoad() {
  return {
    type: SEARCH_LOAD,
    payload: {}
  }
}

function searchComplete() {
  return {
    type: SEARCH_COMPLETE,
    payload: {}
  }
}

export function routeEnter(location, router) {
  return (dispatch, getState) => {
    dispatch({
      type: ROUTE_ENTER,
      payload: {query: location.query, pathname: location.pathname, router}
    });
  }
}

function pushRouterLocation(state, router) {
  // transform state into query
  const query = {
    lat: state.map.center.lat,
    lng: state.map.center.lng,
    zoom: state.map.zoom,
    page: state.pagination.page,
    sort: state.sort,
    min: state.filters.range.min,
    max: state.filters.range.max
  };
  router.replace({pathname: state.route.pathname, query: query});
}

export function sortChange(sort, router) {
  return (dispatch, getState) => {
    console.log("IN sort change");
    dispatch({
      type: SORT_CHANGE,
      payload: { sort }
    });

    dispatch(search(router));
  }
}

export function pageChange(page, router) {
  return (dispatch, getState) => {
    console.log("IN page change");
    dispatch({
      type: PAGE_CHANGE,
      payload: { page }
    });

    dispatch(search(router));
  }
}

export function itemMouseEnter(id) {
  return {
    type: ITEM_MOUSE_ENTER,
    payload: {id}
  }
}

export function itemMouseLeave(id) {
  return {
    type: ITEM_MOUSE_LEAVE,
    payload: {id}
  }
}

export function changeBounds(bounds, center, zoom, router) {
  return (dispatch, getState) => {
    const isPanning = getState().map.isPanning;
    console.log("bounds state is ", getState());
    const prevState = getState();
    dispatch({
      type: CHANGE_BOUNDS,
      payload: {bounds, center, zoom, isPanning: isPanning}
    });

    if (!isPanning) {
      dispatch(search(router));
    }
  };
}

export function mapClick(id) {
  return {
    type: MAP_CLICK,
    payload: {}
  };
}

export function markerSelect(id) {
  return (dispatch, getState) => {
    const rockId = getState().data.entities.climbs[id].rockId;
    const rock = getState().data.entities.rocks[rockId];
    dispatch({
      type: MARKER_SELECT,
      payload: {id, rock: rock, map: getState().map}
    });
  }
}

export function changeRange(min, max, router) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_RANGE,
      payload: { min, max }
    });

    dispatch(search(router));
  };
}

export function changeRangeActive(min, max) {
  return {
    type: CHANGE_RANGE,
    payload: { min, max }
  }
}

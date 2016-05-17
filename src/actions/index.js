import axios from 'axios';

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

export function search() {
  return (dispatch, getState) => {
    dispatch(searchLoad());
    const state = getState();
    const se = state.map.bounds.se;
    const nw = state.map.bounds.nw;
    const min = state.filters.range.min;
    const max = state.filters.range.max;
    const url = `${ROOT_URL}/climbs?limit=10&bounds=${se.lat},${nw.lng},${nw.lat},${se.lng}&rating=gte:${min},lte:${max}&sort=id`
    console.log(url);

    var climbPayload = {};

    const request = axios.get(url)
    .then((data) => {
      climbPayload = data;
      var rockIds = [];
      const rockList = data.data.map((obj) => {
        return obj.rockId;
      }).join(",");
      const url = `${ROOT_URL}/rocks?id=${rockList}`;
      return axios.get(url);
    })
    .then((data) => {
      dispatch({
        type: SEARCH,
        payload: {rocks: data.data, climbs: climbPayload.data}
      });
      return data;
    });
  }
}

function searchLoad() {
  return {
    type: 'SEARCH_LOAD',
    payload: {}
  }
}

function searchComplete() {
  return {
    type: 'SEARCH_COMPLETE',
    payload: {}
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

export function changeBounds(bounds, center, zoom) {
  return (dispatch, getState) => {
    const isPanning = getState().map.isPanning;
    dispatch({
      type: CHANGE_BOUNDS,
      payload: {bounds, center, zoom}
    });
    if (!isPanning) {
      dispatch(search());
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

export function changeRange(min, max) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_RANGE,
      payload: { min, max }
    });
    dispatch(search());
  };
}

export function changeRangeActive(min, max) {
  return {
    type: CHANGE_RANGE,
    payload: { min, max }
  }
}

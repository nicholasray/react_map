import axios from 'axios';

export const ROOT_URL = 'https://sandstone-api.herokuapp.com';
export const SEARCH = 'SEARCH';
export const CHANGE_BOUNDS = 'CHANGE_BOUNDS';
export const CHANGE_RANGE = 'CHANGE_RANGE';

export function search() {
  return (dispatch, getState) => {
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

export function changeBounds(se, nw) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_BOUNDS,
      payload: {se, nw}
    });
    dispatch(search());
  };
}

export function changeRange(min, max) {
  console.log("min:",min);
  console.log("max:",max);
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_RANGE,
      payload: { min, max }
    });
    console.log("range state", getState());
    dispatch(search());
  };
}

export function changeRangeActive(min, max) {
  return {
    type: CHANGE_RANGE,
    payload: { min, max }
  }
}

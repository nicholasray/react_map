import { fitBounds } from 'google-map-react/utils';
import { CHANGE_BOUNDS, MARKER_SELECT } from '../actions/index';

const bounds = {
  nw: {
    lat: 41,
    lng: -111
  },
  se: {
    lat: 37.1,
    lng: -110
  }
};

const size = {
  width: 576, // Map width in pixels
  height: 402 // Map height in pixels
};

const {center, zoom} = fitBounds({nw: bounds.nw, se: bounds.se}, size);

const INITIAL_STATE = {bounds: {nw: bounds.nw, se: bounds.se}, center: center, zoom: zoom};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case CHANGE_BOUNDS:
    return Object.assign({}, state, {bounds: getNewBounds(state.bounds, action), center: getNewCenter(state.center, action)});
  case MARKER_SELECT:
    return Object.assign({}, state, {center: getNewCenter(state.center, action)});
  default:
    return state;
  }
}

function getNewCenter(state = INITIAL_STATE.center, action) {
  switch (action.type) {
  case MARKER_SELECT:
    return Object.assign({}, state, {lat: center.lat, lng: center.lng});
  case CHANGE_BOUNDS:
    return Object.assign({}, state, {lat: action.payload.center.lat, lng: action.payload.center.lng});
  default:
    return state;
  }
}

function getNewBounds(state = INITIAL_STATE.bounds, action) {
  switch (action.type) {
  case CHANGE_BOUNDS:
    return Object.assign({}, state, {se: action.payload.bounds.se, nw: action.payload.bounds.nw});
  default:
    return state;
  }
}

import { SEARCH_LOAD, SEARCH, MARKER_SELECT, MAP_CLICK, ITEM_MOUSE_ENTER, ITEM_MOUSE_LEAVE } from '../actions/index';
import { normalize, Schema, arrayOf } from 'normalizr';
import  {rockSchema, climbSchema} from '../schema';


const INITIAL_STATE = {
  isFetching: false,
  markers: {
    hovered: 0,
    selected: 0,
    viewed: [],
    items: {},
  },
  result: [],
  entities: {
    climbs: {
    },
    rocks: {
    },
    photos: {
    }
  }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case SEARCH_LOAD:
    return Object.assign({}, state, {isFetching: true});
  case SEARCH:
    return Object.assign({}, state, getNewEntities(state, action), {isFetching: false})
  case MAP_CLICK:
    return Object.assign({}, state, {markers: clearBubbles(state.markers, action)});
  case MARKER_SELECT:
    return Object.assign({}, state, {markers: getNewMarkers(state.markers, action)});
  case ITEM_MOUSE_ENTER:
    return Object.assign({}, state, {markers: getNewMarkers(state.markers, action)});
  case ITEM_MOUSE_LEAVE:
    return Object.assign({}, state, {markers: getNewMarkers(state.markers, action)});
  default:
    return state;
  }
}

function clearBubbles(state = state.markers, action) {
  switch(action.type) {
  case MAP_CLICK:
    return Object.assign({}, state, {selected: 0});
  default:
    return state;
  }
}

function getNewMarkers(state = state.markers, action) {
  switch(action.type) {
  case MARKER_SELECT:
    return Object.assign({}, state, {selected: action.payload.id});
  case ITEM_MOUSE_ENTER:
    return Object.assign({}, state, {hovered: action.payload.id});
  case ITEM_MOUSE_LEAVE:
    return Object.assign({}, state, {hovered: 0});
  default:
    return state;
  }
}

function getNewEntities(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEARCH:
    const rData = normalize(action.payload.rocks, arrayOf(rockSchema));
    const cData = normalize(action.payload.climbs, arrayOf(climbSchema));
    const combined = Object.assign({}, rData.entities, cData.entities);
    return Object.assign({}, state, cData, {entities: combined});
  default:
    return state;
  }
}

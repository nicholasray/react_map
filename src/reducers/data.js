import { SEARCH, MARKER_SELECT } from '../actions/index';
import { normalize, Schema, arrayOf } from 'normalizr';
import  {rockSchema, climbSchema} from '../schema';


const INITIAL_STATE = {
  isFetching: false,
  sliders: {
    items: {}
  },
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
  case SEARCH:
    return Object.assign({}, state, getNewEntities(state, action))
  case MARKER_SELECT:
    return Object.assign({}, state, {markers: getNewMarkers(state, action)});
  default:
    return state;
  }
}

function getNewMarkers(state = state.markers, action) {
  switch(action.type) {
  case MARKER_SELECT:
    return Object.assign({}, state, {selected: action.payload.id});
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
    return Object.assign({}, state, rData, {entities: combined});
  default:
    return state;
  }
}

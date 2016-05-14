import { fitBounds } from 'google-map-react/utils';
import { CHANGE_BOUNDS, MARKER_SELECT } from '../actions/index';
var merc = require('mercator-projection');

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
    const boxHeight = 259;
    const scale = 1 << action.payload.map.zoom;
    const pxScale = (boxHeight / scale);
    console.log("rock is", action.payload.rock);

    console.log("pxScale", pxScale);
    var xy = merc.fromLatLngToPoint({lat: action.payload.rock.latitude, lng: action.payload.rock.longitude})
    console.log("marker x, y is", xy);
    console.log(xy.y - pxScale);
    var latlng = merc.fromPointToLatLng({x: xy.x, y: (xy.y - pxScale)})
    console.log("lat, lng should be", latlng);

    const boundsPt = merc.fromLatLngToPoint({lat: action.payload.map.bounds.nw.lat, lng: action.payload.map.bounds.nw.lng});
    console.log("bounds pt", boundsPt);

    const diff = boundsPt.y - (xy.y - pxScale);
    console.log(diff);

    const centerPt = merc.fromLatLngToPoint(action.payload.map.center);
    console.log("centerPt", centerPt);

    const newCenterY = centerPt.y - diff;

    const ll = merc.fromPointToLatLng({x: 46.364444444444445, y: newCenterY})
    console.log("ll is", ll);

    console.log("orig lat,lng", action.payload.map.bounds.se);
    const newNw = {lat: latlng.lat, lng: action.payload.map.bounds.nw.lng};

    const obj = {nw: newNw, se: action.payload.map.bounds.se};
    const fb = fitBounds({nw: obj.nw, se: obj.se}, {width: 78, height: 88});
    console.log("fb", fb);

    return Object.assign({}, state, {center: {lat: ll.lat, lng: action.payload.map.center.lng}, action});
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

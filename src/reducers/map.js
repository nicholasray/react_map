import { CHANGE_BOUNDS, MARKER_SELECT, ROUTE_ENTER} from '../actions/index';
import merc from 'mercator-projection';

const center = {lat: 39.0639, lng: -108.5506};
const zoom = 6;

const INITIAL_STATE = {isPanning: false, bounds: {}, center: center, zoom: zoom};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case CHANGE_BOUNDS:
    return Object.assign({}, state, {bounds: getNewBounds(state.bounds, action), center: getNewCenter(state.center, action), zoom: action.payload.zoom, isPanning: false});
  case MARKER_SELECT:
    const data = {
      height: 259,
      width: 280,
      zoom: action.payload.map.zoom,
      center: action.payload.map.center,
      markerLatLng: {lat: action.payload.rock.latitude, lng: action.payload.rock.longitude},
      bounds: action.payload.map.bounds
    };
    const newCenter = panToBubble(data);
    const eps = .00001;
    const isPanning = !(areValuesEqual(state.center.lat, newCenter.lat, eps)) || !(areValuesEqual(state.center.lng, newCenter.lng, eps)) ? true : false;
    return Object.assign({}, state, {center: newCenter}, {isPanning: isPanning});
  case ROUTE_ENTER:
    var lat = action.payload.query.lat || state.center.lat;
    var lng = action.payload.query.lng || state.center.lng;
    var zoom = action.payload.query.zoom || state.zoom;
    return Object.assign({}, state, {center: {lat: parseFloat(lat), lng: parseFloat(lng)}}, {zoom: parseInt(zoom)});
  default:
    return state;
  }
}

function areValuesEqual(valueOne, valueTwo, eps) {
    if (Math.abs(valueOne - valueTwo) > eps) {
      return false;
    }

    return true;
}

function panToBubble(data) {
    const bubbleHeight = data.height;
    const bubbleWidth = data.width;
    const zoom = data.zoom;
    const center = data.center;
    const markerLatLng = data.markerLatLng;
    const bounds = data.bounds

    const boundsNW = merc.fromLatLngToPoint({lat: bounds.nw.lat, lng: bounds.nw.lng});
    const boundsSE = merc.fromLatLngToPoint({lat: bounds.se.lat, lng: bounds.se.lng});
    const scale = 1 << zoom;
    const pxScaleHeight = (bubbleHeight / scale);
    const pxScaleWidth = (bubbleWidth / scale);
    const centerPt = merc.fromLatLngToPoint(center);

    const xy = merc.fromLatLngToPoint({lat: markerLatLng.lat, lng: markerLatLng.lng})
    const bubbleNW = {x: xy.x - (pxScaleWidth / 2), y: xy.y - (pxScaleHeight)}
    const bubbleSE = {x: xy.x + (pxScaleWidth / 2), y: xy.y + (pxScaleHeight)}

    // will edge of bubble be cut off of map
    // test right side
    var xDiff = 0;
    var yDiff = 0;
    if (boundsSE.x < bubbleSE.x) {
      // right edge is cut off
      xDiff = bubbleSE.x - boundsSE.x;
    } else if (boundsNW.x > bubbleNW.x) {
      // left edge is cut off
      xDiff = (boundsNW.x - bubbleNW.x) * -1;
    }

    if (boundsNW.y > bubbleNW.y) {
      yDiff = (boundsNW.y - bubbleNW.y) * -1;
    }

    const newCenterPt = {x: centerPt.x + xDiff, y: centerPt.y + yDiff};
    const newCenterLatLng = merc.fromPointToLatLng(newCenterPt);

    return newCenterLatLng;
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

import { fitBounds } from 'google-map-react/utils';

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
  height: 457 // Map height in pixels
};

const {center, zoom} = fitBounds({nw: bounds.nw, se: bounds.se}, size);

const INITIAL_STATE = {center: center, zoom: zoom};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  default:
    return state;
  }
}

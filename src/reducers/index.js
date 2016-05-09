import { combineReducers } from 'redux';
import MarkersReducer from './markers';
import MapReducer from './map';

const rootReducer = combineReducers({
  map: MapReducer,
  markers: MarkersReducer
});

export default rootReducer;

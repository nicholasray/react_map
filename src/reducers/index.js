import { combineReducers } from 'redux';
import MapReducer from './map';
import DataReducer from './data';
import FilterReducer from './filter';
import PaginationReducer from './pagination';
import SortReducer from './sort';
import RouteReducer from './route';

// {
//   map: { zoom: 5, center: {lat: 5, lng: 10}, bounds: {nw: 5, se: 10}},
//   filters: {
//     range: {min: 5, max: 10}
//   },
//   sort: "featured",
//   data: {
//     sliders: {
//       items: {
//         1: {
//           activePhoto: 1
//         },
//         2: {
//           activePhoto: 2
//         }
//       }
//     },
//     markers: {
//       hovered: 1,
//       selected: 1,
//       viewed: [1],
//       items: {
//         1: {
//           activePhoto: 1,
//         },
//         2: {
//           activePhoto: 2
//         }
//       }
//     },
//     isFetching: false,
//     entities: [
//       result: [1, 2],
//       climbs: {
//         1:  {
//             id: 1,
//             rockId: 5,
//             name: "a"
//             rating: 5,
//             description: "Foo",
//             photos: [1]
//         },
//         2: {
//             id: 2,
//             rockId: 5,
//             name: "b"
//             rating: 2,
//             description: "Bar",
//             photos: [2]
//         },
//       },
//       rocks: {
//         5: {
//             id: 5,
//             latitude: 10,
//             longitude: 15
//         }
//       }
//       photos: {
//         1:  {
//             id: 1,
//             climbId: 1,
//             filename: "pic1.jpg",
//             alt: "Foo"
//         },
//         2: {
//             id: 2,
//             climbId: 2,
//             filename: "pic2.jpg",
//             alt: "Bar"
//         }
//       }
//     ]
//   },
//   pagination: {
//    pageCount: 1,
//    offset: 0
//   },
//   route: {
//    pathname: "/",
//    query: {}
//   }
// }


const rootReducer = combineReducers({
  filters: FilterReducer,
  map: MapReducer,
  data: DataReducer,
  pagination: PaginationReducer,
  sort: SortReducer,
  route: RouteReducer
});

export default rootReducer;

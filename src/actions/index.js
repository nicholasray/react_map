import axios from 'axios';

export const ROOT_URL = 'https://sandstone-api.herokuapp.com';
export const GET_MARKERS = 'GET_MARKERS';

export function getMarkers(sw, ne) {
  const url = `${ROOT_URL}/rocks?limit=10&latitude=gt:${sw.lat},lt:${ne.lat}&longitude=gt:${sw.lng},lt:${ne.lng}&sort=id`
  console.log(url);

  const request = axios.get(url);
  return {
    type: GET_MARKERS,
    payload: request
  };
}

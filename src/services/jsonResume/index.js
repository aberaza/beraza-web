import { JsonFresh } from './jsonFresh';
import {obj2query} from '../helpers';

// eslint-disable-next-line no-undef
const  RESUME_API = process.env.PREACT_APP_RESUME_API || 'https://dcv12ecg4c.execute-api.eu-west-1.amazonaws.com/default/getResume'
export function getResume(params){
  return fetch( RESUME_API + obj2query(params), { mode: 'cors'})
    .then(r => r.json())
    .then(resume => (new JsonFresh(resume)))
    .catch(err => console.warn('getResume API failed.', err));
}


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



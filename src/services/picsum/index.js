import { obj2query } from '../helpers';


  // var keys = Object.keys(obj);
  // if(keys.length === 0){
  //   return '';
  // }
  // return '?' + keys.map( k => obj[k] === true? k : (k + '=' + obj[k]) ).join('&');
// }

function idPath(id){
  return id? 'id/' + id + '/': '';
}

function seedPath(seed){
  return seed? 'seed/' + seed + '/': '';
}

/**
 * Returns query string for specified filters
 * @param {string} [filters.ext] Either 'jpeg' or 'webp'
 * @param {boolean} [grayscale] Set to true to enable filter
 * @param {boolean|number} [blut] Set to true to enable, or for finer effect grade, to a value between 1 - 10
 * @return {string} formattedQueryString
 */
export function appendFilters(filters={}) {
// grayscale, blur, blur=1 (entre 1 y 10)
  const filterString = filters.ext || '';
  delete(filters.ext);
  return filterString + '?' + obj2query(filters);
}

/**
 * Get a random/given image url
 * @param {number} [w=1024] image width
 * @param {number} [h=768] image height
 * @param {number} [id] Specify an image by id
 * @param {string} [seed] Specify a random image seed
 * @param {object} [filters = {}] filters to apply. See appendFilters()
 * @returns {Promise<string>} url 
 */
export function getImageUrl(w=window.innerWidth, h=window.innerHeight, id, seed, filters) {
  return Promise.resolve( "https://picsum.photos/"+ idPath(id) + seedPath(seed) + w + "/" + h + appendFilters(filters));
}


/**
 * @typedef ImageDef
 * @type {Object}
 * @property {string} id
 * @property {string} author
 * @property {number} width
 * @property {number} height
 * @property {string} url
 * @property {string} download_url
 */
/**
 * Get paginable list of images
 * @param {number} [opts.limit=30] Maximum number of results per page/call
 * @param {number} [opts.page=0] Page to return
 * @returns {Array<ImageDef>} list of images
 */
export function getImagesList(opts) {
  return fetch('https://picsum/photos/v2/list?' + obj2query(opts));
}

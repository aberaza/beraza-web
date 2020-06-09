const BASEURL = "https://photoslibrary.googleapis.com/v1";
const DEV_KEY = "";
const F_CONF = {
  mode: 'cors'
}
const regex = /\["(https?:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g

function extractPhotos(content) {
  let matches = Array.from(content.matchAll(regex), m => m[1])
  return Array.from(new Set(matches));
}

export function getAlbum(id) {
    return fetch("https://photos.app.goo.gl/" + id, F_CONF)
      .then(r => r.text())
      .then(response => extractPhotos(response));
}

export function getImageUrl(url, width=768, height) {
  let query = '=';
  if(width) {
    query += 'w' + width;
  }

  if( height ) {
    query += (width? '-h': 'h') + height;
  }

  return Promise.resolve(url + query);
}

export function getAlbums() {
  const url = new URL(BASEURL + "/albums");
  url.searchParams.append("key", DEV_KEY);

  return fetch(url)
    .then(r => r.text());
}


export default {getAlbums, getAlbum, getImageUrl};

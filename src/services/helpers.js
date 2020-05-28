export function asyncLoad(url) {
  const loader = document.createElement("script");
  loader.defer = true;
  loader.async = true;
  loader.src = url;
  return new Promise((resolve) => {
    loader.onload = () => resolve();
    document.getElementsByTagName('head')[0].appendChild(loader);
  });
}

export function obj2query(obj={}){
  let str = [];
  for ( let [key, value] of Object.entries(obj)){
    str.push(value === true? encodeURIComponent(key) : encodeURIComponent(key) + '=' + encodeURIComponent(value))
  }
  return str.length > 0? '?' + str.join('&') : '';
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

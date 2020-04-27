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

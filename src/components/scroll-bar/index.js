import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';

import style from './scroll-bar.style.scss';
/*
 * Inspired by https://codepen.io/derekjp/pen/pJzpxB
 */

export function ProgressBar({progress}) {
  return <div class={style['progress-bar']} style={{width: progress + '%'}} />
}

function registerScrollListener(cb){
  window.addEventListener('scroll', () => {
    const docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.scrollHeight);

    cb(100 * (window.scrollY/ (docHeight - window.innerHeight)) );
  });
}

export default function ScrollBar(){
  const [scroll, setScroll] = useState(0);
  useEffect(() => registerScrollListener(setScroll));
  // registerScrollListener(setScroll);

  return <div class={style['scroll-bar']} ><ProgressBar progress={scroll} /></div>;
}

import {h} from 'preact';

import style from './parallax.style.scss'

export function ParallaxSection(props){
  return(
    <section class={style.parallaxSection}>
      {props.children}
    </section>
  );
}


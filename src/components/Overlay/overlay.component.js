import {h} from 'preact'
import style from './overlay.style.scss';

const Overlay = ({text}) => {
  return <div class={style.overlay} >{text}</div>
};

export default Overlay;

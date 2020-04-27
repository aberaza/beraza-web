import {h} from 'preact';
import style from './overlay.style.scss';

const Overlay = ({children}) => {
  return <div class={style.overlay} >{children}</div>
};

export default Overlay;

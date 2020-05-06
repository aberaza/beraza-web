import { h } from 'preact';
import style from './style';

const Gallery = () => {
  return (
	<div class={style.gallery}>
    <div id="tt" class="tools"> Some Tools for the gallery </div>
	  <div class="photos">Photos will go here</div>
	</div>
  );
}

export default Gallery;

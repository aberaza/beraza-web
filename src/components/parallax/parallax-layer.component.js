import {h} from 'preact';

import style from './parallax.style.scss';

function props2style(p1 = {}, p2={}){
  return {...p1, ...p2};
}

export function ParallaxLayer(props){
  return (
    <div class="parallax-layer">
	{props.children}
    </div>
  );
}

export function ParallaxImageLayer(props) {
  const {image, styleProps} = props;
  const ownStyle = props2style(styleProps,
    { 
      backgroundImage : "url(" + image + ")",
    });

  return (
    <div class={style.imageLayer} style={ownStyle} >
	{props.children}
      Image Layer ( {image} )
      {JSON.stringify(ownStyle)}
    </div>
  );
}

export function ParallaxColorLayer(props){
  const {color, styleProps} = props;
  const ownStyle = Object.assign({}, props2style(styleProps, { "backgroundColor": color }));
  return (
    <div class={style.colorLayer} style={ownStyle} >
      {props.children}
      Color Layer ( {color} )
      {JSON.stringify(ownStyle)} 
    </div>
  );
}

import {h} from 'preact';

function parallaxLayer(props){

  return (
    <div class="parallax-layer">
	{props.children}
    </div>
  );
}

export function parallaxImageLayer({image, styleProps: {}}){
  
  const ownStyle = {
    background : "url(" + image + ") no-repeat fixed" ,
    ...styleProps
  };


  return (
    <parallaxLayer class="image-layer" style={ownStyle} />
  );
}

export default parallaxLayer;

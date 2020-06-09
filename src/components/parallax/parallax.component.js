import {h, Component} from 'preact';

import style from './parallax.style.scss';

/* For Demo, remove */
import {getImageUrl} from '../../services/picsum';

function getSeed() {
  return Math.random().toString(36).substring(7);
}

export class ParallaxContainer extends Component {
  state = {bg1 : null, bg2: null, loading: true}

  componentDidMount() {
   Promise.all( [getImageUrl(undefined, undefined, undefined, getSeed()), getImageUrl()])
    .then(([bg1, bg2]) => this.setState({bg1, bg2, loading:false}));
  }
  
  render (props={}, state) {
    if(state.loading){
      return <h3> Loading... </h3>;
    }
    return (
      <div class={style.parallaxContainer}>
        {props.children}
      </div>
    );
  }
}
            

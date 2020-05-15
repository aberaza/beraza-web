import {h, Component } from 'preact';

import { ParallaxContainer, ParallaxSection, ParallaxLayer, ParallaxImageLayer, ParallaxColorLayer} from '../../components/parallax';
import ScrollBar from '../../components/scroll-bar';

export default class TestPage extends Component {
  // JSON RESUME sections
  // ['basics', 'skills', 'education', 'work', 'languages', 'volunteer', 'interests', 'references'


  render ( props, state ) {
    return ( 
      <div>
        <ScrollBar />
        <ParallaxContainer>
          <ParallaxSection>
            <ParallaxColorLayer color="blue" />
            <ParallaxImageLayer image={state.bg1} />
            <ParallaxLayer> Layer XX1: {state.bg1} </ParallaxLayer>
          </ParallaxSection>
          <ParallaxSection> 
            Section 2
            <ParallaxColorLayer color="red" />
            <ParallaxImageLayer image={state.bg2} />
            <ParallaxLayer> LAYER 222 </ParallaxLayer>
          </ParallaxSection>
        </ParallaxContainer>
      </div>
    );
  }
}


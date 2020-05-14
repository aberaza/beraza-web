import {h, Component} from 'preact';

import parallaxSection from './parallax-section.component';
import parallaxLayer from './parallax-layer.component';

export default class AbgParallax extends Component {

  render () {
    return (
      <div class="parallax-wrapper">
        <parallaxSection> Section 1 </parallaxSection>
        <parallaxSection> Section 2 </parallaxSection>
        Wrapper
      </div>
    );
  }
}


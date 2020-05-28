import {h, Component } from 'preact';

import { getResume } from '../../services/jsonResume';
import { ParallaxContainer, ParallaxSection, ParallaxLayer, ParallaxImageLayer, ParallaxColorLayer} from '../../components/parallax';
import ScrollBar from '../../components/scroll-bar';

export default class TestPage extends Component {
  // JSON RESUME sections
  // ['basics', 'skills', 'education', 'work', 'languages', 'volunteer', 'interests', 'references'

  constructor(){
    super();
    this.state = {resume: {}, loading: true};
  }
  
  componentDidMount(){
    getResume()
      .then(resume => this.setState({resume, loading:false}))
      .then( () => console.log("resume route updated state:", this.state));
  }
  // const [resume, setResume] = useState({});

  // useEffect(() =>{
  //   getResume()
  // })

  renderResume(props, state){
    return ( 
      <div>
        <ScrollBar />
        <ParallaxContainer>
          <ParallaxSection>
            <ParallaxColorLayer color="blue" />
            <ParallaxImageLayer image={state.bg1} />
            <ParallaxLayer> XXX {JSON.stringify(this.state.resume.profile)} </ParallaxLayer>
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
  render ( props, state ) {
    return this.state.loading? 'Loading ...' : this.renderResume(props, state);
  }
}


import {h, Component} from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { getResume } from '../../services/jsonResume';
import { ParallaxContainer, ParallaxSection, ParallaxLayer, ParallaxImageLayer, ParallaxColorLayer} from '../../components/parallax';
import ScrollBar from '../../components/scroll-bar';

import {getImageUrl} from '../../services/picsum';
import { getSkillLogo, getSkillLogoUrl } from '../../services/icons';

export default class TestPage extends Component {
  // JSON RESUME sections
  // ['basics', 'skills', 'education', 'work', 'languages', 'volunteer', 'interests', 'references'

  constructor(){
    super();
    this.state = {resume: {}, loading: true, logo: null};
  }
  
  componentDidMount(){
    getResume()
      .then(resume => this.setState({resume, loading:false}))
    
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
          <ResumeProfile profile={state.resume.profile} />

          <ResumeLocation locations={state.resume.location} />

          <ResumeSkills skills={state.resume.skills} />
          
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

function ResumeLocation(props = {locations:[]}) {
  const {locations} = props;

  return (
    <ParallaxSection>
      <ParallaxColorLayer color="navy" />
      <ParallaxLayer>
        <h1 class="v-mid"> {locations.map(l => l.city).join(" :: ")} Barcelona </h1>
      </ParallaxLayer>
    </ParallaxSection>
  );
}

function ResumeProfile(props = {}) {
  const {profile} = props
  const [img, setImg] = useState('');

  useEffect(() => {
    if(img.length === 0) {
      getImageUrl().then(setImg);
    }
  });
  
  return (
    <ParallaxSection>
      <ParallaxImageLayer image={img} />
      <ParallaxLayer>
        <div class="center mw6">
          <div class="w3 w4-ns v-mid">
            <img class="ba b--black-30 db br w2 w3-ns h2 h3-ns" src={profile.picture || ''} />
          </div>
          <div class="dtc v-mid pl3">
            <h1 class="f5 f4-ns fw8 lh-title black mv0">{profile.name} </h1>
            <h2 class="f5 fw6 mb0 black-30"> {profile.degree} </h2>
            <h2 class="f5 fw4 mb0 black-60"> {profile.summary} </h2>
          </div>
        </div>
      </ParallaxLayer>
    </ParallaxSection>
  );  
}

function ResumeSkills(props = {skills:{}}){
  const [img, setImg] = useState('');

  useEffect(() => {
    if(img.length === 0) {
      getImageUrl().then(setImg);
    }
  });

  const skills = props.skills.sets || [];
  let skillsList = skills.map(s => (<ResumeSkill skill={s} />));

  return (
    <ParallaxSection>
      <ParallaxImageLayer image={img} />
      <ParallaxLayer>
        <div class="flex flex-wrap flex-nowrap-ns justify-center mw8 center tl tc-ns lh-copy">
          {skillsList}
        </div>
      </ParallaxLayer>
    </ParallaxSection>
  );
}

function ResumeSkill(props = {skill:{}, isSubSkill:false}){
  const {skill, isSubSkill} = props;

  const [icon, setIcon] = useState('');
  useEffect(() => {
    if(icon.length === 0){
      getSkillLogoUrl({...skill}, isSubSkill)
        // .then(logo => URL.createObjectURL(new Blob([logo], {type: 'image/svg+xml'})))
        .then(url => {console.log("AXB::URL::", url); return url;})
        .then(setIcon)
    }
  });
  
  let subskills = [];
  if(skill.skills){
    subskills = skill.skills.map(s => (<ResumeSkill skill={s} isSubSkill="true" />))
  }

  const render = isSubSkill 
    ? (
      <div class="resumeSubSkill grow hide-child pa1 w1 w2-m w3-l">
        <img src={icon} alt="logo" />
        <span class="child">{skill.name}</span>
      </div>
    )
    : (
      <div class="resumeSkill pa2 w-15 w-20-ns hide-child">
        <div class="grow pl3 pr3">
          <img src={icon} alt="logo" />
          <span class="child">{skill.name}</span>
        </div>
        <div class="subskillsContainer flex flex-wrap-reverse flex-start" style="flex-shrink:0;">
          {subskills}
        </div>
      </div>
    );

  return render;
}


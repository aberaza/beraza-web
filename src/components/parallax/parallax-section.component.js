import {h} from 'preact';

function parallaxSection(props){

  return(
    <section class="parallax-section">
      {props.children}
    </section>
  );
}

export default parallaxSection;

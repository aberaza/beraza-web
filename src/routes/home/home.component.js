import { h, Component } from 'preact';
// import style from './home.style.scss';

// import gphotos from "../../services/google/photos";
import {getImageUrl} from '../../services/picsum';

const BACKGROUND_ALBUM_ID = process.env.PREACT_APP_BACKGROUND_ALBUM_ID; //=NKcxRYKcuDrH1XeT6
class Home extends Component {

	state = {bg:''};

	componentDidMount(){
    getImageUrl().then(bg => this.setState({bg}));
		// gphotos.getAlbum(BACKGROUND_ALBUM_ID)
		// 	.then(bglist => gphotos.getImageBlob(bglist[Math.floor(Math.random()*bglist.length)]))
		// 	.then(bg => this.setState({bg}));
	}

	render() {
		const {bg} = this.state;
		return (
			<div class="cover bg-left bg-center-l" style={{ backgroundImage: `url(${bg})` }}>
				<div class="bg-black-60 v-mid dtc w-100 vh-100 flex items-center justify-start justify-center-l">
          <div class="tc-l ph3" >
						<h1 class="f2 f1-l fw2 white-90 mb0 lh-title">
							Beraza
						</h1>
						<h2 class="fw1 f3 white-80 mt3 mb4">
							Telecom, Software and AI Engineer
						</h2>
            <a href="mailto:aritz.beraza@gmail.com?subject=Hi%20there" className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3">email</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

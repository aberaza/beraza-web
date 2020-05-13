import { h, Component } from 'preact';
// import style from './home.style.scss';

import gphotos from "../../services/google/photos";

const BACKGROUND_ALBUM_ID = process.env.PREACT_BACKGROUND_ALBUM_ID;
class Home extends Component {

	state = {bg:''};

	componentDidMount(){
		gphotos.getAlbum(BACKGROUND_ALBUM_ID)
			.then(bglist => {
				return gphotos.getImageUrl(bglist[Math.floor(Math.random()*bglist.length)])
			})
			.then(bg => this.setState({bg}));
	}
	render() {
		const {bg} = this.state;
		return (
			<div className="cover bg-left bg-center-l" style={{ backgroundImage: `url(${bg})` }}>
				<div className="bg-black-80 pb5 pb6-m pb7-l">
					<div className="tc-l pa4 pa5-m pa6-l ph3">
						<h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
							Beraza
						</h1>
						<h2 className="fw1 f3 white-80 mt3 mb4">
							Telecom, Software and AI Engineer
						</h2>
						<a href="/" className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3">Contact</a>
						<span className="dib v-mid ph3 white-70 mb3">or</span>
						<a href="/" className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3">email</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

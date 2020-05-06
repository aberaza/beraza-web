import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import googleAuthService from '../services/auth';
import UserAuth from './UserAuth.component';
import Header from './header/header.component';
import Home from '../routes/home/home.component';
import Overlay from './Overlay/overlay.component';

export default class App extends Component {

  componentDidMount(){
    googleAuthService.init();
  }
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<UserAuth authService={googleAuthService}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home default />
						<AsyncRoute path="/profile" user="me"
							getComponent={() => import('../routes/profile').then(module => module.default)}
							loading={() => <div>loading...</div>} />
						<AsyncRoute path="/profile/:id"
							getComponent={() => import('../routes/profile').then(module => module.default)}
							loading={() => <div>loading...</div>} />
						<AsyncRoute path="/gallery"
							getComponent={() => import('../routes/gallery').then(module => module.default)}
							loading={() => <div>loading...</div>} />
          </Router>
          {process.env.PREACT_APP_DEV === "true" ? '' : <Overlay>Work In Progress</Overlay> }
				</div>
			</UserAuth>
		);
	}
}

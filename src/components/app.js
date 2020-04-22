import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import UserAuth from './UserAuth.component';
import Header from './header/header.component';
import Home from '../routes/home/home.component';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<UserAuth>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
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
				</div>
			</UserAuth>
		);
	}
}

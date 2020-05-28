import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import googleAuthService from '../services/google/auth';
import appAuthProvider from '../services/auth';

import UserAuth from './UserAuth.component';
import Header from './header/header.component';
import Home from '../routes/home/home.component';
import Overlay from './Overlay/overlay.component';

// eslint-disable-next-line no-undef
const isDebug = process.env.PREACT_APP_DEV === "true";

export default class App extends Component {
  state = { debug : isDebug };

  componentDidMount(){
    appAuthProvider.init([googleAuthService]);
    googleAuthService.init();
  }
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newlythis routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
		if(window.location){
      let searchParams = new URLSearchParams(window.location.search);
      this.setState({...this.state, debug: (searchParams.has('debug') || isDebug) });
    }
	};

  render() {
    return (
      <UserAuth authService={appAuthProvider}>
        <div id="app">
          <Header />
          <Router onChange={this.handleRoute}>
            <Home default />
            <AsyncRoute path="/resume" user="me"
              getComponent={() => import('../routes/resume').then(module => module.default)}
              loading={() => <div>loading...</div>} />
            <AsyncRoute path="/profile/:id"
              getComponent={() => import('../routes/profile').then(module => module.default)}
              loading={() => <div>loading...</div>} />
            <AsyncRoute path="/gallery"
              getComponent={() => import('../routes/gallery').then(module => module.default)}
              loading={() => <div>loading...</div>} />
          </Router>
          {this.state.debug ? '' : <Overlay>Work In Progress</Overlay> }
        </div>
      </UserAuth>
    );
	}
}

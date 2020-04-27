import {h, Component} from 'preact';
import { useContext } from 'preact/hooks';

import {Auth} from '../UserAuth.component';

export class UserWidget extends Component {

  componentDidMount = () => {

  };

  onSignIn = () => {
    console.log("Signing in into google");
    // this.auth.signIn();
  };

  onSignOut = () => {
    console.log("Signing out of google");
    // this.auth.signOut();
  };

  renderAuthButton({isSignedIn}) {

    return (isSignedIn
      ? <a href="/" onClick={this.onSignOut} class="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" >Sign Out</a>
      : <a href="/" onClick={this.onSignIn} class="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" >Sign In</a>
    );
  }

  render (props, state) {
    return this.renderAuthButton(props, state);
  }
}

function UserWidgetConsumer(){
  const { isSignedIn, userProfile } = useContext(Auth);
  return <UserWidget isSignedIn={isSignedIn} user={userProfile} />;
}

export default UserWidgetConsumer;

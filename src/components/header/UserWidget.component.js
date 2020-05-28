import {h, Component} from 'preact';
import { useContext } from 'preact/hooks';

import {Auth} from '../UserAuth.component';
import appAuthProvider from '../../services/auth';

// import style from './UserWidget.style.scss';

const SignInCaret = () => {
		//	<span class="mdi mdi-account-circle br-100 pa1 ba b--black-10 h2 w2 v-mid" alt="avatar" > Sign In</span>
  return (
		<div class="tc">
			<span class="mdi mdi-account-circle br-100 pa1 ba b--black-10 h2 w2 v-mid" alt="avatar" > Sign In</span>
		</div>
  );
}

const UserCaret = ({imgSrc, name}) => {
		//	<img src={imgSrc} class="br-100 pa1 ba b--black-10 h2 w2 v-mid" alt="avatar" />
  return (
		<div class="tc">
			<img src={imgSrc} class="br-100 pa1 ba b--black-10 h2 w2 v-mid" alt="avatar" />
			{name}
		</div>
  );
}

export class UserWidget extends Component {

  onSignIn = () => appAuthProvider.signIn();

  onSignOut = () => appAuthProvider.signOut();

  renderAuthButton(isSignedIn, user) {
    return (
      isSignedIn
      ? <UserCaret imgSrc={user.getImageUrl()} name={user.getName()} />
      : <SignInCaret />
    );
  }

  render ({isSignedIn, user}) {
    return (
	<a href="/" onClick={isSignedIn?this.onSignOut:this.onSignIn} class="v-mid f5 fw5 hover-white no-underline white-70 dib-ns pv2 ph3" >
		{ this.renderAuthButton(isSignedIn, user) }
	</a>
    );
  }
}

function UserWidgetConsumer(){
  const { isSignedIn, userProfile } = useContext(Auth);
  return <UserWidget isSignedIn={isSignedIn} user={userProfile} />;
}

export default UserWidgetConsumer;

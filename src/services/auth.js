import googleAuthService from './google/auth';

export class AuthProvider extends EventTarget {
  
  static SIGNED_IN = 'logged-in';
  static SIGNED_OUT = 'logged-out';
  static SIGNED_CHANGE = 'logged-change';

  constructor(key) {
    super();


    this.isSignedIn = null;
    this.userProfile = null;
    this.authResponse = null;
  }

  createInstance() {
    if(AuthProvider._instance){
      return AuthProvider._instance;
    }
  }

  init() {
    return Promise.reject("init not implemented");
  }

  signIn() {
    return Promise.reject("signIn not implemented");
  }

  signOut() {
    return Promise.reject("signOut not implemented");
  }
}

export class AppAuthProvider extends AuthProvider {

  static GOOGLE_AUTH = 'google_auth_provider';
  static LINKEDIN_AUTH = 'linkedin_auth_provider';
  static ALL_AUTH = 'all_auth_providers';

  constructor(){
    this.authBackends = {};
    this.authBackends[AppAuthProvider.GOOGLE_AUTH] = new GoogleAuthService();
    // this.authBackends[AppAuthProvider.LINKEDIN_AUTH] = new LinkedinAuthService();
  }

  init(authProvider, scope){
    let valid_providers = Object.keys(this.authBackends);

    if(!authProvider || !(valid_providers.includes(authProvider) || authProvider === AppAuthProvider.ALL_AUTH) ){
      return Promise.reject("ERR: functions expects auth provider");
    }
    
    if(authProvider === AppAuthProvider.ALL_AUTH) {
      return Promise.all(this.authBackends.entries.map( ([name, provider]) => provider.init()));
    }
    return this.authBackends[authProvider].init();
  }

  _handleAuthChange = (authProvider) => {
    dispatchEvent( new CustomEvent(AuthProvider.SIGNED_CHANGE));
  }

  _handleOnLogIn = () => {
    dispatchEvent( new CustomEvent(AuthProvider.SIGNED_IN, {detail: this.useProfile}));
  }

  _handleOnLogOut = () => {
    dispatchEvent( new CustomEvent(AuthProvider.SIGNED_OUT));
  }

  get isSignedIn() {
    return false;
  }
}

const appAuthProvider = new AppAuthProvider();

export default appAuthProvider;

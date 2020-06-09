import { asyncLoad } from "../helpers";
import { AuthProvider, AuthEvent } from "../auth";

var _instance = null;
var _authKey = null;
var _gapi = null;
var _authInstance = null;
// var _user = null;

class GoogleAuthService extends AuthProvider {
  
  static get instance(){ return _instance || new GoogleAuthService(); }
  
  // eslint-disable-next-line no-undef
  constructor(key = process.env.PREACT_APP_GAPI_SECRET){
    if (_instance){
      return _instance;
    }
    super ({name: 'Google Auth'});
    _authKey = key;
  }

  get isSignedIn() { 
    return _authInstance? _authInstance.isSignedIn.get() : null;
  }

  get user() {
    return _authInstance? _authInstance.currentUser.get() :  null;
  }

  get userProfile() {
    return this.user ? this.user.getBasicProfile() : null;
  }

  get authResponse() {
    return this.user ? this.user.getAuthResponse() : null;
  }

  init = (modules = 'auth2', scope = 'openid profile email') => {
    if( _gapi ) {
      return console.warn("Already Initialized");
    }

    /* DEBUG */
    // eslint-disable-next-line no-undef
    if(process.env.PREACT_APP_DEV === "true") {
      this.addEventListener(AuthEvent.SIGNED_CHANGE, ()=> console.log("Google Auth notification of SIGNED_CHANGE"));
      this.addEventListener(AuthEvent.SIGNED_IN, ()=> console.log("Google Auth notification of SIGNED_IN"));
      this.addEventListener(AuthEvent.SIGNED_OUT, ()=> console.log("Google Auth notification of SIGNED_OUT"));
    }	
    /* END DEBUG */

    asyncLoad("https://apis.google.com/js/api.js")
      .then( () => { _gapi = window.gapi; return new Promise( (callback, onerror) => window.gapi.load(modules, {callback, onerror})); } )
      .then( () => _gapi.auth2.init({ client_id: _authKey, scope}))
      .then( ai => (_authInstance = ai, ai) )
      .then( ai => (ai.isSignedIn.listen(this.handleAuthChange), this.handleAuthChange()) )
      .catch(err => console.warn("GAPI init failed", err));

  };

  handleAuthChange = () => {
    console.info("CB handleAuthChange called")
    this.dispatchEvent(AuthEvent.SignedChange(this));
    return this.isSignedIn
      ? this._handleOnLogIn()
      : this._handleOnLogOut();
  };
  
  _handleOnLogIn = () => {
    console.info("LOGED IN ", this.userProfile);
    this.dispatchEvent(AuthEvent.SignedIn(this, {detail:this.userProfile}));
  };

  _handleOnLogOut = () => {
    console.info("LOGED OUT");
    this.dispatchEvent(AuthEvent.SignedOut(this));
  };

  signIn = () => {
    console.info("Perform Sign In >>>>");
    if(!_authInstance){
      return Promise.reject("Module has not been initialized");
    }
    return _authInstance.signIn()
      .then( user => console.info("Signed in as ", user))
      .catch( err => console.warn(err) );
  };

  signOut = () => {
    console.info("Perform Log Out <<<<");
    if(!_authInstance){
      return Promise.reject("Module has not been initialized");
    }
    return _authInstance.signOut()
      .then( user => console.info("Signed Out as ", user))
      .catch( err => console.warn(err) );
  };

  /* Some GoogleAuth specific members */

  get gapi(){
    return _gapi;
  }
}


const googleAuthService = new GoogleAuthService();
export default googleAuthService;
export { GoogleAuthService };

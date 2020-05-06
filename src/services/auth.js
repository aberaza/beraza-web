import { asyncLoad } from "./helpers";

class GoogleAuthService extends EventTarget {
  static _instance = null;

  static SIGNED_IN = 'logged-in';
  static SIGNED_OUT = 'logged-out';
  static SIGNED_CHANGE = 'logged-change';

  static getInstance = () => {
    return new GoogleAuthService();
  }

  constructor(key = process.env.PREACT_APP_GAPI_SECRET){
    if (!GoogleAuthService._instance){
      super ();
      this.key = key;
      this.api = null;
      this.authInstance = null;
      this.isSignedIn = null;
      this.userProfile = null;
      this.authResponse = null;

      GoogleAuthService._instance = this;
    }
    return GoogleAuthService._instance;
  }


  init = (modules = 'auth2', scope = 'openid profile email') => {
    if( this.api ) {
      return console.warn("Already Initialized");
    }
    console.log("GAPI INIT");

    asyncLoad("https://apis.google.com/js/api.js")
      .then( () => { this.api = window.gapi; return new Promise( (callback, onerror) => window.gapi.load(modules, {callback, onerror})); } )
      .then( () => this.api.auth2.init({ client_id: this.key, scope}))
      .then( ai => (this.authInstance = ai, ai) )
      .then( ai => (console.log("Register as listener"),ai.isSignedIn.listen(this.handleAuthChange), this.handleAuthChange()) )
      .catch(err => console.warn("GAPI init failed", err)); 

    this.addEventListener(GoogleAuthService.SIGNED_CHANGE, () => console.log("DEBUG EVENT EMITTER: SIGNED CHANGE EMITTED!!!!"));
  };

  handleAuthChange = () => {
    console.log("CB handleAuthChange called")
    if(this.authInstance.isSignedIn.get()){
      return this._handleOnLogIn(this.authInstance.currentUser.get())
    }

    this._handleOnLogOut();
  };
  
  _handleOnLogIn = (user) => {
    this.isSignedIn = true;
    this.userProfile = user.getBasicProfile();
    this.authResponse = user.getAuthResponse();

    console.log("LOGED IN ", this.userProfile);
    this.dispatchEvent(new CustomEvent(GoogleAuthService.SIGNED_CHANGE));
    this.dispatchEvent( new CustomEvent(GoogleAuthService.SIGNED_IN, {detail:this.userProfile}));
  };

  _handleOnLogOut = () => {
    this.isSignedIn = false;
    this.userProfile = null;
    this.authResponse = null;

    console.log("LOGED OUT");

    this.dispatchEvent(new CustomEvent(GoogleAuthService.SIGNED_CHANGE));
    this.dispatchEvent(new CustomEvent(GoogleAuthService.SIGNED_OUT));
  };

  signIn = () => {
    console.log("Perform Sign In >>>>");
    return this.authInstance.signIn()
      .then( user => console.log("Signed in as ", user))
      .catch( err => console.warn(err) );
  };

  signOut = () => {
    console.log("Perform Log Out <<<<");
    return this.authInstance.signOut()
      .then( user => console.log("Signed Out as ", user))
      .catch( err => console.warn(err) );
  };
}
  
const googleAuthService = new GoogleAuthService();
export default googleAuthService;
export { GoogleAuthService };

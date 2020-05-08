import { asyncLoad } from "../helpers";

class GoogleAuthService extends EventTarget {
  static _instance = null;

  static SIGNED_IN = 'logged-in';
  static SIGNED_OUT = 'logged-out';
  static SIGNED_CHANGE = 'logged-change';

  static getInstance = () => new GoogleAuthService();
  
  constructor(key = process.env.PREACT_APP_GAPI_SECRET){
    if (!GoogleAuthService._instance){
      super ();
      this.key = key;
      this.api = null;
      this.authInstance = null;
      this._user = null;

      GoogleAuthService._instance = this;
    }
    return GoogleAuthService._instance;
  }

  get isSignedIn() { 
    return this.authInstance 
      ? this.authInstance.isSignedIn.get()
      : null;
  }

  get userProfile() {
    return this._user
      ? this._user.getBasicProfile()
      : null;
  }

  get authResponse() {
    return this._user
      ? this._user.getAuthResponse
      : null;
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
    console.info("CB handleAuthChange called")
    if(this.authInstance.isSignedIn.get()){
      return this._handleOnLogIn(this.authInstance.currentUser.get())
    }

    this._handleOnLogOut();
  };
  
  _handleOnLogIn = (user) => {
    this.isSignedIn = true;

    console.log("LOGED IN ", this.userProfile);
    this.dispatchEvent(new CustomEvent(GoogleAuthService.SIGNED_CHANGE));
    this.dispatchEvent( new CustomEvent(GoogleAuthService.SIGNED_IN, {detail:this.userProfile}));
  };

  _handleOnLogOut = () => {
    this.isSignedIn = false;
    this._user = null;

    console.log("LOGED OUT");
    this.dispatchEvent(new CustomEvent(GoogleAuthService.SIGNED_CHANGE));
    this.dispatchEvent(new CustomEvent(GoogleAuthService.SIGNED_OUT));
  };

  signIn = () => {
    console.info("Perform Sign In >>>>");
    if(!this.authInstance){
      return Promise.reject("Module has not been initialized");
    }
    return this.authInstance.signIn()
      .then( user => console.info("Signed in as ", user))
      .catch( err => console.warn(err) );
  };

  signOut = () => {
    console.info("Perform Log Out <<<<");
    if(!this.authInstance){
      return Promise.reject("Module has not been initialized");
    }
    return this.authInstance.signOut()
      .then( user => console.info("Signed Out as ", user))
      .catch( err => console.warn(err) );
  };
}
  
const googleAuthService = new GoogleAuthService();
export default googleAuthService;
export { GoogleAuthService };

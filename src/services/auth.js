import { asyncLoad } from "./helpers";

var _auth = null,
  _gapi;

class GoogleAuthService extends EventTarget {
  static _instance = null;

  static SIGNED_IN = 'logged-in';
  static SIGNED_OUT = 'logged-out';
  static SIGNED_CHANGE = 'logged-change';

  static getInstance = () => {
    return new GoogleAuthService();
  }

  constructor(key) {
    if (!GoogleAuthService._instance){
      super ();
      this.key = key;

      this.isSignedIn = null;
      this.userProfile = null;
      this.authResponse = null;

      GoogleAuthService._instance = this;
    }
    return GoogleAuthService._instance;
  }


  load = () => {
    return asyncLoad("https://apis.google.com/js/api.js")
      .then(()=>{
        console.log("GAPI LOADED");
        _gapi = window.gapi;
        return new Promise((resolve, reject) => {
          _gapi.load('client:auth2',
            () => resolve(this),
            () => reject("Failed to load client:auth2")
          );
        });
      });
  };

  // sload = async () => {
  //   return await this.load();
  // }

  init = () => {
    console.log("GAPI INIT");
    return _gapi.client.init({ client_id: process.env.PREACT_APP_GAPI_SECRET, scope: 'openid profile email'})
    .then(() => {
      _auth =_gapi.auth2.getAuthInstance();
      _auth.isSignedIn.listen(this.handleAuthChange);
      this.handleAuthChange();
      return {isSignedIn: this.isSignedIn, userProfile: this.userProfile };
    }).catch((err) => console.warn("GAPI init failed", err));
  };

  // sinit = async () => {
  //   return await this.init();
  // }

  handleAuthChange = () => {
    if(_auth.isSignedIn.get()){
      return this._handleOnLogIn(_auth.currentUser.get())
    }

    this._handleOnLogOut();
  };

  _handleOnLogIn = (user) => {
    this.isSignedIn = true;
    this.userProfile = user.getBasicProfile();
    this.authResponse = user.getAuthResponse();

    this.dispatchEvent(new CustomEvent(this.SIGNED_CHANGE));
    this.dispatchEvent( new CustomEvent(this.SIGNED_IN, {detail:this.userProfile}));
  };

  _handleOnLogOut = () => {
    this.isSignedIn = false;
    this.userProfile = null;
    this.authResponse = null;

    this.dispatchEvent(new CustomEvent(this.SIGNED_CHANGE));
    this.dispatchEvent(new CustomEvent(this.SIGNED_OUT));
  };

  signIn = () => {
    return _auth.signIn();
  };

  signOut = () => {
    return _auth.signOut();
  };
}
 const googleAuth = new GoogleAuthService();
 googleAuth.load()
   .then((ga) => ga.init());

// export default (new GoogleAuthService()).load().then(ga => ga.init());
export default googleAuth;
export { GoogleAuthService };


var _auth = null,
  gapi;

class GoogleAuthService extends EventTarget {
  static _instance = null;

  static LOGGED_IN = 'logged-in';
  static LOGGED_OUT = 'logged-out';
  static LOGGED_CHANGE = 'logged-change';

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
    console.log("Doing some load...");
    return new Promise((resolve, reject) => {
      const gapiLoader = document.createElement("script");
      gapiLoader.defer = true;
      gapiLoader.async = true;
      gapiLoader.onload = () => {
        console.log("GAPI LOADED");
        gapi = window.gapi;
        gapi.load('client:auth2',
          () => resolve(this),
          () => reject("Failed to load client:auth2")
        );
      };
      gapiLoader.src = "https://apis.google.com/js/api.js";
      document.getElementsByTagName('head')[0].appendChild(gapiLoader);
      });
  };

  init = () => {
    console.log("GAPI INIT");
    gapi.client.init({ client_id: process.env.PREACT_APP_GAPI_SECRET, scope: 'openid profile email'})
    .then(() => {
      _auth = gapi.auth2.getAuthInstance();
      _auth.isSignedIn.listen(this.handleAuthChange);
      this.handleAuthChange();
    }).catch((err) => console.warn("GAPI init failed", err));
  };

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

    this.dispatchEvent(new CustomEvent(this.LOGGED_CHANGE));
    this.dispatchEvent( new CustomEvent(this.LOGGED_IN, {detail:this.userProfile}));
  };

  _handleOnLogOut = () => {
    this.isSignedIn = false;
    this.userProfile = null;
    this.authResponse = null;

    this.dispatchEvent(new CustomEvent(this.LOGGED_CHANGE));
    this.dispatchEvent(new CustomEvent(this.LOGGED_OUT));
  };

  signIn = () => {
    return _auth.signIn();
  };

  signOut = () => {
    return _auth.signOut();
  };
}

export default GoogleAuthService;

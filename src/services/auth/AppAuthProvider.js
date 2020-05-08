import AuthProvider from './AuthProvider';

export class AppAuthProvider extends AuthProvider {

  static GOOGLE_AUTH = 'google_auth_provider';
  static LINKEDIN_AUTH = 'linkedin_auth_provider';
  static ALL_AUTH = 'all_auth_providers';

  constructor(){
    super();
    this.authBackends = {};
    // this.authBackends[AppAuthProvider.GOOGLE_AUTH] = new GoogleAuthService();
    // this.authBackends[AppAuthProvider.LINKEDIN_AUTH] = new LinkedinAuthService();
  }

  /**
   * Register a single instance of AuthProvider with extra arguments
   *
   * @param {Object} authProvider The instance or array of instances of auth providers
   * @param {object} extraArgs Map of key : value parameters to init the provider
   * @return {Promise<AppAuthProvider>} Thenable that resolves to this
   */
  registerAuthProvider = (authProvider, extraArgs) => {
    let valid_providers = Object.keys(this.authBackends);

    if(valid_providers.includes(authProvider)){
      return Promise.resolve(this);
    }
    
    this.authBackends[authProvider.PROVIDER_NAME] = authProvider;

    return authProvider.init(extraArgs)
      .then(()=> authProvider.addEventListener(AuthProvider.SIGNED_CHANGE, this._handleAuthChange))
      .then(()=> this);
  }

  /**
   * unregister an already registered AuthProvider
   *
   * @param {Object|string} authProvider Instance to unregister
   * @return {Promise<AppAuthProvider>} Thenable that resolves to this
   */
  unregisterAuthProvider(authProvider) {
    if(typeof authProvider === 'string'){
      authProvider = this.authBackends[authProvider];
    }
    if(authProvider instanceof AuthProvider){
      return (this.authBackends[authProvider.PROVIDER_NAME]
        ? this.authBackends[authProvider.PROVIDER_NAME].unregister()
        : Promise.reject("WARN: Provider not resgistered"))
        .then(()=> this.authBackends[authProvider.PROVIDER_NAME] = undefined)
        .then(()=> this);
    }
    return Promise.reject("WARN: Wrong parameter authProvider");
  }
  
  /**
   * Register & Init one or many AuthProviders
   *
   * @param {Object|Array} authProviders The instance or array of instances of auth providers
   * @return {Promise<AppAuthProvider>} Thenable that resolves to this
   */
  init(authProviders, providerArgs = {}){
    if(authProviders instanceof AuthProvider){
      return this.addAuthProvider(authProvider, providerArgs);
    }

    return Promise.all(authProviders.map( this.registerAuthProvider ))
      .then(() => this);
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

  /**
   * Geter that returns true if any of the registered providers
   * is signed in
   * @readonly {boolean}
   */
  get isSignedIn() {
    return false;
  }
}

const appAuthProvider = new AppAuthProvider();

export default appAuthProvider;

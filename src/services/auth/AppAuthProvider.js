import AuthProvider from './AuthProvider';
import AuthEvent from './AuthEvent';


var _instance = null;

/**
 * Singleton. Main container for all AuthProviders in a project. Allows to seamesly register to
 * all of them. It is a Singleton
 * @param {sring} [{}.name='AppAuthProvider'] Name to give to the provider instance 
 */
export default class AppAuthProvider extends AuthProvider {
  
  /**
   * @readonly
   */
  static get instance(){
    return _instance || new AppAuthProvider();
  }

  constructor({name="AppAuthProvider"} = {}){
    if(_instance){
      return _instance;
    }
    super({name});
    this.authBackends = [];

    _instance = this;
  }

  /**
   * Register a single instance of AuthProvider with extra arguments
   *
   * @param {Object} authProvider The instance or array of instances of auth providers
   * @param {object} extraArgs Map of key : value parameters to init the provider
   * @return {Promise<AppAuthProvider>} Thenable that resolves to this
   */
  registerAuthProvider = (authProvider, extraArgs) => {
    let valid_providers = this.authBackends.map( p => p.PROVIDER_NAME);

    if(valid_providers.includes(authProvider)){
      return Promise.resolve(this);
    }
    
    this.authBackends.push(authProvider);
    return new Promise((resolve) => (authProvider.addEventListener(AuthEvent.SIGNED_CHANGE, this._handleAuthChange, true), resolve(AppAuthProvider.instance) ));
  }

  /**
   * unregister an already registered AuthProvider
   *
   * @param {Object|string} authProvider Instance to unregister
   * @return {Promise<AppAuthProvider>} Thenable that resolves to this
   */
  unregisterAuthProvider(authProvider) {
    let providerName = typeof authProvider === 'string'? authProvider : authProvider.PROVIDER_NAME;

    let index = this.authBackends.findIndex( provider => provider.PROVIDER_NAME !== providerName
      ? false
      : (provider.unregister(this),  true)
    );
 
    return (index < 0)
      ? Promise.reject("WARN: authProvider not found")
      : (this.authBackends.splice(index,1), Promise.resolve(this));  
  }
  
  /**
   * Register & Init one or many AuthProviders
   *
   * @param {Object|Array} authProviders The instance or array of instances of auth providers
   * @return {Promise<AppAuthProvider>} Thenable that resolves to this
   */
  init(authProviders = [], providerArgs = {}){
    if(authProviders instanceof AuthProvider){
      return this.registerAuthProvider(authProviders, providerArgs);
    }

    return Promise.all(authProviders.map( this.registerAuthProvider ))
      .then(() => this);
  }

  _handleAuthChange = (e) => {
    console.info("APP_AUTH_PROVIDER AuthChanged CB");
    this.dispatchEvent( AuthEvent.SignedChange(this, e.detail ));
  }

  // _handleOnLogIn = (e) => {
  //   this.dispatchEvent( AuthEvent.SignedIn(this, e.detail ));
  // }

  // _handleOnLogOut = (e) => {
  //   this.dispatchEvent( AuthEvent.SignedOut(this, e.detail ));
  // }

  signIn(provider=this.defaultProvider){
    if (typeof provider === 'string'){
      provider = this.authBackends.find( p => p.PROVIDER_NAME === provider);
    }

    return provider ?  provider.signIn() : Promise.reject("WARN: Auth Provider not found");
  }

  signOut(provider=this.defaultProvider) {
    if (typeof provider === 'string'){
      provider = this.authBackends.find( p => p.PROVIDER_NAME === provider);
    }
    return provider ?  provider.signOut() : Promise.reject("WARN: Auth Provider not found");
  }
  /**
   * Geter that returns true if any of the registered providers
   * is signed in
   * @readonly {boolean}
   */
  get isSignedIn() {
    return this.authBackends.some(p => p.isSignedIn);
  }

  get defaultProvider() {
    return this.authBackends[0];
  }

  get userProfile() { let loggedBackEnd = this.authBackends.find(backend => backend.isSignedIn); return loggedBackEnd? loggedBackEnd.userProfile : null; }

}


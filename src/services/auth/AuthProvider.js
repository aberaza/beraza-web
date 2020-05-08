/**
 * AuthProvider class to be extended by all auth providers
 * @class
 * @param {string} [{}.name=AuthProvider.PROVIDER_NAME] name of the auth provider instance  
 * @param {string} [{}.key] API key to be used to identify in API provider
 */
export default class AuthProvider extends EventTarget {
  /** @static */
  static SIGNED_IN = 'logged-in';
  /** @static */
  static SIGNED_OUT = 'logged-out';
  /** @static */
  static SIGNED_CHANGE = 'logged-change';

  constructor({name, key}) {
    super();

    this.providerName = name || AuthProvider.PROVIDER_NAME;
    this.isSignedIn = null;
    this.userProfile = null;
    this.authResponse = null;
  }

  /**
   * provider auth name
   * @readonly
   */
  get PROVIDER_NAME() {
    return this.providerName;
  }

  /**
   * Init provider
   * @param {Object} [params] Extra parameters needed to init auth instance
   * @return {Promise<AuthProvider>} Thenable that resolves to this
   */
  init(params) {
    return Promise.reject("init not implemented");
  }

  /**
   * Start a request to Sign In a user.
   * @return {Promise} Thenable that resolves when SignIn process finishes
   */
  signIn() {
    return Promise.reject("signIn not implemented");
  }

  /**
   * Start a request to Sign Out a user.
   * @return {Promise} Thenable that resolves when SignOut process finishes
   */
  signOut() {
    return Promise.reject("signOut not implemented");
  }
}


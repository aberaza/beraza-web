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

  constructor({name='unnamed-provider'}={}) {
    super();
    this.__providerName = name;
  }

  /**
   * provider auth name
   * @readonly
   */
  get PROVIDER_NAME() { return this.__providerName; }

  /**
   * Signed In status
   * @readonly
   */
  get isSignedIn(){ return null; }

  /**
   * Signed User Profile | null if not signed
   * @readonly
   */
  get userProfile() { return null; }

  /**
   * Init provider
   * @param {Object} [params] Extra parameters needed to init auth instance
   * @return {Promise<AuthProvider>} Thenable that resolves to this
   */
  init() {
    return Promise.reject("init not implemented");
  }

  /**
   * Method to be called to de-register AuthProvider listener
   * @Param {Object} Listener to unregister
   */
  unregister(listener) {
    return Promise.reject("unregister not implemented");
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


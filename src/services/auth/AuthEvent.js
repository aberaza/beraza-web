/**
 * Generate a CustomEvent with proper data load
 * @class
 * @param {EventTarget} authProvider The emitter of the event
 * @param {data} [data] data payload to emit
 */

function chainProviders({provider}, leaf){
  return {leaf, parent: provider}
}


export default class AuthEvent extends CustomEvent {
  /** @static */
  static SIGNED_IN = 'logged-in';
  /** @static */
  static SIGNED_OUT = 'logged-out';
  /** @static */
  static SIGNED_CHANGE = 'logged-change';
  
  /** 
   * Get a new SIGNED_IN AuthEvent
   * @static
   * @param {EventTarget} authProvider Event Dispatcher instance
   * @param {object} [data={}] Aditional event data
   * @returns {AuthEvent}
   */
  static SignedIn(authProvider, data) { return new AuthEvent(authProvider, AuthEvent.SIGNED_IN, data); }
  /** 
   * Get a new SIGNED_OUT AuthEvent
   * @static
   * @param {EventTarget} authProvider Event Dispatcher instance
   * @param {object} [data={}] Aditional event data
   * @returns {AuthEvent}
   */
  static SignedOut(authProvider, data) { return new AuthEvent(authProvider, AuthEvent.SIGNED_OUT, data); }
  /** 
   * Get a new SIGNED_CHANGE AuthEvent
   * @static
   * @param {EventTarget} authProvider Event Dispatcher instance
   * @param {object} [data={}] Aditional event data
   * @returns {AuthEvent}
   */
  static SignedChange(authProvider, data) { return new AuthEvent(authProvider, AuthEvent.SIGNED_CHANGED, data); }

  constructor(authProvider, event, data={} ){
    super(event, 
      {detail: {...data, provider: chainProviders(data, authProvider)}});
  }
}



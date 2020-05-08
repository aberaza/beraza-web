/**
 * Generate a CustomEvent with proper data load
 * @class
 * @param {AuthProvider} authProvider The emitter of the event
 * @param {data} [data] data payload to emit
 */
export default class AuthEvent extends CustomEvent {
  constructor(authProvider, event, data){
    super(event, {detail: {...data, provider: authProvider.providerName}});
  }
}



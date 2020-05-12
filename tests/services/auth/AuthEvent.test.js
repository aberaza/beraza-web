import AuthEvent from '../../../src/services/auth/AuthEvent';
import { AuthProvider } from '../../../src/services/auth';

describe("AuthEvent class type", () => {
  let ae = new AuthEvent(new AuthProvider({name:"TEST_PROVIDER"}),"TEST", { payloadField: true, anotherField: 0} );

  test("Has static definitions of default auth event types", () => {
    expect(AuthEvent.SIGNED_CHANGE).toBeTruthy();
    expect(AuthEvent.SIGNED_IN).toBeTruthy();
    expect(AuthEvent.SIGNED_OUT).toBeTruthy();
  });

  test("AuthEvent class extends CustomEvent", () => {

    expect(ae instanceof CustomEvent).toBeTruthy();
    expect(ae.type).toBe("TEST");
  });

  test("detail contains authProvider name", () => {
    expect(ae.detail.provider.leaf.PROVIDER_NAME).toBe("TEST_PROVIDER");
  });

  test("detail contains whatever payload y sent", () => {
    expect(ae.detail.payloadField).toBeDefined();
    expect(ae.detail.anotherField).toBeDefined();
  });

});

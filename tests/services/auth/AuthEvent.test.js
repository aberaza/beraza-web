import AuthEvent from '../../../src/services/auth/AuthEvent';
import { AuthProvider } from '../../../src/services/auth';

describe("AuthEvent class type", () => {
  let ae = new AuthEvent(new AuthProvider({name:"TEST_PROVIDER"}),"TEST", { payloadField: true, anotherField: 0} );

  test("AuthEvent class extends CustomEvent", () => {

    expect(ae instanceof CustomEvent).toBeTruthy();
    expect(ae.type).toBe("TEST");
  });

  test("detail contains authProvider name", () => {
    expect(ae.detail.provider).toBe("TEST_PROVIDER");
  });

  test("detail contains whatever payload y sent", () => {
    expect(ae.detail.payloadField).toBeDefined();
    expect(ae.detail.anotherField).toBeDefined();
  });

});

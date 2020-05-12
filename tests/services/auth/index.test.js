import appAuthProvider, * as Auth from '../../../src/services/auth'

describe("Basic Auth module", () => {
  it("provides appAuthProvider", () => {
    expect(appAuthProvider).toBeDefined();
    expect(appAuthProvider instanceof Auth.AuthProvider).toBeTruthy();
  });

  test.each([
    'AuthEvent', 'AuthProvider', 'AppAuthProvider'
  ])("Provides access to %o", className => {
    expect(Auth[className]).toBeDefined();
  })
});

import googleAuth, { GoogleAuthService } from "../../src/services/auth";
import * as helpers from "../../src/services/helpers";

beforeAll(() => {
  // mock load Async
  helpers.asyncLoad = jest.fn(() => Promise.resolve(true));

})

describe("GoogleAuth Class", () => {
  const ga = new GoogleAuthService();
  test("It exposes static values", () => {
    expect(GoogleAuthService.SIGNED_CHANGE).toBeTruthy();
    expect(GoogleAuthService.SIGNED_IN).toBeTruthy();
    expect(GoogleAuthService.SIGNED_OUT).toBeTruthy();
    expect(GoogleAuthService.getInstance).toBeTruthy();
  });

  test("Default export is an instance of GoogleAuthService", () => {
    expect(googleAuth instanceof GoogleAuthService).toBeTruthy();
  });

  test("It is a singleton", () => {
    const ga2 = new GoogleAuthService();
    expect(ga).toBe(ga2);
    expect(GoogleAuthService.getInstance()).toBe(ga2);
  });

  describe("Signs In, Out and handles changes", () => {
    beforeAll(() => {
      ga.init();
    });

    it("handles sign in", () => {
      ga.signIn();
      expect(window.gapi._authInstance.signIn).toBeCalled();
    });

    it("handles sign out", () => {
      ga.signOut();
      expect(window.gapi._authInstance.signOut).toBeCalled();
    });
  });
});

describe("GoogleAuth load and init", () => {
  const PREACT_APP_GAPI_SECRET = "fakeAuthkey";
  beforeAll(() => {
    const OLD_PROCESS_ENV = global.process.env;
    global.process.env = { ...OLD_PROCESS_ENV, PREACT_APP_GAPI_SECRET };
  })

  // const ga = new GoogleAuthService()
  it("loads Google gapi injecting script tag", async () => {
    expect.assertions(2);
    const ga = new GoogleAuthService();
    await ga.init();
    expect(helpers.asyncLoad).toHaveBeenCalled();
    expect(helpers.asyncLoad.mock.calls[0][0].length > 0).toBeTruthy();
  });

  it.skip("Inits GAPI with key from env and scopes", async () => {
    //expect.assertions(5);
    const ga = new GoogleAuthService();
    await ga.init();
    console.log(window.gapi.auth2.init.mock.calls)
    const { client_id, scope } = window.gapi.auth2.init.mock.calls[0][0];
    console.log(client_id, scope);
    expect(window.gapi.auth2.init).toBeCalled();
    expect(client_id).toBe(PREACT_APP_GAPI_SECRET);
    expect(scope).toContain('openid');
    expect(scope).toContain('profile');
    expect(scope).toContain('email');
  });
});





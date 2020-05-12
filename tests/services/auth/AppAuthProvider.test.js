import AppAuthProvider from '../../../src/services/auth/AppAuthProvider'
import AuthProvider from '../../../src/services/auth/AuthProvider';

class MockProvider extends AuthProvider{
  constructor(name){
    super({name});
  }
  init(){return Promise.resolve();}
  signIn(){return Promise.resolve();}
  signOut(){return Promise.resolve();}
}

describe("AppAuthProvider Class", () => {
  let aap = new AppAuthProvider();
  
  test("Is an instance of AuthProvider named 'AppAuthProvider'", () => {
    expect(aap instanceof AuthProvider).toBeTruthy();
    expect(aap.PROVIDER_NAME).toBe("AppAuthProvider");
  });

  test("Is a singleton", () => {
    let aap2 = new AppAuthProvider("another one bites the dust");
    let aap3 = AppAuthProvider.instance;

    expect(AppAuthProvider.instance).toBeDefined();
    expect(AppAuthProvider.instance instanceof AppAuthProvider).toBeTruthy();
    expect(aap2).toBe(aap);
    expect(aap3).toBe(aap);
  });

  test.each(['isSignedIn', 'init', 'signIn', 'signOut', 'registerAuthProvider', 'unregisterAuthProvider'])(
    "Exposes public method/property '%o' ", p => expect(aap[p]).toBeDefined());

  describe("Basic auth providers management", () => {
    let provider = new MockProvider({name:"TEST_A_P"});
    provider.addEventListener = jest.fn(()=>Promise.resolve(null));
    provider.unregister = jest.fn(()=>Promise.resolve(null));

    beforeEach(()=> provider.addEventListener.mockClear());

    afterEach(()=>{aap.authBackends = []});

    test.each([
      'registerAuthProvider', 'init'
    ])("Allows to register AuthProvider instances calling %o", async (m) => {
      expect.assertions(3);
      const result = await aap[m](provider);

      expect(aap.authBackends).toContain(provider);
      expect(provider.addEventListener).toHaveBeenCalled();
      expect(result).toBe(aap);
    });


    test.each([
      [ [false  , false , false ], false  ],
      [ [true   , true  , true  ], true   ],
      [ [false  , null  , false ], false  ],
      [ [null   , null  , null  ], false  ],
      [ [false  , true  , false ], true   ],
    ])("%# isLoggedIn value is true if any backed is true %p -> %p", (backends, expected) => {
      backends.forEach(
        (signed, idx) => {
          let prov = new MockProvider("provider_" + idx);
          jest.spyOn(prov, 'isSignedIn', 'get').mockReturnValue(signed);
          aap.registerAuthProvider(prov);
        });
      let aap_signedIn = aap.isSignedIn;
      expect(aap_signedIn).toBe(expected);
    });


    test.each(['signIn', 'signOut'])("First registered auth provider becomes default one :: %o ()", async (method) =>{
      let provider1 = new MockProvider('provider1');
      jest.spyOn(provider1, method).mockReturnValue(Promise.resolve(null));
      aap.registerAuthProvider(provider1);
      let provider2 = new MockProvider('provider2');
      jest.spyOn(provider2, method).mockReturnValue(Promise.resolve(null));
      aap.registerAuthProvider(provider2);

      await aap[method]();
      expect(provider1[method]).toHaveBeenCalled();
      expect(provider2[method]).not.toHaveBeenCalled();
    });

    test.each([
    ['signIn', 'provider2', 1],
    ['signIn', 'wrongName', 0],
    ['signOut', 'provider2', 1],
    ['signOut', 'wrongName', 0]
    ])("%o(%o) calls the given auth backend", async (m, p, c) =>{
      let provider1 = new MockProvider('provider1');
      jest.spyOn(provider1, m);
      aap.registerAuthProvider(provider1);
      let provider2 = new MockProvider('provider2');
      jest.spyOn(provider2, m);
      aap.registerAuthProvider(provider2);

      await aap[m](p).catch(()=>{});
      expect(provider1[m]).not.toHaveBeenCalled();
      expect(provider2[m]).toHaveBeenCalledTimes(c);
    });
  });
});

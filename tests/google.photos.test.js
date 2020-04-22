import gphotos from "../src/services/google/photos";

describe('it never fails', ()=>{
  test ('expect true to be truthy',() => { expect(1 === 1).toBeTruthy()} );

  it ('also works with alt syntax', ()=> expect(true).toBeTruthy());
});


describe('getAlbums API', () => {

  it('has a getAlbums call', () => { expect(gphotos.getAlbums).toBeDefined()});

  describe("when called", ()=>{
    // const response = gphotos.getAlbums();

    //test('returns something', ()=> expect(response).toBeDefined());
   // test("that resolves to a list of albums")
  })
});


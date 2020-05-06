import * as gphotos from "../../src/services/google/photos";

describe('it never fails', ()=>{
  test ('expect true to be truthy',() => { expect(1 === 1).toBeTruthy()} );

  it ('also works with alt syntax', ()=> expect(true).toBeTruthy());
});


describe('getAlbums API', () => {

  it('has getAlbum, getAlbums and getImageUrl calls', () => {
    expect(gphotos.getAlbums).toBeDefined();
    expect(gphotos.getAlbum).toBeDefined();
    expect(gphotos.getImageUrl).toBeDefined();
  });

  it("getImageUrl returns an url", async ()=>{
    const url = await gphotos.getImageUrl("toto");
    expect(url).toContain("toto");
  });

  test("getImageUrl accepts width and height", async () => {
    const url = await gphotos.getImageUrl("toto", 111, 222);
    expect(url).toContain(111);
    expect(url).toContain(222);
  });

  test("getAlbum fetches an array of pictures", async () => {
    // eslint-disable-next-line no-global-assign
    fetch = jest.fn(() => Promise.resolve({text: ()=> ""}));

    const photos = await gphotos.getAlbum(0);
    expect(fetch).toBeCalled();
    expect(photos instanceof Array).toBeTruthy();
  });

  test("getAlbums fetches a list of albums", async () => {
    // eslint-disable-next-line no-global-assign
    fetch = jest.fn(() => Promise.resolve({ text: () => "" }));
    // eslint-disable-next-line no-unused-vars
    const albums = await gphotos.getAlbums();
    expect(fetch).toBeCalled();
  })
});


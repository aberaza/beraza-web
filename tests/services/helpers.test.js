import * as helpers from "../../src/services/helpers";

describe("asyncLoad(<url>)", () => {
  test("is defined", () => {
    expect(helpers.asyncLoad).toBeDefined();
  });

  test("Injects <script /> tag in <header>", ()=> {
    document.createElement = jest.fn(()=> ({}));
    const promisedResult = helpers.asyncLoad("http://some/fake/url");
    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(promisedResult).toHaveProperty("then");
  });
})

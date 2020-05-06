import { h } from 'preact';
import { shallow } from 'enzyme';

import App from '../../src/components/app';



describe("<App></App>", () => {

  test("Contains the <Header /> of the app", () => {
    const app = shallow(<App />);
    expect(app.find('Header').length).toBe(1);
  })
});

describe("Paths routes", () => {

  test("/ loads Home", () => {
    const app = shallow(<App />);
    expect(app.find('Home').length).toBe(1);
  });


  // test.each([
  //   ['/', 'Home'],
  //   ['/gallery', 'Gallery'],
  //   ['/profile', 'Profile']
  // ])('Route $s loads page %s', (r,p)=> {
  //     Object.defineProperty(window.location, 'href', {
  //       writable: true,
  //       value: r
  //     });
  //     expect(app.find(p).length).toBe(1);
  //   });
});

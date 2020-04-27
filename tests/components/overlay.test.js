import {h} from 'preact';
import { shallow } from 'enzyme';

import Overlay from '../../src/components/Overlay/overlay.component';

describe("<Overlay /> Usage", () => {
  it("renders <Overlay />", () => {
    const context = shallow(<Overlay />);
    expect(context).toBeTruthy();
  });

  it("renders <Overlay>With children </Overlay>", () => {
    const context = shallow(<Overlay><div class="testclass" /></Overlay>);
    expect(context).toBeTruthy();
    expect(context.contains(<div class="testclass" />)).toBeTruthy();
  });

})

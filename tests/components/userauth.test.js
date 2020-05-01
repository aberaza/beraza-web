import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { shallow } from 'enzyme';


import UserAuthProvider, { Auth } from '../../src/components/UserAuth.component';
import { GoogleAuthService } from '../../src/services/auth';

var _isSignedIn, _userProfile;
const FakeConsumer = () => {
  const c = useContext(Auth);
  console.dir(c);
  _isSignedIn = c.isSignedIn; _userProfile = c.userProfile;
  return <div>{_isSignedIn}::{_userProfile} </div>;
}

describe("<Auth /> context", () => {
  const authProviderMock = {
    init: jest.fn(() => Promise.resolve(null)),
    addEventListener: jest.fn(),
    isSignedIn: false,
    userProfile: { email: "fake@email.is" }
  };

  it("Is defined", () => {
    expect(Auth).toBeDefined();
  });

  it.skip("Exposes {isSignedIn, userProfile}", () => {
    const mockSetState = jest.fn();
    const mockDispatch = jest.fn();

    jest.mock('preact/hooks', () => ({
      useStat: jest.fn(() => [null, mockSetState] ),
      useReducer: jest.fn(() => [null, mockDispatch])
    }));

    var listener = null;
    const mI = (n, cb) => { listener = cb; }

    authProviderMock.addEventListener.mockImplementationOnce(mI);

    // eslint-disable-next-line no-unused-vars
    shallow(
      <UserAuthProvider authService={authProviderMock}>
        <FakeConsumer />
      </UserAuthProvider>
    );

    listener();
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockSetState).toHaveBeenCalled();
  });
});

describe("<UserAuthProvider /> Usage", () => {

  const authProviderMock = {
    load: jest.fn(() => Promise.resolve(null)),
    init: jest.fn(),
    addEventListener: jest.fn(),
    isSignedIn: false,
    userProfile: { email: "fake@email.is" }
  };


  it("renders <UserAuthProvider>With children </UserAuthProvider>", () => {
    const context = shallow(<UserAuthProvider authService={authProviderMock}><div class="testclass" /></UserAuthProvider>);
    expect(context).toBeTruthy();
    expect(context.contains(<div class="testclass" />)).toBeTruthy();
  });

  it("listens to signin changes", () => {
    var listener = null;
    var eventName = null;
    const mI = (n, cb) => { eventName = n; listener = cb; }

    authProviderMock.addEventListener.mockImplementationOnce(mI);

    shallow(<UserAuthProvider authService={authProviderMock}>SomeText</UserAuthProvider>);

    expect(authProviderMock.init).toHaveBeenCalled();
    expect(authProviderMock.addEventListener).toHaveBeenCalled();
    expect(listener).toBeDefined()
    expect(eventName).toBe(GoogleAuthService.SIGNED_CHANGE);
    listener();
  });
});

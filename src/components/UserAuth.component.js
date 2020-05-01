import {h, createContext} from 'preact';
import {useState, useReducer, useEffect} from 'preact/hooks';

import googleAuthService, { GoogleAuthService } from '../services/auth'

const USER_SIGNED = 'user-logged-in';
const USER_LOGOUT = 'user-logged-out';

export const Auth = createContext({
  isLoggedIn :  null,
  userProfile : {}
});

Auth.displayName = "User Auth Context";

const loggedReducer = (state = null, action) => {
  switch (action) {
    case USER_SIGNED:
      return true;
    case USER_LOGOUT:
      return false;
    default:
      return state;
  }
};



function UserAuthProvider({children, authService}) {
  const [isSignedIn, dispatch] = useReducer(loggedReducer, null);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const _auth = authService; //new GoogleAuthService();
    _auth.addEventListener(GoogleAuthService.SIGNED_CHANGE, () => {
      const {isSignedIn, userProfile} = _auth;
      console.log("Log: User Authentication State changed", isSignedIn);
      setUserProfile(isSignedIn? userProfile : {});
      dispatch(isSignedIn? USER_SIGNED : USER_LOGOUT);
    });
    _auth.init();

  });


  return (
    <Auth.Provider value={{isSignedIn, userProfile}}>
      {children}
    </Auth.Provider>
  );
}

UserAuthProvider.defaultProps = {authService : googleAuthService};

export default UserAuthProvider;

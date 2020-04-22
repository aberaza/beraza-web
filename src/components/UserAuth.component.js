import {h, createContext} from 'preact';
import {useState, useReducer, useEffect} from 'preact/hooks';

import GoogleAuthService from '../services/auth'

const USER_LOGGED = 'user-logged-in';
const USER_LOGOUT = 'user-logged-out';

export const Auth = createContext({
  isLoggedIn :  null,
  userProfile : {}
});

Auth.displayName = "User Auth Context";

const loggedReducer = (state = null, action) => {
  switch (action) {
    case USER_LOGGED:
      return true;
    case USER_LOGOUT:
      return false;
    default:
      return state;
  }
};



export function UserAuthProvider({children}) {
  const [isSignedIn, dispatch] = useReducer(loggedReducer, null);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    console.log("UserAuth useEfect hook Called");

    const _auth = new GoogleAuthService();
    _auth.addEventListener(GoogleAuthService.LOGGED_CHANGE, () => {
      const {isSignedIn} = _auth;
      setUserProfile(isSignedIn? _auth.userProfile : {});
      dispatch(isSignedIn? USER_LOGGED : USER_LOGOUT);
    });

    _auth.load()
      .then(() => _auth.init());
  });


  return (
    <Auth.Provider value={{isSignedIn, userProfile}}>
      {children}
    </Auth.Provider>
  );
}

export default UserAuthProvider;

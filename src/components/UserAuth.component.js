import {h, createContext} from 'preact';
import {useState, useReducer, useEffect} from 'preact/hooks';

// import googleAuthService, { GoogleAuthService } from '../services/google/auth'
// import appAuthProvider, {AppAuthProvider} from '../services/auth';
import {AuthEvent} from '../services/auth';

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
    console.info("<UserAuth /> Registers as SIGNED_CHANGE");
    authService.addEventListener(AuthEvent.SIGNED_CHANGE, () => {
      console.log("Log: User Authentication State changed");
      const {isSignedIn, userProfile} = authService;
      setUserProfile(isSignedIn? userProfile : {});
      dispatch(isSignedIn? USER_SIGNED : USER_LOGOUT);
    });
    authService.init();
  });

  return (
    <Auth.Provider value={{isSignedIn, userProfile}}>
      {children}
    </Auth.Provider>
  );
}

export default UserAuthProvider;

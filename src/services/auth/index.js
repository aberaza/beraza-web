import AuthEvent from './AuthEvent';
import AuthProvider from './AuthProvider';
import AppAuthProvider from './AppAuthProvider';

export {AuthEvent, AuthProvider, AppAuthProvider};

const appAuthProvider = new AppAuthProvider({name:'aggregatedAuthProvider'});

export default appAuthProvider;

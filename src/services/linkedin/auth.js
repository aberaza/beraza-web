import { AuthProvider } from '../AuthProvider';

let _instance = null;

export class LinkedinAuthProvider extends AuthProvider {
  static getInstance = () => new LinkedinAuthProvider();

  constructor(key){
    if(!_instance) {
      super();
      _instance = this;
    }
    return _instance;

  }

  init() {

  }

  signIn() {
  }

  signOut() {
  }

  get isSignedIn() { }

  get userProfile() { }

  get authResponse() { }
}

const linkedinAuthProvider = new LinkedinAuthProvider();

export default linkedinAuthProvider;

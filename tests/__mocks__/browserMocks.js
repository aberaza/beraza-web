// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage
/**
 * An example how to mock localStorage is given below 👇
 */

/*
// Mocks localStorage
const localStorageMock = (function() {
	let store = {};

	return {
		getItem: (key) => store[key] || null,
		setItem: (key, value) => store[key] = value.toString(),
		clear: () => store = {}
	};

})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
}); */


// Mock GAPI
var [_signed, _user, _listeners] = [false, {id: "toto", mail: "user@test"}, []];
const authInstance = {
	_reset: () => {[_signed, _user] = [] },
	signIn: jest.fn(()=>{_signed = true; _listeners.forEach(l => l(_signed))}),
	signOut: jest.fn(()=> {_signed = false; _listeners.forEach(l => l(_signed))}),
	isSignedIn : {
		listen: jest.fn((cb) => _listeners.push(cb)),
		get: jest.fn(()=> _signed)
	},
	currentUser: {
		get: jest.fn(() => _signed?userInstance:null)
	}
};

const userInstance = {
	getBasicProfile: jest.fn(()=> _user),
	getAuthResponse: jest.fn(() => null)
};

const gapi = {
	// eslint-disable-next-line no-unused-vars
	load : jest.fn((module, { callback, onerror}) => callback()),
	auth2 : {
		getAuthInstance: jest.fn(() => authInstance),
		init: jest.fn(() => Promise.resolve(authInstance))
	},
	client: {
		init: jest.fn(() => Promise.resolve(null))
	},

	_authInstance : authInstance
}

Object.defineProperty(window, 'gapi', {value: gapi, writable: false} );


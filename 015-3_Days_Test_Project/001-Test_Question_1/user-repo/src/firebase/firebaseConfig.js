import { initializeApp } from "firebase/app";

const FIREBASE_API_KEY = 'AIzaSyDw_Z4NUqrIU9qjX8uY7h-E41ETrni_9sY';
export const FIREBASE_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
export const FIREBASE_SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
export const FIREBASE_PASSWORD_RESET_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;
export const FIREBASE_USER_LOOKUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`;
export const FIREBASE_USER_UPDATE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`;
export const FIREBASE_EMAIL_VERFICATION_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;

export const MAIL_BOX_OUTBOX_URL = `https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/outbox`;
export const MAIL_BOX_INBOX_URL = `https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/inbox`;


export const FIREBASE_DEFAULT_HEADER = {
    'Content-Type': 'application/json'
}


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
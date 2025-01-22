const FIREBASE_API_KEY = 'AIzaSyDw_Z4NUqrIU9qjX8uY7h-E41ETrni_9sY';
export const FIREBASE_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
export const FIREBASE_SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
export const FIREBASE_PASSWORD_RESET_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;
export const FIREBASE_USER_LOOKUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`;
export const FIREBASE_USER_UPDATE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`;
export const FIREBASE_EMAIL_VERFICATION_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;

export const MAIL_BOX_SENT_URL = `https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/sent`;
export const MAIL_BOX_INBOX_URL = `https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/inbox`;


export const FIREBASE_DEFAULT_HEADER = {
    'Content-Type': 'application/json'
}

import {
    FIREBASE_SIGNIN_URL,
    FIREBASE_SIGNUP_URL,
    FIREBASE_PASSWORD_RESET_URL,
    FIREBASE_USER_LOOKUP_URL,
    FIREBASE_USER_UPDATE_URL,
    FIREBASE_DEFAULT_HEADER,
    FIREBASE_EMAIL_VERFICATION_URL
} from './firebaseConfig';

const FirebaseAuthServices = {
    signIn: async (email, password) => {
        try {
            const response = await fetch(FIREBASE_SIGNIN_URL, {
                method: 'POST',
                headers: FIREBASE_DEFAULT_HEADER,
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Authentication failed!');
            }

            return { response: data, error: null };
        } catch (err) {
            return { response: null, error: err.message };
        }
    },

    signUp: async (email, password) => {
        try {
            const response = await fetch(FIREBASE_SIGNUP_URL, {
                method: 'POST',
                headers: FIREBASE_DEFAULT_HEADER,
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Authentication failed!');
            }

            return { response: data, error: null };
        } catch (err) {
            return { response: null, error: err.message };
        }
    },

    resetPassword: async (email) => {
        try {
            const response = await fetch(FIREBASE_PASSWORD_RESET_URL, {
                method: 'POST',
                headers: FIREBASE_DEFAULT_HEADER,
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to send password reset email.');
            }

            return { response: data, error: null };
        } catch (err) {
            return { response: null, error: err.message };
        }
    },

    getUserDetails: async (idToken) => {
        try {
            const response = await fetch(FIREBASE_USER_LOOKUP_URL, {
                method: 'POST',
                headers: FIREBASE_DEFAULT_HEADER,
                body: JSON.stringify({ idToken }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to fetch user details.');
            }
            const user = data.users?.[0] || {};
            return {
                response: {
                    displayName: user.displayName || '',
                    photoUrl: user.photoUrl || '',
                    email: user.email || '',
                    emailVerified: user.emailVerified || false
                },
                error: null
            };
        } catch (err) {
            return { response: null, error: err.message };
        }
    },

    updateUserDetails: async (idToken, displayName, photoUrl) => {
        try {
            const response = await fetch(FIREBASE_USER_UPDATE_URL, {
                method: 'POST',
                headers: FIREBASE_DEFAULT_HEADER,
                body: JSON.stringify({
                    idToken,
                    displayName,
                    photoUrl,
                    returnSecureToken: true,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to update user details.');
            }

            return { response: data, error: null };
        } catch (err) {
            return { response: null, error: err.message };
        }
    },

    sendEmailVerification: async (idToken) => {
        try {
            const response = await fetch(
                FIREBASE_EMAIL_VERFICATION_URL,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestType: "VERIFY_EMAIL",
                        idToken,
                    }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to send email verification.');
            }

            return { response: data, error: null };
        } catch (err) {
            return { response: null, error: err.message };
        }
    },
};

export default FirebaseAuthServices;

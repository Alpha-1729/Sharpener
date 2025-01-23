import { FIREBASE_SIGNUP_URL, FIREBASE_DEFAULT_HEADER, FIREBASE_SIGNIN_URL } from "../firebase/firebaseConfig";

export const signUpUser = async (email, password) => {
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
            throw new Error(data.error?.message || 'SignUp failed!');
        }
        return { response: data, error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
}

export const signInUser = async (email, password) => {
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
            throw new Error(data.error?.message || 'SignIn failed!');
        }

        return { response: data, error: null };
    } catch (err) {
        return { response: null, error: err.message };
    }
}

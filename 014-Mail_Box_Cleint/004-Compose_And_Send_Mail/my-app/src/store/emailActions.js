import { MAIL_BOX_INBOX_URL, MAIL_BOX_SENT_URL, FIREBASE_DEFAULT_HEADER, } from "../firebase/firebaseConfig";

function sanitizeEmail(email) {
    return email.replace(/[\s.]/g, '');
}

export const getSentEmails = async (email) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_SENT_URL}/${sanitizedEmail}.json`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Fetching Sent Emails Failed!');
        }
        return { response: data, error: null };


    } catch (err) {
        return { response: null, error: err.message };
    }
}

export const getReceivedEmails = async (email) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_INBOX_URL}/${sanitizedEmail}.json`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Fetching Inbox Failed!');
        }
        return { response: data, error: null };


    } catch (err) {
        return { response: null, error: err.message };
    }
}

export const addSentEmails = async (email, sentEmailObj) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_SENT_URL}/${sanitizedEmail}.json`, {
            method: 'POST',
            headers: FIREBASE_DEFAULT_HEADER,
            body: JSON.stringify(sentEmailObj),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Adding Sent Emails Failed!');
        }
        return { response: data, error: null };


    } catch (err) {
        return { response: null, error: err.message };
    }
}

export const addInboxEmails = async (email, inboxEmailObj) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_INBOX_URL}/${sanitizedEmail}.json`, {
            method: 'POST',
            headers: FIREBASE_DEFAULT_HEADER,
            body: JSON.stringify(inboxEmailObj),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Adding Sent Emails Failed!');
        }
        return { response: data, error: null };


    } catch (err) {
        return { response: null, error: err.message };
    }
}
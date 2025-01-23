import {
    MAIL_BOX_INBOX_URL,
    MAIL_BOX_OUTBOX_URL,
    FIREBASE_DEFAULT_HEADER,
} from "../firebase/firebaseConfig";

function sanitizeEmail(email) {
    return email.replace(/[\s.]/g, '');
}

export const fetchOutboxEmails = async (email) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_OUTBOX_URL}/${sanitizedEmail}.json`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Fetching outbox emails failed!');
        }

        const outbox = Object.keys(data || {}).map((key) => ({
            id: key,
            recipient: data[key].recipient,
            subject: data[key].subject,
            content: data[key].content,
            timestamp: data[key].timestamp,
        }));

        return { response: outbox, error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const fetchInboxEmails = async (email) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_INBOX_URL}/${sanitizedEmail}.json`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Fetching inbox emails failed!');
        }

        const inbox = Object.keys(data || {}).map((key) => ({
            id: key,
            sender: data[key].sender,
            subject: data[key].subject,
            content: data[key].content,
            timestamp: data[key].timestamp,
            isRead: data[key].isRead,
        }));

        console.log(inbox);

        return { response: inbox, error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const addEmailToOutbox = async (email, outboxObj) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_OUTBOX_URL}/${sanitizedEmail}.json`, {
            method: 'POST',
            headers: FIREBASE_DEFAULT_HEADER,
            body: JSON.stringify(outboxObj),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Adding email to outbox failed!');
        }
        return { response: data, error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const addEmailToInbox = async (email, inboxObj) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_INBOX_URL}/${sanitizedEmail}.json`, {
            method: 'POST',
            headers: FIREBASE_DEFAULT_HEADER,
            body: JSON.stringify(inboxObj),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.error?.message || 'Adding email to inbox failed!');
        }
        return { response: data, error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const markInboxEmailAsRead = async (email, inboxObj) => {
    const sanitizedEmail = sanitizeEmail(email);
    const { id: emailKey, ...rest } = inboxObj;
    const updatedEmailObj = { ...rest, isRead: true };

    try {
        const response = await fetch(`${MAIL_BOX_INBOX_URL}/${sanitizedEmail}/${emailKey}.json`, {
            method: 'PUT',
            headers: FIREBASE_DEFAULT_HEADER,
            body: JSON.stringify(updatedEmailObj),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Marking inbox email as read failed!');
        }
        return { response: data, error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const removeInboxEmail = async (email, emailKey) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_INBOX_URL}/${sanitizedEmail}/${emailKey}.json`, {
            method: 'DELETE',
            headers: FIREBASE_DEFAULT_HEADER,
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error?.message || 'Removing inbox email failed!');
        }

        return { response: 'Inbox email removed successfully', error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const removeOutboxEmail = async (email, emailKey) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_OUTBOX_URL}/${sanitizedEmail}/${emailKey}.json`, {
            method: 'DELETE',
            headers: FIREBASE_DEFAULT_HEADER,
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error?.message || 'Removing outbox email failed!');
        }

        return { response: 'Outbox email removed successfully', error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const removeAllInboxEmails = async (email) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_INBOX_URL}/${sanitizedEmail}.json`, {
            method: 'DELETE',
            headers: FIREBASE_DEFAULT_HEADER,
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error?.message || 'Removing all inbox emails failed!');
        }

        return { response: 'All inbox emails removed successfully', error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

export const removeAllOutboxEmails = async (email) => {
    const sanitizedEmail = sanitizeEmail(email);

    try {
        const response = await fetch(`${MAIL_BOX_OUTBOX_URL}/${sanitizedEmail}.json`, {
            method: 'DELETE',
            headers: FIREBASE_DEFAULT_HEADER,
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error?.message || 'Removing all outbox emails failed!');
        }

        return { response: 'All outbox emails removed successfully', error: null };

    } catch (err) {
        return { response: null, error: err.message };
    }
};

import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        outbox: [],
        inbox: [],
        unreadCount: 0,
    },
    reducers: {
        setOutboxEmails(state, action) {
            state.outbox = action.payload;
        },
        setInboxEmails(state, action) {
            state.inbox = action.payload;
            state.unreadCount = action.payload.filter((email) => !email.isRead).length;
        },
        markInboxEmailAsRead(state, action) {
            const existingInboxEmail = state.inbox.find(email => email.id === action.payload);
            if (existingInboxEmail && !existingInboxEmail.isRead) {
                existingInboxEmail.isRead = true;
                state.unreadCount--;
            }
        },
        deleteInboxEmail(state, action) {
            state.inbox = state.inbox.filter(email => email.id !== action.payload);
            state.unreadCount = state.inbox.filter((email) => !email.isRead).length;
        },
        deleteOutboxEmail(state, action) {
            state.outbox = state.outbox.filter(email => email.id !== action.payload);
        },
        addOutboxEmail(state, action) {
            state.outbox.push(action.payload);
        }
    },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;

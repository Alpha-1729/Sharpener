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
        // addOutboxEmail(state, action) {
        //     state.outbox.push(action.payload);
        // },
        // addInboxEmail(state, action) {
        //     state.inbox.push(action.payload);
        //     if (!action.payload.read) {
        //         state.unreadCount++;
        //     }
        // },
        // setInbox(state, action) {
        //     state.inbox = action.payload;
        //     state.unreadCount = action.payload.filter((email) => !email.read).length;
        // },
        // setOutbox(state, action) {
        //     state.outbox = action.payload;
        // },
        // markEmailAsRead(state, action) {
        //     const emailId = action.payload;
        //     const email = state.inbox.find((email) => email.id === emailId);
        //     if (email && !email.read) {
        //         email.read = true;
        //         state.unreadCount--;
        //     }
        // },
        // deleteInboxEmail(state, action) {
        //     const emailId = action.payload;
        //     const emailIndex = state.inbox.findIndex((email) => email.id === emailId);
        //     if (emailIndex !== -1) {
        //         if (!state.inbox[emailIndex].read) {
        //             state.unreadCount--;
        //         }
        //         state.inbox.splice(emailIndex, 1);
        //     }
        // },
        // deleteOutboxEmail(state, action) {
        //     const emailId = action.payload;
        //     state.outbox = state.outbox.filter((email) => email.id !== emailId);
        // },
        // clearInbox(state) {
        //     state.inbox = [];
        //     state.unreadCount = 0;
        // },
        // clearOutbox(state) {
        //     state.outbox = [];
        // },
    },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;

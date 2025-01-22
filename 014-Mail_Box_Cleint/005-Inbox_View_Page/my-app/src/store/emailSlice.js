import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {
    sent: [],
    received: []
};

const emailSlice = createSlice({
    name: 'email',
    initialState: initialEmailState,
    reducers: {
        addSentEmail(state, action) {
            state.sent.push(action.payload);
        },
        addReceivedEmail(state, action) {
            state.received.push(action.payload);
        },
        clearSentEmails(state) {
            state.sent = [];
        },
        clearReceivedEmails(state) {
            state.received = [];
        }
    }
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const sharedDocumentsSlice = createSlice({
    name: 'sharedDocuments',
    initialState: [],
    reducers: {
        setSharedDocuments: (state,action)=>action.payload
    }
})

export const { setSharedDocuments } = sharedDocumentsSlice.actions;

export default sharedDocumentsSlice.reducer;

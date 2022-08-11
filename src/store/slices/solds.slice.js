import { createSlice } from '@reduxjs/toolkit';

export const soldsSlice = createSlice({
    name: 'solds',
    initialState: [],
    reducers: {
        setSolds: (state,action)=>action.payload
    }
})

export const { setSolds } = soldsSlice.actions;

export default soldsSlice.reducer;

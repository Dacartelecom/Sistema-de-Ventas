import { createSlice } from '@reduxjs/toolkit';

export const advisersSlice = createSlice({
    name: 'advisers',
    initialState: [],
    reducers: {
        setAdvisers: (state,action)=>action.payload
    }
})

export const { setAdvisers } = advisersSlice.actions;

export default advisersSlice.reducer;

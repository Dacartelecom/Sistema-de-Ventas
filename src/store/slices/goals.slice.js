import { createSlice } from '@reduxjs/toolkit';

export const goalsSlice = createSlice({
    name: 'goal',
    initialState: [],
    reducers: {
        setGoals: (state,action)=>action.payload
    }
})

export const { setGoals } = goalsSlice.actions;

export default goalsSlice.reducer;

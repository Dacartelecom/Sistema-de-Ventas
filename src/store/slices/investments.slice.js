import { createSlice } from '@reduxjs/toolkit';

export const investmentsSlice = createSlice({
    name: 'investments',
    initialState: [],
    reducers: {
        setInvestments: (state,action)=>action.payload
    }
})

export const { setInvestments } = investmentsSlice.actions;

export default investmentsSlice.reducer;

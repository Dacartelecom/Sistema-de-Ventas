import { createSlice } from '@reduxjs/toolkit';

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        startDate:'',
        endDate:''
    },
    reducers: {
        setDates: (state,action)=>action.payload
    }
})

export const { setDates } = dateSlice.actions;

export default dateSlice.reducer;

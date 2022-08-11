import { createSlice } from '@reduxjs/toolkit';

export const isLoaddingSlice = createSlice({
    name: 'isLoadding',
    initialState: false,
    reducers: {
        setIsLoadding: (state,action)=>action.payload
    }
})

export const { setIsLoadding } = isLoaddingSlice.actions;

export default isLoaddingSlice.reducer;

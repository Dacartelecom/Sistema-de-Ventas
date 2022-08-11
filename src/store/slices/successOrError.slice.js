import { createSlice } from '@reduxjs/toolkit';

export const successOrErrorSlice = createSlice({
    name: 'successOrError',
    initialState: '',
    reducers: {
        setSuccessOrError: (state,action)=>action.payload
    }
})

export const { setSuccessOrError } = successOrErrorSlice.actions;

export default successOrErrorSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const sectionSelectSlice = createSlice({
    name: 'sectionSelect',
    initialState: {},
    reducers: {
        setSectionSelect: (state,action)=>action.payload
    }
})

export const { setSectionSelect } = sectionSelectSlice.actions;

export default sectionSelectSlice.reducer;

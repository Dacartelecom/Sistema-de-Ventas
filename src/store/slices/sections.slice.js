import { createSlice } from '@reduxjs/toolkit';

export const sectionsSlice = createSlice({
    name: 'sections',
    initialState: [],
    reducers: {
        setSections: (state,action)=>{
            return action.payload
        }
    }
})

export const { setSections } = sectionsSlice.actions;

export default sectionsSlice.reducer;

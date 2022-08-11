import { createSlice } from '@reduxjs/toolkit';

export const ugiVisibleSlice = createSlice({
    name: 'ugiVisible',
    initialState: false,
    reducers: {
        setUgi: (state,action)=>{
            return action.payload
        }
    }
})

export const { setUgi } = ugiVisibleSlice.actions;

export default ugiVisibleSlice.reducer;

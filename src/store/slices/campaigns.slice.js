import { createSlice } from '@reduxjs/toolkit';

export const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: [],
    reducers: {
        setCampaigns: (state,action)=>{
            return action.payload
        },
    }
});

export const { setCampaigns } = campaignsSlice.actions;

export default campaignsSlice.reducer;

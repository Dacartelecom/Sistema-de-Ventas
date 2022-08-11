import { createSlice } from '@reduxjs/toolkit';

export const rolesSlice = createSlice({
    name: 'roles',
    initialState: [],
    reducers: {
        setRoles: (state,action)=>action.payload
    }
})

export const { setRoles } = rolesSlice.actions;

export default rolesSlice.reducer;

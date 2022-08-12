import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const rolesSlice = createSlice({
    name: 'roles',
    initialState: [],
    reducers: {
        setRoles: (state,action)=>action.payload
    }
})

export const { setRoles } = rolesSlice.actions;

export const getRoles = () =>async (dispatch) => {
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            const res = await axios.get('https://api-dacartelecom.herokuapp.com/api/v1/roles',getConfig());
            dispatch(setRoles(res.data.data));
        } catch (error) {
            console.log(error.response.data);
        };
    };
};

export default rolesSlice.reducer;

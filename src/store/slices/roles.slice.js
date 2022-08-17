import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const valid = getConfig();
    if (valid.headers.Authorization !== "Bearer null") {
        try {
            const res = await axios.get('https://sistema-de-ventas-api.herokuapp.com/api/v1/roles',getConfig());
            dispatch(setRoles(res.data.data));
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.message === 'jwt expired') {
                navigate("/")
            };
        };
    };
};

export default rolesSlice.reducer;
